import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup } from '@/components/ui/radio-group'
import { useEffect, useRef, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { Publication, ResponseApi } from '@/types/API'
import { API } from '@/lib/API'

export const PublicationsEditPage = () => {
  const { toast } = useToast();
  const [data, setData] = useState<Publication>();
  
  const [img, setImg] = useState<File | undefined>();
  const [isVisible, setIsVisible] = useState("");
  const name = useRef("")
  const desc = useRef("")
  const author = useRef("")
  const price = useRef("")
  const current_stock = useRef("")

  const params = useParams()
  const navigateTo = useNavigate()

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const response = await API.get<ResponseApi<Publication>>(`/inventory/publications/${Number(params.id)}`, {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formInput: Publication = { 
      _method: "PUT",
      name: name.current.value, 
      desc: desc.current.value, 
      author: author.current.value, 
      price: price.current.value, 
      img, 
      is_visible: isVisible, 
      current_stock: current_stock.current.value, 
    }
    
    try {
      await API.post<Publication, ResponseApi<Publication>>(`/inventory/publications/${Number(params.id)}`, formInput, {
        Accept: '*/*',
        "Content-Type": 'multipart/form-data'
      });
      await toast({
        title: `Success!`,
        description: "Updated the data",
      })
      navigateTo('/content-management/publications');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.response.data.message
      })
    }
  };

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Edit Publication</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' encType='multipart/form-data' onSubmit={handleSubmit}>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Full Name' required placeholder='Enter full name'  ref={name} defaultValue={data?.name} />
          <Input label='Author' required placeholder='Enter Author'  ref={author} defaultValue={data?.author}/>
          <Input type="text" pattern="\d*" maxLength="6" required label='Price' placeholder='Enter Price' ref={price} defaultValue={data?.price} />
          <Input type="text" pattern="\d*" maxLength="6" required label='Current Stock' placeholder='Enter Current Stock'  ref={current_stock} defaultValue={data?.current_stock}/>
          <fieldset>
            <Input accept='.jpeg,.png,.jpg,.gif,.svg' label='Publication Image' type='file' required onChange={(e: React.FormEvent<HTMLInputElement>) => setImg(e.target.files[0])} />
            <ul className='text-xs space-y-1 mt-2'>
              <li>Format: jpeg, png, jpg, gif, svg</li>
              <li>File size: 2MB (max)</li>
            </ul>
          </fieldset>

          <fieldset>
            <Label className='block mb-2.5'>Visibility</Label>
            <RadioGroup className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <input type="radio" value='1' id='visible' required name="isVisible" onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible(e.target.value)}/>
                <Label htmlFor='visible' className='font-normal'>
                  Visible
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <input type="radio" value='0' id='hidden' name="isVisible" onChange={(e: React.FormEvent<HTMLInputElement>) => setIsVisible(e.target.value)} />
                <Label htmlFor='hidden' className='font-normal'>
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>
        <Textarea label='Description' required placeholder='Enter your comprehensive description' className='h-full' ref={desc} defaultValue={data?.desc} />
        <div className='col-span-2 flex items-center justify-end'>
          <Button size='lg' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </section>
  )
}
