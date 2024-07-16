import { useState, useRef } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { Publication, ResponseApi } from '@/types/API'
import { API } from '@/lib/API'
import InputImage from '@/components/ui/input-image'

export const InventoryPublicationCreatePage = () => {
  const { toast } = useToast()

  const [img, setImg] = useState<File | undefined>()
  const [isVisible, setIsVisible] = useState(1)
  const fullname = useRef('')
  const descrip = useRef('')
  const author = useRef('')
  const pric = useRef('')
  const stock = useRef('')

  const navigateTo = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formInput: Publication = {
      img,
      is_visible: isVisible,
      name: fullname.current.value,
      desc: descrip.current.value,
      author: author.current.value,
      price: pric.current.value,
      current_stock: stock.current.value
    }

    try {
      await API.post<Publication, ResponseApi<Publication>>(`/inventory/publications`, formInput, {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data'
      })
      await toast({
        title: `Success!`,
        description: 'Created data'
      })
      navigateTo('/inventory')
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
      <h1 className='font-bold text-3xl'>Add New Publication</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' encType='multipart/form-data' onSubmit={handleSubmit}>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Name' required placeholder='Enter full name' ref={fullname} />
          <Textarea label='Description' required placeholder='Enter your comprehensive description' className='h-full' ref={descrip} />
          <Input label='Author/Publisher' required placeholder='Enter Author' ref={author} />
          <Input label='Price' required placeholder='Enter Price' type='number' ref={pric} />
          <Input label='Curret Stock' required placeholder='Enter Curret Stock' type='number' ref={stock} />

          <fieldset>
            <Label className='block mb-2.5'>Visibility</Label>
            <RadioGroup className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='radio'
                  required
                  value='1'
                  id='visible'
                  name='isVisible'
                  checked={isVisible == 1}
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
                  name='isVisible'
                  checked={isVisible == 0}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible(e.target.value)}
                />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>
        <fieldset>
          {/* <Input label='Publication Image' type='file' required onChange={(e: React.FormEvent<HTMLInputElement>) => setImg(e.target.files[0])} /> */}
          <InputImage
            label='Publication Image'
            onChangeImage={file => {
              setImg(file)
            }}
          />
          <ul className='text-xs space-y-1 mt-2'>
            <li>Pixel size: 400 x 400px (min)</li>
            <li>Aspect ratio: 1:1 (square)</li>
            <li>Format: jpg, pdf, png</li>
            <li>File size: 2MB (max)</li>
            <li>Resolution: 72ppi (min)</li>
          </ul>
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
