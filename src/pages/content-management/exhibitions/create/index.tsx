import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { GeneralTab } from './general.tab'
import { ArtistsTab } from './artists.tab'
import { useEffect, useState } from 'react'
import { ArtworkDetail, Exhibition, ResponseApi, ResponseApiList } from '@/types/API'
import { API } from '@/lib/API'
import { Button } from '@/components/ui/button'
import ExhibitionForm from '@/types/forms/exhibition_form'
import { ArtistsDetail } from '@/types/models/artist_detail'
import ArtistsRequest from '@/types/requests/artists_request'
import { toast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

export type Tab = 'general' | 'artists'

export const ExhibitionsCreatePage = () => {
  const navigateTo = useNavigate()

  const [tab, setTab] = useState<string>('general')
  const [artworkDetail, setArtworkDetail] = useState<ArtworkDetail[]>([])
  const [selectedArtist, setSelectedArtist] = useState<ArtistsDetail[]>([])

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

  const [formData, setFormData] = useState<ExhibitionForm>({
    name: '',
    start_date: '',
    end_date: '',
    organizer: '',
    location: '',
    desc: '',
    tags: '',
    is_visible: 1,
    img: '',
    attach_doc: ''
  })

  const handleSubmit = async () => {
    if (validate()) {
      const body = { ...formData, artists: [] as ArtistsRequest[] }

      // Map over selectedArtist to add artist_id and artwork_id
      selectedArtist.forEach(artist => {
        const artistObj: ArtistsRequest = { artist_id: artist.id, artworks: [] }
        artist.artworks?.forEach(artwork => {
          artistObj.artworks.push({ artwork_id: artwork.id })
        })
        body.artists.push(artistObj)
      })

      try {
        await API.post<typeof body, ResponseApi<Exhibition>>(`/exhibitions`, body, {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data'
        })
        await toast({
          title: `Success!`,
          description: 'Created data'
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
      !formData.is_visible ||
      !formData.tags ||
      !formData.img ||
      !formData.attach_doc
    ) {
      toast({
        variant: 'destructive',
        title: `Please fill out all field`
      })
      validate = false
    } else if (selectedArtist.length == 0) {
      toast({
        variant: 'destructive',
        title: `Please fill artists & artworks`
      })
      validate = false
    }

    return validate
  }

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Add New Exhibition</h1>
      <Tabs defaultValue={tab} value={tab} onValueChange={onTabChange}>
        <TabsList className='mb-4'>
          <TabsTrigger value='general'>GENERAL INFORMATION</TabsTrigger>
          <TabsTrigger value='artists'>ARTISTS & ARTWORKS</TabsTrigger>
        </TabsList>
        <TabsContent value='general'>
          <GeneralTab formData={formData} setFormData={setFormData} />
        </TabsContent>
        <TabsContent value='artists'>
          <ArtistsTab artworkDetail={artworkDetail} selectedArtist={selectedArtist} setSelectedArtist={setSelectedArtist} />
        </TabsContent>
      </Tabs>
      <div className='col-span-2 gap-4 flex items-center justify-end'>
        <Button variant={'outline'} size='lg' onClick={() => {navigateTo(-1)}}>
          Back
        </Button>
        <Button size='lg' type='button' onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </section>
  )
}
