import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Event, ResponseApi } from '@/types/API'
import { API } from '@/lib/API'
import { AxiosError } from 'axios'
import InputImage from '@/components/ui/input-image'

export const EventsCreatePage = () => {
  const { toast } = useToast()

  const [profile, setProfile] = useState<File | undefined>()
  const [doc, setDoc] = useState<File | undefined>()
  const [isVisible, setIsVisible] = useState<string>('1')
  const fullname = useRef<HTMLInputElement>(null)
  const website = useRef<HTMLInputElement>(null)
  const start_date = useRef<HTMLInputElement>(null)
  const end_date = useRef<HTMLInputElement>(null)
  const desc = useRef<HTMLTextAreaElement>(null)
  const location = useRef<HTMLInputElement>(null)
  const organized = useRef<HTMLInputElement>(null)

  const navigateTo = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formInput = {
      name: fullname.current?.value,
      start_date: start_date.current?.value,
      end_date: end_date.current?.value,
      website: website.current?.value,
      attach_doc: doc,
      is_visible: isVisible,
      location: location.current?.value,
      img: profile,
      desc: desc.current?.value,
      organizer: organized.current?.value
    }

    try {
      await API.post<typeof formInput, ResponseApi<Event>>(`/events`, formInput, {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
      })
      await toast({
        title: `Success!`,
        description: 'Created data'
      })
      navigateTo('/content-management/events')
    } catch (error) {
      const err = error as AxiosError
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: (err.response?.data as AxiosError).message
      })
    }
  }

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Add New Event</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' encType='multipart/form-data' onSubmit={handleSubmit}>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Full Name' required placeholder='Enter full name' ref={fullname} />
          <fieldset className='grid grid-cols-2 gap-5'>
            <Input label='Start Date' type='date' required placeholder='Enter start date' ref={start_date} />
            <Input label='End Date' type='date' placeholder='Enter end date' ref={end_date} />
          </fieldset>
          <Input label='Organizer' placeholder='Enter organized' ref={organized} />
          <Input label='Location' placeholder='Enter location' ref={location} />
          <Input label='Website' placeholder='Enter website' ref={website} />
          <fieldset>
            {/* <Input
              label='Featured Picture'
              type='file'
              accept='.jpg,.jpeg,.png'
              required
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const files = (e.target as HTMLInputElement).files
                if (files !== null) {
                  setProfile(files[0])
                }
              }}
            /> */}
            <InputImage
                label='Featured Picture'
                onChangeImage={file => {
                  setProfile(file)
                }}
              />
            <ul className='text-xs space-y-1 mt-2'>
              <li>Pixel size: 400 x 300px (min)</li>
              <li>Aspect ratio: 4:3 (square)</li>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 500KB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
          <fieldset>
            <Input
              label='Attach Document'
              type='file'
              accept='.pdf'
              required
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const files = (e.target as HTMLInputElement).files
                if (files !== null) {
                  setDoc(files[0])
                }
              }}
            />
            <ul className='text-xs space-y-1 mt-2'>
              <li>Format: pdf</li>
              <li>File size: ?MB (max)</li>
            </ul>
          </fieldset>

          <fieldset>
            <Label className='block mb-2.5'>Visibility</Label>
            <RadioGroup className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='radio'
                  value='1'
                  id='visible'
                  name='isVisible'
                  checked={isVisible == '1'}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible((e.target as HTMLInputElement).value)}
                />
                <Label htmlFor='visible' className='font-normal'>
                  Visible
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  type='radio'
                  value='0'
                  id='hidden'
                  name='isVisible'
                  checked={isVisible == '2'}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible((e.target as HTMLInputElement).value)}
                />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>
        <Textarea label='Description' required placeholder='Enter your comprehensive description' wrapperClassName='h-full' className='h-full' ref={desc} />
        <div className='col-span-2 gap-4 flex items-center justify-end'>
          <Button
            variant={'outline'}
            size='lg'
            type='button'
            onClick={() => {
              navigateTo(-1)
            }}
          >
            Back
          </Button>
          <Button size='lg' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </section>
  )
}
