import { ColumnDef } from '@tanstack/react-table'
import { Eye, Pencil, Trash, ArrowUpDown } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'

export type Customers = {
  id: string
  name: string
  email: string
  mobile: string
  subscribed: Readonly<'Yes' | 'No'>
}

export const columns: ColumnDef<Customers>[] = [
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
          Customer Name
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
    accessorKey: 'mobile',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Mobile
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'subscribed',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Subscribe to Newsletter
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
