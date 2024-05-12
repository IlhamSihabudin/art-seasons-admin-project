import { Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Event } from '@/types/API'
import { formatDate } from '@/pages/content-management/exhibitions/list/columns'
import { Link } from 'react-router-dom'

export const ViewAction = ({ data }: { data: Event}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>{data.name}</h1>
        <div className='text-sm'>
          <p className='font-medium'>Website</p>
          <Link className='py-4 px-3 underline block' target='_blank' to={data.website}>
            {data.website}
          </Link>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Date</p>
          <p className='py-4 px-3'>{formatDate(data.start_date)} - {formatDate(data.end_date)}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Organizer</p>
          <p className='py-4 px-3'>{data.organizer}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Location</p>
          <p className='py-4 px-3'>{data.location}</p>
        </div>
        <div className='text-sm mb-2.5'>
          <p className='font-medium'>Featured Image</p>
          <img src={data.img} alt={data.desc} className='mt-2.5' />
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Attach Document</p>
          <Link className='py-4 px-3 underline block' target='_blank' to={data.attach_doc}>
            {data.name}.pdf
          </Link>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Visibility</p>
          <p className='py-4 px-3'>{data.is_visible === 1 ? "Visible" : "Hidden"}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Long Description</p>
          <div className='space-y-2.5 py-4 px-3'>
            <p>
              {data.desc}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
