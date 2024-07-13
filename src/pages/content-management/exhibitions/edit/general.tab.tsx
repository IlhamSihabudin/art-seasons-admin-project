import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import ExhibitionForm from '@/types/forms/exhibition_form'
import InputImage from '@/components/ui/input-image'
import InputAttachment from '@/components/ui/input-attachment'
// import { Link } from 'react-router-dom'

export const GeneralTab = ({
  formData,
  setFormData,
  initialImage,
  initialFile
}: {
  formData: ExhibitionForm
  setFormData: React.Dispatch<React.SetStateAction<ExhibitionForm>>
  initialImage: string
  initialFile: string
}) => {
  const handleInputTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <section>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Exhibition Name' required placeholder='Enter full name' name='name' value={formData?.name} onChange={handleInputTextChange} />
          <fieldset className='grid grid-cols-2 gap-5'>
            <Input label='Start Date' type='date' required placeholder='Enter start date' name='start_date' value={formData?.start_date} onChange={handleInputTextChange} />
            <Input label='End Date' type='date' required placeholder='Enter end date' name='end_date' value={formData?.end_date} onChange={handleInputTextChange} />
          </fieldset>
          <Input
            label='Tags'
            placeholder='Enter tag name (recommended to be less than 10 characters)'
            required
            name='tags'
            value={formData?.tags}
            onChange={handleInputTextChange}
          />
          <Input label='Organizer' placeholder='Enter artist or organisation name' required name='organizer' value={formData.organizer} onChange={handleInputTextChange} />
          <Input label='Location' placeholder='Enter Location' required name='location' value={formData.location} onChange={handleInputTextChange} />
          <fieldset>
            {/* <Label>
              Profile Picture
              <span className='text-destructive'>*</span>
            </Label> */}
            {/* <div className="flex mb-2 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="max-h-36 aspect-square object-center object-cover rounded-l-lg" src={formData.img} alt={data?.fullname} />
            </div> */}
            {/* <Input
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
            <InputImage
              required={false}
              label='Featured Image'
              initialImage={initialImage}
              onChangeImage={file => {
                setFormData({ ...formData, img: file })
              }}
            />
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Pixel size: 1440 x 480px (min)</li>
              <li>Aspect ratio: 27:9 (square)</li>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 2MB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
          <fieldset>
            {/* <Label>
              Attach Document
              <span className='text-destructive'>*</span>
            </Label> */}
            {/* <div className="flex mb-2 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="flex flex-col justify-between p-4 leading-normal">
                <Link to={data?.attach_doc}  >attach_dukument.pdf</Link>
              </div>
            </div> */}
            {/* <Input
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
              required={false}
              label='Attach Document'
              initialFile={initialFile}
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
                  checked={formData && formData.is_visible == '1'}
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
                  checked={formData && formData.is_visible == '0'}
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
        {/* <div className='col-span-2 flex items-center justify-end'>
          <Button size='lg' type='submit'>
            Next
          </Button>
        </div> */}
      </form>
    </section>
  )
}
