import { ImageIcon } from '@radix-ui/react-icons'
import { ChevronsUpDown, Trash } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Button } from './button'
import { Label } from '@radix-ui/react-label'
import { Reorder } from 'framer-motion'
import { ImgProps } from '@/pages/content-management/home/page'

interface Props {
  label?: string
  size?: number
  required?: boolean
  images: ImgProps[]
  setImages: React.Dispatch<React.SetStateAction<ImgProps[]>>
  onDeletedImages: (images: number[]) => void
  onChangeImage: (file: File | undefined) => void
}

const InputImageMultiple: React.FC<Props> = ({ label, size = 24, required = true, images, setImages, onDeletedImages, ...props }) => {
  const id = React.useId()

  const hiddenFileInput = useRef(null)
  const [img, setImg] = useState<File | undefined>(undefined)
  // const [deletedImages, setDeletedImages] = useState([])
  let deleledImages = [];

  // const [images, setImages] = useState([])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files
    if (files !== null && files.length > 0) {
      setImg(files[0])
      props.onChangeImage(files[0])

      var obj: ImgProps = {
        id: '',
        name: files[0].name,
        img: files[0]
      }

      setImages([...images, obj])
    }
  }

  const handleDeleteImage = () => {
    setImg(undefined)
    props.onChangeImage(undefined)
  }

  const removeImages = index => {
    let data = [...images]
    const deletedImg = images[index]
    if (deletedImg.id) {
      // setDeletedImages([...deletedImages, deletedImg.id])
      deleledImages.push(deletedImg.id)
    }
    data.splice(index, 1)
    // setFormFields(data)
    setImages(data)

    onDeletedImages(deleledImages)
  }

  const generateImage = (image: File | string) => {
    if (image instanceof File) {
      return URL.createObjectURL(image)
    }
    return image
  }

  return (
    <fieldset>
      {label && (
        <Label htmlFor={`${id}-${label}`} className='mb-1 block'>
          {label}
          {required && <span className='text-destructive'> *</span>}
        </Label>
      )}

      <div className='flex flex-col w-full gap-2'>
        {images.length == 0 && (
          <>
            <div className='bg-white rounded border flex items-center justify-between flex-1 pr-3 p-2'>
              <div className='flex items-center gap-4 w-full'>
                <div className='bg-gray-300 p-4 rounded-sm my-3 ml-4'>
                  <ImageIcon color={'#848897'} width={size} height={size} />
                </div>
              </div>
            </div>
          </>
        )}
        <Reorder.Group axis='y' onReorder={setImages} values={images} className='space-y-2'>
          {images.map((image, index) => (
            <Reorder.Item key={index} value={image}>
              <div className='bg-white rounded border flex items-center justify-between flex-1 pr-3 p-2'>
                <div className='flex items-center gap-4 w-full'>
                  {/* <div className='bg-gray-300 p-4 rounded-sm my-3 ml-4'> */}
                  <button disabled>
                    <ChevronsUpDown size={24} />
                  </button>

                  <img src={generateImage(image.img)} alt='Feature Image' className='max-h-36 aspect-square object-center object-cover rounded-sm' />
                  <p className='text-sm w-full flex-wrap font-light'>
                    {image ? image.name : initialImage ? 'Select the image if you want to change the image on the side' : 'Choose image'}
                  </p>
                  <button type='button'>
                    <Trash size={18} onClick={() => removeImages(index)} />
                  </button>
                  {/* </div> */}
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <Button
          className='w-[180px]'
          variant={'outline'}
          type='button'
          onClick={() => {
            if (hiddenFileInput.current != null) hiddenFileInput.current?.click()
          }}
        >
          Choose File
        </Button>
        <input id={`${id}-${label}`} ref={hiddenFileInput} type='file' accept='.jpeg,.png,.jpg,.gif,.svg' className='hidden' onChange={handleChange} />
      </div>
    </fieldset>
  )
}

export default InputImageMultiple
