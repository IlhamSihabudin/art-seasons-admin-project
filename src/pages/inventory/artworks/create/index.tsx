import { useState, useRef, useEffect } from 'react'
import { Reorder, useDragControls } from 'framer-motion'
import { ChevronsUpDown, Trash } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

import { API } from '@/lib/API'
import { Artist as ArtistType, Collection, ResponseApiList } from '@/types/API'
import { SelectArtist } from '@/components/select-artist'

interface ArtistDetail extends ArtistType {
  link: string
}

export const InventoryArtworksCreatePage = () => {
  const { toast } = useToast();

  const [artists, setArtists] = useState<ArtistDetail[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<ArtistDetail[]>([]);

  const [img, setImg] = useState<File | undefined>();
  const [isVisible, setIsVisible] = useState("");
  const fullname = useRef("")
  const descrip = useRef("")
  const tag = useRef("")
  const pric = useRef("")
  const stock = useRef("")

  const navigateTo = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const response = await API.get<ResponseApiList<ArtistDetail>>('/artists?limit=10000')
        setArtists(response.data);
      } catch (error) {
        console.log('Error fetching data:', error.message);
      }
    })()
  }, []);

  const handleSelected = (data: Record<string, boolean>) => {
    const getSelected = Object.keys(data).map((dt) => {
      const artisIndex = artists[dt];
      return artisIndex;
    })

    setSelectedArtist(getSelected)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = fullname.current.value as string;
    const price = pric.current.value as string;
    const current_stock = stock.current.value as string;
    const desc = descrip.current.value as string;
    const tags = tag.current.value.split(', ') as string[];

    // verify data
    if (!name || !price || !current_stock || !desc || !isVisible || !tags || !img) {
      return toast({
        variant: "destructive",
        title: `Please fill out all field`,
      })
    }

    const formInput: Collection = {name, tags, price, current_stock, desc, img, is_visible: isVisible}

    const body = { ...formInput };

    selectedArtist.forEach((artist, index) => {
        if (!body.artist_list) {
            body.artist_list = [];
        }

        if (!body.artist_list[index]) {
            body.artist_list[index] = {};
        }

        body.artist_list[index].artist_id = artist.id;
        body.artist_list[index].link = artist.link;
    });

    try {
      await API.post<Collection, ResponseApi<Collection>>(`/inventory/artworks`, body, {
        Accept: '*/*',
        "Content-Type": 'multipart/form-data'
      });
      await toast({
        title: `Success!`,
        description: "Created data",
      })
      navigateTo('/inventory');
    } catch (error) {
      console.log('Error updating artist:', error.message);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.response.data.message
      })
    }
  };

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Add New Artwork</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Exhibition Name' required placeholder='Enter exhibition name' ref={fullname} />
          <fieldset>
            <Input label='Tags' placeholder='Enter tags' required ref={tag}  />
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>add a comma to add more than one tag</li>
            </ul>
          </fieldset>
          <Input label='Price' type='number' placeholder='Enter Price' required ref={pric}  />
          <Input label='Current Stock' type='number' placeholder='Enter Stock' required ref={stock}  />
          <fieldset>
            <Input label='Artwork Image' type='file' required onChange={(e: React.FormEvent<HTMLInputElement>) => setImg(e.target.files[0])} accept=".jpg,.pdf,.png" />
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Pixel size: 1440 x 480px (min)</li>
              <li>Aspect ratio: 27:9 (square)</li>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 2MB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>

          <fieldset>
            <Label className='block mb-2.5'>Visibility</Label>
            <RadioGroup className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <input type="radio" value='1' id='visible' required name="isVisible" onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible(e.target.value)}/>
                <Label htmlFor='visible' className='font-normal'>
                  Visible
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <input type="radio" value='0' id='hidden' name="isVisible" onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible(e.target.value)} />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>
        <Textarea label='Description' required placeholder='Enter your comprehensive description on the artist' wrapperClassName='flex flex-col' className='flex-1' ref={descrip} />
      </form>

      <div className='space-y-2.5'>
        <Label className='block'>Artist</Label>

        <Reorder.Group axis='y' onReorder={setSelectedArtist} values={selectedArtist} className='space-y-10 overflow-hidden'>
          {selectedArtist.map(artist => (
            <Artist key={artist.id} artist={artist} artists={selectedArtist} setArtist={setSelectedArtist} />
          ))}
        </Reorder.Group>

        <SelectArtist artists={artists} selectedArtist={handleSelected} />
      </div>

      <div className='col-span-2 flex items-center justify-end'>
        <Button size='lg' type='submit' onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </section>
  )
}

export type ArtistProps = {
  artist: ArtistDetail
  artists: ArtistDetail[]
  setArtist: (value: ArtistDetail[]) => void
}

const Artist = ({ artist, artists, setArtist }: ArtistProps) => {
  const dragControls = useDragControls()

  const handleDelete = () => {
    if (artists.length >= 1) setArtist(artists.filter(artis => artis.id !== artist.id))
  }

  return (
    <Reorder.Item className='bg-white p-2 rounded-lg border flex items-center gap-4 flex-1' key={artist.id} value={artist} dragListener={false} dragControls={dragControls}>
      <div className='flex items-center gap-4 flex-1'>
        <button onPointerDown={event => dragControls.start(event)}>
          <ChevronsUpDown size={24} />
        </button>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-4 flex-1'>
            <img src={artist.profile_picture} alt={artist?.fullname} className='w-14 h-14 rounded aspect-square object-center object-cover' />
            <div className='w-full space-y-2'>
              <p className='text-sm truncate'>
                {artist.fullname}
              </p>
              <Input placeholder={`Insert artist's external website`}  className='max-w-full' type='url' required onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const set = {
                  ...artist,
                  link: e.target.value as string
                }
                const setLink = artists?.map((artis) => {
                  if (artis.id === set.id) return set
                  return artis
                })
                setArtist(setLink)
              }} />
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleDelete}>
        <Trash size={20} />
      </button>
    </Reorder.Item>
  )
}
