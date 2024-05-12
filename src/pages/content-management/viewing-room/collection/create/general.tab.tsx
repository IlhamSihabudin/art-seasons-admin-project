import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { useRef, useState } from 'react'
import { CollectionBodyRequest } from '.'

export const GeneralTab = ({ callback, formInput }: { callback: (value: boolean) => void, formInput: (value: CollectionBodyRequest) => void }) => {
  const { toast } = useToast();

  const [img, setImg] = useState<File>();
  const [isVisible, setIsVisible] = useState("");
  const fullname = useRef<HTMLInputElement>(null)
  const orga = useRef<HTMLInputElement>(null)
  const loc = useRef<HTMLInputElement>(null)
  const descrip = useRef<HTMLTextAreaElement>(null)
  const tag = useRef<HTMLInputElement>(null)

  const handleNextTab = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = fullname.current.value;
    const organizer = orga.current.value;
    const location = loc.current.value;
    const desc = descrip.current.value;
    const tags = tag.current.value;

    // verify data
    if (!name || !organizer || !location || !desc || !isVisible || !tags || !img ) {
      return toast({
        variant: "destructive",
        title: `Please fill out all field`,
      })
    }

    formInput({name, tags, organizer, location, desc, img, is_visible: isVisible})

    callback(true);
  };

  return (
    <section>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Exhibition Name' required placeholder='Enter exhibition name' ref={fullname} />
          <Input label='Tags' placeholder='Enter tags' required ref={tag}  />
          <Input label='Organizer' placeholder='Enter artist or organisation name' required ref={orga}  />
          <Input label='Location' placeholder='Enter Location' required ref={loc}  />
          <fieldset>
            <Input label='Featured Image' type='file' required onChange={(e: React.FormEvent<HTMLInputElement>) => setImg(e.target.files[0])} accept=".jpg,.pdf,.png" />
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Pixel size: 1440 x 480px (min)</li>
              <li>Aspect ratio: 27:9 (square)</li>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 2MB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>

          <fieldset>
            <Label className='block mb-2.5'>Visibility</Label>
            <RadioGroup className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <input type="radio" value='1' id='visible' required name="isVisible" onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible(e.target.value)}/>
                <Label htmlFor='visible' className='font-normal'>
                  Visible
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <input type="radio" value='0' id='hidden' name="isVisible" onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible(e.target.value)} />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>
        <Textarea label='Description' required placeholder='Enter your comprehensive description on the artist' wrapperClassName='flex flex-col' className='flex-1' ref={descrip} />
        <div className='col-span-2 flex items-center justify-end'>
          <Button size='lg' type='submit' onClick={handleNextTab}>
            Next
          </Button>
        </div>
      </form>
    </section>
  )
}
