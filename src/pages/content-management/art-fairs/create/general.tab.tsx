import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import React from 'react'
import ArtFairForm from '@/types/forms/art_fair_form'
import InputImage from '@/components/ui/input-image'
import InputAttachment from '@/components/ui/input-attachment'

export const GeneralTab = ({ formData, setFormData }: { formData: ArtFairForm; setFormData: React.Dispatch<React.SetStateAction<ArtFairForm>> }) => {

  const handleInputTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <section>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Art Fair Name' required placeholder='Enter art fair name' name='name' value={formData.name} onChange={handleInputTextChange} />
          <fieldset className='grid grid-cols-2 gap-5'>
            <Input label='Start Date' type='date' required placeholder='Enter start date' name='start_date' value={formData.start_date} onChange={handleInputTextChange} />
            <Input label='End Date' type='date' required placeholder='Enter end date' name='end_date' value={formData.end_date} onChange={handleInputTextChange} />
          </fieldset>
          <Input label='Tags' placeholder='Enter tag name (recommended to be less than 10 characters)' required name='tags' value={formData.tags} onChange={handleInputTextChange} />
          <Input label='Organizer' placeholder='Enter artist or organisation name' required name='organizer' value={formData.organizer} onChange={handleInputTextChange} />
          <Input label='Location' placeholder='Enter Location' required name='location' value={formData.location} onChange={handleInputTextChange} />
          <fieldset>
            {/* <Input
              label='Featured Image'
              type='file'
              required
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const files = (e.target as HTMLInputElement).files
                if (files !== null) {
                  // setImg(files[0])
                  setFormData({ ...formData, img: files[0] })
                }
              }}
              accept='.jpg,.pdf,.png'
            /> */}
            <InputImage label='Featured Image' onChangeImage={file => {
              setFormData({ ...formData, img: file })
            }} />
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Pixel size: 1440 x 480px (min)</li>
              <li>Aspect ratio: 27:9 (square)</li>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 2MB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
          <fieldset>
            {/* <Input
              label='Attach Document'
              type='file'
              required
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                const files = (e.target as HTMLInputElement).files
                if (files !== null) {
                  // setDoc(files[0])
                  setFormData({ ...formData, attach_doc: files[0] })
                }
              }}
              accept='.pdf'
            />
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Format: pdf</li>
              <li>File size: ?MB (max)</li>
            </ul> */}
            <InputAttachment
              label='Attach Document'
              onChangeFile={file => {
                setFormData({ ...formData, attach_doc: file })
              }}
            />
          </fieldset>

          <fieldset>
            <Label className='block mb-2.5'>Visibility</Label>
            <RadioGroup className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='radio'
                  value='1'
                  id='visible'
                  required
                  name='isVisible'
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setFormData({ ...formData, is_visible: 1 })
                  }}
                  checked={formData.is_visible.toString() == '1'}
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
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setFormData({ ...formData, is_visible: 0 })
                  }}
                  checked={formData.is_visible.toString() == '0'}
                />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>
        <Textarea
          label='Description'
          required
          placeholder='Enter your comprehensive description on the artist'
          wrapperClassName='flex flex-col'
          className='flex-1'
          name='desc'
          value={formData.desc}
          onChange={e => {
            setFormData({ ...formData, desc: e.target.value })
          }}
        />
        <div className='col-span-2 gap-4 flex items-center justify-end'>
          {/* <Button variant={'outline'} size='lg' onClick={() => {}}>
            Back
          </Button>
          <Button size='lg' type='submit'>
            Next
          </Button> */}
          {/* <Button variant={'outline'} type='button' size='lg' onClick={() => {
            console.log('form data', formData)
          }}>
            Click Me!
          </Button> */}
        </div>
      </form>
    </section>
  )
}
