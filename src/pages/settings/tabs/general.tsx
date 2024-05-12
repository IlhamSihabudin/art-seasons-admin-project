import { Trash, Plus } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export const GeneralTab = () => {
  return (
    <section>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Business Name' placeholder='Enter headline' />
          <fieldset>
            <Label className='block mb-2.5'>Logo</Label>
            <div className='bg-white py-3 px-4 rounded border flex items-center justify-between mb-2.5'>
              <div className='flex items-center gap-4'>
                <img src='https://placehold.co/52x52' alt='' className='w-14 h-14 aspect-square object-cover object-center rounded' />
                <p className='text-sm'>Image Name 1</p>
              </div>
              <button type='button'>
                <Trash size={18} />
              </button>
            </div>
            <Button variant='outline' type='button'>
              Replace Image
            </Button>
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 500KB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
          <fieldset>
            <Label className='block mb-2.5'>
              Favicon Image
              <span className='text-destructive'> *</span>
            </Label>
            <div className='bg-white py-3 px-4 rounded border flex items-center justify-between mb-2.5'>
              <div className='flex items-center gap-4'>
                <img src='https://placehold.co/52x52' alt='' className='w-14 h-14 aspect-square object-cover object-center rounded' />
                <p className='text-sm'>Image Name 1</p>
              </div>
              <button type='button'>
                <Trash size={18} />
              </button>
            </div>
            <Button variant='outline' type='button'>
              Replace Image
            </Button>
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Dimensions: 16 x 16 px</li>
              <li>Format: jpg, pdf, png</li>
            </ul>
          </fieldset>
        </fieldset>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Address' placeholder='Enter address' />
          <Input label='Phone number' placeholder='Enter contact info' />
          <Input label='Website' placeholder='www.artseasons.sg' />
          <Input label='Email address' placeholder='Enter contact info' />
          <fieldset className='space-y-2.5'>
            <Input label='Social Media Link' placeholder='Enter link (facebook/instagram/etc)' />
            <button className='flex items-center gap-2 text-sm' type='button'>
              <div className='w-4 h-4 grid place-items-center bg-primary rounded-full'>
                <Plus size={14} className='text-white' />
              </div>
              Add Link
            </button>
          </fieldset>
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
