import { useEffect, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { API } from '@/lib/API'

import { DummyData } from './types'

export const DashboardPage = () => {
  const [data, setData] = useState<DummyData | null>(null)

  useEffect(() => {
    ; (async () => {
      const res = await API.get<DummyData>('/products')
      setData(res)
    })()
  }, [])

  console.log(data)

  return (
    <section className='space-y-5'>
      <section className='grid grid-cols-4 gap-5'>
        <div className='bg-white rounded-lg shadow p-5 flex items-center justify-center flex-col text-center gap-y-2.5'>
          <p className='text-muted-foreground'>Pending Inquiry</p>
          <p className='text-3xl font-medium text-orange-700'>5</p>
          <p className='text-muted-foreground uppercase'>all-time data</p>
        </div>
        <div className='bg-white rounded-lg shadow p-5 flex items-center justify-center flex-col text-center gap-y-2.5'>
          <p className='text-muted-foreground'>Total Inquiry</p>
          <p className='text-3xl font-medium'>20</p>
          <p className='text-muted-foreground uppercase'>current month</p>
        </div>
        <div className='bg-white rounded-lg shadow p-5 flex items-center justify-center flex-col text-center gap-y-2.5'>
          <p className='text-muted-foreground'>Total Subscribers</p>
          <p className='text-3xl font-medium'>35</p>
          <p className='text-muted-foreground uppercase'>all-time data</p>
        </div>
        <div className='bg-white rounded-lg shadow p-5 flex items-center justify-center flex-col text-center gap-y-2.5'>
          <p className='text-muted-foreground'>Total Admin</p>
          <p className='text-3xl font-medium'>3</p>
          <p className='text-muted-foreground uppercase'>all-time data</p>
        </div>
        <Tabs defaultValue='current-month' className='bg-white rounded-lg p-5 shadow-lg col-span-2'>
          <TabsList>
            <TabsTrigger value='current-month'>CURRENT MONTH</TabsTrigger>
            <TabsTrigger value='all-time'>ALL-TIME DATA</TabsTrigger>
          </TabsList>
          <TabsContent value='current-month' className='space-y-2.5 text-muted-foreground'>
            <p className='font-medium'>Most Enquired Artwork</p>
            <ul className='space-y-1'>
              {[...Array(10)].map((_, i) => (
                <li key={i} className='flex items-center gap-2'>
                  <p className='w-5 font-medium'>{i + 1}</p>
                  <p>Artwork Name {i + 1}</p>
                  <p className='ml-auto'>Artist Name {i + 1}</p>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value='all-time'>
            <p className='font-medium text-muted-foreground'>All Time Data</p>
          </TabsContent>
        </Tabs>
        <Tabs defaultValue='current-month' className='bg-white rounded-lg p-5 shadow-lg col-span-2'>
          <TabsList>
            <TabsTrigger value='current-month'>CURRENT MONTH</TabsTrigger>
            <TabsTrigger value='all-time'>ALL-TIME DATA</TabsTrigger>
          </TabsList>
          <TabsContent value='current-month' className='space-y-2.5 text-muted-foreground'>
            <p className='font-medium'>Most Enquired Artwork</p>
            <ul className='space-y-1'>
              {[...Array(10)].map((_, i) => (
                <li key={i} className='flex items-center gap-2'>
                  <p className='w-5 font-medium'>{i + 1}</p>
                  <p>Artwork Name {i + 1}</p>
                  <p className='ml-auto'>Artist Name {i + 1}</p>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value='all-time'>
            <p className='font-medium text-muted-foreground'>All Time Data</p>
          </TabsContent>
        </Tabs>

        <code>
          <pre>Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</pre>
        </code>
      </section>
    </section>
  )
}
