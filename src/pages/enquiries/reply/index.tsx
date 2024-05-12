import { useParams } from 'react-router-dom'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export const EnquiriesReplyPage = () => {
  const { id } = useParams()

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>{id}</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <fieldset className='md:space-y-7 space-y-3'>
          <fieldset>
            <Label className='block mb-2.5'>Name</Label>
            <p className='py-2 px-3 text-sm'>Name of enquirer here</p>
          </fieldset>
          <fieldset>
            <Label className='block mb-2.5'>Email</Label>
            <p className='py-2 px-3 text-sm'>wwicaksono96@gmail.com</p>
          </fieldset>
          <fieldset>
            <Label className='block mb-2.5'>Mobile No.</Label>
            <p className='py-2 px-3 text-sm'>123-123-123</p>
          </fieldset>
          <fieldset>
            <Label className='block mb-2.5'>Remarks</Label>
            <p className='py-2 px-3 text-sm'>Here are the remarks of this enquiry that is listed here as an example for this particular artwork.</p>
          </fieldset>
          <fieldset>
            <Label className='block mb-2.5'>Item</Label>
            <p className='py-2 px-3 text-sm'>Artwork Name</p>
            <ul className='text-sm px-3 pb-2'>
              <li>Description: Smoking Man</li>
              <li>Acrylic on Canvas (122 x 152 cm) (2023)</li>
            </ul>
            <div className='bg-white rounded-lg border p-2 flex items-center gap-4'>
              <img src='https://placehold.co/52x52' alt='' className='w-14 h-14 aspect-square object-cover object-center rounded' />
              <p className='text-sm'>Artwork Name</p>
            </div>
          </fieldset>
        </fieldset>
        <Textarea label='Reply to Enquiry*' required placeholder='Enter your reply' wrapperClassName='h-full' className='h-full' />
        <div className='col-span-2 flex items-center justify-end'>
          <Button size='lg' type='submit'>
            Reply
          </Button>
        </div>
      </form>
    </section>
  )
}
