import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GeneralTab } from './tabs/general'
import { HeaderTab } from './tabs/header'
import { FooterTab } from './tabs/footer'
import { AdminProfileTab } from './tabs/admin-profile'

export const SettingsPage = () => {
  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Settings</h1>
      <Tabs defaultValue='general'>
        <TabsList className='mb-4'>
          <TabsTrigger value='general'>GENERAL INFORMATION</TabsTrigger>
          <TabsTrigger value='header'>HEADER</TabsTrigger>
          <TabsTrigger value='footer'>FOOTER</TabsTrigger>
          <TabsTrigger value='admin-profile'>ADMIN PROFILE</TabsTrigger>
        </TabsList>
        <TabsContent value='general'>
          <GeneralTab />
        </TabsContent>
        <TabsContent value='header'>
          <HeaderTab />
        </TabsContent>
        <TabsContent value='footer'>
          <FooterTab />
        </TabsContent>
        <TabsContent value='admin-profile'>
          <AdminProfileTab />
        </TabsContent>
      </Tabs>
    </section>
  )
}
