import { Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Publication } from '@/types/API'

export const ViewAction = ({ data }: { data: Publication }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent className='max-w-6xl'>
        <h1 className='text-3xl font-semibold'>{data.name}</h1>
        <div className='text-sm'>
          <p className='font-medium'>Description</p>
          <p className='py-4 px-3'>
            {data.desc}
          </p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Author</p>
          <p className='py-4 px-3'>
            {data.author}
          </p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Price</p>
          <p className='py-4 px-3'>
            {data.price}
          </p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Curret Stock</p>
          <p className='py-4 px-3'>
            {data.current_stock}
          </p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Visiblity</p>
          <p className='py-4 px-3'>
            {data.is_visible == 1 ? "Visible" : "Hidden"}
          </p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Image</p>
          <img src={data.img} alt={data.name} className='mt-2.5' />
        </div>
      </DialogContent>
    </Dialog>
  )
}
