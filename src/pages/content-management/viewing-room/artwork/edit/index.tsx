import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export const ViewingRoomEditPage = () => {
  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Edit Artists</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Full Name' required placeholder='Enter full name' />
          <Input label='Tag' required placeholder='Enter tag name' />
          <Input label='Birth Year' placeholder='Enter birth year' />
          <Textarea label='Short Description' placeholder='Enter short description that will appear on the main top banner of the artist page' />
          <fieldset>
            <Input label='Profile Picture' type='file' required />
            <ul className='text-xs space-y-1 mt-2'>
              <li>Pixel size: 400 x 400px (min)</li>
              <li>Aspect ratio: 1:1 (square)</li>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 500KB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
          <fieldset>
            <Input label='Attach Document' type='file' required />
            <ul className='text-xs space-y-1 mt-2'>
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
        <Textarea label='Long description' required placeholder='Enter your comprehensive description on the artist' className='h-full' />
        <div className='col-span-2 flex items-center justify-end'>
          <Button size='lg' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </section>
  )
}
