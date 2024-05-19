import { Eye, Loader2 } from 'lucide-react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Order } from '@/types/API'
import { useState } from 'react'
import { formatDate } from '@/pages/content-management/exhibitions/list/columns'

export const ViewAction = ({ data }: { data: Order }) => {
  const [tab, setTab] = useState<'general' | 'artists' | 'customer'>('general')

  const onTabChange = value => {
    setTab(value)
  }

  console.log('detail', data)

  return (
    <Dialog>
      <DialogTrigger>
        <Eye className='w-5 h-5' />
      </DialogTrigger>
      <DialogContent className='w-[800px]'>
        <h1 className='text-3xl font-semibold'>{data.order_code}</h1>
        <OrderContent data={data} />
        {/* <Tabs defaultValue={tab} onValueChange={onTabChange} >
                    <TabsList className='mb-4'>
                        <TabsTrigger value='general'>ORDER INFORMATION</TabsTrigger>
                        <TabsTrigger value='customer'>CUSTOMER INFORMATION</TabsTrigger>
                        <TabsTrigger value='artists'>ITEMS ORDER INFORMATION</TabsTrigger>
                    </TabsList>
                    <TabsContent value='general'>
                        <GeneralTab data={data} />
                    </TabsContent>
                    <TabsContent value='customer'>
                        <CustomerTab data={data} />
                    </TabsContent>
                    <TabsContent value='artists'>
                        <ItemsTab data={data} />
                    </TabsContent>
                </Tabs> */}
      </DialogContent>
    </Dialog>
  )
}

const OrderContent = ({ data }: { data: Order }) => {
  return (
    <>
      <div className='my-4 grid md:grid-cols-2 md:gap-10 gap-5 container'>
        <div className='flex flex-col gap-4'>
          <div className='text-sm'>
            <p className='font-medium'>Name</p>
            <p className='py-1 px-3'>{data.user.name}</p>
          </div>
          <div className='text-sm'>
            <p className='font-medium'>Email</p>
            <p className='py-1 px-3'>{data.user.email}</p>
          </div>
          <div className='text-sm'>
            <p className='font-medium'>Mobile No.</p>
            <p className='py-1 px-3'>{data.user.phone_number}</p>
          </div>
          <div className='text-sm'>
            <p className='font-medium'>Payment Method</p>
            <p className='py-1 px-3'>{data.payment_methods}</p>
          </div>
          <div className='text-sm'>
            <p className='font-medium'>Status</p>
            <p className='py-1 px-3 text-red-600'>{data.status}</p>
          </div>
          <div className='text-sm'>
            <p className='font-medium'>Admin Remakrs</p>
            <p className='py-1 px-3'>{data.admin_remarks}</p>
          </div>
        </div>

        <div>
          {data.order_items.map(item => {
            return (
              <div className='flex flex-row gap-5 my-4'>
                <img
                //   src={'https://api.artseasons.my.id/storage/artwork-img/onYNVI771YlYbG1T50wFim0VxIkZcUxnFVsxdh18.jpg'}
                  src={item.img}
                  className='rounded aspect-square object-center object-cover h-16 w-16'
                />
                <div className='flex flex-col'>
                  <p className='font-medium text-sm'>{item.author ?? 'Artist Name'}</p>
                  <p className='font-medium py-1'>{item.name ?? 'Name Of Artwork'}</p>
                  <p className='text-sm font-light'>
                    {item.desc}
                  </p>
                  <div className='pl-3 py-1 space-y-1'>
                    <div className='flex flex-row gap-4'>
                      <p className='font-medium text-sm'>Qty</p>
                      <p className='font-medium text-sm'>{item.qty}</p>
                    </div>
                    <p className='font-medium text-sm'>S${Intl.NumberFormat().format(item.price * item.qty)}</p>
                  </div>
                </div>
              </div>
            )
          })}

          <div className='mt-5'>
            <div className='w-full flex flex-row gap-4'>
              <p className='w-[50%] font-light'>Subtotal</p>
              <p className='w-full'>S${Intl.NumberFormat().format(data.total_price)}</p>
            </div>
            <div className='w-full flex flex-row gap-4'>
              <p className='w-[50%] font-light'>Taxes</p>
              <p className='w-full'>S${Intl.NumberFormat().format(data.taxes)}</p>
            </div>
            <div className='w-full flex flex-row gap-4'>
              <p className='w-[50%] font-light'>Delivery Fee</p>
              <p className='w-full'>S${Intl.NumberFormat().format(data.delivery_fee)} (flat rate)</p>
            </div>

            <div className='w-full flex flex-row gap-4 mt-4'>
              <p className='w-[50%] font-medium text-lg'>Total</p>
              <p className='w-full font-medium text-lg'>S${Intl.NumberFormat().format(data.grand_total)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const CustomerTab = ({ data }: { data: Order }) => {
  return (
    <>
      <div className='text-sm'>
        <p className='font-medium'>Name</p>
        <p className='py-4 px-3'>{data.user.name}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Email</p>
        <p className='py-4 px-3'>{data.user.email}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Phone Number</p>
        <p className='py-4 px-3'>{data.user.phone_number}</p>
      </div>
      <div className='text-sm mb-2.5'>
        <p className='font-medium'>Address</p>
        <p className='py-4 px-3'>{data.user.address}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>addtional Address</p>
        <p className='py-4 px-3'>{data.user.addtional_address}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Postal Code</p>
        <p className='py-4 px-3'>{data.user.postal_code}</p>
      </div>
    </>
  )
}

const GeneralTab = ({ data }: { data: Order }) => {
  return (
    <>
      <div className='text-sm'>
        <p className='font-medium'>Order Code</p>
        <p className='py-4 px-3'>{data.order_code}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Total Price</p>
        <p className='py-4 px-3'>{data.total_price}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Taxes</p>
        <p className='py-4 px-3'>{data.taxes}</p>
      </div>
      <div className='text-sm mb-2.5'>
        <p className='font-medium'>Delivery Fee</p>
        <p className='py-4 px-3'>{data.delivery_fee}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Grand total</p>
        <p className='py-4 px-3'>{data.grand_total}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Payment Method</p>
        <p className='py-4 px-3'>{data.payment_methods}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Status</p>
        <p className='py-4 px-3'>{data.status}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Admin Remarks</p>
        <p className='py-4 px-3'>{data.admin_remarks}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Created At</p>
        <p className='py-4 px-3'>{formatDate(data.created_at)}</p>
      </div>
      <div className='text-sm'>
        <p className='font-medium'>Updated At</p>
        <p className='py-4 px-3'>{formatDate(data.updated_at)}</p>
      </div>
    </>
  )
}

const ItemsTab = ({ data }: { data: Order }) => {
  return (
    <div className='space-y-10'>
      {!data ? (
        <Loader2 size={40} className='animate-spin mx-auto m-10' />
      ) : (
        data.order_items.map(item => (
          <div key={item.id} className='block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
            <div className='text-sm'>
              <p className='text-xl font-semibold mb-2.5'>{item.name}</p>
            </div>
            <div className='text-sm'>
              <p className='font-medium'>Items Type</p>
              <p className='py-4 px-3'>{item.type}</p>
            </div>
            <div className='text-sm'>
              <p className='font-medium'>Author</p>
              <p className='py-4 px-3'>{item.author}</p>
            </div>
            <div className='text-sm'>
              <p className='font-medium'>Tags</p>
              <p className='py-4 px-3'>{item.tags}</p>
            </div>
            <div className='text-sm'>
              <p className='font-medium'>Price</p>
              <p className='py-4 px-3'>{item.price}</p>
            </div>
            <div className='text-sm'>
              <p className='font-medium'>Quantity</p>
              <p className='py-4 px-3'>{item.qty}</p>
            </div>
            <div className='text-sm'>
              <p className='font-medium'>Description</p>
              <p className='py-4 px-3'>{item.desc}</p>
            </div>
            <div className='text-sm'>
              <p className='font-medium'>Description</p>
              <img src={item.img} alt={item.name} className='mt-2.5' />
            </div>
          </div>
        ))
      )}
    </div>
  )
}
