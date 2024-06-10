import { FeaturedItemProps } from '@/pages/content-management/home/page'
import { CheckIcon, ChevronsUpDown, Trash } from 'lucide-react'
import linkIcon from '@/assets/icons/link.svg'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { cn } from '@/lib/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { useEffect, useMemo, useState } from 'react'
import { API } from '@/lib/API'
import { toast } from './use-toast'
import { AxiosError, AxiosResponse } from 'axios'
import { columns as columnsName, columnsFullname, columnsHeadline } from '@/pages/content-management/home/columns'
import { ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Input } from './input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Reorder } from 'framer-motion'

const InputFeaturedItems = ({
  featuredItems,
  setFeaturedItems
}: {
  featuredItems: FeaturedItemProps[]
  setFeaturedItems: React.Dispatch<React.SetStateAction<FeaturedItemProps[]>>
}) => {
  interface FeaturedTypes {
    name: string
    value: 'artists' | 'art fairs' | 'exhibitions' | 'viewing room' | 'news' | 'publications'
  }

  const featuredType: FeaturedTypes[] = [
    {
      name: 'artists',
      value: 'artists'
    },
    {
      name: 'art fairs',
      value: 'art fairs'
    },
    {
      name: 'exhibitions',
      value: 'exhibitions'
    },
    {
      name: 'events',
      value: 'events'
    },
    {
      name: 'viewing room',
      value: 'viewing room'
    },
    {
      name: 'news',
      value: 'news'
    },
    {
      name: 'publications',
      value: 'publications'
    }
  ]

  const [open, setOpen] = useState(false)
  const [openListFeature, setOpenListFeature] = useState(false)
  const [changeColumn, setChangeColumn] = useState<FeaturedTypes>()
  const [selectedType, setSelectedType] = useState<FeaturedTypes>(featuredType[0])
  const [listFeaturedList, setListFeaturedList] = useState<ResponseType<typeof selectedType.value>[]>([])

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const getSelected = Object.keys(rowSelection).map(row => {
    const selectedFeatureId = (listFeaturedList[row as keyof typeof listFeaturedList] as ResponseType<typeof selectedType.value>).id
    const featureItems = {
      type: changeColumn?.value,
      feature_id: selectedFeatureId
    }
    return featureItems
  })

  const columns = useMemo(() => {
    if (changeColumn?.value === 'artists') {
      return columnsFullname
    }
    if (changeColumn?.value === 'news') {
      return columnsHeadline
    }
    return columnsName
  }, [changeColumn?.value])

  const table = useReactTable({
    data: listFeaturedList,
    columns,
    enableMultiRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5
      }
    },
    state: {
      sorting,
      rowSelection,
      columnFilters
    }
  })

  async function handleSelectType() {
    // console.log(typeof selectedType.value);
    try {
      const body = {
        category: selectedType.value
      }
      const response = await API.post<typeof body, ResponseApi<ResponseType<typeof selectedType.value>[]>>(`/home/search-featured`, body)
      setListFeaturedList(response.data)
      setChangeColumn(selectedType)
      setOpenListFeature(true)
    } catch (error) {
      const err = error as AxiosError
      toast({
        variant: 'destructive',
        title: (err.response?.data as AxiosError).message,
        description: (err.response?.data as AxiosResponse).data
      })
    }
  }

  useEffect(() => {
    if (listFeaturedList) {
      initSelectedTable()
    }
  }, [listFeaturedList])

  const removeItems = index => {
    let data = [...featuredItems]
    const deletedImg = featuredItems[index]
    // if (deletedImg.id) {
    //   deleledImages.push(deletedImg.id)
    // }
    data.splice(index, 1)
    setFeaturedItems(data)

    // onDeletedImages(deleledImages)
  }

  const handleAddItem = () => {
    var items = Object.keys(rowSelection).map(row => {
      const selectedFeature = listFeaturedList[row as keyof typeof listFeaturedList] as ResponseType<typeof selectedType.value>
      const featureItem: FeaturedItemProps = {
        ...selectedFeature,
        category_type: changeColumn?.value.replace(' ', '-'),
        remarks: ''
      }

      const itemExist = featuredItems.find(item => item.category_type == featureItem.category_type && item.id == featureItem.id)

      if (!itemExist) return featureItem
    })

    items = items.filter(item => item != undefined)

    setFeaturedItems([...featuredItems, ...items])
    setOpenListFeature(false)
  }

  const initSelectedTable = () => {
    console.log('init table')
    const initialState: Record<string, boolean> = {}
    listFeaturedList?.forEach((value, key) => {
      console.log('foreach')
      // console.log('value', value, selectedType.name)
      // if category same
      const hasSelected = featuredItems.find(item => item.id == value.id && item.category_type == selectedType.name.replace(' ', '-'))
      // const hasSelected = featuredItems.find(item => item.id == value.id)
      console.log('selected', hasSelected)
      if (hasSelected) {
        initialState[key] = true
        // value.link = hasArtist.link
        // for remarks
      }
    })

    // setInitialSelectedTable(initialState)
    setRowSelection(initialState)
  }

  return (
    <>
      <Reorder.Group axis='y' onReorder={setFeaturedItems} values={featuredItems} className='space-y-2'>
        {featuredItems.map((feature, index) => (
          <Reorder.Item key={index} value={feature}>
            <div className='bg-white rounded border flex items-center justify-between flex-1 pr-3 px-2 py-4'>
              <div className='flex items-center gap-4 w-full'>
                <button disabled>
                  <ChevronsUpDown size={24} />
                </button>
                <img src={feature.img ? feature.img : feature.profile_picture} alt='Feature Image' className='max-h-36 aspect-square object-center object-cover rounded-sm' />
                <div className='w-full'>
                  <p className='text-xl font-bold'>{feature.name ? feature.name : feature.headline ? feature.headline : feature.fullname}</p>
                  <table className='w-full flex flex-col gap-3 mt-3 text-[#808080]'>
                    <tr className='flex flex-row gap-3'>
                      <td className='text-sm font-semibold' width={80}>
                        Type
                      </td>
                      <td className='text-sm border-b w-full border-[#E3E3E3] text-[#808080]'>{feature?.category_type}</td>
                    </tr>
                    <tr className='flex flex-row gap-3'>
                      <td className='text-sm font-semibold' width={80}>
                        By
                      </td>
                      <td className='text-sm border-b w-full border-[#E3E3E3] text-[#808080]'>{feature?.organizer}</td>
                    </tr>
                    <tr className='flex flex-row gap-3'>
                      <td className='text-sm font-semibold' width={80}>
                        Date
                      </td>
                      <td className='text-sm w-full border-[#E3E3E3] text-[#808080] flex gap-3'>
                        <p className='border-b w-full'>{feature?.start_date}</p>
                        <p>to</p>
                        <p className='border-b w-full'>{feature?.end_date}</p>
                      </td>
                    </tr>
                    <tr className='flex flex-row gap-3'>
                      <td className='text-sm font-semibold' width={80}>
                        Location
                      </td>
                      <td className='text-sm border-b w-full border-[#E3E3E3] text-[#808080]'>{feature?.location}</td>
                    </tr>
                    <tr className='flex flex-row gap-3'>
                      <td className='text-sm font-semibold' width={80}>
                        Remarks
                      </td>
                      <td className='text-sm border-b w-full border-[#E3E3E3] text-[#808080]'>
                        <input
                          placeholder='(Optional)'
                          className='w-full focus:outline-none'
                          value={feature?.remarks}
                          onChange={event => {
                            feature.remarks = event.target.value
                            setFeaturedItems([...featuredItems])
                          }}
                        />
                      </td>
                    </tr>
                    <tr className='flex flex-row gap-3'>
                      <td className='text-sm font-semibold' width={80}>
                        <img src={linkIcon} width={20} />
                      </td>
                      <td className='text-sm border-b w-full border-[#E3E3E3]'>
                        {feature?.website}
                      </td>
                    </tr>
                  </table>
                </div>
                <button type='button'>
                  <Trash size={18} onClick={() => removeItems(index)} />
                </button>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <div className='flex items-center gap-5 relative'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button type='button' variant='outline' role='combobox' aria-expanded={open} className='w-[300px] justify-between'>
              {selectedType?.name ? selectedType?.name : 'Select Feature Type'}
              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[300px] p-0'>
            <Command>
              <CommandInput placeholder='Search artist' className='h-9' />
              <CommandEmpty>Not found.</CommandEmpty>
              <CommandGroup>
                {featuredType.map(type => (
                  <CommandItem
                    key={type.name}
                    value={type.value}
                    onSelect={() => {
                      setSelectedType(type)
                      setOpen(false)
                    }}
                  >
                    {type.name}
                    <CheckIcon className={cn('ml-auto h-4 w-4', type.value === selectedType?.value ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Button type='button' onClick={() => handleSelectType()}>
          Select
        </Button>
      </div>

      {openListFeature && listFeaturedList?.length > 0 && (
        <div className='pt-4 space-y-2 '>
          <Input
            label='Select Featured Items'
            placeholder='Search...'
            onChange={event => {
              changeColumn.value === 'art fairs' || changeColumn.value === 'exhibitions' || changeColumn.value === 'viewing room' || changeColumn.value === 'publications'
                ? table.getColumn('name')?.setFilterValue(event.target.value)
                : changeColumn.value === 'artists'
                ? table.getColumn('fullname')?.setFilterValue(event.target.value)
                : changeColumn.value === 'news'
                ? table.getColumn('headline')?.setFilterValue(event.target.value)
                : ''
            }}
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

            <div className='flex items-end justify-end space-x-2 px-4 py-2 border-t'>
              <Button
                type='button'
                variant='outline'
                size='sm'
                className='w-20'
                onClick={() => {
                  console.log('selected', getSelected)
                  handleAddItem()
                }}
                // disabled={!table.getCanNextPage()}
              >
                Add
              </Button>
            </div>

            <div className='flex items-center justify-between space-x-2 px-4 py-2 border-t'>
              <Button type='button' variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
              </Button>
              <p className='text-sm font-medium'>
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </p>
              <Button type='button' variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default InputFeaturedItems
