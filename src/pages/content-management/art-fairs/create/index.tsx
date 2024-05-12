import { Tabs, TabsContent } from '@/components/ui/tabs'

import { GeneralTab } from './general.tab'
import { ArtistsTab } from './artists.tab'
import { useEffect, useState } from 'react';
import { ArtFair, ArtworkDetail, ResponseApiList } from '@/types/API';
import { API } from '@/lib/API';

export type Tab = "general" | "artists";

interface Artwork {
  artwork_id: string;
}

interface Artist {
  artist_id: string;
  artworks: Artwork[];
}

export interface ArtFairForm extends ArtFair {
  artists?: Artist[];
}

export const ArtFairsCreatePage = () => {
  const [tab, setTab] = useState<Tab>("general");
  const [isNext, setIsNext] = useState<boolean>(false);
  const [artworkDetail, setArtworkDetail] = useState<ArtworkDetail[]>([]);
  const [form, setForm] = useState<ArtFairForm>();
  
  const onTabChange = (value: string) => {
    setTab(value as Tab);
  }
  // useEffect for get list artists and artist's artwork
  useEffect(() => {
    (async () => {
      try {
        const response = await API.get<ResponseApiList<ArtworkDetail>>('/inventory/artworks?limit=10000')
        setArtworkDetail(response.data);
      } catch (error) {
        let errorMessage = "Error fetching data";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log('Error fetching data:', errorMessage);
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

  const handleFormInput = (value: ArtFairForm) => {
    setForm(value);
  }

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Add New Art Fair</h1>
      <Tabs  defaultValue={tab} value={tab} onValueChange={onTabChange}>
        <TabsContent value='general'>
          <GeneralTab callback={handleNextBackTab} formInput={handleFormInput} form={form} />
        </TabsContent>
        <TabsContent value='artists'>
          <ArtistsTab callback={handleNextBackTab} artworkDetail={artworkDetail} formInput={form} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
