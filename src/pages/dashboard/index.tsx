
import { useGet } from '@/hooks/useGet';
import { ResponseApi } from '@/types/API'
interface DashboardStats {
  total_pending_order: number;
  total_order: number;
  total_subscribers: number;
  total_admin: number;
}

export const DashboardPage = () => {
  const { data } = useGet<ResponseApi<DashboardStats>>("dashboard", "/admin-dashboard/card");

  return (
    <section className='space-y-5'>
      <section className='grid grid-cols-4 gap-5'>
        <div className='bg-white rounded-lg shadow p-5 flex items-center justify-center flex-col text-center gap-y-2.5'>
          <p className='text-muted-foreground'>Pending Orders</p>
          <p className='text-3xl font-medium text-orange-700'>{data?.data.total_pending_order}</p>
          <p className='text-muted-foreground uppercase'>all-time data</p>
        </div>
        <div className='bg-white rounded-lg shadow p-5 flex items-center justify-center flex-col text-center gap-y-2.5'>
          <p className='text-muted-foreground'>Total Orders</p>
          <p className='text-3xl font-medium'>{data?.data.total_order}</p>
          <p className='text-muted-foreground uppercase'>current month</p>
        </div>
        <div className='bg-white rounded-lg shadow p-5 flex items-center justify-center flex-col text-center gap-y-2.5'>
          <p className='text-muted-foreground'>Total Subscribers</p>
          <p className='text-3xl font-medium'>{data?.data.total_subscribers}</p>
          <p className='text-muted-foreground uppercase'>all-time data</p>
        </div>
        <div className='bg-white rounded-lg shadow p-5 flex items-center justify-center flex-col text-center gap-y-2.5'>
          <p className='text-muted-foreground'>Total Admin</p>
          <p className='text-3xl font-medium'>{data?.data.total_admin}</p>
          <p className='text-muted-foreground uppercase'>all-time data</p>
        </div>
      </section>
    </section>
  )
}
