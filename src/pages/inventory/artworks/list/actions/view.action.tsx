import { Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export const ViewAction = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent className='max-w-6xl'>
        <h1 className='text-3xl font-semibold'>Artwork Name</h1>
        <div className='text-sm'>
          <p className='font-medium'>Description</p>
          <p className='py-4 px-3'>
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim
            cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut
            officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id
            nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco
            ut ea consectetur et est culpa et culpa duis.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
