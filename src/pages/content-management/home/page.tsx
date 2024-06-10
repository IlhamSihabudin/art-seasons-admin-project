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
import { Textarea } from '@/components/ui/textarea'

import { useGet } from '@/hooks/useGet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import InputImageMultiple from '@/components/ui/input-image-multiple'

import InputFeaturedItems from '@/components/ui/input-featured-items'
import InputNewsMultiple from '@/components/ui/input-news-multiple'

export interface ImgProps {
  id?: number
  name: string
  img: File | Blob | MediaSource | string
  type?: string
  created_at?: string
  updated_at?: string
}
export interface FeaturedItemProps {
  id?: number
  name: string
  tags: string
  start_date: string
  end_date: string
  organizer: string
  location: string
  desc: string
  img: string
  attach_doc?: string
  is_visible: boolean
  category_type: string
  created_at?: string
  updated_at?: string
  remarks?: string
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
  
  const [selectedType, setSelectedType] = useState<FeaturedTypes>(featuredType[0])

  const [featuredItems, setFeaturedItems] = useState<ResponseType<typeof selectedType.value>[]>([])
  const [latestNews, setLatestNews] = useState<LatestNews[]>([])

  const [topBannerImages, setTopBannerImages] = useState([])
  const [bottomBannerImages, setBottomBannerImages] = useState([])
  const [deletedTopBannerIds, setDeletedTopBannerIds] = useState([])
  const [deletedBottomBannerIds, setDeletedBottomBannerIds] = useState([])

  useEffect(() => {
    if (data?.data.top_banners) {
      setTopBannerImages(data?.data.top_banners)
    }

    if (data?.data.bottom_banners) {
      setBottomBannerImages(data?.data.bottom_banners)
    }

    if (data?.data.featured_items) {
      setFeaturedItems(data?.data.featured_items)
    }

    if (data?.data.latest_news) {
      setLatestNews(data?.data.latest_news)
    }
  }, [data]) 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // if (topBanner.length <= 0 || bottomBanner.length <= 0 || getSelected.length <= 0 || !previewLatestNews) {
    //   return toast({
    //     variant: 'destructive',
    //     title: 'Please fill out all field.'
    //   })
    // }

    const topBannerData = topBannerImages.map(item => {
      if (item.id != '') {
        item.img = ''
      }
      return item
    })

    const bottomBannerData = bottomBannerImages.map(item => {
      if (item.id != '') {
        item.img = ''
      }
      return item
    })

    const featuredItemData = featuredItems.map(item => {
      const obj = {
        id: '',
        type: item.category_type.replace('-', ' '),
        feature_id: item.id,
        remarks: item.remarks ?? ''
      }
      return obj
    })

    const latestNewsData = latestNews.map(item => {
      const obj = {
        news_id: item.news_id,
        preview: item.preview
      }

      return obj
    })

    // console.log('data top banner', topBannerData)
    console.log('data featured item', featuredItemData)

    const formInput: FormInput = {
      top_banners: topBannerData,
      bottom_banners: bottomBannerData,
      featured_items: featuredItemData,
      latest_news: latestNewsData,
      delete_top_banner: deletedTopBannerIds,
      delete_bottom_banner: deletedBottomBannerIds
    }

    console.log('form', formInput)
    mutate(formInput)
  }

  return (
    <section className='space-y-5'>
      <h1 className='font-bold text-3xl'>Home</h1>
      <form className='grid md:grid-cols-2 md:gap-10 gap-5 container' onSubmit={handleSubmit}>
        <fieldset className='space-y-7'>
          <fieldset>
            <InputImageMultiple
              label='Top Banner Carousel'
              images={topBannerImages}
              setImages={setTopBannerImages}
              onDeletedImages={imageIds => {
                setDeletedTopBannerIds(imageIds);
              }}
              onChangeImage={file => {}}
            />
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Format: jpg, jpeg, png</li>
              <li>File size: 2MB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>

          <fieldset>
            <InputImageMultiple
              label='Bottom Banner Carousel'
              images={bottomBannerImages}
              setImages={setBottomBannerImages}
              onDeletedImages={imageIds => {
                setDeletedBottomBannerIds(imageIds)
              }}
              onChangeImage={file => {}}
            />
            <ul className='text-xs space-y-1 mt-2.5'>
              <li>Format: jpg, jpeg, png</li>
              <li>File size: 2MB (max)</li>
              <li>Resolution: 72ppi (min)</li>
            </ul>
          </fieldset>
        </fieldset>

        <fieldset>
          {/* FEATURED ITEMS ====================================== */}
          <fieldset>
            <div className='space-y-2'>
              <Label className='mb-1 block'>
                Featured Items
                <span className='text-destructive'> *</span>
              </Label>
              <InputFeaturedItems featuredItems={featuredItems} setFeaturedItems={setFeaturedItems} />
            </div>
          </fieldset>
          {/* END LATEST NEWS ===================================== */}

          <div className='h-8'></div>
          {/* LATEST NEWS ========================================= */}
          <Label className='mb-3 block'>
            Latest News
            <span className='text-destructive'> *</span>
          </Label>
          <InputNewsMultiple latestNews={latestNews} setLatestNews={setLatestNews} />
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

const LatestNewsList = ({
  listNews,
  latestNews,
  setLatestNews,
  previewLatestNews
}: {
  listNews: News[]
  latestNews: LatestNews[]
  setLatestNews: React.Dispatch<React.SetStateAction<LatestNews[]>>
  previewLatestNews: (value: PreviewProps) => void
}) => {
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

  const getSelected = Object.keys(rowSelection).map(row => {
    const selectedNews = listNews[row] as News
    return selectedNews
  })

  console.log('latest news', latestNews)

  return (
    <fieldset>
      {listNews.length > 0 && (
        <div className='mt-4 space-y-2'>
          <Label className='block mb-2.5'>Latest News</Label>
          {latestNews &&
            latestNews.map((item, index) => (
              <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                <img className='max-h-36 aspect-square object-center object-cover rounded-l-lg' src={item?.news?.img} alt='' />
                <div className='flex flex-col justify-between p-4 leading-normal'>
                  <Label className='block mb-2.5'>{item?.news.headline}</Label>
                  <Textarea
                    label='Preview:'
                    required
                    value={item.preview}
                    onChange={event => {
                      let items = latestNews
                      items[index].preview = event.target.value
                      setLatestNews(items)
                    }}
                  />
                </div>
              </div>
            ))}
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
