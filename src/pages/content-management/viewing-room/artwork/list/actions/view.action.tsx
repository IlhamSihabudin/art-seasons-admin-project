import { Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ArtworkRalation } from '@/types/API'

export const ViewAction = ({ data }: { data: ArtworkRalation }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>{data.artwork.name}</h1>
        <div className='text-sm'>
          <p className='font-medium'>Tag</p>
          <p className='py-4 px-3'>{data.artwork.tags.join(', ')}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Price</p>
          <p className='py-4 px-3'>{data.artwork.price}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Current Stock</p>
          <p className='py-4 px-3'>
            {data.artwork.current_stock}
          </p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Picture</p>
          <img src={data.artwork.img} alt={data.artwork.name} className='mt-2.5' />
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Visibility</p>
          <p className='py-4 px-3'>{data.artwork.is_visible == 1 ? "Visible" : "Hidden"}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Long Description</p>
          <div className='space-y-2.5 py-4 px-3'>
            <p>
              {data.artwork.desc}
            </p>
          </div>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Long Description</p>
          <div className='space-y-2.5 py-4 px-3'>
            <p>
              {data.artwork.desc}
            </p>
          </div>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Artist</p>
          <div className='space-y-2.5 py-4 px-3'>
            {data.artwork.has_artists.map((artist) => (
              <p key={artist.id}>
                {artist.artist.fullname}
              </p>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
