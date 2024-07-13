import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/radio-group'
import { API } from '@/lib/API'
import { News, ResponseApi } from '@/types/API'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { useRef, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import InputImage from '@/components/ui/input-image'

export const NewsCreatePage = () => {
  const { toast } = useToast()

  const [photo, setPhoto] = useState<File>()
  const [isVisible, setIsVisible] = useState<srting>('1')
  const [catagory, setCatagory] = useState<srting>('external')
  const headline = useRef<HTMLInputElement>('')
  const date = useRef<HTMLInputElement>('')
  const author = useRef<HTMLInputElement>('')
  const website = useRef<HTMLInputElement>('')
  const article = useRef<HTMLTextAreaElement>('')

  const navigateTo = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formInput: News = {
      headline: headline.current.value,
      date: date.current.value,
      category: catagory,
      author: author.current.value,
      website: website.current.value,
      article: article.current.value,
      img: photo,
      is_visible: isVisible
    }

    try {
      await API.post<News, ResponseApi<News>>(`/news`, formInput, {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data'
      })
      await toast({
        title: `Success!`,
        description: 'Created data'
      })
      navigateTo('/content-management/news')
    } catch (error) {
      console.log('Error updating artist:', error.message)
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: error.response.data.message
      })
    }
  }

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Add New News</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' encType='multipart/form-data' onSubmit={handleSubmit}>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='News Headline' required placeholder='Enter headline' ref={headline} />
          <Input type='date' label='Date' required placeholder='Enter date' ref={date} />
          <fieldset>
            <Label className='block mb-2.5'>
              Catagory <span className='text-destructive'>*</span>
            </Label>
            <RadioGroup className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='radio'
                  value='internal'
                  id='internal'
                  checked={catagory == 'internal'}
                  required
                  name='catagory'
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setCatagory(e.target.value)}
                />
                <Label htmlFor='internal' className='font-normal'>
                  Internal
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  type='radio'
                  value='external'
                  id='external'
                  checked={catagory == 'external'}
                  name='catagory'
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setCatagory(e.target.value)}
                />
                <Label htmlFor='external' className='font-normal'>
                  External
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
          <Input name='author' placeholder="Enter author's name" required label='Author' ref={author} />
          <fieldset>
            {/* <Input label='Featured Image' type='file' required onChange={(e: React.FormEvent<HTMLInputElement>) => setPhoto(e.target.files[0])} accept='.jpg,.jpeg,.png' /> */}
            <InputImage
              label='Photo'
              onChangeImage={file => {
                setPhoto(file)
              }}
            />
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Pixel size: 1440 x 480px (min)</li>
              <li>Aspect ratio: 27:9 (square)</li>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 2MB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
        </fieldset>

        <fieldset className='md:space-y-7 space-y-3'>
          <Input type='url' label='Website' placeholder='Insert link here (optional)' ref={website} />
          <fieldset>
            <Label className='block mb-2.5'>
              Visibility <span className='text-destructive'>*</span>
            </Label>
            <RadioGroup className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='radio'
                  value='1'
                  id='visible'
                  checked={isVisible == '1'}
                  required
                  name='isVisible'
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible(e.target.value)}
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
                  checked={isVisible == '0'}
                  name='isVisible'
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible(e.target.value)}
                />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
          <Textarea className='min-h-40' name='article' placeholder='Enter your article content' required label='Preview' ref={article} />
        </fieldset>

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
