import { useState } from 'react'
import { Reorder } from 'framer-motion'
import { ChevronsUpDown, Eye, EyeOff } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export const HeaderTab = () => {
  const [pages, setPages] = useState(PAGES)

  return (
    <section className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
      <fieldset>
        <Label className='block mb-2.5'>Pages Displayed on Header</Label>
        <Reorder.Group axis='y' onReorder={setPages} values={pages} className='space-y-2.5 overflow-hidden'>
          {pages.map(page => (
            <Card page={page} key={page} />
          ))}
        </Reorder.Group>
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
  page: (typeof PAGES)[0]
}

const Card = ({ page }: CardProps) => {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <Reorder.Item value={page} className={`p-4 rounded-lg border bg-white flex items-center cursor-grab ${isVisible ? 'opacity-100' : 'opacity-60'} transition-opacity`}>
      <div className='flex items-center gap-2 flex-1'>
        <ChevronsUpDown size={24} />
        <p className='text-sm'>{page}</p>
      </div>
      <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? <Eye size={20} /> : <EyeOff size={20} />}</button>
    </Reorder.Item>
  )
}

const PAGES = ['Artists', 'Exhibitions', 'Art Fairs', 'Events', 'Viewing Room', 'News', 'Publications', 'About']
