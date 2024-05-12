import { Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { InventoryArtwork } from '@/types/API'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from 'react-router-dom';

export const ViewAction = ({ data }: { data: InventoryArtwork }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>{data.name}</h1>
        <Tabs defaultValue='general' >
          <TabsList className='mb-4'>
            <TabsTrigger value='general'>GENERAL INFORMATION</TabsTrigger>
            <TabsTrigger value='artists'>ARTISTS & ARTWORKS</TabsTrigger>
          </TabsList>
          <TabsContent value='general'>
            <GeneralTab data={data} />
          </TabsContent>
          <TabsContent value='artists'>
            <ArtistsTab data={data} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

const GeneralTab = ({ data }: { data: InventoryArtwork }) => {
  return (
    <>
      <div className='text-sm'>
          <p className='font-medium'>Tag</p>
          <p className='py-4 px-3'>{data.tags.join(', ')}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Price</p>
          <p className='py-4 px-3'>{data.price}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Current Stock</p>
          <p className='py-4 px-3'>
            {data.current_stock}
          </p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Picture</p>
          <img src={data.img} alt={data.name} className='mt-2.5' />
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Visibility</p>
          <p className='py-4 px-3'>{data.is_visible == 1 ? "Visible" : "Hidden"}</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Long Description</p>
          <div className='space-y-2.5 py-4 px-3'>
            <p>
              {data.desc}
            </p>
          </div>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Artist</p>
          <div className='space-y-2.5 py-4 px-3'>
            {data.has_artists.map((artist) => (
              <p key={artist.id}>
                {artist.artist.fullname}
              </p>
            ))}
          </div>
        </div>
    </>
  )
}

const ArtistsTab = ({ data }: { data: InventoryArtwork }) => {
  
  return (
    <div className='space-y-10'>
      {!data ? <Loader2 size={40} className="animate-spin mx-auto m-10" />
      : data.has_artists.map((item) => (
        <div key={item.id}>
          <p className='text-xl font-medium mb-3'>{item.artist.fullname}</p>
          <div className='grid grid-cols-2 gap-4'>
            <div className='py-2.5 px-2 rounded border flex items-center gap-4'>
              <img src={item.artist.profile_picture} alt={item.artist.short_desc} className='w-14 h-14 aspect-square object-cover object-center rounded' />
            </div>
          </div>
          <div className='text-sm'>
            <p className='font-medium'>Artist's external website</p>
            <Link className='py-4 px-3 underline block' to={item.link}>{item.link}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}
