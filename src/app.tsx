import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Layout } from './components/layout'

import { DashboardPage } from './pages/dashboard'

import { UserAdminPage } from './pages/user/admin/list'
import { UserEditPage } from './pages/user/admin/edit'
import { UserCreatePage } from './pages/user/admin/create'

import { UserCustomerPage } from './pages/user/customer/list'
import { CustomerEditPage } from './pages/user/customer/edit'
import { CustomerCreatePage } from './pages/user/customer/create'

import { OrdersPage } from './pages/orders'

import { HomePage } from './pages/content-management/home/page'

import { ArtistsListPage } from './pages/content-management/artists/list'
import { ArtistsEditPage } from './pages/content-management/artists/edit'
import { ArtistsCreatePage } from './pages/content-management/artists/create'

import { ExhibitionsPage } from './pages/content-management/exhibitions/list'
import { ExhibitionsEditPage } from './pages/content-management/exhibitions/edit'
import { ExhibitionsCreatePage } from './pages/content-management/exhibitions/create'

import { ArtFairsListPage } from './pages/content-management/art-fairs/list'
import { ArtFairsEditPage } from './pages/content-management/art-fairs/edit'
import { ArtFairsCreatePage } from './pages/content-management/art-fairs/create'

import { EventsListPage } from './pages/content-management/events/list'
import { EventsCreatePage } from './pages/content-management/events/create'
import { EventsEditPage } from './pages/content-management/events/edit'

import { ViewingRoomListPage } from './pages/content-management/viewing-room/artwork/list'
import { ViewingRoomCreatePage } from './pages/content-management/viewing-room/artwork/create'
// import { ViewingRoomEditPage } from './pages/content-management/viewing-room/artwork/edit'

import { ViewingRoomListPage as CollectionRoomListPage } from './pages/content-management/viewing-room/collection/list'
import { ViewingRoomCreatePage as CollectionRoomCreatePage } from './pages/content-management/viewing-room/collection/create'
import { ViewingRoomEditPage as CollectionRoomEditPage } from './pages/content-management/viewing-room/collection/edit'

import { NewsListPage } from './pages/content-management/news/list'
import { NewsCreatePage } from './pages/content-management/news/create'
import { NewsEditPage } from './pages/content-management/news/edit'

import { PublicationsListPage } from './pages/content-management/publications/list'
import { PublicationsCreatePage } from './pages/content-management/publications/create'
import { PublicationsEditPage } from './pages/content-management/publications/edit'

import { AboutPage } from './pages/content-management/about'

import { InventoryPage } from './pages/inventory'
import { InventoryArtworksCreatePage } from './pages/inventory/artworks/create'

import { EnquiriesListPage } from './pages/enquiries/list'
import { EnquiriesReplyPage } from './pages/enquiries/reply'

import { NewsletterListPage } from './pages/newsletter/list'
import { NewsletterCreatePage } from './pages/newsletter/create'

import { SettingsPage } from './pages/settings'
import { NotFoundPage } from './pages/not-found'
import { InventoryArtworksEditPage } from './pages/inventory/artworks/edit'
import { InventoryPublicationsEditPage } from './pages/inventory/publicatios/edit'
import { InventoryPublicationCreatePage } from './pages/inventory/publicatios/create'
import { AuthProvider } from './context/AuthContext'

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<DashboardPage />} />

            <Route path='/users/admin' Component={UserAdminPage} />
            <Route path='/users/admin/create' Component={UserCreatePage} />
            <Route path='/users/admin/edit/:role/:id' Component={UserEditPage} />
            
            <Route path='/users/customer' Component={UserCustomerPage} />
            <Route path='/users/customer/create' Component={CustomerCreatePage} />
            <Route path='/users/customer/edit/:id' Component={CustomerEditPage} />

            <Route path='/orders' Component={OrdersPage} />

            <Route path='/inventory' Component={InventoryPage} />
            <Route path='/inventory/artworks/create' Component={InventoryArtworksCreatePage} />
            <Route path='/inventory/artworks/edit/:id' Component={InventoryArtworksEditPage} />

            <Route path='/inventory/publications/create' Component={InventoryPublicationCreatePage} />
            <Route path='/inventory/publications/edit/:id' Component={InventoryPublicationsEditPage} />

            <Route path='/content-management/home' Component={HomePage} />

            {/* Artists */}
            <Route path='/content-management/artists' Component={ArtistsListPage} />
            <Route path='/content-management/artists/create' Component={ArtistsCreatePage} />
            <Route path='/content-management/artists/edit/:id' Component={ArtistsEditPage} />

            {/* Exhibitions */}
            <Route path='/content-management/exhibitions' Component={ExhibitionsPage} />
            <Route path='/content-management/exhibitions/create' Component={ExhibitionsCreatePage} />
            <Route path='/content-management/exhibitions/edit/:id' Component={ExhibitionsEditPage} />

            {/* Art Fairs */}
            <Route path='/content-management/art-fairs' Component={ArtFairsListPage} />
            <Route path='/content-management/art-fairs/create' Component={ArtFairsCreatePage} />
            <Route path='/content-management/art-fairs/edit/:id' Component={ArtFairsEditPage} />

            {/* Events */}
            <Route path='/content-management/events' Component={EventsListPage} />
            <Route path='/content-management/events/create' Component={EventsCreatePage} />
            <Route path='/content-management/events/edit/:id' Component={EventsEditPage} />

            {/* Viewing-room artwork*/}
            <Route path='/content-management/viewing-room/artwork' Component={ViewingRoomListPage} />
            <Route path='/content-management/viewing-room/artwork/create' Component={ViewingRoomCreatePage} />
            {/* <Route path='/content-management/viewing-room/artwork/edit/:id' Component={ViewingRoomEditPage} /> */}

            {/* Viewing-room collection*/}
            <Route path='/content-management/viewing-room/collection' Component={CollectionRoomListPage} />
            <Route path='/content-management/viewing-room/collection/create' Component={CollectionRoomCreatePage} />
            <Route path='/content-management/viewing-room/collection/edit/:id' Component={CollectionRoomEditPage} />

            {/* News */}
            <Route path='/content-management/news' Component={NewsListPage} />
            <Route path='/content-management/news/create' Component={NewsCreatePage} />
            <Route path='/content-management/news/edit/:id' Component={NewsEditPage} />

            {/* Publications */}
            <Route path='/content-management/publications' Component={PublicationsListPage} />
            <Route path='/content-management/publications/create' Component={PublicationsCreatePage} />
            <Route path='/content-management/publications/edit/:id' Component={PublicationsEditPage} />

            <Route path='/content-management/about' Component={AboutPage} />

            <Route path='/enquiries' Component={EnquiriesListPage} />
            <Route path='/enquiries/:id' Component={EnquiriesReplyPage} />

            <Route path='/newsletter' Component={NewsletterListPage} />
            <Route path='/newsletter/create' Component={NewsletterCreatePage} />

            <Route path='/settings' Component={SettingsPage} />
          </Route>
          <Route path='*' Component={NotFoundPage} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
