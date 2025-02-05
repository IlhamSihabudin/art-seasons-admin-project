import { useEffect, useState } from 'react'
import { Plus, ListFilter, Search } from 'lucide-react'
import { flexRender, SortingState, getCoreRowModel, getSortedRowModel, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, useReactTable } from '@tanstack/react-table'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { UsersAdmin, columns } from './columns'

export const UserAdminPage = () => {
  const [data, setData] = useState<UsersAdmin[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    ; (async () => {
      const res = await getData()
      setData(res)
    })()
  }, [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      rowSelection,
      columnFilters
    }
  })

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Admin</h1>
      <div className='flex items-center gap-3'>
        <Button variant='outline' className='gap-2'>
          <ListFilter size={16} />
          Filters
        </Button>
        <Button className='gap-2'>
          <Plus size={16} />
          Add User
        </Button>
        <div className='text-sm font-medium flex-1'>
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='relative w-1/4'>
          <Search size={16} className='absolute top-1/2 -translate-y-1/2 left-2' />
          <Input
            className='bg-white pl-8'
            placeholder='Search by email'
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn('email')?.setFilterValue(event.target.value)}
          />
        </div>
      </div>
      <div className='bg-white rounded-lg border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className='flex items-center justify-between space-x-2 px-4 py-2 border-t'>
          <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <p className='text-sm font-medium'>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </p>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </section>
  )
}

async function getData(): Promise<UsersAdmin[]> {
  return [
    {
      id: '728ed52f',
      name: 'Admin Name Here',
      email: 'm@example.com',
      role: 'Content Manager',
      permissions: ['Content Management', 'Enquiries', 'Newsletter']
    }
  ]
}
