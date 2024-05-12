import { useState } from 'react'
import { arrayMoveImmutable } from 'array-move'
import { Reorder, useDragControls } from 'framer-motion'
import SortableList, { SortableItem } from 'react-easy-sort'
import { ChevronsUpDown, Menu, Trash } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArtistsDialog } from '@/components/artist-dialog'

export const ArtistsTab = () => {
  const [artists, setArtists] = useState(data)

  return (
    <section className='space-y-10'>
      <div>
        <Label className='block mb-2.5'>Artists Featured In Exhibition</Label>
        <div className='flex items-center justify-between gap-5'>
          <Input placeholder='Search for Artist' wrapperClassName='flex-1' />
          <Button>Add</Button>
        </div>
      </div>

      <Reorder.Group axis='y' onReorder={setArtists} values={artists} className='space-y-10 overflow-hidden'>
        {artists.map(artist => (
          <Artist key={artist.id} artist={artist} artists={artists} setArtists={setArtists} />
        ))}
      </Reorder.Group>
    </section>
  )
}

type ArtistProps = {
  artist: (typeof data)[0]
  artists: typeof data
  setArtists: (artists: typeof data) => void
}

const Artist = ({ artist, artists, setArtists }: ArtistProps) => {
  const dragControls = useDragControls()

  const handleDelete = (artistId: string, artworkId: string) => {
    setArtists(
      artists.map(a => {
        if (a.id === artistId) {
          return {
            ...a,
            artworks: a.artworks.filter(artwork => artwork.id !== artworkId)
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
          return {
            ...a,
            artworks: arrayMoveImmutable(a.artworks, oldIndex, newIndex)
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
        <p className='text-2xl font-medium'>{artist.name}</p>
      </div>

      <SortableList onSortEnd={handleSortEnd} className='grid grid-cols-2 gap-4 ml-10' draggedItemClassName='!bg-muted !cursor-grabbing'>
        {artist.artworks.map(artwork => (
          <SortableItem key={artwork.id}>
            <div key={artwork.id} className='p-4 rounded-lg border bg-white flex items-center cursor-grab'>
              <div className='flex items-center gap-4 flex-1 pointer-events-none'>
                <button>
                  <Menu size={24} />
                </button>
                <div className='flex items-center gap-4'>
                  <img src={artwork.image} alt='' className='rounded aspect-square object-center object-cover' />
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

      <ArtistsDialog />
    </Reorder.Item>
  )
}

const data = [
  {
    id: '0',
    name: 'Artist Name 0',
    artworks: [
      {
        id: '0',
        name: 'Artwork Name',
        image: 'https://placehold.co/52x52'
      },
      {
        id: '1',
        name: 'Artwork Name',
        image: 'https://placehold.co/52x52'
      },
      {
        id: '2',
        name: 'Artwork Name',
        image: 'https://placehold.co/52x52'
      }
    ]
  },
  {
    id: '1',
    name: 'Artist Name 1',
    artworks: [
      {
        id: '0',
        name: 'Artwork Name',
        image: 'https://placehold.co/52x52'
      },
      {
        id: '1',
        name: 'Artwork Name',
        image: 'https://placehold.co/52x52'
      },
      {
        id: '2',
        name: 'Artwork Name',
        image: 'https://placehold.co/52x52'
      }
    ]
  }
]
