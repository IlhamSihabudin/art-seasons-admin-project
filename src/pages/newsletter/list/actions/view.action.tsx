import { Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Newsletter } from '@/types/API';
import { formatDate } from '@/pages/content-management/exhibitions/list/columns';

export const ViewAction = ({ data }: { data: Newsletter }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>{data?.title}</h1>
        <div className='text-sm'>
          <p className='font-medium'>Status</p>
          <p className='py-4 px-3'>{data?.is_for_all == 1 ? "For All" : "Not For All"}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Created On</p>
          <p className='py-4 px-3'>{formatDate(data.created_at)}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Customer</p>
          <p className='py-4 px-3'>
            {data?.customers}
          </p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Picture</p>
          <img src={data?.img} alt={data?.title} className='mt-2.5' />
        </div>
      </DialogContent>
    </Dialog>
  )
}
