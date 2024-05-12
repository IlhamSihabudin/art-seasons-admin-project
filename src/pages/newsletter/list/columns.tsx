import { ColumnDef } from '@tanstack/react-table'
import { Eye, Pencil, Trash, ArrowUpDown } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'

export type Newsletter = {
  id: string
  title: string
  sendTo: string
  status: Readonly<'Scheduled' | 'Sent'>
  createdAt: Date
}

export const columns: ColumnDef<Newsletter>[] = [
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
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'sendTo',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Send to
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'Created on',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Created on
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    },
    cell: ({ row }) => row.original.createdAt.toLocaleDateString()
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
