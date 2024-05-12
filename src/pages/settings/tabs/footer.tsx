import { useState } from 'react'
import { Reorder } from 'framer-motion'
import { ChevronsUpDown, Eye, EyeOff } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

export const FooterTab = () => {
  const [footer, setFooter] = useState(FOOTER)

  return (
    <section className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
      <fieldset>
        <Label className='block mb-2.5'>Pages Displayed on Footer</Label>
        <Reorder.Group axis='y' onReorder={setFooter} values={footer} className='space-y-2.5 overflow-hidden'>
          {footer.map(footer => (
            <Card footer={footer} key={footer} />
          ))}
        </Reorder.Group>
      </fieldset>
      <fieldset>
        <Label className='block mb-2.5'>Content Displayed on Footer</Label>
        <div className='space-y-2.5'>
          <div className='flex items-center space-x-2'>
            <Checkbox id='subscribe' />
            <label htmlFor='subscribe' className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Subscribe
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='social-media-links' />
            <label htmlFor='social-media-links' className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Social Media Links
            </label>
          </div>
        </div>
      </fieldset>
      <div className='col-span-2 flex items-center justify-end'>
        <Button size='lg' type='submit'>
          Save
        </Button>
      </div>
    </section>
  )
}

type CardProps = {
  footer: (typeof FOOTER)[0]
}

const Card = ({ footer }: CardProps) => {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <Reorder.Item value={footer} className={`p-4 rounded-lg border bg-white flex items-center cursor-grab ${isVisible ? 'opacity-100' : 'opacity-60'} transition-opacity`}>
      <div className='flex items-center gap-2 flex-1'>
        <ChevronsUpDown size={24} />
        <p className='text-sm'>{footer}</p>
      </div>
      <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? <Eye size={20} /> : <EyeOff size={20} />}</button>
    </Reorder.Item>
  )
}

const FOOTER = ['Artists', 'Exhibitions', 'Art Fairs', 'Events', 'Viewing Room', 'News', 'Publications', 'About']
