import { Link } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil, ArrowUpDown } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { ViewAction } from './actions/view.action'
import { DeleteAction } from './actions/delete.action'

export type Inventory = {
  id: string
  name: string
  artist: string
  stock: number
  price: number
  tags: string[]
  visibility: Readonly<'Visible' | 'Hidden'>
}

export const columns: ColumnDef<Inventory>[] = [
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
          Artwork Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'artist',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Artist
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Stock
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    },
    cell: ({ row }) => (row.original.stock === 0 ? <p className='text-destructive'>Out of stock</p> : <p>{row.original.stock}</p>)
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
    accessorKey: 'tags',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tags
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'visibility',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Visibility
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
        <ViewAction />
        <Pencil size={20} className='cursor-pointer hover:opacity-90 transition-opacity' />
        <DeleteAction />
      </div>
    )
  }
]
