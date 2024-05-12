import { Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { InventoryArtwork } from '@/types/API';
import { formatDate } from '@/pages/content-management/exhibitions/list/columns';

export const ViewAction = ({ data }: { data: InventoryArtwork }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>{data?.name}</h1>
        <div className='text-sm'>
          <p className='font-medium'>Price</p>
          <p className='py-4 px-3'>{data.price}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Current Stock</p>
          <p className='py-4 px-3'>{data.current_stock}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Tags</p>
          <p className='py-4 px-3'>{data.tags}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Visibility</p>
          <p className='py-4 px-3'>{data.is_visible === 1 ? "Visible" : "Hidden"}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Description</p>
          <p className='py-4 px-3'>{data.desc}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Created At</p>
          <p className='py-4 px-3'>{formatDate(data.created_at)}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Picture</p>
          <img src={data?.img} alt={data?.title} className='mt-2.5' />
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Artists</p>
          {data.has_artists.map((artist) => (
              <p className='py-4 px-3' key={artist.id}>{artist.artist.fullname}</p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
