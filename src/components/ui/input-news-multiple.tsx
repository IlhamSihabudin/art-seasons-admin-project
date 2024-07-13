import React, { useEffect, useState } from 'react'
import { LatestNews, News, ResponseApiList } from '@/types/API'
import { Reorder } from 'framer-motion'
import { ChevronsUpDown, Trash } from 'lucide-react'
import linkIcon from '@/assets/icons/link.svg'
import { Textarea } from './textarea'
import { ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { columns, columnsNews } from '@/pages/content-management/home/columns'
import { useGet } from '@/hooks/useGet'
import { Input } from './input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'
import { Button } from './button'

const InputNewsMultiple = ({ latestNews, setLatestNews }: { latestNews: LatestNews[]; setLatestNews: React.Dispatch<React.SetStateAction<LatestNews[]>> }) => {
  const { data, isLoading: isNewsLoading } = useGet<ResponseApiList<News>>('list-news', '/news?limit=10000')

  const [addNewVisible, setAddNewVisible] = useState(false)
  const [listNews, setListNews] = useState<News[]>([])

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const tableLatestNews = useReactTable({
    data: listNews,
    columns: columnsNews,
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

  useEffect(() => {
    if (data?.data) {
      setListNews(data.data)
    }
  }, [data])

  useEffect(() => {
    if (listNews && latestNews) {
      initSelectedTable()
    }
  }, [listNews, latestNews])

  const handleSelectedItems = () => {
    let items = Object.keys(rowSelection).map(row => {
      const selectedNews = listNews[row] as News

      const obj: LatestNews = {
        news_id: selectedNews.id,
        preview: '',
        news: {
          id: selectedNews.id,
          headline: selectedNews.headline,
          img: selectedNews.img,
          website: selectedNews.website,
          author: selectedNews.author
        }
      }

      const itemExist = latestNews.find(item => item.news.id == selectedNews.id)

      if (!itemExist) return obj
    })

    items = items.filter(item => item != undefined)

    setLatestNews([...latestNews, ...items])
    setAddNewVisible(false)
  }

  const initSelectedTable = () => {
    const initialState: Record<string, boolean> = {}
    listNews?.forEach((value, key) => {
      const hasSelected = latestNews.find(item => item.news.id == value.id)
      if (hasSelected) {
        initialState[key] = true
      }
    })

    setRowSelection(initialState)
  }

  const removeItems = index => {
    let data = [...latestNews]

    data.splice(index, 1)
    setLatestNews(data)
  }

  return (
    <div className='space-y-2.5'>
      <Reorder.Group axis='y' onReorder={setLatestNews} values={latestNews} className='space-y-2'>
        {latestNews.map((item, index) => (
          <Reorder.Item key={index} value={item}>
            <div className='bg-white rounded border flex items-center justify-between flex-1 pr-3 px-2 py-4'>
              <div className='flex items-center gap-4 w-full'>
                <button disabled>
                  <ChevronsUpDown size={24} />
                </button>
                <img src={item.news.img} alt='Feature Image' className='max-h-36 aspect-square object-center object-cover rounded-sm' />
                <div className='w-full'>
                  <p className='text-xl font-bold'>{item.news.headline}</p>
                  <table className='w-full flex flex-col gap-3 mt-3 text-[#808080]'>
                    <tr className='flex flex-row gap-3'>
                      <td className='text-sm font-semibold mt-2' width={80}>
                        Preview
                      </td>
                      <td className='text-sm border-b w-full border-[#E3E3E3] text-[#808080]'>
                        <Textarea
                          required
                          className='border-none'
                          placeholder='Max 150 characters will be shown'
                          maxLength={150}
                          value={item?.preview}
                          readOnly
                          onChange={event => {
                            // let items = latestNews
                            // items[index].preview = event.target.value
                            // setLatestNews(items)
                            item.preview = event.target.value
                            setLatestNews([...latestNews])
                          }}
                        />
                      </td>
                    </tr>
                    <tr className='flex flex-row gap-3'>
                      <td className='text-sm font-semibold' width={80}>
                        <img src={linkIcon} width={20} />
                      </td>
                      <td className='text-sm border-b w-full border-[#E3E3E3] text-[#808080] break-all'>{item.news.website}</td>
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

      {addNewVisible == false && (
        <Button type='button' onClick={() => setAddNewVisible(!addNewVisible)}>
          Add New
        </Button>
      )}

      {addNewVisible && (
        <div>
          <Input label='Select Latest News' placeholder='Search...' onChange={event => tableLatestNews.getColumn('headline')?.setFilterValue(event.target.value)} />

          <div className='bg-white rounded-lg border'>
            <Table>
              <TableHeader>
                {tableLatestNews.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {tableLatestNews.getRowModel().rows?.length ? (
                  tableLatestNews.getRowModel().rows.map(row => (
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
                  handleSelectedItems()
                }}
                // disabled={!table.getCanNextPage()}
              >
                Add
              </Button>
            </div>

            <div className='flex items-center justify-between space-x-2 px-4 py-2 border-t'>
              <Button variant='outline' type='button' size='sm' onClick={() => tableLatestNews.previousPage()} disabled={!tableLatestNews.getCanPreviousPage()}>
                Previous
              </Button>
              <p className='text-sm font-medium'>
                Page {tableLatestNews.getState().pagination.pageIndex + 1} of {tableLatestNews.getPageCount()}
              </p>
              <Button variant='outline' type='button' size='sm' onClick={() => tableLatestNews.nextPage()} disabled={!tableLatestNews.getCanNextPage()}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InputNewsMultiple
