import { Tabs, TabsContent } from '@/components/ui/tabs'

import { GeneralTab } from './general.tab'
import { ArtistsTab } from './artists.tab'
import { useEffect, useState } from 'react';
import { ArtworkDetail, Exhibition, ExhibitionDetail, ResponseApi, ResponseApiList } from '@/types/API';
import { API } from '@/lib/API';
import { useParams } from 'react-router-dom';

export type Tab = "general" | "artists";

interface Artwork {
  artwork_id: string;
}

interface Artist {
  artist_id: string;
  artworks: Artwork[];
}

export interface ExhibitionForm extends Exhibition {
  artists?: Artist[];
}

export const ExhibitionsEditPage = () => {
  const [tab, setTab] = useState<string>("general");
  const [isNext, setIsNext] = useState<boolean>(false);
  const [artworkDetail, setArtworkDetail] = useState<ArtworkDetail[]>([]);
  const [form, setForm] = useState<ExhibitionForm | undefined>();
  const [isVisible, setIsVisible] = useState("");

  const [data, setData] = useState<ExhibitionDetail>();
  const params = useParams()
  
  const onTabChange = (value: string) => {
    setTab(value);
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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const response = await API.get<ResponseApi<ExhibitionDetail>>(`/exhibitions/${Number(params.id)}`, {
          signal: controller.signal
        }, {
          Accept: "application/json",
          "Content-Type": "application/json"
        })
        isMounted && setData(response.data);
        setIsVisible(response.data.is_visible.toString());
      } catch (error) {
        let errorMessage = "Error fetching data";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log('Error fetching data:', errorMessage);
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

  const handleFormInput = (value: ExhibitionForm) => {
    setForm(value);
  }

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Edit Exhibition</h1>
      <Tabs  defaultValue={tab} value={tab} onValueChange={onTabChange}>
        <TabsContent value='general'>
          <GeneralTab callback={handleNextBackTab} formInput={handleFormInput} data={data} setIsVisible={setIsVisible} isVisible={isVisible} />
        </TabsContent>
        <TabsContent value='artists'>
          <ArtistsTab callback={handleNextBackTab} artworkDetail={artworkDetail} formInput={form} paramsId={Number(params.id)} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
