import { Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { User } from '@/types/API';

export const ViewAction = ({ data }: { data: User }) => {
  
  function formatDate(dateString: string) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
      <h1 className='text-3xl font-semibold'>{data?.name}</h1>
        <div className='text-sm'>
          <p className='font-medium'>Email</p>
          <p className='py-4 px-3'>{data?.email}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Email Verified</p>
          <p className='py-4 px-3'>{data?.email_verified_at !== null ? "Verified" : "Not Verified"}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Phone Number</p>
          <p className='py-4 px-3'>{data?.phone_number}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Role</p>
          <p className='py-4 px-3'>{data?.role_name}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Created At</p>
          <p className='py-4 px-3'>{formatDate(data?.created_at)}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
