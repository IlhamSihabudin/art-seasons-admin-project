import { Trash } from 'lucide-react'
import { useState, useEffect } from 'react'
import { flexRender, SortingState, getCoreRowModel, getSortedRowModel, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, useReactTable } from '@tanstack/react-table'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Customers, columns } from './columns'

export const NewsletterCreatePage = () => {
  const [data, setData] = useState<Customers[]>([])
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
      <h1 className='font-bold text-3xl'>Add New Newsletter</h1>
      <form className='space-y-5'>
        <Input label='Title' required placeholder='Enter title' />

        <fieldset>
          <Label className='block mb-2.5'>
            Featured Image <span className='text-destructive'>*</span>
          </Label>
          <div className='flex items-center gap-5 w-full mb-2.5'>
            <div className='bg-white py-3 px-4 rounded border flex items-center justify-between flex-1'>
              <div className='flex items-center gap-4'>
                <img src='https://placehold.co/52x52' alt='' className='w-14 h-14 aspect-square object-cover object-center rounded' />
                <p className='text-sm'>Image Name 1</p>
              </div>
              <button type='button'>
                <Trash size={18} />
              </button>
            </div>
            <ul className='text-xs space-y-1'>
              <li>Pixel size: 400 x 400px (min)</li>
              <li>Aspect ratio: 1:1 (square)</li>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 500KB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </div>
          <Button variant='outline' type='button'>
            Replace Image
          </Button>
        </fieldset>

        <fieldset>
          <Label className='block mb-2.5'>Visibility</Label>
          <RadioGroup defaultValue='visible' className='flex items-center'>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='visible' id='visible' />
              <Label htmlFor='visible' className='font-normal'>
                Visible
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='hidden' id='hidden' />
              <Label htmlFor='hidden' className='font-normal'>
                Hidden
              </Label>
            </div>
          </RadioGroup>
        </fieldset>

        <Input
          label='Send Newsletter To:'
          placeholder='Search for name'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
        />

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

        <Input label='Schedule to send on' type='date' />
        <div className='col-span-2 flex items-center justify-end'>
          <Button size='lg' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </section>
  )
}

async function getData(): Promise<Customers[]> {
  return [
    {
      id: '728ed52f',
      name: 'Wiscaksono',
      email: 'wwicaksono96@gmail.com',
      mobile: '9123 4567',
      subscribed: 'Yes'
    },
    {
      id: '728ed52d',
      name: 'Customer A',
      email: 'wwicaksono96@gmail.com',
      mobile: '9123 4567',
      subscribed: 'Yes'
    }
  ]
}
