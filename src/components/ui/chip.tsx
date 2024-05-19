import React from 'react'

const Chip = ({text}: { text: string }) => {
  return (
    <div className='flex shadow border hover:opacity-90 hover:cursor-pointer py-1 px-4 items-center text-center rounded-full'>
      <p className='text-sm'>{text}</p>
    </div>
  )
}

export default Chip
