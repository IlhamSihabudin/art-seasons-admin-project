import { Tabs, TabsContent } from '@/components/ui/tabs'

import { GeneralTab } from './general.tab'
import { ArtistsTab } from './artists.tab'
import { useEffect, useState } from 'react';
import { ArtworkDetail, ResponseApiList } from '@/types/API';
import { API } from '@/lib/API';

export type Tab = "general" | "artists";

export interface CollectionBodyRequest {
  name: string;
  tags: string;
  organizer: string;
  location: string;
  desc: string;
  img: File;
  is_visible: string;
}

export const ViewingRoomCreatePage = () => {
  const [tab, setTab] = useState<Tab>("general");
  const [isNext, setIsNext] = useState<boolean>(false);
  const [artworkDetail, setArtworkDetail] = useState<ArtworkDetail[]>([]);
  const [form, setForm] = useState<CollectionBodyRequest>();

  const onTabChange = (value: Tab) => {
    setTab(value);
  }
  // useEffect for get list artists and artist's artwork
  useEffect(() => {
    (async () => {
      try {
        const response = await API.get<ResponseApiList<ArtworkDetail>>('/inventory/artworks?limit=10000')
        setArtworkDetail(response.data);
      } catch (error) {
        console.log('Error fetching data:', error.message);
      }
    })()
  }, []);

  // handle in general tab / artists tab
  useEffect(() => {
    if (isNext) {
     onTabChange('artists');
    } else {
      onTabChange('general');
    }
  }, [isNext]);

  const handleNextBackTab = (value: boolean) => {
    setIsNext(value);
  };

  const handleFormInput = (value: CollectionBodyRequest) => {
    setForm(value);
  }

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Add New Collection</h1>
      <Tabs  defaultValue={tab} value={tab} onValueChange={onTabChange}>
        <TabsContent value='general'>
          <GeneralTab callback={handleNextBackTab} formInput={handleFormInput} />
        </TabsContent>
        <TabsContent value='artists'>
          <ArtistsTab callback={handleNextBackTab} artworkDetail={artworkDetail} formInput={form} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
