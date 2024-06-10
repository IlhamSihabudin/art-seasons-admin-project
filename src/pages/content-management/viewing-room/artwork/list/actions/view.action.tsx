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
        <h1 className='text-3xl font-semibold'>{data?.name}</h1>
        <div className='text-sm'>
          <p className='font-medium'>Tag</p>
          <p className='py-4 px-3'>{data?.tags}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Artist</p>
          <div className='space-y-2.5 py-4 px-3'>
            {/* {data?.has_artists?.map((artist) => (
              <p key={artist.id}>
                {artist.artist.fullname}
              </p>
            ))} */}
            {data?.artists}
          </div>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Long Description</p>
          <div className='space-y-2.5 py-4 px-3'>
            <p>
              {data?.desc}
            </p>
          </div>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Visibility</p>
          <p className='py-4 px-3'>{data?.is_visible == 1 ? "Visible" : "Hidden"}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
