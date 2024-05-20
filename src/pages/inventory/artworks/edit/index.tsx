import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import { Reorder, useDragControls } from 'framer-motion'
import { ChevronsUpDown, Trash } from 'lucide-react'

import { API } from '@/lib/API'
import { Artist as ArtistType, Collection, InventoryArtwork, ResponseApi, ResponseApiList } from '@/types/API'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SelectArtist } from '@/components/select-artist'
import { CreateTagAction } from '@/components/ui/create-tag-action'
import Chip from '@/components/ui/chip'

interface ArtistDetail extends ArtistType {
  link: string
}

export const InventoryArtworksEditPage = () => {
  const { toast } = useToast()

  const [data, setData] = useState<InventoryArtwork>([])
  const [artists, setArtists] = useState<ArtistDetail[]>([])
  const [selectedArtist, setSelectedArtist] = useState<ArtistDetail[]>([])
  const [tags, setTags] = useState<string[]>([])

  const [initialSelectedArtist, setInitialSelectedArtist] = useState<Record<string, boolean>>({})
  // const initialSelectedArtist : Record<string, boolean> = {1: true};

  const [img, setImg] = useState<File | undefined>()
  const [isVisible, setIsVisible] = useState(0)
  const fullname = useRef<HTMLInputElement>('')
  const descrip = useRef<HTMLTextAreaElement>('')
  const tag = useRef<HTMLInputElement>('')
  const pric = useRef<HTMLInputElement>('')
  const stock = useRef<HTMLInputElement>('')

  const navigateTo = useNavigate()
  const params = useParams()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await API.get<ResponseApiList<ArtistDetail>>('/artists?limit=10000')
        setArtists(response.data)
      } catch (error) {
        console.log('Error fetching data:', error.message)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await API.get<ResponseApi<InventoryArtwork>>(`/inventory/artworks/${Number(params.id)}`)
        setData(response.data)
        setIsVisible(response.data.is_visible)
        setTags(response.data.tags)
      } catch (error) {
        console.log('Error fetching data:', error.message)
      }
    })()
  }, [params.id])

  const handleSelected = (data: Record<string, boolean>) => {
    const getSelected = Object.keys(data).map(dt => {
      const artisIndex = artists[dt]
      return artisIndex
    })

    setSelectedArtist(getSelected)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const name = fullname.current.value as string
    const price = pric.current.value as string
    const current_stock = stock.current.value as string
    const desc = descrip.current.value as string
    // const tags = tag.current.value.split(', ') as string[]

    // verify data
    if (
      !name ||
      !price ||
      !current_stock ||
      !desc ||
      tags.length == 0 ||
      selectedArtist.length == 0
      // || !img
    ) {
      return toast({
        variant: 'destructive',
        title: `Please fill out all field`
      })
    }

    const formInput: Collection = { name, tags, price, current_stock, desc, img, is_visible: isVisible }

    const body = {
      _method: 'PUT',
      ...formInput
    }

    selectedArtist.forEach((artist, index) => {
      if (!body.artist_list) {
        body.artist_list = []
      }

      if (!body.artist_list[index]) {
        body.artist_list[index] = {}
      }

      body.artist_list[index].artist_id = artist.id
      body.artist_list[index].link = artist.link
    })

    try {
      await API.post<Collection, ResponseApi<Collection>>(`/inventory/artworks/${Number(params.id)}`, body, {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
      })
      await toast({
        title: `Success!`,
        description: 'Updated data'
      })
      navigateTo('/inventory')
    } catch (error) {
      console.log('Error updating artist:', error.message)
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: error.response.data.message
      })
    }
  }

  const initSelectedArtist = () => {
    const initialState: Record<string, boolean> = {}

    artists?.forEach((value, key) => {
      const hasArtist = data?.hasArtists?.find(art => art.artist_id == value.id)
      if (hasArtist) {
        initialState[key] = true
        value.link = hasArtist.link
      }
    })

    setInitialSelectedArtist(initialState)
  }

  useEffect(() => {
    if (data && artists) {
      initSelectedArtist()
    }
  }, [data, artists])

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Edit</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Exhibition Name' required placeholder='Enter exhibition name' ref={fullname} defaultValue={data.name} />
          <Textarea label='Description' required placeholder='Enter your comprehensive description on the artist' ref={descrip} defaultValue={data.desc} />

          <div className='space-y-2.5'>
            <Label className='block'>
              Artist <span className='text-destructive'> *</span>
            </Label>

            <Reorder.Group axis='y' onReorder={setSelectedArtist} values={selectedArtist} className='space-y-2 overflow-hidden'>
              {selectedArtist.map(artist => (
                <Artist key={artist.id} artist={artist} artists={selectedArtist} setArtist={setSelectedArtist} />
              ))}
            </Reorder.Group>

            <SelectArtist artists={artists} selectedArtist={handleSelected} initialSelectedArtist={initialSelectedArtist} />
          </div>

          <fieldset className='space-y-2.5'>
            <Label className='block'>
              Tags <span className='text-destructive'> *</span>
            </Label>
            <div className='flex flex-wrap gap-2.5'>
              {tags.map((value, index) => {
                return <Chip key={index} text={value} />
              })}
              <CreateTagAction
                onSubmit={(value: string) => {
                  setTags([...tags, value])
                }}
              />
              {tags.length == 0 && <p>Add Tags</p>}
            </div>
          </fieldset>
        </fieldset>

        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Price' type='number' placeholder='Enter Price' required ref={pric} defaultValue={data.price} />
          <Input label='Current Stock' type='number' placeholder='Enter Stock' required ref={stock} defaultValue={data.current_stock} />
          <fieldset>
            <Input label='Artwork Image' type='file' required onChange={(e: React.FormEvent<HTMLInputElement>) => setImg(e.target.files[0])} accept='.jpg,.pdf,.png' />
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
                <input
                  type='radio'
                  value='1'
                  id='visible'
                  required
                  name='isVisible'
                  checked={isVisible == 1}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible(e.target.value)}
                />
                <Label htmlFor='visible' className='font-normal'>
                  Visible
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  type='radio'
                  value='0'
                  id='hidden'
                  name='isVisible'
                  checked={isVisible == 0}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible(e.target.value)}
                />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>
      </form>

      <div className='col-span-2 gap-4 flex items-center justify-end'>
        <Button
          variant={'outline'}
          size='lg'
          type='button'
          onClick={() => {
            navigateTo(-1)
          }}
        >
          Back
        </Button>
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
              <p className='text-sm truncate'>{artist.fullname}</p>
              <Input
                placeholder={`Insert artist's external website`}
                className='max-w-full'
                type='url'
                required
                defaultValue={artist.link}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  const set = {
                    ...artist,
                    link: e.target.value as string
                  }
                  const setLink = artists?.map(artis => {
                    if (artis.id === set.id) return set
                    return artis
                  })
                  setArtist(setLink)
                }}
              />
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
