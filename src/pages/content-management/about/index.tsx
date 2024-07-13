import React, { useState, useRef, useEffect } from 'react'
import { Reorder } from 'framer-motion'
import { ChevronsUpDown, Trash } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { API } from '@/lib/API'
import { About, ResponseApi } from '@/types/API'
import { AxiosError } from 'axios'
import { useGet } from '@/hooks/useGet'
import InputImage from '@/components/ui/input-image'
import InputImageMultiple from '@/components/ui/input-image-multiple'
import InputLinks from '@/pages/settings/components/input_links'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// interface formArray {
//   id: number;
//   name: string;
//   img: File | string | undefined;
//   link: string;
//   order?: string;
//   created_at?: string,
//   updated_at?: string
// }

interface ImgProps {
  id: number
  name: string
  img: File | Blob | MediaSource
}

interface FormInput {
  news_headline: string
  featured_img: File
  desc: string
  address: string
  phone_number: string
  website: string
  email: string
  sosmed_link: string[]
  logos: ImgProps[]
  carousel: ImgProps[]
}

export const AboutPage = () => {
  const { data } = useGet<ResponseApi<About>>('about', '/about')

  const { toast } = useToast()

  const news_headline = useRef<HTMLInputElement>(null)
  const [feat, setFeat] = useState<File>()
  const desc = useRef<HTMLTextAreaElement>(null)
  const address = useRef<HTMLInputElement>(null)
  const phone = useRef<HTMLInputElement>(null)
  const website = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const sosmedLink = useRef<HTMLInputElement>(null)
  const [logos, setLogos] = useState<ImgProps[]>([])
  const [carousel, setCarousel] = useState<ImgProps[]>([])
  const [links, setLinks] = useState([''])
  const [deleteLogosIds, setDeleteLogosIds] = useState([])
  const [deleteCarouselIds, setDeleteCarouselIds] = useState([])

  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: async (formInput: FormInput) => {
      await API.post<FormInput, ResponseApi<About>>(`/about`, formInput, {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
      })
    },
    onSuccess: () => {
      client.invalidateQueries('about')
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let logosData = logos.map((item, index) => {
      if (item.id != '') {
        item.img = ''
      }
      return item
    })

    let carouselData = carousel.map(item => {
      if (item.id != '') {
        item.img = ''
      }
      return item
    })

    if (logosData.length <= 0 || carouselData.length <= 0 || links[0] == '') {
      return toast({
        variant: 'destructive',
        title: `Please fill out all fields`
      })
    }

    const formInput: FormInput = {
      news_headline: news_headline?.current?.value,
      featured_img: feat,
      desc: desc?.current?.value,
      address: address?.current?.value,
      phone_number: phone?.current?.value,
      website: website?.current?.value,
      email: email?.current?.value,
      sosmed_link: links,
      logos: logosData,
      carousel: carouselData,
      delete_logos: deleteLogosIds,
      delete_carousel: deleteCarouselIds
    }

    console.log('form data', formInput)
    mutate(formInput)

    // try {
    //   await API.post<typeof formInput, ResponseApi<About>>(`/about`, formInput, {
    //     Accept: 'multipart/form-data',
    //     'Content-Type': 'multipart/form-data'
    //   })
    //   await toast({
    //     title: `Success!`,
    //     description: 'Updated the data'
    //   })
    // } catch (error) {
    //   let errorMessage = 'Error posting data'
    //   if (error instanceof Error) {
    //     errorMessage = error.message
    //   } else if (error instanceof AxiosError) {
    //     errorMessage = error.response?.data.message
    //   }
    //   toast({
    //     variant: 'destructive',
    //     title: 'Something went wrong.',
    //     description: errorMessage
    //   })
    // }
  }

  useEffect(() => {
    if (data?.data?.logos_for_admin) {
      setLogos(data.data.logos_for_admin)
    }

    if (data?.data.carousel) {
      setCarousel(data.data.carousel)
    }

    if (data?.data?.sosmed_link.length > 0) {
      setLinks(data?.data.sosmed_link)
    }
  }, [data])

  function handleChangeFeat(e: React.FormEvent<HTMLInputElement>) {
    const files = (e.target as HTMLInputElement).files
    if (files !== null) {
      setFeat(files[0])
    }
  }

  function onChangeLogos(e: React.FormEvent<HTMLInputElement>) {
    const files = (e.target as HTMLInputElement).files
    if (files !== null) {
      const newLogo = {
        id: logos?.length + 1,
        img: files[0],
        name: files[0].name
      }
      const updatedLogos = [...logos, newLogo]
      setLogos(updatedLogos)
    }
  }

  function onChangeCarousel(e: React.FormEvent<HTMLInputElement>) {
    const files = (e.target as HTMLInputElement).files
    if (files !== null) {
      const newCarousel = {
        id: carousel.length + 1,
        img: files[0],
        name: files[0].name
      }
      const updatedCarousel = [...carousel, newCarousel]
      setCarousel(updatedCarousel)
    }
  }

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>About</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' onSubmit={handleSubmit}>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='News Headline' required placeholder='Enter headline' ref={news_headline} defaultValue={data?.data.news_headline} />

          {/* FEATURED IMAGE ===================================== */}
          <fieldset>
            <Label className='block mb-2.5'>
              Featured Image <span className='text-destructive'>*</span>
            </Label>
            {/* {feat && (
              <FeaturedImage image={feat} />
            )} */}
            <InputImage
              initialImage={data?.data.featured_img}
              onChangeImage={file => {
                // setFormData({ ...formData, img: file })
                setFeat(file)
              }}
            />
            {/* <Input accept='.jpeg,.png,.jpg,.gif,.svg' type='file' className='hidden' id='featured' onChange={handleChangeFeat} /> */}
            {/* <Label className='inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:opacity-80 h-9 px-4 py-2 my-3' htmlFor='featured' >Replace Image</Label> */}
          </fieldset>
          {/* END FEATURED IMAGE ================================== */}

          <Textarea label='Description' required placeholder='Enter your description' rows={20} ref={desc} defaultValue={data?.data.desc} />

          {/* LOGOS IMAGE ========================================= */}
          <fieldset>
            <Label className='block mb-2.5'>
              Logos <span className='text-destructive'>*</span>
            </Label>

            <InputImageMultiple
              images={logos}
              setImages={setLogos}
              onDeletedImage={imageId => {
                console.log('ids', imageId)
                setDeleteLogosIds([...deleteLogosIds, imageId])
              }}
              onChangeImage={file => {}}
            />

            {/* <Reorder.Group axis='y' onReorder={setLogos} values={logos} className='space-y-2.5 overflow-hidden mb-4'>
              {logos?.map((logoImage, index) => (
                <div key={index} className='pb-1'>
                  <LogoImageCard image={logoImage} images={logos} setImage={setLogos} />
                  <div className='flex items-center flex-1'>
                    <Input placeholder='Logo Name' defaultValue={logoImage.name} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const set = {
                        ...logoImage,
                        name: (e.target as HTMLInputElement).value
                      }
                      const setName = logos?.map((logo) => {
                        if (logo.id === set.id) return set
                        return logo
                      })
                      setLogos(setName)
                    }} />
                    <Input placeholder='Logo Link' type='url' required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const set = {
                        ...logoImage,
                        link: (e.target as HTMLInputElement).value
                      }
                      const setLink = logos?.map((logo) => {
                        if (logo.id === set.id) return set
                        return logo
                      })
                      setLogos(setLink)
                    }} />
                    <Input placeholder='Logo Order' type='number' required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const set = {
                        ...logoImage,
                        order: (e.target as HTMLInputElement).value
                      }
                      const setOrder = logos?.map((logo) => {
                        if (logo.id === set.id) return set
                        return logo
                      })
                      setLogos(setOrder)
                    }} />
                  </div>
                </div>
              ))}
            </Reorder.Group>
            
            <Input type='file' accept='.jpeg,.png,.jpg' onChange={onChangeLogos} id='logos' className='hidden' />
            <Label className='inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:opacity-80 h-9 px-4 py-2 my-3' htmlFor='logos' >Upload Image</Label> */}

            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Format: jpg, jpeg, png</li>
              <li>File size: 2MB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
          {/* END LOGOS IMAGE =========================================================== */}
        </fieldset>

        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Address' required placeholder='Enter address' ref={address} defaultValue={data?.data.address} />
          <Input label='Phone Number' required placeholder='Phone Number' ref={phone} defaultValue={data?.data.phone_number} />
          <Input label='Website' required type='url' placeholder='Insert link here' ref={website} defaultValue={data?.data.website} />
          <Input label='Email Address' type='email' required placeholder='Email address' ref={email} defaultValue={data?.data.email} />
          {/* <Input label='Social Media Link' required placeholder='Enter link' ref={sosmedLink} defaultValue={data?.data.sosmed_link} /> */}
          <fieldset>
            <Label className='block mb-2.5'>
              Social Media Link
              <span className='text-destructive'> *</span>
            </Label>
            <InputLinks links={links} setLinks={setLinks} />
          </fieldset>

          {/* GALERY CAROUSEL ================================================ */}
          <fieldset>
            <Label className='block mb-2.5'>
              Gallery Carousel <span className='text-destructive'>*</span>
            </Label>

            <InputImageMultiple
              images={carousel}
              setImages={setCarousel}
              onDeletedImage={imageId => {
                setDeleteCarouselIds([...deleteCarouselIds, imageId])
              }}
              onChangeImage={file => {}}
            />

            {/* <Reorder.Group axis='y' onReorder={setCarousel} values={carousel} className='space-y-2.5 overflow-hidden'>
              {carousel?.map((carou, index) => (
                <div key={index} className='pb-1'>
                  <LogoImageCard key={index} image={carou} images={carousel} setImage={setCarousel} />
                  <div className='flex items-center flex-1'>
                    <Input placeholder='Logo Name' defaultValue={carou.name} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const set = {
                        ...carou,
                        name: (e.target as HTMLInputElement).value
                      }
                      const setName = carousel?.map((carou) => {
                        if (carou.id === set.id) return set
                        return carou
                      })
                      setCarousel(setName)
                    }} />
                    <Input placeholder='Logo Link' type='url' required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const set = {
                        ...carou,
                        link: (e.target as HTMLInputElement).value
                      }
                      const setLink = carousel?.map((carou) => {
                        if (carou.id === set.id) return set
                        return carou
                      })
                      setCarousel(setLink)
                    }} />
                    <Input placeholder='Logo Order' type='number' required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const set = {
                        ...carou,
                        order: (e.target as HTMLInputElement).value
                      }
                      const setOrder = carousel?.map((carou) => {
                        if (carou.id === set.id) return set
                        return carou
                      })
                      setCarousel(setOrder)
                    }} />
                  </div>
                </div>
              ))}
            </Reorder.Group>

            <Input type='file' accept='.jpeg,.png,.jpg' onChange={onChangeCarousel} id='gallery' className='hidden' />
            <Label className='inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:opacity-80 h-9 px-4 py-2 my-3' htmlFor='gallery' >Upload Image</Label> */}

            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Format: jpg, jpeg, png</li>
              <li>File size: 2MB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
          {/* END GALERY CAROUSEL ===================================================== */}
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

type LogoImageProps = {
  image: ImgProps
  images: ImgProps[]
  setImage: (value: ImgProps[]) => void
}

const LogoImageCard = ({ image, images, setImage }: LogoImageProps) => {
  const handleDelete = () => {
    if (images.length <= 1) return
    setImage(images.filter(img => img.id !== image.id))
  }

  return (
    <Reorder.Item className='bg-white p-2 rounded-lg border flex items-center gap-4 flex-1' key={image?.id} value={image}>
      <div className='flex items-center gap-4 flex-1'>
        <button disabled>
          <ChevronsUpDown size={24} />
        </button>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-4 flex-1'>
            <img src={URL.createObjectURL(image.img)} alt='' className='h-36 rounded aspect-square object-center object-cover' />
            <p className='text-sm truncate'>{image.name}</p>
          </div>
        </div>
      </div>
      <button onClick={handleDelete} className={images.length <= 1 ? 'hidden' : ''} disabled={images.length <= 1}>
        <Trash size={20} />
      </button>
    </Reorder.Item>
  )
}

const FeaturedImage = ({ image }: { image: File }) => {
  return (
    <div className='bg-white p-2 rounded-lg border flex items-center gap-4 flex-1'>
      <div className='flex items-center gap-4 flex-1'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-4 flex-1'>
            <img src={URL.createObjectURL(image)} alt={image?.name} className='rounded aspect-square object-center object-cover' />
            <p className='text-sm truncate'>{image?.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
