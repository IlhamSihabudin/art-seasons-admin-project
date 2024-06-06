import { Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CustomerNewsletter } from '@/types/API'

export const ViewAction = ({ data }: { data: CustomerNewsletter }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>{data?.name}</h1>
        <div className='text-sm'>
          <p className='font-medium'>Nama</p>
          <p className='py-4 px-3'>{data?.name}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Email</p>
          <p className='py-4 px-3'>{data?.email}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Phone Number</p>
          <p className='py-4 px-3'>{data?.phone_number}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Subscribe to Newsletter</p>
          <p className='py-4 px-3'>{data.is_subscribed == 1 ? "Subscribed" : "Not Subcribe"}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
