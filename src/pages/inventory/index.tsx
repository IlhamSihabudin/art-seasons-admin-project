import { Outlet } from 'react-router-dom'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ArtworksTab } from './artworks/list'

export const InventoryPage = () => {
  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Inventory</h1>
      <Tabs defaultValue='artworks'>
        <TabsList className='mb-4'>
          <TabsTrigger value='artworks'>Artworks</TabsTrigger>
          <TabsTrigger value='publications'>Publications</TabsTrigger>
        </TabsList>
        <TabsContent value='artworks'>
          <ArtworksTab />
        </TabsContent>
      </Tabs>
      <Outlet />
    </section>
  )
}
