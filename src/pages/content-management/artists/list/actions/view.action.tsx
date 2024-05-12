import { Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Artist } from '@/types/API';

export const ViewAction = ({ data }: { data: Artist }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>{data?.fullname}</h1>
        <div className='text-sm'>
          <p className='font-medium'>Tag</p>
          <p className='py-4 px-3'>{data?.tags}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Birth Year</p>
          <p className='py-4 px-3'>{data?.birth_year}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Short Description</p>
          <p className='py-4 px-3'>
            {data?.short_desc}
          </p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Profile Picture</p>
          <img src={data?.profile_picture} alt={data?.short_desc} className='mt-2.5' />
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Attach Document</p>
          <p className='py-4 px-3'><a href={data?.attach_doc} target='_blank'>{data?.fullname.toLowerCase().replace(/\s+/g, '_')}.{data?.attach_doc.split('.').pop()}</a></p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Visibility</p>
          <p className='py-4 px-3'>{data?.is_visible.toString() === "1" ? "Visible" : "hidden"}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Long Description</p>
          <div className='space-y-2.5 py-4 px-3'>
            <p>
              {data?.long_desc}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
