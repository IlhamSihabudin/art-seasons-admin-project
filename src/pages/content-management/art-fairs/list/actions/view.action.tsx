import { Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const ViewAction = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>Name of Art Fair A</h1>
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
      </DialogContent>
    </Dialog>
  )
}

const GeneralTab = () => {
  return (
    <>
      <div className='text-sm'>
        <p className='font-medium'>Tag</p>
        <p className='py-4 px-3'>E-APER</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Date</p>
        <p className='py-4 px-3'>12/12/2023 - 01/01/2024</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Organizer</p>
        <p className='py-4 px-3'>Art Seasons</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Location</p>
        <p className='py-4 px-3'>Art Seasons Gallery</p>
      </div>
      <div className='text-sm mb-2.5'>
        <p className='font-medium'>Featured Image</p>
        <img src='https://placehold.co/250x130' alt='' className='mt-2.5' />
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Attach Document</p>
        <Link className='py-4 px-3 underline block' to='https://wiscaksono.com/projects'>
          wiscaksono_portfolio.pdf
        </Link>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Visibility</p>
        <p className='py-4 px-3'>Visible</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Long Description</p>
        <div className='space-y-2.5 py-4 px-3'>
          <p>
            Emily Chen, a visionary in contemporary Asian art, has spent over two decades honing her unique style and making her mark on the international art scene. Born and
            raised in Shanghai, her artistic journey began as a child, inspired by the vibrant colors and rich traditions of her homeland.
          </p>
          <p>
            Chen's work is a captivating blend of East and West, tradition and innovation. Her paintings often feature intricate brushwork, vivid hues, and a sense of harmony that
            resonates with viewers worldwide. Her mastery of multiple mediums, including oil, ink, and digital art, showcases her versatility and dedication to artistic
            exploration.
          </p>
          <p>
            Emily's artistic career took flight in the late '90s, and she quickly gained recognition for her evocative pieces, which have been exhibited in galleries from Beijing
            to New York. Her 'Reflections of Culture' series, characterized by its intricate detailing and interplay of light and shadow, stands as a testament to her commitment to
            capturing the essence of her surroundings.
          </p>
          <p>
            Over the years, she has drawn inspiration from her extensive travels and her deep appreciation for the beauty of nature and human emotion. Her work has been described
            as a visual dialogue between tradition and the contemporary, inviting viewers to explore the delicate intricacies of her world.
          </p>
          <p>
            As an artist who constantly evolves, Emily remains committed to her craft. Her passion for sharing her love of art extends to mentoring emerging artists, making her an
            influential figure in the Asian art community. With each stroke of her brush, Emily Chen continues to captivate and inspire art enthusiasts around the globe.captivate
            and inspire art enthusiasts around the globe.
          </p>
        </div>
      </div>
    </>
  )
}

const ArtistsTab = () => {
  return (
    <div className='space-y-10'>
      {artistsData.map((item, index) => (
        <div key={index}>
          <p className='text-xl font-medium mb-3'>{item.name}</p>
          <div className='grid grid-cols-2 gap-4'>
            {item.artworks.map((artwork, index) => (
              <div key={index} className='py-2.5 px-2 rounded border flex items-center gap-4'>
                <img src={artwork.image} alt='' className='w-14 h-14 aspect-square object-cover object-center rounded' />
                <p className='text-sm'>{artwork.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const artistsData = [
  {
    name: 'Artist Name',
    artworks: [
      {
        image: 'https://placehold.co/52x52',
        name: 'Artwork Name'
      },
      {
        image: 'https://placehold.co/52x52',
        name: 'Artwork Name'
      },
      {
        image: 'https://placehold.co/52x52',
        name: 'Artwork Name'
      }
    ]
  },
  {
    name: 'Artist Name',
    artworks: [
      {
        image: 'https://placehold.co/52x52',
        name: 'Artwork Name'
      },
      {
        image: 'https://placehold.co/52x52',
        name: 'Artwork Name'
      }
    ]
  },
  {
    name: 'Artist Name',
    artworks: [
      {
        image: 'https://placehold.co/52x52',
        name: 'Artwork Name'
      },
      {
        image: 'https://placehold.co/52x52',
        name: 'Artwork Name'
      },
      {
        image: 'https://placehold.co/52x52',
        name: 'Artwork Name'
      },
      {
        image: 'https://placehold.co/52x52',
        name: 'Artwork Name'
      }
    ]
  }
]
