import { useState, useRef } from 'react'
import { ChevronsUpDown, Trash } from 'lucide-react'
import { Reorder } from 'framer-motion'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export const PublicationsCreatePage = () => {
  const [publicationImages, setPublicationImages] = useState(data)

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Add New Publication</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Publication Name' required placeholder='Enter publication name' />
          <Textarea label='Description' required placeholder='Enter short description of artwork' />
          <Input label='Author' placeholder="Enter author' s name" />
        </fieldset>
        <fieldset className='md:space-y-7 space-y-3'>
          <fieldset>
            <Label className='block mb-2.5'>
              Publication Image <span className='text-destructive'>*</span>
            </Label>

            <Reorder.Group axis='y' onReorder={setPublicationImages} values={publicationImages} className='space-y-2.5 overflow-hidden'>
              {publicationImages.map(publicationImage => (
                <PublicationImageCard
                  key={publicationImage.id}
                  publicationImage={publicationImage}
                  publicationImages={publicationImages}
                  setPublicationImages={setPublicationImages}
                />
              ))}
            </Reorder.Group>

            <Button variant='outline' className='mt-5' type='button' onClick={() => inputRef.current?.click()}>
              Upload Image
            </Button>
            <input type='file' ref={inputRef} className='hidden' />

            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 1MB (max)</li>
              <li>Resolution: 150-300ppi</li>
            </ul>
          </fieldset>
          <fieldset>
            <Label className='block mb-2.5'>Visibility</Label>
            <RadioGroup defaultValue='visible' className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='visible' id='visible' />
                <Label htmlFor='visible' className='font-normal'>
                  Visible
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='hidden' id='hidden' />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
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

type PublicationImageProps = {
  publicationImages: typeof data
  setPublicationImages: (publicationImages: typeof data) => void
  publicationImage: (typeof data)[0]
}

const PublicationImageCard = ({ publicationImage, publicationImages, setPublicationImages }: PublicationImageProps) => {
  const handleDelete = () => {
    setPublicationImages(publicationImages.filter(image => image.id !== publicationImage.id))
  }

  return (
    <Reorder.Item className='bg-white p-2 rounded-lg border' key={publicationImage.id} value={publicationImage}>
      <div className='flex items-center gap-4 flex-1 pointer-events-none'>
        <button>
          <ChevronsUpDown size={24} />
        </button>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-4 flex-1'>
            <img src={publicationImage.image} alt='' className='rounded aspect-square object-center object-cover' />
            <p className='text-sm truncate'>
              {publicationImage.name} {publicationImage.id}
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
