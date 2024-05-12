import { Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { News } from '@/types/API'

export const ViewAction = ({ data }: { data: News }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>{data.headline}</h1>
        <div className='text-sm'>
          <p className='font-medium'>Author</p>
          <p className='py-4 px-3'>{data.author}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Date</p>
          <p className='py-4 px-3'>{data.date}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Catagory</p>
          <p className='py-4 px-3'>
            {data.category}
          </p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Picture</p>
          <img src={data.img} alt={data.headline} className='mt-2.5' />
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Visibility</p>
          <p className='py-4 px-3'>{data.is_visible === 1 ? "Visible" : "Hidden"}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Website</p>
          <p className='py-4 px-3'>{data.website}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Article</p>
          <p className='py-4 px-3'>{data.article}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
