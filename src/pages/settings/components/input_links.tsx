import { Input } from '@/components/ui/input'
import { Plus, Trash } from 'lucide-react'
import React from 'react'
import { useState } from 'react'

const InputLinks = ({ links, setLinks }: { links: string[]; setLinks: React.Dispatch<React.SetStateAction<string[]>> }) => {
//   const [formFields, setFormFields] = useState([{ value: '' }])

  const handleFormChange = (event, index) => {
    let data = [...links]
    data[index] = event.target.value
    // setFormFields(data)
    setLinks(data)
  }

  const addFields = () => {
    let object = ''
    // setFormFields([...formFields, object])
    setLinks([...links, object])
  }

  const removeFields = index => {
    let data = [...links]
    data.splice(index, 1)
    // setFormFields(data)
    setLinks(data)
  }

  return (
    <fieldset className='space-y-3'>
      {links.map((link, index) => {
        return (
          <div className='flex gap-3 items-center'>
            <Input
              required
              wrapperClassName='flex-1'
              type='url'
              placeholder='Enter link (facebook/ instagram/ etc)'
              onChange={event => handleFormChange(event, index)}
              value={link}
            />
            {index > 0 && (
              <button>
                <Trash size={18} onClick={() => removeFields(index)} />
              </button>
            )}
          </div>
        )
      })}
      <div className='flex items-center gap-3 hover:cursor-pointer' onClick={addFields}>
        <div className='w-5 h-5 grid place-items-center bg-primary rounded-full'>
          <Plus size={14} className='text-white' />
        </div>
        <p>Add link</p>
      </div>
    </fieldset>
  )
}

export default InputLinks
