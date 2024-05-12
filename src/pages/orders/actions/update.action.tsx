import { Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ResponseApi } from '@/types/API'
import { useRef, useState } from 'react'
import { API } from '@/lib/API'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { RadioGroup } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'
import { AxiosError } from 'axios'

export const UpdateAction = ({ id }: { id: number }) => {
  const navigateTo = useNavigate()
  const { toast } = useToast();

  const remarks = useRef<HTMLTextAreaElement>();
  const [status, setStatus] = useState<"Pending Self-Collection" | "Collected" | "Pending Delivery" | "Delivered">("Pending Delivery");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formInput = { 
      _method: "PUT",
      status, 
      admin_remarks: remarks.current.value
    }

    try {
      await API.post<typeof formInput, ResponseApi<Artist>>(`/orders/${id}`, formInput, {
        Accept: 'application/json',
        "Content-Type": 'application/json'
      });
      await toast({
        title: `Success!`,
        description: "Created data",
      })
      navigateTo('/orders');
    } catch (error) {
      const err = error as AxiosError
      toast({
        variant: "destructive",
        title: (err.response?.data as AxiosError).message,
        description: (err.response?.data as AxiosError).data
      })
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Pencil className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>Update Status</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-3'>
          <fieldset>
            <Label className='block mb-2.5'>Status</Label>
            <RadioGroup className='flex items-center'>
              <div className='flex items-center space-x-2'>
                <Input type="radio" value='Pending Self-Collection' id='Pending Self-Collection' name="status" onChange={(e: React.FormEvent<HTMLInputElement>) => setStatus(e.target.value)} />
                <Label htmlFor='Pending Self-Collection' className='font-normal'>
                  Pending Self-Collection
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Input type="radio" value='Collected' id='Collected' name="status" onChange={(e: React.FormEvent<HTMLInputElement>) => setStatus(e.target.value)} />
                <Label htmlFor='Collected' className='font-normal'>
                  Collected
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Input type="radio" value='Pending Delivery' id='Pending Delivery' name="status" onChange={(e: React.FormEvent<HTMLInputElement>) => setStatus(e.target.value)} />
                <Label htmlFor='Pending Delivery' className='font-normal'>
                  Pending Delivery
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Input type="radio" value='Delivered' id='Delivered' name="status" onChange={(e: React.FormEvent<HTMLInputElement>) => setStatus(e.target.value)} />
                <Label htmlFor='Delivered' className='font-normal'>
                  Delivered
                </Label>
              </div>
            </RadioGroup>
          </fieldset>
          <Textarea label='Admin Remarks' placeholder='Enter remarks' required ref={remarks} />
          <div className='col-span-2 flex items-center justify-end'>
            <Button size='lg' type='submit'>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
