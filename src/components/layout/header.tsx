// import { MagnifyingGlassIcon, BellIcon } from '@radix-ui/react-icons'

// import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export const Header = () => {
  return (
    <header className='px-5 py-4 flex items-center justify-between gap-10'>
      <div className='flex items-center gap-5'>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className='font-medium'>Admin</p>
      </div>

      {/* <div className='flex-1 relative'>
        <MagnifyingGlassIcon className='w-5 h-5 absolute top-1/2 -translate-y-1/2 left-2' />
        <Input className='pl-10' placeholder='Quick search' />
      </div> */}

      {/* <Popover>
        <PopoverTrigger>
          <BellIcon className='w-5 h-5 text-muted-foreground' />
        </PopoverTrigger>
        <PopoverContent align='end'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis fugit quidem ipsum totam dignissimos impedit officia distinctio! Laborum, cupiditate soluta in earum,
          iusto id ipsum adipisci necessitatibus, modi aliquam praesentium?
        </PopoverContent>
      </Popover> */}
    </header>
  )
}
