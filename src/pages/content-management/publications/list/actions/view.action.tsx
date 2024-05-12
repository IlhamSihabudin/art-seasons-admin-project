import { Eye } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export const ViewAction = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>Emily Chen</h1>
        <div className='text-sm'>
          <p className='font-medium'>Tag</p>
          <p className='py-4 px-3'>A-emilychen</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Birth Year</p>
          <p className='py-4 px-3'>1992</p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Short Description</p>
          <p className='py-4 px-3'>
            Step into the world of our featured artist, Emily Chen. Her imaginative creations blend culture and creativity, offering a unique artistic journey through contemporary
            Asian landscapes.
          </p>
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Profile Picture</p>
          <img src='https://placehold.co/250x130' alt='' className='mt-2.5' />
        </div>
        <div className='text-sm'>
          <p className='font-medium'>Attach Document</p>
          <p className='py-4 px-3'>emilychen_portfolio.pdf</p>
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
              Chen's work is a captivating blend of East and West, tradition and innovation. Her paintings often feature intricate brushwork, vivid hues, and a sense of harmony
              that resonates with viewers worldwide. Her mastery of multiple mediums, including oil, ink, and digital art, showcases her versatility and dedication to artistic
              exploration.
            </p>
            <p>
              Emily's artistic career took flight in the late '90s, and she quickly gained recognition for her evocative pieces, which have been exhibited in galleries from Beijing
              to New York. Her 'Reflections of Culture' series, characterized by its intricate detailing and interplay of light and shadow, stands as a testament to her commitment
              to capturing the essence of her surroundings.
            </p>
            <p>
              Over the years, she has drawn inspiration from her extensive travels and her deep appreciation for the beauty of nature and human emotion. Her work has been described
              as a visual dialogue between tradition and the contemporary, inviting viewers to explore the delicate intricacies of her world.
            </p>
            <p>
              As an artist who constantly evolves, Emily remains committed to her craft. Her passion for sharing her love of art extends to mentoring emerging artists, making her
              an influential figure in the Asian art community. With each stroke of her brush, Emily Chen continues to captivate and inspire art enthusiasts around the
              globe.captivate and inspire art enthusiasts around the globe.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
