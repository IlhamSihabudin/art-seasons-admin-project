import { Eye, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArtFair, ArtfairDetail, ResponseApi } from '@/types/API'
import { useCallback, useEffect, useState } from 'react'
import { API } from '@/lib/API'
import { formatDate } from '@/pages/content-management/exhibitions/list/columns'

export const ViewAction = ({ data }: { data: ArtFair }) => {
  const [artists, setArtists] = useState<ArtfairDetail>();
  const [tab, setTab] = useState<string>("general");

  const handleOnClick = useCallback( async () => {
    try {
      const fetch = await API.get<ResponseApi<ArtfairDetail>>(`/art-fair/${data.id}`);
      setArtists(fetch.data);
    } catch (error) {
      let errorMessage = "Error fetching data";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log('Error fetching data:', errorMessage);
    }
  }, [data.id])

  const onTabChange = (value: string) => {
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

const GeneralTab = ({ data }: { data: ArtFair }) => {
  return (
    <>
      <div className='text-sm'>
        <p className='font-medium'>Tag</p>
        <p className='py-4 px-3'>{data.tags}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Date</p>
        <p className='py-4 px-3'>{formatDate(data.start_date)} - {formatDate(data.end_date)}</p>
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
        <img src={data.img.toString()} alt={data.desc} className='mt-2.5' />
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Attach Document</p>
        <Link className='py-4 px-3 underline block' to={data.attach_doc.toString()}>
          {data.name}.pdf
        </Link>
      </div>
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

const ArtistsTab = ({ data }: { data?: ExhibitionDetail }) => {
  return (
    <div className='space-y-10'>
      {!data ? <Loader2 size={40} className="animate-spin mx-auto m-10" />
      : data.artists.map((item) => (
        <div key={item.artist_id}>
          <p className='text-xl font-medium mb-3'>{item?.artist_name}</p>
          <div className='grid grid-cols-2 gap-4'>
            {item.artworks.map((artwork) => (
              <div key={artwork?.artwork_id} className='py-2.5 px-2 rounded border flex items-center gap-4'>
                <img src={artwork?.artwork_img} alt={artwork?.artwork_desc} className='w-14 h-14 aspect-square object-cover object-center rounded' />
                <p className='text-sm'>{artwork?.artwork_name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
