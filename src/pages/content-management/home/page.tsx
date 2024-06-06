import React, { useState, useEffect, useMemo } from 'react'
import { Reorder } from 'framer-motion'
import { CheckIcon, ChevronsUpDown, Trash } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { API } from '@/lib/API'
import { About, ArtFair, Artist, Artwork, Exhibition, HomeRepsonse, LatestNews, News, Publication, ResponseApi, ResponseApiList, ResponseSearchNews } from '@/types/API'
import { AxiosError, AxiosResponse } from 'axios'

import { flexRender, SortingState, getCoreRowModel, getSortedRowModel, getPaginationRowModel, ColumnFiltersState, getFilteredRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { columns as columnsName, columnsFullname, columnsHeadline, columnsNews } from './columns'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

import { useGet } from '@/hooks/useGet'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface ImgProps {
  id: number
  name: string
  img: File | Blob | MediaSource | string
  type?: string
  created_at?: string
  updated_at?: string
}

export type ResponseType<T extends string> = T extends 'artists'
  ? Artist
  : T extends 'art fairs'
  ? ArtFair
  : T extends 'exhibitions'
  ? Exhibition
  : T extends 'viewing room'
  ? Artwork
  : T extends 'news'
  ? ResponseSearchNews
  : T extends 'publications'
  ? Publication
  : never

interface FeaturedTypes {
  name: string
  value: 'artists' | 'art fairs' | 'exhibitions' | 'viewing room' | 'news' | 'publications'
}

interface FormInput {
  top_banners: ImgProps[]
  bottom_banners: ImgProps[]
  featured_items: {
    type: 'artists' | 'art fairs' | 'exhibitions' | 'viewing room' | 'news' | 'publications' | undefined
    feature_id: number | undefined
  }[]
  latest_news: PreviewProps[]
}

export const HomePage = () => {
  const { toast } = useToast()
  const { data } = useGet<ResponseApi<HomeRepsonse>>('home', '/home')
  const { data: newsList, isLoading: isNewsLoading } = useGet<ResponseApiList<News>>('list-news', '/news?limit=10000')

  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: async (formInput: FormInput) => {
      await API.post<FormInput, ResponseApi<About>>(`/home`, formInput, {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
      })
    },
    onSuccess: () => {
      client.invalidateQueries('home')
      toast({
        title: `Success!`,
        description: 'Updated the data'
      })
    },
    onError: error => {
      const err = error as AxiosError
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: (err.response?.data as AxiosError).message
      })
    }
  })

  const [open, setOpen] = useState(false)
  const [changeColumn, setChangeColumn] = useState<FeaturedTypes>()
  const [selectedType, setSelectedType] = useState<FeaturedTypes>(featuredType[0])
  const [listFeaturedList, setListFeaturedList] = useState<ResponseType<typeof selectedType.value>[]>([])
  const [listNews, setListNews] = useState<News[]>([])
  const [currentTopBanner, setCurrentTopBanner] = useState<ImgProps[]>([])
  const [currentButtomBanner, setCurrentButtomBanner] = useState<ImgProps[]>([])

  const [topBanner, setTopBanner] = useState<ImgProps[]>([])
  const [bottomBanner, setBottomBanner] = useState<ImgProps[]>([])
  const [featuredItems, setFeaturedItems] = useState<ResponseType<typeof selectedType.value>[]>([])
  const [latestNews, setLatestNews] = useState<LatestNews[]>([])

  const [previewLatestNews, setPreviewLatestNews] = useState<PreviewProps>()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

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
    enableMultiRowSelection: false,
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
    isNewsLoading ? [] : setListNews(newsList?.data)
    setCurrentTopBanner(data?.data.top_banners)
    setCurrentButtomBanner(data?.data.bottom_banners)
    setFeaturedItems(data?.data.featured_items)
    setLatestNews(data?.data.latest_news)
  }, [data?.data.bottom_banners, data?.data.featured_items, data?.data.latest_news, data?.data.top_banners, isNewsLoading, newsList?.data])

  const getSelected = Object.keys(rowSelection).map(row => {
    const selectedFeatureId = (listFeaturedList[row as keyof typeof listFeaturedList] as ResponseType<typeof selectedType.value>).id
    const featureItems = {
      type: changeColumn?.value,
      feature_id: selectedFeatureId
    }
    return featureItems
  })

  const handlePreviewLastestNews = (preview: PreviewProps) => {
    setPreviewLatestNews(preview)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (topBanner.length <= 0 || bottomBanner.length <= 0 || getSelected.length <= 0 || !previewLatestNews) {
      return toast({
        variant: 'destructive',
        title: 'Please fill out all field.'
      })
    }

    const formInput: FormInput = {
      top_banners: topBanner,
      bottom_banners: bottomBanner,
      featured_items: getSelected,
      latest_news: [previewLatestNews]
    }

    mutate(formInput)
  }

  function handleBottomBanner(e: React.FormEvent<HTMLInputElement>) {
    const files = (e.target as HTMLInputElement).files
    if (files !== null) {
      const newBanner: ImgProps = {
        id: bottomBanner?.length + 1,
        img: files[0],
        name: files[0].name
      }
      const udpatedBanner = [...bottomBanner, newBanner]
      setBottomBanner(udpatedBanner)
    }
  }

  function handleTopBanner(e: React.FormEvent<HTMLInputElement>) {
    const files = (e.target as HTMLInputElement).files
    if (files !== null) {
      const newBanner: ImgProps = {
        id: topBanner?.length + 1,
        img: files[0],
        name: files[0].name
      }
      const udpatedBanner = [...topBanner, newBanner]
      setTopBanner(udpatedBanner)
    }
  }

  async function handleSelectType() {
    // console.log(typeof selectedType.value);
    try {
      const body = {
        category: selectedType.value
      }
      const response = await API.post<typeof body, ResponseApi<ResponseType<typeof selectedType.value>[]>>(`/home/search-featured`, body)
      setListFeaturedList(response.data)
      setChangeColumn(selectedType)
    } catch (error) {
      const err = error as AxiosError
      toast({
        variant: 'destructive',
        title: (err.response?.data as AxiosError).message,
        description: (err.response?.data as AxiosResponse).data
      })
    }
  }

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Home</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' onSubmit={handleSubmit}>
        <fieldset>
          {/* TOP BANNER ========================================== */}
          <fieldset>
            <Label className='block mb-2.5'>
              Top Banner Carousel <span className='text-destructive'>*</span>
            </Label>

            <Label className='block mb-2.5'>Current Top Banner:</Label>
            {currentTopBanner?.length > 0 &&
              currentTopBanner.map(banner => (
                <div
                  key={banner.id}
                  className='flex mb-2 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
                >
                  <img className='max-h-36 aspect-square object-center object-cover rounded-l-lg' src={banner.img.toString()} alt={banner.type} />
                  <div className='flex flex-col justify-between p-4 leading-normal'>
                    <h5 className='mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white'>{banner.name}</h5>
                  </div>
                </div>
              ))}

            <Label className='block my-2.5'>Update Top Banner:</Label>

            <Reorder.Group axis='y' onReorder={setTopBanner} values={topBanner} className='space-y-2.5 overflow-hidden mb-4'>
              {topBanner?.map((banner, index) => (
                <div key={index} className='pb-1'>
                  <LogoImageCard image={banner} images={topBanner} setImage={setTopBanner} />
                  <div className='flex items-center flex-1'>
                    <Input
                      placeholder='Logo Name'
                      defaultValue={banner.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const set = {
                          ...banner,
                          name: (e.target as HTMLInputElement).value
                        }
                        const setName = topBanner?.map(banner => {
                          if (banner.id === set.id) return set
                          return banner
                        })
                        setTopBanner(setName)
                      }}
                    />
                  </div>
                </div>
              ))}
            </Reorder.Group>

            <Input type='file' accept='.jpeg,.png,.jpg' onChange={handleTopBanner} />

            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Format: jpg, jpeg, png</li>
              <li>File size: 2MB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
          {/* END TOP BANNER ====================================== */}

          {/* BOTTOM BANNER ======================================= */}
          <fieldset className='mt-8'>
            <Label className='block mb-2.5'>
              Bottom Banner <span className='text-destructive'>*</span>
            </Label>

            <Label className='block mb-2.5'>Current Bottom Banner:</Label>

            {currentButtomBanner?.length > 0 &&
              currentButtomBanner.map(banner => (
                <div
                  key={banner.id}
                  className='flex mb-2 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
                >
                  <img className='max-h-36 aspect-square object-center object-cover rounded-l-lg' src={banner.img.toString()} alt={banner.type} />
                  <div className='flex flex-col justify-between p-4 leading-normal'>
                    <h5 className='mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white'>{banner.name}</h5>
                  </div>
                </div>
              ))}

            <Label className='block my-2.5'>Update Bottom Banner:</Label>

            <Reorder.Group axis='y' onReorder={setBottomBanner} values={bottomBanner} className='space-y-2.5 overflow-hidden mb-4'>
              {bottomBanner?.map((banner, index) => (
                <div key={index} className='pb-1'>
                  <LogoImageCard image={banner} images={bottomBanner} setImage={setBottomBanner} />
                  <div className='flex items-center flex-1'>
                    <Input
                      placeholder='Baner Name'
                      defaultValue={banner.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const set = {
                          ...banner,
                          name: (e.target as HTMLInputElement).value
                        }
                        const setName = bottomBanner?.map(banner => {
                          if (banner.id === set.id) return set
                          return banner
                        })
                        setBottomBanner(setName)
                      }}
                    />
                  </div>
                </div>
              ))}
            </Reorder.Group>

            <Input type='file' accept='.jpeg,.png,.jpg' onChange={handleBottomBanner} />

            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Format: jpg, jpeg, png</li>
              <li>File size: 2MB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
          {/* END BOTTOM BANNER =================================== */}
        </fieldset>

        <fieldset>
          {/* FEATURED ITEMS ====================================== */}
          <fieldset>
            <div className='space-y-2'>
              <Label className='block mb-2.5'>Featured Items</Label>
              {featuredItems &&
                featuredItems.map((feature, index) => (
                  <div
                    key={index}
                    className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
                  >
                    <img className='max-h-36 aspect-square object-center object-cover rounded-l-lg' src={feature.img ? feature.img : feature.profile_picture} alt='' />
                    <div className='flex flex-col justify-between p-4 leading-normal'>
                      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                        {feature.name ? feature.name : feature.headline ? feature.headline : feature.fullname}
                      </h5>
                      <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{feature.desc ? feature.desc : feature.author ? feature.author : feature.short_desc}</p>
                    </div>
                  </div>
                ))}
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

                <Button type='button' onClick={handleSelectType}>
                  Select
                </Button>
              </div>
            </div>
            {listFeaturedList?.length > 0 && (
              <div className='mt-4 space-y-2'>
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
          </fieldset>
          {/* END LATEST NEWS ===================================== */}

          <div className='h-8'></div>
          {/* LATEST NEWS ========================================= */}
          <LatestNewsList listNews={listNews} latestNews={latestNews} previewLatestNews={handlePreviewLastestNews} />
          {/* END LATEST NEWS ===================================== */}
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

type LogoImageProps = {
  image: ImgProps
  images: ImgProps[]
  setImage: (value: ImgProps[]) => void
}

const LogoImageCard = ({ image, images, setImage }: LogoImageProps) => {
  const handleDelete = () => {
    if (images.length <= 1) return
    setImage(images.filter(img => img.id !== image.id))
  }

  return (
    <Reorder.Item className='bg-white p-2 rounded-lg border flex items-center gap-4 flex-1' key={image?.id} value={image}>
      <div className='flex items-center gap-4 flex-1'>
        <button disabled>
          <ChevronsUpDown size={24} />
        </button>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-4 flex-1'>
            <img src={typeof image.img == 'object' ? URL.createObjectURL(image.img) : image.img} alt='' className='rounded max-h-52 aspect-square object-center object-cover' />
            <p className='text-sm truncate'>{image.name}</p>
          </div>
        </div>
      </div>
      <button type='button' onClick={handleDelete} className={images.length <= 1 ? 'hidden' : ''} disabled={images.length <= 1}>
        <Trash size={20} />
      </button>
    </Reorder.Item>
  )
}

interface PreviewProps {
  news_id: number
  preview: string
}

const LatestNewsList = ({ listNews, latestNews, previewLatestNews }: { listNews: News[]; latestNews: LatestNews[]; previewLatestNews: (value: PreviewProps) => void }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const tableLatestNews = useReactTable({
    data: listNews,
    columns: columnsNews,
    enableMultiRowSelection: false,
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

  const getSelected = Object.keys(rowSelection).map(row => {
    const selectedNews = listNews[row] as News
    return selectedNews
  })

  return (
    <fieldset>
      {listNews.length > 0 && (
        <div className='mt-4 space-y-2'>
          <Label className='block mb-2.5'>Latest News</Label>
          {latestNews &&
            latestNews.map((news, index) => (
              <div
                key={index}
                className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
              >
                <img className='max-h-36 aspect-square object-center object-cover rounded-l-lg' src={news.news.img} alt='' />
                <div className='flex flex-col justify-between p-4 leading-normal relative'>
                  <h5 className='text-gray-900 font-bold text-md mb-2'>{news.news.headline}</h5>
                  <p className='text-gray-700 text-base'>Last Preview: {news.preview}</p>
                </div>
              </div>
            ))}
          {getSelected.length > 0 && (
            <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
              <img className='max-h-36 aspect-square object-center object-cover rounded-l-lg' src={getSelected[0].img} alt='' />
              <div className='flex flex-col justify-between p-4 leading-normal'>
                <Label className='block mb-2.5'>{getSelected[0].headline}</Label>
                <Textarea
                  label='Preview:'
                  required
                  onChange={event =>
                    previewLatestNews({
                      news_id: getSelected[0]?.id,
                      preview: event.target.value
                    })
                  }
                />
              </div>
            </div>
          )}
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
    </fieldset>
  )
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
