import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { GeneralTab } from './general.tab'
import { ArtistsTab } from './artists.tab'

export const ArtFairsCreatePage = () => {
  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Add New Art Fair</h1>
      <Tabs defaultValue='general'>
        <TabsList className='mb-4'>
          <TabsTrigger value='general'>GENERAL INFORMATION</TabsTrigger>
          <TabsTrigger value='artists'>ARTISTS & ARTWORKS</TabsTrigger>
        </TabsList>
        <TabsContent value='general'>
          <GeneralTab />
        </TabsContent>
        <TabsContent value='artists'>
          <ArtistsTab />
        </TabsContent>
      </Tabs>
    </section>
  )
}
