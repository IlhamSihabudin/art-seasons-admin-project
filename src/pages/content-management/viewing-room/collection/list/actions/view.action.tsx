import { Eye, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Collection } from '@/types/API'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Exhibition, ExhibitionDetail, ResponseApi } from '@/types/API'
import { useCallback, useEffect, useState } from 'react'
import { API } from '@/lib/API'
// import { Link } from 'react-router-dom'

export const ViewAction = ({ data }: { data: Collection }) => {
  const [artists, setArtists] = useState<ExhibitionDetail | null>(null);
  const [tab, setTab] = useState<"general" | "artists">("general");

  const handleOnClick = useCallback( async () => {
    try {
      const fetch = await API.get<ResponseApi<ExhibitionDetail>>(`/viewing-room/collection/${data.id}`);
      setArtists(fetch.data);
    } catch (error) {
      console.log('Error fetching data:', error.message);
    }
  }, [data.id])

  const onTabChange = (value) => {
    setTab(value);
  }
  
  useEffect(() => {
    if (tab === "artists") {
      handleOnClick();
    }
  }, [handleOnClick, tab])

  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>{data.name}</h1>
        <Tabs defaultValue={tab} onValueChange={onTabChange} >
          <TabsList className='mb-4'>
            <TabsTrigger value='general'>GENERAL INFORMATION</TabsTrigger>
            <TabsTrigger value='artists'>ARTISTS & ARTWORKS</TabsTrigger>
          </TabsList>
          <TabsContent value='general'>
            <GeneralTab data={data} />
          </TabsContent>
          <TabsContent value='artists'>
            <ArtistsTab data={artists} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}


const GeneralTab = ({ data }: { data: Exhibition }) => {
  return (
    <>
      <div className='text-sm'>
        <p className='font-medium'>Tag</p>
        <p className='py-4 px-3'>{data.tags}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Organizer</p>
        <p className='py-4 px-3'>{data.organizer}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Location</p>
        <p className='py-4 px-3'>{data.location}</p>
      </div>
      <div className='text-sm mb-2.5'>
        <p className='font-medium'>Featured Image</p>
        <img src={data.img} alt={data.desc} className='mt-2.5' />
      </div>
      {/* <div className='text-sm'>
        <p className='font-medium'>Attach Document</p>
        <Link className='py-4 px-3 underline block' to={data.attach_doc}>
          {data.name}.pdf
        </Link>
      </div> */}
      <div className='text-sm'>
        <p className='font-medium'>Visibility</p>
        <p className='py-4 px-3'>{data.is_visible === 1 ? "Visible" : "Hidden"}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Long Description</p>
        <div className='space-y-2.5 py-4 px-3'>
          <p>
            {data.desc}
          </p>
        </div>
      </div>
    </>
  )
}

const ArtistsTab = ({ data }: { data: ExhibitionDetail }) => {
  
  return (
    <div className='space-y-10'>
      {!data ? <Loader2 size={40} className="animate-spin mx-auto m-10" />
      : data.hasArtists.map((item) => (
        <div key={item.id}>
          <p className='text-xl font-medium mb-3'>{item.artist.fullname}</p>
          <div className='grid grid-cols-2 gap-4'>
            {item.has_artworks.map((artwork) => (
              <div key={artwork.id} className='py-2.5 px-2 rounded border flex items-center gap-4'>
                <img src={artwork.artwork.img} alt={artwork.artwork.desc} className='w-14 h-14 aspect-square object-cover object-center rounded' />
                <p className='text-sm'>{artwork.artwork.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

