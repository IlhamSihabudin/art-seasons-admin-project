import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { navMenu } from './nav-menu'

export const BreadCrumb = () => {
  const location = useLocation()
  const path = location.pathname.split('/').filter(Boolean)

  const menu = useMemo(() => {
    return navMenu.find(item => location.pathname.startsWith(item.to))
  }, [location.pathname])

  if (!menu) return

  return (
    <div className='flex items-center gap-2 text-muted-foreground p-5'>
      <menu.icon className='w-5 h-5' />
      <div className='flex'>
        {path.length > 1 ? (
          path.map(item => (
            <p className='font-medium text-sm capitalize' key={item}>
              {item} {path[path.length - 1] !== item && <span className='mx-1'>/</span>}{' '}
            </p>
          ))
        ) : (
          <p className='font-medium text-sm capitalize'>{menu.name}</p>
        )}
      </div>
    </div>
  )
}
