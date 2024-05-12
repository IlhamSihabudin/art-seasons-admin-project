import { useState, useRef } from 'react'
import { Reorder } from 'framer-motion'
import { ChevronsUpDown, Trash } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export const AboutPage = () => {
  const [logoImages, setLogoImages] = useState(data)
  const [galleryImages, setGalleryImages] = useState(data)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>About</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='News Headline' required placeholder='Enter headline' />
          <Input label='Tag' required placeholder='Enter tag name' />
          <Textarea label='Description' placeholder='Enter your description' rows={20} />
          <fieldset>
            <Label className='block mb-2.5'>
              Logos <span className='text-destructive'>*</span>
            </Label>

            <Reorder.Group axis='y' onReorder={setLogoImages} values={logoImages} className='space-y-2.5 overflow-hidden'>
              {logoImages.map(logoImage => (
                <LogoImageCard key={logoImage.id} logoImage={logoImage} logoImages={logoImages} setLogoImages={setLogoImages} />
              ))}
            </Reorder.Group>

            <Button variant='outline' className='mt-5' type='button' onClick={() => inputRef.current?.click()}>
              Upload Image
            </Button>
            <input type='file' ref={inputRef} className='hidden' />

            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 500KB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
        </fieldset>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Address' placeholder='Enter address' />
          <Input label='Phone Number' placeholder='Phone Number' />
          <Input label='Website' placeholder='Insert link here' />
          <Input label='Email Address' placeholder='Email address' />
          <Input label='Social Media Link' placeholder='Enter link' />
          <fieldset>
            <Label className='block mb-2.5'>Gallery Carousel</Label>

            <Reorder.Group axis='y' onReorder={setGalleryImages} values={galleryImages} className='space-y-2.5 overflow-hidden'>
              {galleryImages.map(galleryImage => (
                <GalleryImageCard key={galleryImage.id} galleryImage={galleryImage} galleryImages={galleryImages} setGalleryImages={setGalleryImages} />
              ))}
            </Reorder.Group>

            <Button variant='outline' className='mt-5' type='button' onClick={() => inputRef.current?.click()}>
              Upload Image
            </Button>
            <input type='file' ref={inputRef} className='hidden' />

            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 500KB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
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

type LogoImageProps = {
  logoImages: typeof data
  setLogoImages: (publicationImages: typeof data) => void
  logoImage: (typeof data)[0]
}

const LogoImageCard = ({ logoImage, logoImages, setLogoImages }: LogoImageProps) => {
  const handleDelete = () => {
    setLogoImages(logoImages.filter(image => image.id !== logoImage.id))
  }

  return (
    <Reorder.Item className='bg-white p-2 rounded-lg border' key={logoImage.id} value={logoImage}>
      <div className='flex items-center gap-4 flex-1 pointer-events-none'>
        <button>
          <ChevronsUpDown size={24} />
        </button>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-4 flex-1'>
            <img src={logoImage.image} alt='' className='rounded aspect-square object-center object-cover' />
            <p className='text-sm truncate'>
              {logoImage.name} {logoImage.id}
            </p>
          </div>
          <button onClick={handleDelete}>
            <Trash size={20} />
          </button>
        </div>
      </div>
    </Reorder.Item>
  )
}

type GalleryImageProps = {
  galleryImages: typeof data
  setGalleryImages: (publicationImages: typeof data) => void
  galleryImage: (typeof data)[0]
}

const GalleryImageCard = ({ galleryImage, galleryImages, setGalleryImages }: GalleryImageProps) => {
  const handleDelete = () => {
    setGalleryImages(galleryImages.filter(image => image.id !== galleryImage.id))
  }

  return (
    <Reorder.Item className='bg-white p-2 rounded-lg border' key={galleryImage.id} value={galleryImage}>
      <div className='flex items-center gap-4 flex-1 pointer-events-none'>
        <button>
          <ChevronsUpDown size={24} />
        </button>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-4 flex-1'>
            <img src={galleryImage.image} alt='' className='rounded aspect-square object-center object-cover' />

            <p className='text-sm truncate'>
              {galleryImage.name} {galleryImage.id}
            </p>
          </div>
          <button onClick={handleDelete}>
            <Trash size={20} />
          </button>
        </div>
      </div>
    </Reorder.Item>
  )
}

const data = [
  {
    id: '0',
    name: 'Artwork Name',
    image: 'https://placehold.co/52x52'
  },
  {
    id: '1',
    name: 'Artwork Name',
    image: 'https://placehold.co/52x52'
  }
]
