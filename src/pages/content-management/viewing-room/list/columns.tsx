import { Link } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil, ArrowUpDown } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { ViewAction } from './actions/view.action'
import { DeleteAction } from './actions/delete.action'

export type Artists = {
  id: string
  name: string
  tag: string
  description: string
  visibility: Readonly<'Visible' | 'Hidden'>
  cv: {
    name: string
    url: string
  }
}

export const columns: ColumnDef<Artists>[] = [
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
          Exhibition Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'tag',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tag
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Short Description
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
    accessorKey: 'cv',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          CV
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    },
    cell: ({ row }) => (
      <a href={row.original.cv.url} target='_blank' className='underline'>
        {row.original.cv.name}
      </a>
    )
  },
  {
    accessorKey: '',
    header: 'Actions',
    cell: ({ row }) => (
      <div className='flex items-center gap-2.5'>
        <ViewAction />
        <Link to={`/content-management/artists/edit/${row.original.id}`}>
          <Pencil size={20} className='cursor-pointer hover:opacity-90 transition-opacity' />
        </Link>
        <DeleteAction />
      </div>
    )
  }
]
