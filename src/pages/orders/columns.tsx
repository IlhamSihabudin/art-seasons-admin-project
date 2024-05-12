import { ColumnDef } from '@tanstack/react-table'
import { Eye, Pencil, Trash, ArrowUpDown } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'

export type Orders = {
  id: string
  name: string
  item: string
  price: number
  payment: Readonly<'Visa' | 'Master' | 'Paynow'>
  status: Readonly<'Delivered' | 'Pending Self-Collection' | 'Collected' | 'Pending Delivery'>
}

export const columns: ColumnDef<Orders>[] = [
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
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
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
    accessorKey: 'item',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Item
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Price
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'payment',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Payment
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
