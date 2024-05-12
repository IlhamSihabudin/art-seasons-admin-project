import * as Icon from 'lucide-react'

export type NavMenuProps = {
  icon: typeof Icon.GridIcon
  name: string
  to: string
  child?: Omit<NavMenuProps[0], 'icon'>[]
}[]

export const navMenu: NavMenuProps = [
  {
    icon: Icon.Grid2x2,
    name: 'Dashboard',
    to: '/'
  },
  {
    icon: Icon.Users,
    name: 'User Management',
    to: '/users',
    child: [
      {
        name: 'Admin',
        to: '/users/admin'
      },
      {
        name: 'Customer',
        to: '/users/customer'
      }
    ]
  },
  {
    icon: Icon.Newspaper,
    name: 'Content Management',
    to: '/content-management',
    child: [
      {
        name: 'Home',
        to: '/content-management/home'
      },
      {
        name: 'Artists',
        to: '/content-management/artists'
      },
      {
        name: 'Exhibitions',
        to: '/content-management/exhibitions'
      },
      {
        name: 'Art Fairs',
        to: '/content-management/art-fairs'
      },
      {
        name: 'Events',
        to: '/content-management/events'
      },
      {
        name: 'Viewing Room',
        to: '/content-management/viewing-room',
        child: [
          {
            name: 'Artwork',
            to: '/content-management/viewing-room/artwork'
          },
          {
            name: 'Collection',
            to: '/content-management/viewing-room/collection'
          },
        ]
      },
      {
        name: 'News',
        to: '/content-management/news'
      },
      {
        name: 'Publications',
        to: '/content-management/publications'
      },
      {
        name: 'About',
        to: '/content-management/about'
      }
    ]
  },
  {
    icon: Icon.Package,
    name: 'Inventory',
    to: '/inventory'
  },
  {
    icon: Icon.Archive,
    name: 'Orders',
    to: '/orders'
  },
  // {
  //   icon: Icon.MessageCircleQuestion,
  //   name: 'Enquiries',
  //   to: '/enquiries'
  // },
  {
    icon: Icon.MessagesSquare,
    name: 'Newsletter',
    to: '/newsletter'
  },
  {
    icon: Icon.Settings,
    name: 'Settings',
    to: '/settings'
  }
]
