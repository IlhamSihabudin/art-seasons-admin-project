import { Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { InventoryArtwork } from '@/types/API'
import { Link } from 'react-router-dom'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { CreateTagAction } from '@/components/ui/create-tag-action'
import Chip from '@/components/ui/chip'

export const TagsAction = ({ dataSelected }: { dataSelected: InventoryArtwork[] }) => {
  const [tags, setTags] = useState<string[]>([])

  const handleSubmit = () => {
    console.log('form data', {
      'ids' : dataSelected.map(value => value.id),
      'tags': tags
    })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className={`${buttonVariants()} gap-2`}>
          <Plus size={16} />
          Tags
        </div>
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>Tag Artwork(s)</h1>
        <div className='pt-3'>
          <div>
            <p>Selected:</p>
            <div className='mt-2 ml-3 space-y-1'>
              {dataSelected.map(value => {
                return (
                  <div className='ml-4'>
                    <p className='text-sm'>{value.name}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className='mt-6'>
            <p className='text-sm'>Add Tag(s) To Selected Artwork(s)</p>
            <div className='flex flex-wrap gap-2.5 mt-3'>
              {tags.length == 0 ? (
                <Input className='min-w-64' placeholder='Enter tag' readOnly />
              ) : (
                tags.map(tag => {
                  return (
                    <Chip text={tag} />
                  )
                })
              )}
              <CreateTagAction
                onSubmit={(tag: string) => {
                  setTags([
                    ...tags,
                    tag
                  ])
                }}
              />
            </div>
          </div>

          <div className='col-span-2 flex items-center justify-end mt-6'>
            <Button className='text-end' size='lg' type='submit' onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const GeneralTab = ({ data }: { data: InventoryArtwork }) => {
  return (
    <>
      <div className='text-sm'>
        <p className='font-medium'>Tag</p>
        <p className='py-4 px-3'>{data.tags.join(', ')}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Price</p>
        <p className='py-4 px-3'>{data.price}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Current Stock</p>
        <p className='py-4 px-3'>{data.current_stock}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Picture</p>
        <img src={data.img} alt={data.name} className='mt-2.5' />
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Visibility</p>
        <p className='py-4 px-3'>{data.is_visible == 1 ? 'Visible' : 'Hidden'}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Long Description</p>
        <div className='space-y-2.5 py-4 px-3'>
          <p>{data.desc}</p>
        </div>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Artist</p>
        <div className='space-y-2.5 py-4 px-3'>
          {data.has_artists.map(artist => (
            <p key={artist.id}>{artist.artist.fullname}</p>
          ))}
        </div>
      </div>
    </>
  )
}

const ArtistsTab = ({ data }: { data: InventoryArtwork }) => {
  return (
    <div className='space-y-10'>
      {!data ? (
        <Loader2 size={40} className='animate-spin mx-auto m-10' />
      ) : (
        data.has_artists.map(item => (
          <div key={item.id}>
            <p className='text-xl font-medium mb-3'>{item.artist.fullname}</p>
            <div className='grid grid-cols-2 gap-4'>
              <div className='py-2.5 px-2 rounded border flex items-center gap-4'>
                <img src={item.artist.profile_picture} alt={item.artist.short_desc} className='w-14 h-14 aspect-square object-cover object-center rounded' />
              </div>
            </div>
            <div className='text-sm'>
              <p className='font-medium'>Artist's external website</p>
              <Link className='py-4 px-3 underline block' to={item.link}>
                {item.link}
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
