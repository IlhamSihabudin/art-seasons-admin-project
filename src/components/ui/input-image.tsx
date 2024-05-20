import { ImageIcon } from '@radix-ui/react-icons'
import { Trash } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Button } from './button'
import { Label } from '@radix-ui/react-label'

interface Props {
  label?: string
  size?: number
  required?: boolean
  initialImage?: string
  onChangeImage: (file: File | undefined) => void
}

const InputImage: React.FC<Props> = ({ label, size = 24, required = true, initialImage, ...props }) => {
  const id = React.useId()

  const hiddenFileInput = useRef(null)
  const [img, setImg] = useState<File | undefined>(undefined)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files
    if (files !== null && files.length > 0) {
      setImg(files[0])
      props.onChangeImage(files[0])
    }
  }

  const handleDeleteImage = () => {
    setImg(undefined)
    props.onChangeImage(undefined)
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
        <div className='bg-white rounded border flex items-center justify-between flex-1 pr-3'>
        {/* py-3 px-4 */}
          <div className='flex items-center gap-4 w-full'>
            {img ? (
              <img src={URL.createObjectURL(img)} alt='Feature Image' className='max-h-36 aspect-square object-center object-cover rounded-l-lg' />
            ) : (
              <>
                {initialImage ? (
                  <>
                    <img src={initialImage} alt='Feature Image' className='max-h-36 aspect-square object-center object-cover rounded-l-lg' />
                  </>
                ) : (
                  <div className='bg-gray-300 p-4 rounded-sm my-3 ml-4'>
                    <ImageIcon color={'#848897'} width={size} height={size} />
                  </div>
                )}
              </>
            )}
            <p className='text-sm w-full flex-wrap font-light'>{img ? img.name : initialImage ? 'Select the image if you want to change the image on the side' : 'Choose image'}</p>
            {img && (
              <button type='button'>
                <Trash size={18} onClick={handleDeleteImage} />
              </button>
            )}
          </div>
        </div>
        <input id={`${id}-${label}`} ref={hiddenFileInput} type='file' accept='.jpeg,.png,.jpg,.gif,.svg' className='hidden' onChange={handleChange} />
        <Button
          className='w-[180px]'
          variant={'outline'}
          type='button'
          onClick={() => {
            if (hiddenFileInput.current != null) hiddenFileInput.current?.click()
          }}
        >
          {img ? 'Replace Image' : 'Choose File'}
        </Button>
      </div>
    </fieldset>
  )
}

export default InputImage
