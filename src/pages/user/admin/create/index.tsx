import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/radio-group'
import { API } from '@/lib/API'
import { ResponseApi, UserRequest } from '@/types/API'
import { useToast } from '@/components/ui/use-toast'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Response {
  name: string,
  email: string,
  phone_number: string,
  updated_at: string,
  created_at: string,
  id: number
}

export const UserCreatePage = () => {
  const { toast } = useToast();

  const [role, setRole] = useState();
  const name= useRef("")
  const email = useRef("")
  const password = useRef("")
  const pass_conf = useRef("")
  // const phone = useRef("")

  const navigateTo = useNavigate()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formInput: UserRequest = { 
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      password_confirmation: pass_conf.current.value,
      // phone_number: phone.current.value,
      role
    }

    try {
      await API.post<UserRequest, ResponseApi<Response>>(`/users`, formInput, {
        Accept: 'application/json',
        "Content-Type": 'application/json'
      });
      await toast({
        title: `Success!`,
        description: "Created data",
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
      <h1 className='font-bold text-3xl'>Add New Users</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' onSubmit={handleSubmit}>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Name' required placeholder='Enter name'  ref={name} />
          <Input type='email' label='Email' required placeholder='Enter email'  ref={email} />
          <Input type='password' required label='Password' placeholder='Enter password'  ref={password} />
          <Input type='password' required label='Password Confirmation' placeholder='Enter password confirmation' ref={pass_conf} />
          {/* <Input type="tel" name="telphone" placeholder="081234567890" pattern="[0-9]{12}" maxLength="12" required label='Phone Number' ref={phone} /> */}

          <fieldset>
            <Label className='block mb-4'>Role</Label>
            <RadioGroup className='flex flex-col items-start gap-4'>
              <div className='flex items-start space-x-2'>
                <input type="radio" value='superadmin' id='superadmin' required="required" name="role" onChange={(e: React.FormEvent<HTMLInputElement>) => setRole(e.target.value)}/>
                <div className='flex flex-col gap-1'>
                  <Label htmlFor='superadmin' className='font-normal'>
                    Super Admin
                  </Label>
                  <p className='text-xs text-[#808080] font-light'>Permissions : All</p>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <input type="radio" value='admin' id='admin' name="role" onChange={(e: React.FormEvent<HTMLInputElement>) => setRole(e.target.value)} />
                <div className='flex flex-col gap-1'>
                  <Label htmlFor='admin' className='font-normal'>
                    Admin
                  </Label>
                  <p className='text-xs text-[#808080] font-light'>Permissions: All except User Management</p>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <input type="radio" value='content_manager' id='content_manager' name="role" onChange={(e: React.FormEvent<HTMLInputElement>) => setRole(e.target.value)} />
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
