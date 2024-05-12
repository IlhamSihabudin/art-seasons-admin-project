import { Outlet } from 'react-router-dom'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { BreadCrumb } from './breadcrumb'

export const Layout = () => {
  return (
    <section>
      <Header />
      <main className='bg-muted h-[calc(100dvh-72px)] flex'>
        <Sidebar />
        <ScrollArea className='[&>div>div>section]:p-5 [&>div>div>section]:pt-0 flex-1'>
          <BreadCrumb />
          <Outlet />
        </ScrollArea>
      </main>
    </section>
  )
}
