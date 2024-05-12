import { useEffect, useState } from 'react'
import { arrayMoveImmutable } from 'array-move'
import { Reorder, useDragControls } from 'framer-motion'
import SortableList, { SortableItem } from 'react-easy-sort'
import { ChevronsUpDown, Menu, Trash, CheckIcon } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArtistsDialog } from '@/components/artist-dialog'
import { Artist as ArtistType, Artwork, ArtworkDetail, Exhibition, ResponseApi } from '@/types/API'

import { CaretSortIcon } from "@radix-ui/react-icons"
 
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ExhibitionForm } from '.'
import { API } from '@/lib/API'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { ArtistsRequest } from '../../art-fairs/create/artists.tab'
import { AxiosError } from 'axios'

export interface ArtistsDetail extends ArtistType {
  artworks?: Artwork[];
}

export const ArtistsTab = ({ callback, artworkDetail, formInput }: { callback: (value: boolean) => void, artworkDetail: ArtworkDetail[], formInput?: ExhibitionForm }) => {
  const { toast } = useToast();
  const navigateTo = useNavigate();

  const [artists, setArtists] = useState<ArtistsDetail[]>([]);
  const [listArtwork, setListArtwork] = useState<ArtistsDetail[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<ArtistsDetail[]>([]);

  const [open, setOpen] = useState(false)
  const [selectedArtistId, setSelectedArtistId] = useState<number>()

  // Formating data
  useEffect(() => {
    const uniqueArtists: Record<number, ArtistsDetail> = {};
    artworkDetail.forEach((artwork) => {
      artwork.has_artists.forEach((artist) => {
        if (!uniqueArtists[artist.artist_id]) {
          uniqueArtists[artist.artist_id] = artist.artist;
          uniqueArtists[artist.artist_id].artworks = [];
        }
        uniqueArtists[artist.artist_id].artworks?.push({
          id: artwork.id,
          name: artwork.name,
          desc: artwork.desc,
          price: artwork.price,
          current_stock: artwork.current_stock,
          tags: artwork.tags,
          img: artwork.img,
          is_visible: artwork.is_visible,
          created_at: artwork.created_at,
          updated_at: artwork.updated_at,
        });
      });
    });
    const uniqueArtistsArray = Object.values(uniqueArtists).sort((a, b) => a.id - b.id);
    setArtists(uniqueArtistsArray);
    setListArtwork(uniqueArtistsArray);
  }, [artworkDetail]);

  const sendDataToParent = () => {
    callback(false);
  };

  const handleAddArtist = () => {
    const artistToAdd = artists.find((artist) => artist.id === selectedArtistId)
    const isDuplicate = selectedArtist.some((artist) => artist.id === selectedArtistId)

    if (!isDuplicate && artistToAdd) {
      setSelectedArtist((prev) => {
        if (Array.isArray(prev) && prev.length > 0) {
          return [...prev, artistToAdd];
        } else {
          return [artistToAdd];
        }
      })
    }
  }

  const handleSubmitForm = async () => {
    // Initialize body object with formInput data
    const body = { ...formInput, artists: [] as ArtistsRequest[] };

    // Map over selectedArtist to add artist_id and artwork_id
    selectedArtist.forEach(artist => {
      const artistObj: ArtistsRequest = { artist_id: artist.id, artworks: [] };
      artist.artworks?.forEach(artwork => {
          artistObj.artworks.push({ artwork_id: artwork.id });
      });
      body.artists.push(artistObj);
    });

    try {
      await API.post<typeof body, ResponseApi<Exhibition>>(`/exhibitions`, body, {
        Accept: 'multipart/form-data',
        "Content-Type": 'multipart/form-data'
      });
      await toast({
        title: `Success!`,
        description: "Created data",
      })
      navigateTo('/content-management/exhibitions');
    } catch (error) {
      const err = error as AxiosError;
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: (err.response?.data as AxiosError).message
      })
    }
  }

  return (
    <section className='space-y-10'>
      <div>
        <Label className='block mb-2.5'>Artists Featured In Exhibition</Label>
        <div className='flex items-center gap-5 relative'>
          <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between"
              >
                {selectedArtistId
                  ? artists.filter((artist) => !selectedArtist.find((sel) => sel.id === artist.id)).find((art) => art.id === selectedArtistId)?.fullname
                  : "Select artist"}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search artist" className="h-9" />
                <CommandEmpty>Not found.</CommandEmpty>
                <CommandGroup>
                  {artists.filter((artist) => !selectedArtist.find((sel) => sel.id === artist.id)).map((artis) => (
                    <CommandItem
                      key={artis.id}
                      value={artis.id.toString()}
                      onSelect={() => {
                        setSelectedArtistId(artis.id)
                        setOpen(false)
                      }}
                    >
                      {artis.fullname}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedArtistId === artis.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Button onClick={handleAddArtist}>Add</Button>
        </div>
      </div>

      <Reorder.Group axis='y' onReorder={setSelectedArtist} values={selectedArtist} className='space-y-10 overflow-hidden'>
        {selectedArtist.map(artist => (
          <Artist key={artist.id} artist={artist} artists={selectedArtist} setArtists={setSelectedArtist} listArtwork={listArtwork} />
        ))}
      </Reorder.Group>

      <div className='col-span-2 gap-4 flex items-center justify-end'>
        <Button variant={'outline'} size='lg' onClick={sendDataToParent}>
          Back
        </Button>
        <Button size='lg' onClick={handleSubmitForm}>
          Submit
        </Button>
      </div>
    </section>
  )
}

export type ArtistProps = {
  artist: (ArtistsDetail)
  artists: ArtistsDetail[]
  setArtists: (artists: ArtistsDetail[]) => void
  listArtwork: ArtistsDetail[]
}

const Artist = ({ artist, artists, setArtists, listArtwork }: ArtistProps) => {
  const dragControls = useDragControls()

  const listArtistArt = listArtwork.find((artis) => artis.id === artist.id)?.artworks
  const handleSelected = (data: Record<string, boolean>) => {
    if (listArtistArt) {
      const arrayOfArtworks: Artwork[] = [];
      const getSelected = Object.keys(data).map((dt) => {
        const artisIndex = listArtistArt[dt as keyof typeof listArtistArt];
        return artisIndex;
      })
      getSelected.filter((artwork): artwork is Artwork => typeof artwork !== 'number').forEach((artwork) => {
        arrayOfArtworks.push(artwork);
      });

      setArtists(
        artists.map(artis => {
          if (artis.id === artist.id) {
            return {
              ...artis,
              artworks: arrayOfArtworks
            }
          }
          return artis
        })
      )
    }
  }

  const handleDelete = (artistId: number, artworkId: number) => {
    setArtists(
      artists.map(a => {
        if (a.id === artistId) {
          return {
            ...a,
            artworks: a.artworks?.filter(artwork => artwork.id !== artworkId)
          }
        }
        return a
      })
    )
  }

  const handleSortEnd = (oldIndex: number, newIndex: number) => {
    setArtists(
      artists.map(a => {
        if (a.id === artist.id) {
          const artworks = a.artworks || [];
          return {
            ...a,
            artworks: arrayMoveImmutable(artworks, oldIndex, newIndex)
          }
        }
        return a
      })
    )
  }

  return (
    <Reorder.Item className='space-y-4' key={artist.id} value={artist} dragListener={false} dragControls={dragControls}>
      <div className='flex items-center gap-4'>
        <button onPointerDown={event => dragControls.start(event)}>
          <ChevronsUpDown size={24} className='shrink-0' />
        </button>
        <p className='text-2xl font-medium'>{artist.fullname}</p>
      </div>

      <SortableList onSortEnd={handleSortEnd} className='grid grid-cols-2 gap-4 ml-10' draggedItemClassName='!bg-muted !cursor-grabbing'>
        {artist.artworks?.map(artwork => (
          <SortableItem key={artwork.id}>
            <div key={artwork.id} className='p-4 rounded-lg border bg-white flex items-center cursor-grab'>
              <div className='flex items-center gap-4 flex-1 pointer-events-none'>
                <button>
                  <Menu size={24} />
                </button>
                <div className='flex items-center gap-4'>
                  <img src={artwork.img} alt='' className='rounded aspect-square object-center object-cover' />
                  <p className='text-sm truncate'>
                    {artwork.name} {artwork.id}
                  </p>
                </div>
              </div>
              <button onClick={() => handleDelete(artist.id, artwork.id)}>
                <Trash size={20} />
              </button>
            </div>
          </SortableItem>
        ))}
      </SortableList>

      <ArtistsDialog callbackSelectedArt={handleSelected} listArtistArt={listArtistArt ? listArtistArt : []} />
    </Reorder.Item>
  )
}

