import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import { API } from '@/lib/API'
import { Artist, ResponseApi } from '@/types/API'
import { useToast } from '@/components/ui/use-toast'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

export const ArtistsCreatePage = () => {
  const { toast } = useToast()

  const [profile, setProfile] = useState<File | undefined>()
  const [doc, setDoc] = useState<File | undefined>()
  const [isVisible, setIsVisible] = useState('')
  const fullname = useRef<HTMLInputElement>(null)
  const tags = useRef<HTMLInputElement>(null)
  const birth_year = useRef<HTMLInputElement>(null)
  const short_desc = useRef<HTMLTextAreaElement>(null)
  const long_desc = useRef<HTMLTextAreaElement>(null)

  const navigateTo = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formInput = {
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
      await API.post<typeof formInput, ResponseApi<Artist>>(`/artists`, formInput, {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
      })
      await toast({
        title: `Success!`,
        description: 'Created data'
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
      <h1 className='font-bold text-3xl'>Add New Artists</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' encType='multipart/form-data' onSubmit={handleSubmit}>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Full Name' required placeholder='Enter full name' ref={fullname} />
          <Input label='Tag' required placeholder='Enter tag name' ref={tags} />
          <Input label='Birth Year' placeholder='Enter birth year' ref={birth_year} />
          <Textarea label='Short Description' required placeholder='Enter short description that will appear on the main top banner of the artist page' ref={short_desc} />
          <fieldset>
            <Input
              label='Profile Picture'
              type='file'
              required
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const files = (e.target as HTMLInputElement).files
                if (files !== null) {
                  setProfile(files[0])
                }
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
            <Input
              label='Attach Document'
              type='file'
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
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible((e.target as HTMLInputElement).value)}
                />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>
        <Textarea label='Long description' required placeholder='Enter your comprehensive description on the artist' className='h-full' ref={long_desc} />
        <div className='col-span-2 gap-4 flex items-center justify-end'>
          <Button
            variant={'outline'}
            size='lg'
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
