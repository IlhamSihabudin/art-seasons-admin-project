import { ColumnDef } from '@tanstack/react-table'
import { Eye, Pencil, Trash, ArrowUpDown } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'

export type UsersAdmin = {
  id: string
  name: string
  email: string
  role: Readonly<'Super Admin' | 'Admin' | 'Content Manager'>
  permissions: string[]
}

export const columns: ColumnDef<UsersAdmin>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} aria-label='Select row' />,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Admin
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Role
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'permissions',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Permissions
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: '',
    header: 'Actions',
    cell: () => (
      <div className='flex items-center gap-2.5'>
        <Eye size={20} className='cursor-pointer hover:opacity-90 transition-opacity' />
        <Pencil size={20} className='cursor-pointer hover:opacity-90 transition-opacity' />
        <Trash size={20} className='cursor-pointer hover:opacity-90 transition-opacity' />
      </div>
    )
  }
]
