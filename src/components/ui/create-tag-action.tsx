import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from '@/components/ui/use-toast'

export const CreateTagAction = ({ onSubmit }: { onSubmit: (tag: string) => void }) => {
  const [open, setOpen] = React.useState(false)

  const [tag, setTag] = useState('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {/* <Eye className='w-5 h-5' /> */}
        {/* <div className={`bg-primary text-primary-foreground shadow hover:opacity-90 p-1 rounded-full`}>
          <Plus size={14} className='text-white' />
        </div> */}
        <div className='w-4 h-4 grid place-items-center bg-primary rounded-full'>
          <Plus size={14} className='text-white' />
        </div>
      </DialogTrigger>
      <DialogContent>
        <h1 className='text-3xl font-semibold'>Create Tags</h1>
        <form className='pt-3 space-y-4'>
          <p>Tag :</p>
          <Input
            placeholder='Tag name'
            value={tag}
            onChange={e => {
              setTag(e.target.value)
            }}
          />
          <div className='col-span-2 flex items-center justify-end'>
            <Button
              className='text-end'
              size='lg'
              type='submit'
              onClick={e => {
                e.preventDefault()

                if (tag.trim().length == 0) {
                  return toast({
                    variant: 'destructive',
                    title: `Please fill tag field`
                  })
                }

                onSubmit(tag)
                setTag('')
                setOpen(false)
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
