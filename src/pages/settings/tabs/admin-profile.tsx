import { Trash } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const AdminProfileTab = () => {
  return (
    <section>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Admin Name' placeholder='E.g Super Admin' />
          <fieldset>
            <Label className='block mb-2.5'>
              Featured Image <span className='text-destructive'>*</span>
            </Label>

            <div className='bg-white py-3 px-4 rounded border flex items-center justify-between flex-1 mb-2.5'>
              <div className='flex items-center gap-4'>
                <img src='https://placehold.co/52x52' alt='' className='w-14 h-14 aspect-square object-cover object-center rounded' />
                <p className='text-sm'>Image Name 1</p>
              </div>
              <button type='button'>
                <Trash size={18} />
              </button>
            </div>
            <Button variant='outline' type='button' className='mb-2.5'>
              Replace Image
            </Button>
            <ul className='text-xs space-y-1'>
              <li>Pixel size: 400 x 400px (min)</li>
              <li>Aspect ratio: 1:1 (square)</li>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 500KB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
        </fieldset>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Email Address' placeholder='Enter email' />
          <Input label='Phone Number' placeholder='Enter contact info' />
        </fieldset>
        <div className='col-span-2 flex items-center justify-end'>
          <Button size='lg' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </section>
  )
}
