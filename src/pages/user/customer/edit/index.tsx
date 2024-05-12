import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '@/lib/API'
import { Artist, ResponseApi, User, UserRequest } from '@/types/API'
import { useToast } from "@/components/ui/use-toast"
import { Pencil } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

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
  const addition = useRef()
  const postal_code = useRef("")

  const params = useParams()
  const navigateTo = useNavigate()

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
      addtional_address: addition.current.value,
      postal_code: postal_code.current.value
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
          <Input type="tel" name="telphone" placeholder="081234567890" pattern="[0-9]{12}" maxLength="12" required label='Phone Number' ref={phone} defaultValue={data?.phone_number} />
          <Input name="postal" placeholder=" 12345" maxLength={6} label='Postal Code' ref={postal_code} defaultValue={data?.postal_code} />
          <Textarea name="address" label='Address' placeholder='Jakarta Selatan, DKI Jakarta, Indonesia'  ref={address} defaultValue={data?.address} />
        </fieldset>

        <Textarea className='h-full' name="additional" placeholder="Jl. Gatot Subroto, Gg. Alam Bahagia No. 123 " label='Additional Address' ref={addition} defaultValue={data?.additional_address}/>

        <div className='col-span-2 flex items-center justify-end'>
          <Button size='lg' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </section>
  )
}
