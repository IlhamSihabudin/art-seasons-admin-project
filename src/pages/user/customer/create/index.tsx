import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { API } from '@/lib/API'
import { ResponseApi, User, UserRequest } from '@/types/API'
import { useToast } from '@/components/ui/use-toast'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup } from '@/components/ui/radio-group'

export const CustomerCreatePage = () => {
  const { toast } = useToast()

  const name = useRef('')
  const email = useRef('')
  const password = useRef('')
  const pass_conf = useRef('')
  const phone = useRef('')
  const address = useRef('')
  // const addition = useRef()
  const postal_code = useRef('')

  const navigateTo = useNavigate()

  const [isSubscribed, setisSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formInput: UserRequest = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      password_confirmation: pass_conf.current.value,
      phone_number: phone.current.value,
      address: address.current.value,
      // addtional_address: addition.current.value,
      postal_code: postal_code.current.value,
      is_subscribe: isSubscribed
    }

    try {
      await API.post<UserRequest, ResponseApi<User>>(`/customers`, formInput, {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
      await toast({
        title: `Success!`,
        description: 'Created data'
      })
      navigateTo('/users/customer')
    } catch (error) {
      console.log('Error updating artist:', error.message)
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: error.response.data.message
      })
    }
  }

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Add New Users</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' onSubmit={handleSubmit}>
        <fieldset className='md:space-y-7 space-y-3'>
          <Input label='Name' required placeholder='Enter name' ref={name} />
          <Input type='email' label='Email' required placeholder='Enter email' ref={email} />
          <Input type='password' required label='Password' placeholder='Enter password' ref={password} />
          <Input type='password' required label='Password Confirmation' placeholder='Enter password confirmation' ref={pass_conf} />
          <Input type='tel' name='telphone' placeholder='+65 9123 4567' required label='Phone Number' ref={phone} />
          <Input name='postal' placeholder='Singapore 123 456' label='Postal Code' ref={postal_code} />
          <Textarea name='address' label='Address' placeholder='123 High Street, #12-34, Singapore' ref={address} />
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

        {/* <Textarea className='h-full' name="additional" placeholder="Jl. Gatot Subroto, Gg. Alam Bahagia No. 123 " label='Additional Address' ref={addition}/> */}

        <div className='col-span-2 gap-4 flex items-center justify-end'>
          <Button
            variant={'outline'}
            type='button'
            size='lg'
            onClick={() => {
              navigateTo(-1)
            }}
          >
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
