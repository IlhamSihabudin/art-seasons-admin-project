import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/radio-group'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '@/lib/API'
import { Artist, ResponseApi, User } from '@/types/API'
import { useToast } from "@/components/ui/use-toast"
import { Pencil } from 'lucide-react'

export const UserEditPage = () => {
  const { toast } = useToast();
  const [data, setData] = useState<User>();
  const [emailEditable, setEmailEditable] = useState(false);
  const [passEditable, setPassEditable] = useState(false);

  const [role, setRole] = useState();
  const name= useRef("")
  const email = useRef("")
  const password = useRef("")
  const pass_conf = useRef("")
  // const phone = useRef("")

  const params = useParams()
  const navigateTo = useNavigate()
  const paramsRole = params.role?.toLowerCase()

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    (async () => {
      try {
        const response = await API.get<ResponseApi<Artist>>(`/users/${Number(params.id)}`, {
          signal: controller.signal
        }, {
          Accept: "application/json",
        })
        isMounted && setData(response.data);
        setRole(paramsRole);
      } catch (error) {
        let errorMessage = "Error fetching data";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log(errorMessage);
      }
    })()

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [params.id, paramsRole])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formInput: UserRequest = { 
      _method: "PUT",
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      password_confirmation: pass_conf.current.value,
      // phone_number: phone.current.value,
      role
    }
    
    try {
      await API.post<Artist, ResponseApi>(`/users/${Number(params.id)}`, formInput, {
        Accept: 'application/json',
        "Content-Type": 'application/json'
      });
      await toast({
        title: `Success!`,
        description: "Updated the data",
      })
      navigateTo('/users/admin');
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
          <Input label='Name' required placeholder='Enter name' ref={name} defaultValue={data?.name} />
          <div className='flex relative'>
            <Input type='email' disabled={!emailEditable} className='absolute w-[90%]' label='Email' required placeholder='Enter email' ref={email} autoComplete="off" defaultValue={data?.email} />
            <Pencil size={24} className='cursor-pointer mb-20 hover:opacity-90 transition-opacity absolute right-0 top-7' onClick={() => setEmailEditable(true)} />
          </div>
          <div className='pt-10 pb-10 flex relative '>
            <Input type='password' disabled={!passEditable} className='absolute w-[90%]' required label='Password' placeholder="Leave it blank if you don't want to change the password"  ref={password} autoComplete="off" />
            <Pencil size={24} className='cursor-pointer mb-20 hover:opacity-90 transition-opacity absolute right-0 top-16' onClick={() => setPassEditable(true)} />
          </div>
          <Input type='password' disabled={!passEditable} required label='Password Confirmation' placeholder="Leave it blank if you don't want to change the password" ref={pass_conf} autoComplete="off" />
          {/* <Input type="tel" name="telphone" placeholder="081234567890" pattern="[0-9]{12}" maxLength="12" required label='Phone Number' ref={phone} defaultValue={data?.phone_number} /> */}

          <fieldset>
            <Label className='block mb-4'>Role</Label>
            <RadioGroup className='flex flex-col items-start'>
              <div className='flex items-start space-x-2'>
                <input type="radio" value='superadmin' id='superadmin' required="required" name="role" onChange={(e: React.FormEvent<HTMLInputElement>) => setRole(e.target.value)} defaultChecked={paramsRole === "superadmin"} />
                <div className='flex flex-col gap-1'>
                  <Label htmlFor='superadmin' className='font-normal'>
                    Super Admin
                  </Label>
                  <p className='text-xs text-[#808080] font-light'>Permissions : All</p>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <input type="radio" value='admin' id='admin' name="role" onChange={(e: React.FormEvent<HTMLInputElement>) => setRole(e.target.value)} defaultChecked={paramsRole === "admin"}  />
                <div className='flex flex-col gap-1'>
                  <Label htmlFor='admin' className='font-normal'>
                    Admin
                  </Label>
                  <p className='text-xs text-[#808080] font-light'>Permissions: All except User Management</p>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <input type="radio" value='content_manager' id='content_manager' name="role" onChange={(e: React.FormEvent<HTMLInputElement>) => setRole(e.target.value)} defaultChecked={paramsRole === "content_manager"}  />
                <div className='flex flex-col gap-1'>
                  <Label htmlFor='content_manager' className='font-normal'>
                    Content Manager
                  </Label>
                  <p className='text-xs text-[#808080] font-light'>Permissions: Content Management, Settings</p>
                </div>
              </div>
            </RadioGroup>
          </fieldset>
        </fieldset>

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
