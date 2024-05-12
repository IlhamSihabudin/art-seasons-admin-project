import { Outlet } from 'react-router-dom'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ArtworksTab } from './artworks/list'
import { PublicationsTab } from './publicatios/list'
import { InventoryArtwork, Publication, ResponseApiList } from '@/types/API'
import { useGet } from '@/hooks/useGet'

export const InventoryPage = () => {
  const { data, isLoading } = useGet<ResponseApiList<InventoryArtwork>>('inventory-artworks', '/inventory/artworks?limit=10000')
  const { data: publicationData, isLoading: publicationLoading } = useGet<ResponseApiList<Publication>>('inventory-publications', '/inventory/publications?limit=10000')

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Inventory</h1>
      <Tabs defaultValue='artworks'>
        <TabsList className='mb-4'>
          <TabsTrigger value='artworks'>Artworks</TabsTrigger>
          <TabsTrigger value='publications'>Publications</TabsTrigger>
        </TabsList>
        <TabsContent value='artworks'>
          <ArtworksTab data={!isLoading && data.data} />
        </TabsContent>
        <TabsContent value='publications'>
          <PublicationsTab data={!publicationLoading && publicationData.data} />
        </TabsContent>
      </Tabs>
      <Outlet />
    </section>
  )
}
