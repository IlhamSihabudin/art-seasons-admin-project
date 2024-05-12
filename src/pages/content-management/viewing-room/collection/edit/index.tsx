import { Tabs, TabsContent } from '@/components/ui/tabs'

import { GeneralTab } from './general.tab'
import { ArtistsTab } from './artists.tab'
import { useEffect, useState } from 'react';
import { ArtworkDetail, CollectionDetail, ResponseApi, ResponseApiList } from '@/types/API';
import { API } from '@/lib/API';
import { useParams } from 'react-router-dom';
import { CollectionBodyRequest } from '../create';

export type Tab = "general" | "artists";

export const ViewingRoomEditPage = () => {
  const [tab, setTab] = useState<Tab>("general");
  const [isNext, setIsNext] = useState<boolean>(false);
  const [artworkDetail, setArtworkDetail] = useState<ArtworkDetail[]>([]);
  const [form, setForm] = useState<CollectionBodyRequest>();

  const [data, setData] = useState<CollectionDetail>();
  const params = useParams()
  
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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const response = await API.get<ResponseApi<CollectionDetail>>(`/viewing-room/collection/${Number(params.id)}`, {
          signal: controller.signal
        }, {
          Accept: "application/json",
        })
        isMounted && setData(response.data);
      } catch (error) {
        console.log('Error fetching data:', error.message);
      }
    })()

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [params.id])

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
      <h1 className='font-bold text-3xl'>Edit Exhibition</h1>
      <Tabs  defaultValue={tab} value={tab} onValueChange={onTabChange}>
        <TabsContent value='general'>
          <GeneralTab callback={handleNextBackTab} formInput={handleFormInput} data={data} />
        </TabsContent>
        <TabsContent value='artists'>
          <ArtistsTab callback={handleNextBackTab} artworkDetail={artworkDetail} formInput={form} paramsId={Number(params.id)} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
