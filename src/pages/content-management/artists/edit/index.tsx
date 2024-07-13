import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '@/lib/API'
import { Artist, ResponseApi } from '@/types/API'
import { useToast } from '@/components/ui/use-toast'
import { AxiosError } from 'axios'
import { Link } from 'react-router-dom'
import InputAttachment from '@/components/ui/input-attachment'
import InputImage from '@/components/ui/input-image'

export const ArtistsEditPage = () => {
  const { toast } = useToast()
  const [data, setData] = useState<Artist>()

  const [profile, setProfile] = useState<File | undefined>()
  const [doc, setDoc] = useState<File | undefined>()
  const [isVisible, setIsVisible] = useState('')
  const fullname = useRef<HTMLInputElement>(null)
  const tags = useRef<HTMLInputElement>(null)
  const birth_year = useRef<HTMLInputElement>(null)
  const short_desc = useRef<HTMLTextAreaElement>(null)
  const long_desc = useRef<HTMLTextAreaElement>(null)

  const params = useParams()
  const navigateTo = useNavigate()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    ;(async () => {
      try {
        const response = await API.get<ResponseApi<Artist>>(
          `/artists/${Number(params.id)}`,
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
      fullname: fullname.current?.value,
      tags: tags.current?.value,
      birth_year: Number(birth_year.current?.value),
      short_desc: short_desc.current?.value,
      attach_doc: doc,
      is_visible: isVisible,
      long_desc: long_desc.current?.value,
      profile_picture: profile
    }

    try {
      await API.post<typeof formInput, ResponseApi<Artist>>(`/artists/${Number(params.id)}`, formInput, {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
      })
      await toast({
        title: `Success!`,
        description: 'Updated the data'
      })
      navigateTo('/content-management/artists')
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
      <h1 className='font-bold text-3xl'>Edit Artists</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' encType='multipart/form-data' onSubmit={handleSubmit}>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Full Name' required placeholder='Enter full name' defaultValue={data?.fullname} ref={fullname} />
          <Input label='Tag' required placeholder='Enter tag name' defaultValue={data?.tags} ref={tags} />
          <Input
            label='Birth Year'
            type='number'
            min={1900}
            max={new Date().getFullYear()}
            placeholder='Enter birth year'
            required
            defaultValue={data?.birth_year}
            ref={birth_year}
          />
          <Textarea
            label='Short Description'
            required
            placeholder='Enter short description that will appear on the main top banner of the artist page'
            defaultValue={data?.short_desc}
            ref={short_desc}
          />
          <fieldset>
            {/* <Label>
              Profile Picture <span className='text-destructive'>*</span>
            </Label>
            <div className='flex mb-2 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
              <img className='max-h-36 aspect-square object-center object-cover rounded-l-lg' src={data?.profile_picture} alt={data?.fullname} />
            </div>
            <Input
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
              initialImage={data?.profile_picture}
              onChangeImage={file => {
                setProfile(file)
              }}
            />
            <ul className='text-xs space-y-1 mt-2'>
              <li>Pixel size: 400 x 400px (min)</li>
              <li>Aspect ratio: 1:1 (square)</li>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 500KB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
          <fieldset>
            {/* <Label>
              Attach Document <span className='text-destructive'>*</span>
            </Label>
            <div className='flex mb-2 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
              <div className='flex flex-col justify-between p-4 leading-normal'>
                <Link to={data?.attach_doc}>attach_dukument.pdf</Link>
              </div>
            </div>
            <Input
              accept='.pdf'
              type='file'
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
                <Input
                  type='radio'
                  value='1'
                  id='visible'
                  required
                  name='isVisible'
                  onChange={e => setIsVisible(e.target.value)}
                  defaultChecked={data && data.is_visible.toString() == '1'}
                />
                <Label htmlFor='visible' className='font-normal'>
                  Visible
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Input
                  type='radio'
                  value='0'
                  id='hidden'
                  name='isVisible'
                  onChange={e => setIsVisible(e.target.value)}
                  defaultChecked={data && data.is_visible.toString() == '0'}
                />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>
        <Textarea
          label='Long description'
          required
          placeholder='Enter your comprehensive description on the artist'
          className='h-full'
          defaultValue={data?.long_desc}
          ref={long_desc}
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
