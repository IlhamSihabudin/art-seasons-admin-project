import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { navMenu } from './nav-menu'

export const BreadCrumb = () => {
  const location = useLocation()
  const path = location.pathname.split('/').filter(Boolean)

  const menu = useMemo(() => {
    return navMenu.find(item => item.to.includes(path.length > 0 ? path[0] : path))
  }, [location.pathname])

  if (!menu) return

  const generateTitle = (value: string) => {
    let title = value;

    if (value == 'users') 
      title = 'User Management'
    else if (value == 'content-management')
      title = 'Content Management'
    
    return title;
  }

  return (
    <div className='flex items-center gap-2 text-muted-foreground p-5'>
      {/* <menu.icon className='w-5 h-5' /> */}
      <img src={menu.icon} />
      <div className='flex'>
        {path.length > 1 ? (
          path.map(item => (
            <p className='font-medium text-sm capitalize' key={item}>
              {generateTitle(item)} {path[path.length - 1] !== item && <span className='mx-1'>/</span>}{' '}
            </p>
          ))
        ) : (
          <p className='font-medium text-sm capitalize'>{path.length == 0 ? 'Dashboard' : path}</p>
        )}
      </div>
    </div>
  )
}
