import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { API } from '@/lib/API'
import { ResponseApi } from '@/types/API'
import { useToast } from '@/components/ui/use-toast'
import { useGet } from '@/hooks/useGet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import InputImage from '@/components/ui/input-image'
import InputLinks from '../components/input_links'
interface General {
  name: string
  logo: string
  favicon: string
  default_currency: string
  address: string
  phone_number: string
  website: string
  email: string
  sosmed_links: string[]
}

export const GeneralTab = () => {
  const { toast } = useToast()
  const { data } = useGet<ResponseApi<General>>('general-setting', '/settings/general-information')

  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: async (formInput: General) => {
      await API.post<General, ResponseApi<UserSetting>>('/settings/general-information', formInput, {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
      })
    },
    onSuccess: () => {
      client.invalidateQueries('general-setting')
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

  const [logo, setLogo] = useState<File | undefined>()
  const [favicon, setFavicon] = useState<File | undefined>()
  const [links, setLinks] = useState([''])
  const [currency, setCurrency] = useState('')

  const name = useRef('')
  const address = useRef('')
  const phone = useRef('')
  const website = useRef('')
  const email = useRef('')

  useEffect(() => {
    if (data?.data?.sosmed_links?.length > 0) {
      setLinks(data?.data.sosmed_links)
    }
    if (data?.data.default_currency != '') {
      setCurrency(data?.data.default_currency)
    }
  }, [data])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (links[0] == '') {
      return toast({
        variant: 'destructive',
        title: `Please fill out all fields`
      })
    }

    const formInput: General = {
      name: name.current.value,
      address: address.current.value,
      email: email.current.value,
      phone_number: phone.current.value,
      website: website.current.value,
      sosmed_links: links,
      default_currency: currency,
      favicon,
      logo
    }

    mutate(formInput)
  }

  return (
    <section>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' onSubmit={handleSubmit}>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Business Name' placeholder='Enter name' defaultValue={data?.data.name} required ref={name} />
          <fieldset>
            <Label className='block mb-2.5'>Logo</Label>
            {/* <div className='bg-white py-3 px-4 rounded border flex items-center justify-between mb-2.5'>
              <div className='flex items-center gap-4'>
                <img src={data?.data.logo ? data.data.logo : 'https://placehold.co/52x52'} alt={data?.data.logo} className='w-14 h-14 aspect-square object-cover object-center rounded' />
              </div>
            </div>
            <Input type='file' onChange={(e: React.FormEvent<HTMLInputElement>) => setLogo(e.target.files[0])} />
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 500KB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul> */}
            <InputImage
              required={false}
              initialImage={data?.data.logo}
              onChangeImage={file => {
                // setFormData({ ...formData, img: file })
                setLogo(file)
              }}
            />
          </fieldset>
          <fieldset>
            <Label className='block mb-2.5'>
              Favicon Image
              <span className='text-destructive'> *</span>
            </Label>
            {/* <div className='bg-white py-3 px-4 rounded border flex items-center justify-between mb-2.5'>
              <div className='flex items-center gap-4'>
                <img src={data?.data.logo ? data.data.logo : 'https://placehold.co/52x52'} alt={data?.data.logo} className='w-14 h-14 aspect-square object-cover object-center rounded' />
              </div>
            </div>
            <Input type='file' onChange={(e: React.FormEvent<HTMLInputElement>) => setFavicon(e.target.files[0])} />
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Dimensions: 16 x 16 px</li>
              <li>Format: jpg, pdf, png</li>
            </ul> */}
            <InputImage
              required={false}
              initialImage={data?.data.logo}
              onChangeImage={file => {
                // setFormData({ ...formData, img: file })
                setFavicon(file)
              }}
            />
          </fieldset>
          {/* <Input required label='Default Currency' defaultValue={data?.data.default_currency} ref={currency} placeholder='Default currency' /> */}
          <fieldset>
            <Label className='block mb-2.5'>Default Currency</Label>
            <select
              value={currency}
              onChange={event => {
                setCurrency(event.target.value)
              }}
              className='flex h-10 w-full rounded-md border border-input bg-white px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
            >
              <option value='sgd'>Singapore Dollar (SGD)</option>
              <option value='idr'>Indonesia Rupiah (IDR)</option>
              <option value='usd'>United Stated Dollar (USD)</option>
            </select>
          </fieldset>
        </fieldset>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input required label='Address' placeholder='Enter address' defaultValue={data?.data.address} ref={address} />
          <Input required label='Phone number' type='tel' placeholder='Enter contact info' defaultValue={data?.data.phone_number} ref={phone} />
          <Input required label='Website' type='url' placeholder='www.artseasons.sg' defaultValue={data?.data.website} ref={website} />
          <Input required label='Email address' type='email' defaultValue={data?.data.email} ref={email} placeholder='Enter contact info' />

          <fieldset>
            <Label className='block mb-2.5'>
              Social Media Link
              <span className='text-destructive'> *</span>
            </Label>
            <InputLinks links={links} setLinks={setLinks} />
          </fieldset>
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
