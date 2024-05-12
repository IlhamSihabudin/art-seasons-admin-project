import { Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Publication } from '@/types/API'

export const ViewAction = ({ data }: { data: Publication }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>{data?.name}</h1>
        <div className='text-sm'>
          <p className='font-medium'>Author</p>
          <p className='py-4 px-3'>{data?.author}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Price</p>
          <p className='py-4 px-3'>{data?.price}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Current Stock</p>
          <p className='py-4 px-3'>{data?.current_stock}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Picture</p>
          <img src={data?.img} alt={data?.desc} className='mt-2.5' />
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Visibility</p>
          <p className='py-4 px-3'>{data?.is_visible === "1" ? "Visible" : "hidden"}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Description</p>
          <div className='space-y-2.5 py-4 px-3'>
            <p>
              {data?.desc}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
