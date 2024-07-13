import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useRef, useState } from 'react'
import { Event, ResponseApi } from '@/types/API'
import { API } from '@/lib/API'
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import InputImage from '@/components/ui/input-image'
import InputAttachment from '@/components/ui/input-attachment'

export const EventsEditPage = () => {
  const { toast } = useToast()
  const [data, setData] = useState<Event>()

  const [profile, setProfile] = useState<File | undefined>()
  const [doc, setDoc] = useState<File | undefined>()
  const [isVisible, setIsVisible] = useState<string>('')
  const fullname = useRef<HTMLInputElement>(null)
  const website = useRef<HTMLInputElement>(null)
  const start_date = useRef<HTMLInputElement>(null)
  const end_date = useRef<HTMLInputElement>(null)
  const desc = useRef<HTMLTextAreaElement>(null)
  const location = useRef<HTMLInputElement>(null)
  const organized = useRef<HTMLInputElement>(null)

  const params = useParams()
  const navigateTo = useNavigate()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    ;(async () => {
      try {
        const response = await API.get<ResponseApi<Event>>(
          `/events/${Number(params.id)}`,
          {
            signal: controller.signal
          },
          {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        )
        isMounted && setData(response.data)
        setIsVisible(response.data.is_visible.toString())
      } catch (error) {
        let errorMessage = 'Error fetching data'
        if (error instanceof Error) {
          errorMessage = error.message
        }
        console.log('Error fetching data:', errorMessage)
      }
    })()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formInput = {
      _method: 'PUT',
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
      await API.post<typeof formInput, ResponseApi<Event>>(`/events/${Number(params.id)}`, formInput, {
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
      <h1 className='font-bold text-3xl'>Edit Event</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' encType='multipart/form-data' onSubmit={handleSubmit}>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Full Name' required placeholder='Enter full name' ref={fullname} defaultValue={data?.name} />
          <fieldset className='grid grid-cols-2 gap-5'>
            <Input label='Start Date' type='date' required placeholder='Enter start date' ref={start_date} defaultValue={data?.start_date} />
            <Input label='End Date' type='date' placeholder='Enter end date' ref={end_date} defaultValue={data?.end_date} />
          </fieldset>
          <Input label='Organizer' placeholder='Enter organized' ref={organized} defaultValue={data?.organizer} />
          <Input label='Location' placeholder='Enter location' ref={location} defaultValue={data?.location} />
          <Input label='Website' placeholder='Enter website' ref={website} defaultValue={data?.website} />
          <fieldset>
            {/* <Input
              label='Profile Picture'
              type='file'
              accept='.jpg,.jpeg,.png'
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const files = (e.target as HTMLInputElement).files
                if (files !== null) {
                  setProfile(files[0])
                }
              }}
            /> */}
            <InputImage
              required={false}
              label='Profile Picture'
              initialImage={data?.img}
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
            {/* <Input
              label='Attach Document'
              type='file'
              accept='.pdf'
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
            </ul> */}
            <InputAttachment
              required={false}
              label='Attach Document'
              initialFile={data?.attach_doc}
              onChangeFile={file => {
                setDoc(file)
              }}
            />
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
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible((e.target as HTMLInputElement).value)}
                  defaultChecked={data && data.is_visible == '1'}
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
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible((e.target as HTMLInputElement).value)}
                  defaultChecked={data && data.is_visible == '0'}
                />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>
        <Textarea
          label='Description'
          required
          placeholder='Enter your comprehensive description'
          wrapperClassName='h-full'
          className='h-full'
          ref={desc}
          defaultValue={data?.desc}
        />
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
