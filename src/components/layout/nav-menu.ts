import * as Icon from 'lucide-react'

import dashboardIcon from './../../assets/icons/dashboard.svg';
import usersIcon from './../../assets/icons/users.svg';
import contentIcon from './../../assets/icons/content_management.svg';
import inventoryIcon from './../../assets/icons/inventory.svg';
import ordersIcon from './../../assets/icons/orders.svg';
import newsletterIcon from './../../assets/icons/newsletter.svg';
import settingsIcon from './../../assets/icons/settings.svg';

export type NavMenuProps = {
  icon: string
  name: string
  to: string
  child?: Omit<NavMenuProps[0], 'icon'>[]
}[]

export const navMenu: NavMenuProps = [
  {
    icon: dashboardIcon,
    name: 'Dashboard',
    to: '/'
  },
  {
    icon: usersIcon,
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
    icon: contentIcon,
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
    icon: inventoryIcon,
    name: 'Inventory',
    to: '/inventory'
  },
  {
    icon: ordersIcon,
    name: 'Orders',
    to: '/orders'
  },
  // {
  //   icon: "src/assets/icons/dashboard.svg",
  //   name: 'Enquiries',
  //   to: '/enquiries'
  // },
  {
    icon: newsletterIcon,
    name: 'Newsletter',
    to: '/newsletter'
  },
  {
    icon: settingsIcon,
    name: 'Settings',
    to: '/settings'
  }
]
