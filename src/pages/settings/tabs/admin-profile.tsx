import { Pencil } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useGet } from '@/hooks/useGet'
import { ResponseApi, UserSetting } from '@/types/API'
import { useRef, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { API } from '@/lib/API'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import InputImage from '@/components/ui/input-image'

interface Body {
  name?: string
  email?: string
  // password?: string
  // password_confirmation?: string
  phone_number?: string
}

export const AdminProfileTab = () => {
  const { data } = useGet<ResponseApi<UserSetting>>('admin-profile', '/settings/admin-profile')

  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: async (body: Body) => {
      await API.post<Body, ResponseApi<UserSetting>>('/settings/admin-profile', body, {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
      })
    },
    onSuccess: () => {
      client.invalidateQueries('admin-profile')
      toast({
        title: `Success!`,
        description: 'Updated the data'
      })
    },
    onError: error => {
      const err = error as AxiosError
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: (err.response?.data as AxiosError).message
      })
    }
  })

  const [emailEditable, setEmailEditable] = useState(false)
  const [passEditable, setPassEditable] = useState(false)

  const [image, setImage] = useState<File>(null)

  const name = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  // const password = useRef<HTMLInputElement>(null)
  // const pass_conf = useRef<HTMLInputElement>(null)
  const phone = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const body: Body = {
      name: name.current?.value,
      email: email.current?.value,
      // password: password.current?.value,
      // password_confirmation: pass_conf.current?.value,
      phone_number: phone.current?.value,
      img: image
    }

    mutate(body)
  }

  function handleChangeImage(e: React.FormEvent<HTMLInputElement>) {
    const files = (e.target as HTMLInputElement).files
    if (files !== null) {
      setImage(files[0])
    }
  }

  return (
    <section>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' onSubmit={handleSubmit}>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Admin Name' placeholder='E.g Super Admin' defaultValue={data?.data.name} ref={name} />
          {/* <Input
            type='tel'
            name='telphone'
            placeholder='081234567890'
            pattern='[0-9]{12}'
            maxLength='12'
            required
            label='Phone Number'
            ref={phone}
            defaultValue={data?.data.phone_number}
          /> */}
          <fieldset>
            <Label className='block mb-2.5'>
              Profile Image <span className='text-destructive'>*</span>
            </Label>

            <fieldset>
              {/* {image || (data?.data.img && <ProfileImage image={image ? image : data.data.img} />)} */}
              {/* <Input accept='.jpeg,.png,.jpg' type='file' className='hidden' id='image' onChange={handleChangeImage} /> */}
              <InputImage
                required={false}
                initialImage={data?.data.img}
                onChangeImage={file => {
                  // setFormData({ ...formData, img: file })
                  setImage(file)
                }}
              />
              {/* <Label
                className='inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:opacity-80 h-9 px-4 py-2 my-3'
                htmlFor='image'
              >
                {image || data?.data.img ? 'Replace Image' : 'Upload Image'}
              </Label> */}
              <ul className='text-xs space-y-1 mt-3'>
                <li>Format: jpg, pdf, png</li>
                <li>File size: 500KB (max)</li>
                <li>Resolution: 72ppi (min)</li>
              </ul>
            </fieldset>
          </fieldset>
        </fieldset>
        <fieldset className='md:space-y-7 space-y-3'>
          <div className='flex relative'>
            <Input
              type='email'
              disabled={!emailEditable}
              className='absolute w-[90%]'
              label='Email'
              required
              placeholder='Enter email'
              ref={email}
              autoComplete='off'
              defaultValue={data?.data.email}
            />
            <Pencil size={24} className='cursor-pointer mb-20 hover:opacity-90 transition-opacity absolute right-0 top-7' onClick={() => setEmailEditable(true)} />
          </div>
          <div className='pt-10 pb-10 flex relative '>
            <Input
              type='tel'
              name='telphone'
              placeholder='081234567890'
              pattern='[0-9]{12}'
              maxLength='12'
              required
              label='Phone Number'
              ref={phone}
              defaultValue={data?.data.phone_number}
              wrapperClassName='w-full'
            />
          </div>
          {/* <div className='pt-10 pb-10 flex relative '>
            <Input
              type='password'
              disabled={!passEditable}
              className='absolute w-[90%]'
              required
              label='Password'
              placeholder="Leave it blank if you don't want to change the password"
              ref={password}
              autoComplete='off'
            />
            <Pencil size={24} className='cursor-pointer mb-20 hover:opacity-90 transition-opacity absolute right-0 top-16' onClick={() => setPassEditable(true)} />
          </div>
          <Input
            type='password'
            disabled={!passEditable}
            required
            label='Password Confirmation'
            placeholder="Leave it blank if you don't want to change the password"
            ref={pass_conf}
            autoComplete='off'
          /> */}
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

const ProfileImage = ({ image }: { image: File }) => {
  return (
    <div className='bg-white p-2 rounded-lg border flex items-center gap-4 flex-1'>
      <div className='flex items-center gap-4 flex-1'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-4 flex-1'>
            <img src={typeof image === 'object' ? URL.createObjectURL(image) : image} alt={image?.name} className='rounded aspect-square object-center object-cover' />
            <p className='text-sm truncate'>{image?.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
