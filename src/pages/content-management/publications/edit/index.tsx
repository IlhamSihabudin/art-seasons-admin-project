import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export const PublicationsEditPage = () => {
  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Edit Publication</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='News Headline' required placeholder='Enter full name' />
          <Input label='Date' required type='date' placeholder='Select date' />
          <fieldset>
            <Label className='block mb-2.5'>
              Category <span className='text-destructive'>*</span>
            </Label>
            <RadioGroup defaultValue='internal' className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='internal' id='internal' />
                <Label htmlFor='internal' className='font-normal'>
                  Internal
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='external' id='external' />
                <Label htmlFor='external' className='font-normal'>
                  External
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
          <Input label='Author' placeholder="Enter author' s name" />
          <fieldset>
            <Input label='Featured Image' type='file' required />
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Pixel size: 400 x 400px (min)</li>
              <li>Aspect ratio: 1:1 (square)</li>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 500KB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
          <Input label='Website' placeholder='Insert link here' />
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
        <Textarea label='Article' required placeholder='Enter your article content' wrapperClassName='h-full' className='h-full' />
        <div className='col-span-2 flex items-center justify-end'>
          <Button size='lg' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </section>
  )
}
