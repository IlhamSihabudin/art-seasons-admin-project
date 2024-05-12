import { useEffect, useState } from 'react'
import { Reorder } from 'framer-motion'
import { ChevronsUpDown, Eye, EyeOff } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { API } from '@/lib/API'
import { useToast } from '@/components/ui/use-toast'

interface Header {
  name: string;
  order: number;
  is_visible: number;
}

export const HeaderTab = () => {
  const { toast } = useToast();

  const [pages, setPages] = useState<Header[]>(PAGES)

  const handleSubmit = async () => {
    const body = pages.map((pag, index) => {
      return {
        ...pag,
        order: index + 1
      }
    })
    try {
      await API.post<Header[], ResponseApi<Header>>(`/settings/headers`, body, {
        Accept: 'application/json',
        "Content-Type": 'application/json'
      });
      await toast({
        title: `Success!`,
        description: "Created data",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.response.data.message
      })
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await API.get<ResponseApi<Header>>(`/settings/headers`)
        setPages(response.data);
      } catch (error) {
        console.log('Error fetching data:', error.message);
      }
    })()
  }, [])

  return (
    <section className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
      <fieldset>
        <Label className='block mb-2.5'>Pages Displayed on Header</Label>
        <Reorder.Group axis='y' onReorder={setPages} values={pages} className='space-y-2.5 overflow-hidden'>
          {pages.map((page) => (
            <Card page={page} pages={pages} setPages={setPages} key={page.name} />
          ))}
        </Reorder.Group>
      </fieldset>
      <div className='col-span-2 flex items-center justify-end'>
        <Button size='lg' type='submit' onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </section>
  )
}

type CardProps = {
  page: (typeof PAGES)[0]
  pages: typeof PAGES
  setPages: (value: typeof PAGES) => void
}

const Card = ({ page, pages, setPages }: CardProps) => {
  const handleVisible = () => {
    const sp = pages.map((pag) => {
      if (pag.name == page.name) {
        return {
          ...pag,
          is_visible: page.is_visible == 1 ? 0 : 1
        }
      }
      return pag
    })
    setPages(sp)
  }
  
  return (
    <Reorder.Item value={page} className={`p-4 rounded-lg border bg-white flex items-center cursor-grab ${page.is_visible === 1 ? 'opacity-100' : 'opacity-60'} transition-opacity`}>
      <div className='flex items-center gap-2 flex-1'>
        <ChevronsUpDown size={24} />
        <p className='text-sm'>{page.name}</p>
      </div>
      <button onClick={handleVisible}>{page.is_visible === 1 ? <Eye size={20} /> : <EyeOff size={20} />}</button>
    </Reorder.Item>
  )
}

const PAGES = [
  {
    "name": 'Artists',
    "is_visible": 1
  },
  {
    "name": 'Exhibitions',
    "is_visible": 1
  },
  {
    "name": 'Art Fairs',
    "is_visible": 1
  },
  {
    "name": 'Events',
    "is_visible": 1
  },
  {
    "name": "Viewing Room",
    "is_visible": 1
  },
  {
    "name": "News",
    "is_visible": 1
  },
  {
    "name": "Publications",
    "is_visible": 1
  },
  {
    "name": "About",
    "is_visible": 1
  }
]
