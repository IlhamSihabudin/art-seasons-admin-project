import { useState, useEffect } from 'react'
import { Plus, Search } from 'lucide-react'
import { flexRender, SortingState, getCoreRowModel, getSortedRowModel, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, useReactTable } from '@tanstack/react-table'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Artists, columns } from './columns'

export const ArtistsDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<Artists[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

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

  useEffect(() => {
    ; (async () => {
      const res = await getData()
      setData(res)
    })()
  }, [])

  const handleSelect = () => {
    setIsOpen(false)
    setSorting([])
    setColumnFilters([])
    setRowSelection({})
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className='flex items-center gap-2 ml-10'>
          <div className='w-4 h-4 grid place-items-center bg-primary rounded-full'>
            <Plus size={14} className='text-white' />
          </div>
          Add Artwork
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Artist Name A – Add Artwork(s)</DialogTitle>
        </DialogHeader>
        <div className='relative'>
          <Search size={16} className='absolute top-1/2 -translate-y-1/2 left-2' />
          <Input
            className='bg-white pl-8'
            placeholder='Search for artwork'
            value={(table.getColumn('artworkName')?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn('artworkName')?.setFilterValue(event.target.value)}
          />
        </div>
        <div className='rounded-lg border'>
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
        <div className='flex items-center justify-end'>
          <Button onClick={handleSelect}>Add {table.getFilteredSelectedRowModel().rows.length} Artist</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

async function getData(): Promise<Artists[]> {
  return [
    {
      id: 'abcdefgh0',
      artworkName: 'Name of artwork 0',
      artistName: 'Wiscaksono 0',
      description: 'Description of artwork 0',
      tags: ['A-emilychen']
    },
    {
      id: 'abcdefgh1',
      artworkName: 'Name of artwork 1',
      artistName: 'Wiscaksono 1',
      description: 'Description of artwork 1',
      tags: ['A-emilychen']
    }
  ]
}
