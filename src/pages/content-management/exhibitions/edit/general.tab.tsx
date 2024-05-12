import { Trash } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export const GeneralTab = () => {
  return (
    <section>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Exhibition Name' required placeholder='Enter exhibition name' />
          <fieldset className='grid grid-cols-2 gap-5'>
            <Input label='Start Date' type='date' required placeholder='Enter start date' />
            <Input label='End Date' type='date' required placeholder='Enter end date' />
          </fieldset>
          <Input label='Organizer' placeholder='Enter artist or organisation name' required />
          <Textarea label='Short Description' placeholder='Enter short description that will appear on the main top banner of the artist page' />
          <fieldset>
            <Label className='block mb-2.5'>
              Featured Image <span className='text-destructive'>*</span>
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
              <li>Pixel size: 400 x 400px (min)</li>
              <li>Aspect ratio: 1:1 (square)</li>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 500KB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
          <fieldset>
            <Label className='block mb-2.5'>
              Attach Document <span className='text-destructive'>*</span>
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
              Replace PDF
            </Button>
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Format: pdf</li>
              <li>File size: ?MB (max)</li>
            </ul>
          </fieldset>

          <fieldset>
            <Label className='block mb-2.5'>Visibility</Label>
            <RadioGroup defaultValue='visible' className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='visible' id='visible' />
                <Label htmlFor='visible' className='font-normal'>
                  Visible
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='hidden' id='hidden' />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>
        <Textarea label='Long description' required placeholder='Enter your comprehensive description on the artist' wrapperClassName='flex flex-col' className='flex-1' />
        <div className='col-span-2 flex items-center justify-end'>
          <Button size='lg' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </section>
  )
}
