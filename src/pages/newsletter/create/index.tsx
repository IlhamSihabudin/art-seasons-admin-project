import { useState, useEffect, useRef } from 'react'
import { flexRender, SortingState, getCoreRowModel, getSortedRowModel, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, useReactTable } from '@tanstack/react-table'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/radio-group'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { columns } from './columns'
import { API } from '@/lib/API'
import { CustomerNewsletter, ResponseApi, ResponseApiList } from '@/types/API'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import { ImageIcon } from '@radix-ui/react-icons'
import { Trash } from 'lucide-react'
import InputImage from '@/components/ui/input-image'

interface ReqeustNewslatter {
  title: string
  img: File
  is_for_all: string
  customer_ids: { [key: string]: number }
}

interface ResponseNewslatter {
  title: string
  is_for_all: string
  customer_ids: string[]
  img: string
  updated_at: string
  created_at: string
  id: number
}

export const NewsletterCreatePage = () => {
  const { toast } = useToast()
  const navigateTo = useNavigate()

  const [data, setData] = useState<CustomerNewsletter[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const title = useRef<HTMLInputElement>()
  const [img, setImg] = useState<File | Blob>()
  const [isForAll, setIsForAll] = useState<string>('0')

  const [scheduleSendOn, setScheduleSendOn] = useState('');
  // const [selecetedCustomer, setSelectedCustomer] = useState<CustomerNewsletter[]>([]);

  useEffect(() => {
    ;(async () => {
      try {
        const res = await API.get<ResponseApiList<CustomerNewsletter>>('/newsletter/list-customer')
        setData(res.data)
      } catch (error) {
        const err = error as AxiosError
        console.log((err.response?.data as AxiosError).message)
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // verify data
    if (!title.current?.value) {
      return toast({
        variant: 'destructive',
        title: `Please fill out all fields`
      })
    } else if (!img) {
      return toast({
        variant: 'destructive',
        title: `Please choose image`
      })
    }

    const getSelected = Object.keys(rowSelection).map(row => {
      const selectedCustomer = (data[row] as CustomerNewsletter).id
      return selectedCustomer
    })

    if (isForAll == '0' && getSelected.length == 0) {
      return toast({
        variant: 'destructive',
        title: `Please select customer`
      })
    }

    const formInput: ReqeustNewslatter = {
      title: title.current.value,
      img,
      is_for_all: isForAll,
      customer_ids: getSelected,
      schedule_send_on: scheduleSendOn.replace('T', ' ') + ':00'
    }

    try {
      await API.post<ReqeustNewslatter, ResponseApi<ResponseNewslatter>>(`/newsletter`, formInput, {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data'
      })
      await toast({
        title: `Success!`,
        description: 'Created data'
      })
      navigateTo('/newsletter')
    } catch (error) {
      const err = error as AxiosError
      // let desc = (err.response?.data as AxiosError).data
      // if (desc == 'Undefined array key "customer_ids"') {
      //   desc = 'Select at least one customer'
      // }
      toast({
        variant: 'destructive',
        title: (err.response?.data as AxiosError).message,
        // description: desc
      })
    }
  }

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Add New Newsletter</h1>
      <form className='space-y-5' onSubmit={handleSubmit}>
        <Input label='Title' required placeholder='Enter title' ref={title} />

        <fieldset>
          <Label className='block mb-2.5'>
            Featured Image <span className='text-destructive'>*</span>
          </Label>
          <div className='flex justify-evenly gap-4 w-full'>
            <div className='w-full'>
              <InputImage
                onChangeImage={file => {
                  setImg(file)
                }}
              />
            </div>
            <ul className='text-xs space-y-1 w-full'>
              <li>Pixel size: 1440 x 480 (min)</li>
              <li>Aspect ratio: 1:1 (square)</li>
              <li>Format: jpg, pdf, png</li>
              <li>File size: 2MB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </div>
        </fieldset>

        <fieldset>
          <Label className='block mb-2.5'>Send to</Label>
          <RadioGroup defaultValue='0' className='flex items-center'>
            <div className='flex items-center space-x-2'>
              <Input
                type='radio'
                value='1'
                required
                id='forAll'
                checked={isForAll == '1'}
                name='isForAll'
                onChange={(e: React.FormEvent<HTMLInputElement>) => setIsForAll(e.target.value)}
              />
              <Label htmlFor='forAll' className='font-normal'>
                All Customers
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Input
                type='radio'
                value='0'
                id='notForAll'
                checked={isForAll == '0'}
                name='isForAll'
                onChange={(e: React.FormEvent<HTMLInputElement>) => setIsForAll(e.target.value)}
              />
              <Label htmlFor='notForAll' className='font-normal'>
                Selected Customers
              </Label>
            </div>
          </RadioGroup>
        </fieldset>

        {isForAll !== '1' && (
          <>
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
          </>
        )}

        <Input
          label='Schedule to send on'
          placeholder='Select date and time'
          type={'datetime-local'}
          value={scheduleSendOn}
          required
          onChange={(e) => {
            setScheduleSendOn(e.target.value)
          }}
        />

        {/* <Input label='Schedule to send on' type='date' /> */}
        <div className='col-span-2 gap-4 flex items-center justify-end'>
          <Button
            variant={'outline'}
            size='lg'
            type='button'
            onClick={() => {
              navigateTo(-1)
            }}
          >
            Back
          </Button>
          <Button size='lg' type='submit'>
            Save
          </Button>
        </div>
      </form>
    </section>
  )
}
