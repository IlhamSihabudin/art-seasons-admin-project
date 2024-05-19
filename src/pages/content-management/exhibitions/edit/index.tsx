import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { GeneralTab } from './general.tab'
import { ArtistsTab } from './artists.tab'
import { useEffect, useState } from 'react'
import { ArtworkDetail, Exhibition, ExhibitionDetail, ResponseApi, ResponseApiList } from '@/types/API'
import { API } from '@/lib/API'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import ExhibitionForm from '@/types/forms/exhibition_form'
import { ArtistsDetail } from '@/types/models/artist_detail'
import ArtistsRequest from '@/types/requests/artists_request'
import { toast } from '@/components/ui/use-toast'
import { AxiosError } from 'axios'

export type Tab = 'general' | 'artists'

export const ExhibitionsEditPage = () => {
  const navigateTo = useNavigate()
  const params = useParams()

  const [tab, setTab] = useState<string>('general')
  const [artworkDetail, setArtworkDetail] = useState<ArtworkDetail[]>([])
  const [selectedArtist, setSelectedArtist] = useState<ArtistsDetail[]>([])
  const [data, setData] = useState<ExhibitionDetail>()

  const [formData, setFormData] = useState<ExhibitionForm>({
    name: '',
    start_date: '',
    end_date: '',
    organizer: '',
    location: '',
    desc: '',
    tags: '',
    is_visible: 0,
  })

  const onTabChange = (value: string) => {
    setTab(value)
  }
  // useEffect for get list artists and artist's artwork
  useEffect(() => {
    (async () => {
      try {
        const response = await API.get<ResponseApiList<ArtworkDetail>>('/inventory/artworks?limit=10000')
        setArtworkDetail(response.data)
      } catch (error) {
        let errorMessage = 'Error fetching data'
        if (error instanceof Error) {
          errorMessage = error.message
        }
        console.log('Error fetching data:', errorMessage)
      }
    })()
  }, [])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController();
    (async () => {
      try {
        const response = await API.get<ResponseApi<ExhibitionDetail>>(
          `/exhibitions/${Number(params.id)}`,
          {
            signal: controller.signal
          },
          {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        )
        isMounted && setData(response.data)
        setFormData({
          name: response.data.name ?? '',
          start_date: response.data.start_date ?? '',
          end_date: response.data.end_date ?? '',
          organizer: response.data?.organizer ?? '',
          location: response.data?.location ?? '',
          desc: response.data?.desc ?? '',
          tags: response.data.tags,
          is_visible: response.data?.is_visible ?? 0,
          // img: response.data?.img ?? undefined,
          // attach_doc: response.data?.attach_doc ?? undefined,
          artists: response.data.artists
        })
      } catch (error) {
        let errorMessage = 'Error fetching data'
        if (error instanceof Error) {
          errorMessage = error.message
        }
        console.log('Error fetching data:', errorMessage)
      }
    })()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [params.id])

  const handleSubmit = async () => {
    if (validate()) {
      // Initialize body object with formInput data
      const body = {
        _method: 'PUT',
        ...formData,
        artists: [] as ArtistsRequest[]
      }

      // Map over selectedArtist to add artist_id and artwork_id
      if (selectedArtist.length > 0) {
        selectedArtist.forEach(artist => {
          const artistObj: ArtistsRequest = { artist_id: artist.id, artworks: [] }
          artist.artworks?.forEach(artwork => {
            artistObj.artworks.push({ artwork_id: artwork.id })
          })
          body.artists.push(artistObj)
        })
      } else {
        body.artists = data?.artists ?? []
      }

      try {
        await API.post<typeof body, ResponseApi<Exhibition>>(`/exhibitions/${Number(params.id)}`, body, {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data'
        })
        await toast({
          title: `Success!`,
          description: 'Updated data'
        })
        navigateTo('/content-management/exhibitions')
      } catch (error) {
        const err = error as AxiosError
        toast({
          variant: 'destructive',
          title: 'Something went wrong.',
          description: (err.response?.data as AxiosError).message
        })
      }

      console.log('form data', body)
    }
  }

  const validate = (): boolean => {
    let validate = true
    // verify data
    if (
      !formData.name ||
      !formData.start_date ||
      !formData.end_date ||
      !formData.organizer ||
      !formData.location ||
      !formData.desc ||
      // !formData.is_visible ||
      !formData.tags 
      // !formData.img ||
      // !formData.attach_doc
    ) {
      toast({
        variant: 'destructive',
        title: `Please fill out all field`
      })
      validate = false
      console.log('form data', formData)
    }

    return validate
  }

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Edit Exhibition</h1>
      <Tabs defaultValue={tab} value={tab} onValueChange={onTabChange}>
        <TabsList className='mb-4'>
          <TabsTrigger value='general'>GENERAL INFORMATION</TabsTrigger>
          <TabsTrigger value='artists'>ARTISTS & ARTWORKS</TabsTrigger>
        </TabsList>
        <TabsContent value='general'>
          <GeneralTab formData={formData} setFormData={setFormData} initialImage={data?.img} />
        </TabsContent>
        <TabsContent value='artists'>
          <ArtistsTab artworkDetail={artworkDetail} selectedArtist={selectedArtist} setSelectedArtist={setSelectedArtist} data={data} />
        </TabsContent>
      </Tabs>
      <div className='col-span-2 gap-4 flex items-center justify-end'>
        <Button
          variant={'outline'}
          size='lg'
          onClick={() => {
            navigateTo(-1)
          }}
        >
          Back
        </Button>
        <Button size='lg' type='button' onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </section>
  )
}
