import { NavLink } from 'react-router-dom'
import * as Icon from '@radix-ui/react-icons'
import logoutIcon from '@/assets/icons/logout.svg'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { navMenu } from './nav-menu'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'

export const Sidebar = () => {
  const {logout} = useContext(AuthContext)
  return (
    <aside className='bg-white w-[250px] rounded-lg shadow px-2.5 py-5 shrink-0 my-5 ml-5 overflow-y-auto'>
      <nav className='flex flex-col h-full gap-y-10'>
        <ul className='space-y-2 flex-1'>
          {navMenu.map(item =>
            item.child ? (
              <Accordion type='single' collapsible key={item.name}>
                <AccordionItem value={item.name} className='border-0'>
                  <AccordionTrigger className='p-0 [&[data-state=open]]:bg-muted [&[data-state=open]]:rounded-b-none [&[data-state=open]]:text-foreground rounded px-3 py-2.5 text-muted-foreground'>
                    <div className='flex items-center gap-3'>
                      {/* <item.icon className='w-5 h-5' /> */}
                      <img src={item.icon} />
                      {item.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='p-0 pl-11 bg-muted rounded-b'>
                    {item.child.map(child => 
                      child.child ? (
                        <Accordion type='single' collapsible key={item.name}>
                          <AccordionItem value={item.name} className='border-0'>
                            <AccordionTrigger className='p-0 [&[data-state=open]]:bg-muted [&[data-state=open]]:rounded-b-none [&[data-state=open]]:text-foreground rounded pr-3 py-2.5 text-muted-foreground'>
                              <div className='flex items-center gap-3'>
                                {child.name}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className='bg-muted rounded-b'>
                              {child.child.map(subchild => (
                                <NavLink key={subchild.name} to={subchild.to || ''} className={({ isActive }) => `${isActive && 'underline'} block pl-3 py-2.5`}>
                                  {subchild.name}
                                </NavLink>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <NavLink key={child.name} to={child.to || ''} className={({ isActive }) => `${isActive && 'underline'} block py-2.5`}>
                          {child.name}
                        </NavLink>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <li key={item.name}>
                <NavLink
                  to={item.to || ''}
                  className={({ isActive }) =>
                    `${isActive ? 'bg-muted text-foreground' : 'text-muted-foreground'} flex items-center gap-3 py-2.5 px-3 rounded font-medium transition-all text-sm`
                  }
                >
                  {/* <item.icon className='w-5 h-5' /> */}
                  <img src={item.icon} />
                  {item.name}
                </NavLink>
              </li>
            )
          )}
        </ul>

        <button className='text-sm text-muted-foreground font-medium text-left flex items-center gap-3' onClick={() => logout()} >
          {/* <Icon.ChevronLeftIcon className='w-5 h-5'/> */}
          <img src={logoutIcon} />
          Log Out
        </button>
      </nav>
    </aside>
  )
}
