import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '@/lib/API'
import { Artist, ResponseApi, User, UserRequest } from '@/types/API'
import { useToast } from "@/components/ui/use-toast"
import { Pencil } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'

export const CustomerEditPage = () => {
  const { toast } = useToast();
  const [data, setData] = useState<User>();
  const [emailEditable, setEmailEditable] = useState(false);
  const [passEditable, setPassEditable] = useState(false);

  const name= useRef("")
  const email = useRef("")
  const password = useRef("")
  const pass_conf = useRef("")
  const phone = useRef("")
  const address = useRef("")
  // const addition = useRef()
  const postal_code = useRef("")

  const params = useParams()
  const navigateTo = useNavigate()

  const [isSubscribed, setisSubscribed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const response = await API.get<ResponseApi<Artist>>(`/customers/${Number(params.id)}`, {
          signal: controller.signal
        }, {
          Accept: "application/json",
        })
        isMounted && setData(response.data);
        setisSubscribed(response.data.is_subscribe)
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
    const formInput: UserRequest = { 
      _method: "PUT",
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      password_confirmation: pass_conf.current.value,
      phone_number: phone.current.value,
      address: address.current.value,
      // addtional_address: addition.current.value,
      postal_code: postal_code.current.value,
      is_subcribe: isSubscribed
    }
    
    try {
      await API.post<UserRequest, ResponseApi<User>>(`/customers/${Number(params.id)}`, formInput, {
        Accept: 'application/json',
        "Content-Type": 'application/json'
      });
      await toast({
        title: `Success!`,
        description: "Updated the data",
      })
      navigateTo('/users/customer');
    } catch (error) {
      console.log('Error updating artist:', error.message);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.response.data.message
      })
    }
  };

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Edit Users</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' autoComplete="off" onSubmit={handleSubmit}>
      <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Name' required placeholder='Enter name'  ref={name} defaultValue={data?.name} />
          <div className='flex relative'>
            <Input type='email' disabled={!emailEditable} className='absolute w-[90%]' label='Email' required placeholder='Enter email' ref={email} autoComplete="off" defaultValue={data?.email} />
            <Pencil size={24} className='cursor-pointer mb-20 hover:opacity-90 transition-opacity absolute right-0 top-7' onClick={() => setEmailEditable(true)} />
          </div>
          <div className='pt-10 pb-10 flex relative '>
            <Input type='password' disabled={!passEditable} className='absolute w-[90%]' required label='Password' placeholder="Leave it blank if you don't want to change the password"  ref={password} autoComplete="off" />
            <Pencil size={24} className='cursor-pointer mb-20 hover:opacity-90 transition-opacity absolute right-0 top-16' onClick={() => setPassEditable(true)} />
          </div>
          <Input type='password' disabled={!passEditable} required label='Password Confirmation' placeholder='Enter password confirmation' ref={pass_conf} />
          <Input type="tel" name="telphone" placeholder="+65 9123 4567"  label='Phone Number' ref={phone} defaultValue={data?.phone_number} />
          <Input name="postal" placeholder="Singapore 123 456"  label='Postal Code' ref={postal_code} defaultValue={data?.postal_code} />
          <Textarea name="address" label='Address' placeholder='123 High Street, #12-34, Singapore'  ref={address} defaultValue={data?.address} />
          <fieldset>
            <Label className='block mb-2.5'>Subscribed to Newsletter</Label>
            <RadioGroup className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <input
                  type='radio'
                  value='1'
                  id='visible'
                  required
                  name='isVisible'
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    // setFormData({ ...formData, is_visible: 1 })
                    setisSubscribed(true)
                  }}
                  checked={isSubscribed == true}
                />
                <Label htmlFor='visible' className='font-normal'>
                  Yes
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  type='radio'
                  value='0'
                  id='hidden'
                  name='isVisible'
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    // setFormData({ ...formData, is_visible: 0 })
                    setisSubscribed(false)
                  }}
                  checked={isSubscribed == false}
                />
                <Label htmlFor='hidden' className='font-normal'>
                  No
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>

        {/* <Textarea className='h-full' name="additional" placeholder="Jl. Gatot Subroto, Gg. Alam Bahagia No. 123 " label='Additional Address' ref={addition} defaultValue={data?.additional_address}/> */}

        <div className='col-span-2 gap-4 flex items-center justify-end'>
          <Button variant={'outline'} type='button' size='lg' onClick={() => {navigateTo(-1)}}>
            Back
          </Button>
          <Button size='lg' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </section>
  )
}
