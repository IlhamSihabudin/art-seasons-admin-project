import { useEffect, useState } from 'react'
import { Reorder } from 'framer-motion'
import { ChevronsUpDown, Eye, EyeOff } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { API } from '@/lib/API'
import { ResponseApi } from '@/types/API'
import { Input } from '@/components/ui/input'

interface Footer {
  name: string;
  order: number;
  is_visible: number;
}

interface DisplayContent {
  name: string;
  is_visible: number;
}

interface ResponseFooter {
  footers: Footer[];
  display_content: DisplayContent[];
}

export const FooterTab = () => {
  const { toast } = useToast();
  const [footer, setFooter] = useState<Footer[]>(FOOTER)

  const [subscribe, setSubscribe] = useState(false)
  const [sosmed, setSosmed] = useState(false)

  const handleSubmit = async () => {
    const footReqeust = footer.map((ft, index) => {
      return {
        ...ft,
        order: index + 1
      }
    })

    const contentRequest = [
      {
        name: "Subscribe",
        is_visible: subscribe ? 1 : 0
      },
      {
        name: "Sosial Media Links",
        is_visible: sosmed ? 1 : 0
      }
    ]

    const body: ResponseFooter = {
      footers: footReqeust,
      display_content: contentRequest
    }
    try {
      await API.post<Footer[], ResponseApi<ResponseFooter>>(`/settings/footers`, body, {
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
        const response = await API.get<ResponseApi<ResponseFooter>>(`/settings/footers`)
        setFooter(response.data.footers);
        const sub = response.data.display_content.find((con) => con.name === "Subscribe")
        const sos = response.data.display_content.find((con) => con.name === "Sosial Media Links")
        setSubscribe(sub?.is_visible == 1 ? true : false)
        setSosmed(sos?.is_visible == 1 ? true : false)
      } catch (error) {
        console.log('Error fetching data:', error.message);
      }
    })()
  }, [])

  return (
    <section className='grid md:grid-cols-2 md:gap-10 gap-5 container'>
      <fieldset>
        <Label className='block mb-2.5'>Pages Displayed on Footer</Label>
        <Reorder.Group axis='y' onReorder={setFooter} values={footer} className='space-y-2.5 overflow-hidden'>
          {footer.map(foot => (
            <Card foot={foot} key={foot.name} footer={footer} setFooter={setFooter} />
          ))}
        </Reorder.Group>
      </fieldset>
      <fieldset>
        <Label className='block mb-2.5'>Content Displayed on Footer</Label>
        <div className='space-y-2.5'>
          <div className='flex items-center space-x-2'>
            <Input
              type="checkbox"
              id="subscribe"
              checked={subscribe}
              onChange={() => setSubscribe(!subscribe)}
            />
            <label htmlFor='subscribe' className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Subscribe
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Input
              type="checkbox"
              id="sosmed"
              checked={sosmed}
              onChange={() => setSosmed(!sosmed)}
            />
            <label htmlFor='sosmed' className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Social Media Links
            </label>
          </div>
        </div>
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
  foot: (typeof FOOTER)[0]
  footer: typeof FOOTER
  setFooter: (value: typeof FOOTER) => void
}

const Card = ({ footer, foot, setFooter }: CardProps) => {
  const handleVisible = () => {
    const sp = footer.map((ft) => {
      if (foot.name == ft.name) {
        return {
          ...ft,
          is_visible: foot.is_visible == 1 ? 0 : 1
        }
      }
      return ft
    })
    setFooter(sp)
  }

  return (
    <Reorder.Item value={foot} className={`p-4 rounded-lg border bg-white flex items-center cursor-grab ${foot.is_visible == 1 ? 'opacity-100' : 'opacity-60'} transition-opacity`}>
      <div className='flex items-center gap-2 flex-1'>
        <ChevronsUpDown size={24} />
        <p className='text-sm'>{foot.name}</p>
      </div>
      <button onClick={handleVisible}>{foot.is_visible == 1 ? <Eye size={20} /> : <EyeOff size={20} />}</button>
    </Reorder.Item>
  )
}

const FOOTER = [
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
