import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { API } from '@/lib/API'
import { InventoryArtwork, ResponseApi, ResponseApiList } from '@/types/API'
import { flexRender, SortingState, getCoreRowModel, getSortedRowModel, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { columns } from './columns'


interface CreatedArtwork {
  artwork_id: number,
  updated_at: string,
  created_at: string,
  id: number
}

export const ViewingRoomCreatePage = () => {
  const { toast } = useToast();

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState<InventoryArtwork[]>([]);

  const navigateTo = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const response = await API.get<ResponseApiList<InventoryArtwork>>(`/inventory/artworks`);
        setData(response.data);
      } catch (error) {
        let errorMessage = "Error fetching data";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log(errorMessage);
      }
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

  const getSelected = Object.keys(rowSelection).map((row) => {
    const selectedFeatureId = (data[row] as InventoryArtwork).id;
    return selectedFeatureId;
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formInput = {
      artwork_ids: getSelected
    }

    try {
      await API.post<number[], ResponseApi<CreatedArtwork>>(`/viewing-room/artwork`, formInput, {
        Accept: 'application/json',
        "Content-Type": 'application/json'
      });
      await toast({
        title: `Success!`,
        description: "Created data",
      })
      navigateTo('/content-management/viewing-room/artwork');
    } catch (error) {
      console.log('Error updating artist:', error.message);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.response.data.message
      })
    }
  };

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Add New Artwork</h1>
      <form className='grid md:gap-10 gap-5 container' encType='multipart/form-data' onSubmit={handleSubmit}>
        <fieldset>
          {data.length > 0 && (
            <div className='mt-4 space-y-2'>
              <Input
                label='Select Artworks'
                placeholder='Search...'
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
                  <Button variant='outline' type='button' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                  </Button>
                  <p className='text-sm font-medium'>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                  </p>
                  <Button variant='outline' type='button' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </fieldset>
        <div className='col-span-2 flex items-center justify-end'>
          <Button size='lg' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </section>
  )
}
