import { ImageIcon } from '@radix-ui/react-icons'
import { Trash } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './button'
import { Label } from '@radix-ui/react-label'

interface Props {
  label?: string
  size?: number
  required?: boolean
  initialFile?: string
  onChangeFile: (file: File | undefined) => void
}

const InputAttachment: React.FC<Props> = ({ label, size = 24, required = true, initialFile: initialFile, ...props }) => {
  const id = React.useId()

  const hiddenFileInput = useRef(null)
  const [file, setFile] = useState<File | Blob | undefined>(undefined)

  const [imagePreview, setImagePreview] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)
  const [defaultPreview, setDefaultPreview] = useState(null)

  const [initialPreview, setInitialPreview] = useState(null)

  useEffect(() => {
    if (initialFile != null) {
      let fileExt = initialFile?.split('.').pop()
      if (['jpg', 'jpeg', 'png'].includes(fileExt)) {
        setInitialPreview('image')
      } else if (['mp4', 'mov', '3gp'].includes(fileExt)) {
        setInitialPreview('video')
      } else {
        setInitialPreview('default')
      }
    }
  }, [initialFile])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files
    if (files !== null && files.length > 0) {
      setFile(files[0])
      props.onChangeFile(files[0])
      previewFiles(e)
    }
  }

  const handleDeleteImage = () => {
    setImagePreview(null)
    setVideoPreview(null)
    setDefaultPreview(null)

    setFile(undefined)
    props.onChangeFile(undefined)
  }

  const previewFiles = e => {
    const reader = new FileReader()

    const selectedFile = e.target.files[0]
    if (selectedFile) {
      reader.readAsDataURL(selectedFile)
    }

    reader.onload = readerEvent => {
      console.log('reader')
      if (selectedFile?.type.includes('image')) {
        setImagePreview(readerEvent.target?.result)
      } else if (selectedFile?.type.includes('video')) {
        setVideoPreview(readerEvent.target?.result)
      } else {
        setDefaultPreview(readerEvent.target?.result)
      }
    }
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
        <div className='bg-white rounded border flex items-center justify-between flex-1 p-2'>
          {/* py-3 px-4 */}
          <div className='flex items-center justify-center gap-4 w-full'>
            {imagePreview && <img src={imagePreview} alt='Feature Image' className='items-center rounded' />}
            {videoPreview && <video src={videoPreview} controls className='items-center rounded'></video>}
            {defaultPreview && (
              <div>
                <p className='text-sm w-full flex-wrap font-light'>{file?.name}</p>
              </div>
            )}
            {file ? (
              <></>
            ) : (
              <>
                {initialPreview != null ? (
                  initialPreview == 'image' ? (
                    <img
                      src={initialFile}
                      alt='Feature Image'
                      className='items-center rounded'
                      // className='max-h-36 aspect-square object-center object-cover rounded-l-lg'
                    />
                  ) : initialPreview == 'video' ? (
                    <video src={initialFile} controls className='items-center rounded'></video>
                  ) : (
                    <p className='text-center text-sm w-full flex-wrap font-light'>{initialFile?.split('/').pop()}</p>
                  )
                ) : (
                  <>
                    <p className='text-sm w-full flex-wrap font-light'>No File Choosen</p>
                  </>
                )}
              </>
            )}
            {/* {img && (
              <button type='button'>
                <Trash size={18} onClick={handleDeleteImage} />
              </button>
            )} */}
          </div>
          <div className='ml-2'>
            {file && (
              <button type='button'>
                <Trash size={18} onClick={handleDeleteImage} />
              </button>
            )}
          </div>
        </div>
        <input id={`${id}-${label}`} ref={hiddenFileInput} type='file' accept='*' className='hidden' onChange={handleChange} />
        <Button
          className='w-[180px]'
          variant={'outline'}
          type='button'
          onClick={() => {
            if (hiddenFileInput.current != null) hiddenFileInput.current?.click()
          }}
        >
          {file ? 'Replace Image' : 'Choose File'}
        </Button>
      </div>
    </fieldset>
  )
}

export default InputAttachment
