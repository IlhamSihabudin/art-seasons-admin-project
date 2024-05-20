import { useState, useRef } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { API } from '@/lib/API'
import { Publication } from '@/types/API'
import InputImage from '@/components/ui/input-image'

export const PublicationsCreatePage = () => {
  const { toast } = useToast()

  const [img, setImg] = useState<File | undefined>()
  const [isVisible, setIsVisible] = useState('1')
  const name = useRef('')
  const desc = useRef('')
  const author = useRef('')
  const price = useRef('')
  const current_stock = useRef('')

  const navigateTo = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      !name ||
      !author ||
      !price ||
      !current_stock ||
      !img ||
      !isVisible ||
      !desc 
    ) {
      return toast({
        variant: 'destructive',
        title: `Please fill out all field`
      })
    }

    const formInput: Publication = {
      name: name.current.value,
      desc: desc.current.value,
      author: author.current.value,
      price: price.current.value,
      img,
      is_visible: isVisible,
      current_stock: current_stock.current.value
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
      navigateTo('/content-management/publications')
    } catch (error) {
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
          <Input label='Full Name' required placeholder='Enter full name' ref={name} />
          <Input label='Author' required placeholder='Enter Author' ref={author} />
          <Input type='text' pattern='\d*' maxLength='6' required label='Price' placeholder='Enter Price' ref={price} />
          <Input type='text' pattern='\d*' maxLength='6' required label='Current Stock' placeholder='Enter Current Stock' ref={current_stock} />
          <fieldset>
            {/* <Input
              accept='.jpeg,.png,.jpg,.gif,.svg'
              label='Publication Image'
              type='file'
              required
              onChange={(e: React.FormEvent<HTMLInputElement>) => setImg(e.target.files[0])}
            /> */}
            <InputImage label='Publication Image' onChangeImage={file => {
              setImg(file)
            }} />
            <ul className='text-xs space-y-1 mt-2'>
              <li>Format: jpeg, png, jpg, gif, svg</li>
              <li>File size: 2MB (max)</li>
            </ul>
          </fieldset>

          <fieldset>
            <Label className='block mb-2.5'>Visibility</Label>
            <RadioGroup className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <input type='radio' value='1' id='visible' required name='isVisible' checked={isVisible == '1'} onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible(e.target.value)} />
                <Label htmlFor='visible' className='font-normal'>
                  Visible
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <input type='radio' value='0' id='hidden' name='isVisible' checked={isVisible == '0'} onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible(e.target.value)} />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>
        <Textarea label='Description' required placeholder='Enter your comprehensive description' className='h-full' ref={desc} />
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
