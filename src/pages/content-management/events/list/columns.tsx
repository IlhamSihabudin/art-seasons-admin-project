import { Link } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil, ArrowUpDown } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { ViewAction } from './actions/view.action'
import { DeleteAction } from './actions/delete.action'
import { formatDate } from '../../exhibitions/list/columns'
import { Event } from '@/types/API'

export const columns: ColumnDef<Event>[] = [
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
          Event Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    },
    cell: ({ row }) => (
      <p className='min-w-[175px]'>
        {/* {formatDate(row.original.start_date) + " - " + formatDate(row.original.end_date)} */}
        {row.original.date}
      </p>
    )
  },
  {
    accessorKey: 'organizer',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Organizer
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'location',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Location
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    }
  },
  {
    accessorKey: 'is_visible',
    header: ({ column }) => {
      return (
        <p className='flex items-center cursor-pointer' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Visibility
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </p>
      )
    },
    cell: ({ row }) => (
      <p>
        {row.original.is_visible === 1 ? "visible" : "hidden"}
      </p>
    )
  },
  {
    accessorKey: '',
    header: 'Actions',
    cell: ({ row }) => (
      <div className='flex items-center gap-2.5'>
        <ViewAction data={row.original} />
        <Link to={`/content-management/events/edit/${row.original.id}`}>
          <Pencil size={20} className='cursor-pointer hover:opacity-90 transition-opacity' />
        </Link>
        <DeleteAction id={row.original.id} />
      </div>
    )
  }
]
