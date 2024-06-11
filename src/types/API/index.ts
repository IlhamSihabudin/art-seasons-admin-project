import ArtistsRequest from "../requests/artists_request";

export interface ErrorRes {
  error: string | boolean
  message: string
  status: number
}

export interface ResponseApi<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ResponseApiList<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: Meta;
}

export interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface Artist {
  id: number;
  fullname: string;
  tags: string;
  birth_year: number;
  short_desc: string;
  long_desc: string;
  profile_picture: string;
  attach_doc: string;
  is_visible: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  address: string | null;
  addtional_address: string | null;
  postal_code: string | null;
  phone_number: string;
  created_at: string;
  updated_at: string;
  role_name: 'Content_manager' | 'Admin' | 'Superadmin' | 'Customer';
}

export interface UserRequest {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
  phone_number: string,
  role: 'content_manager' | 'admin' | 'superadmin';
  address: string;
  addtional_address: string | null;
  postal_code: string;
}

export interface Exhibition {
  id?: number;
  name: string;
  tags: string;
  start_date: string;
  end_date: string;
  organizer: string;
  location: string;
  desc: string;
  img: string | File;
  attach_doc: string | File;
  is_visible: number | string;
  created_at?: string;
  updated_at?: string;
}

interface BelongExhibition {
  id: number,
  exhibition_id: number,
  artist_id: number,
  created_at: string,
  updated_at: string,
}

export interface Artwork {
  id: number;
  name: string;
  desc: string;
  price: number;
  current_stock: number;
  tags: string[];
  img: string;
  is_visible: number;
  created_at: string;
  updated_at: string;
}

export interface HasArtwork extends BelongExhibition {
  artwork: Artwork
}

interface HasArtists {
  id: number;
  artwork_id: number;
  artist_id: number;
  link: string;
  created_at: string;
  updated_at: string;
  artist: Artist;
}

export interface InventoryArtwork extends Artwork {
  has_artists: HasArtists[]
  hasArtists: HasArtists[]
}

export interface ExhibitionArtist extends BelongExhibition {
  artist: Artist;
  has_artworks: HasArtwork[];
  artworks: Artwork[]
}

export interface ExhibitionDetail extends Exhibition {
  hasArtists: ExhibitionArtist[];
  artists: ArtistsRequest[];
}

export interface CollectionDetail extends Collection {
  hasArtists: ExhibitionArtist[];
  artists: ArtistsRequest[];
}

export interface ArtFair {
  id?: number;
  name: string;
  tags: string;
  start_date: string;
  end_date: string;
  organizer: string;
  location: string;
  desc: string;
  img: string | File;
  attach_doc: string | File;
  is_visible: number | string;
  created_at?: string;
  updated_at?: string;
}

interface BelongArtfair {
  id: number,
  artist_id: number,
  created_at: string,
  updated_at: string,
}

interface ArtfairHasArtwork extends BelongArtfair {
  art_fair_artist_id: number,
  artwork: Artwork
}

export interface ArtfairArtist extends BelongArtfair {
  art_fair_id: number,
  artist: Artist;
  has_artworks: ArtfairHasArtwork[];
}

export interface ArtfairDetail extends ArtFair {
  hasArtists: ArtfairArtist[];
  artists: ArtistsRequest[];
}

export interface Event {
  id: number;
  name: string;
  website: string;
  start_date: string;
  end_date: string;
  organizer: string;
  location: string;
  desc: string;
  img: string;
  attach_doc: string;
  is_visible: number;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: number;
  headline: string;
  date: string;
  category: string;
  author: string;
  img: string;
  website: string;
  article: string;
  is_visible: number;
  created_at: string;
  updated_at: string;
}

export interface ArtworkDetail extends Artwork {
  has_artists: ArtistRelation[];
}

export interface ArtworkRalation {
  id: number;
  artwork_id: number;
  created_at: string;
  updated_at: string;
  artwork: ArtworkDetail;
}

export interface ArtistRelation {
  id: number;
  artwork_id: number;
  artist_id: number;
  link: string;
  created_at: string;
  updated_at: string;
  artist: Artist;
}

export interface Publication {
  id: number;
  name: string;
  desc: string;
  author: string;
  price: number;
  current_stock: number;
  img: string;
  is_visible: number;
  created_at: string;
  updated_at: string;
}

export interface Logo {
  id: number;
  name: string;
  img: string;
  link: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Carousel {
  id: number;
  name: string;
  img: string;
  link: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface About {
  id: number;
  news_headline: string;
  featured_img: string;
  desc: string;
  address: string;
  phone_number: string;
  website: string;
  email: string;
  sosmed_link: string;
  created_at: string;
  updated_at: string;
  logos: Logo[];
  carousel: Carousel[];
  logos_for_admin: Logo[];
}

export interface Collection {
  id: number;
  name: string;
  tags: string[];
  start_date: string | null;
  end_date: string | null;
  organizer: string;
  location: string;
  desc: string;
  img: string;
  attach_doc: string;
  is_visible: number;
  created_at: string;
  updated_at: string;
}

export interface Newsletter {
  id: number;
  title: string;
  img: string;
  is_for_all: number;
  created_at: string;
  updated_at: string;
  customers: string;
}

export interface CustomerNewsletter {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
  is_subscribed: number;
  created_at: string;
  updated_at: string;
}

interface Banner {
  id: number;
  name: string;
  img: string | File | Blob | MediaSource;
  type: 'top' | 'bottom';
  created_at: string;
  updated_at: string;
}

export interface FeaturedItem {
  id: number;
  headline: string;
  date: string;
  category: string;
  author: string;
  img: string;
  website: string;
  article: string;
  is_visible: number;
  created_at: string;
  updated_at: string;
  category_type: string;
}

export interface LatestNews {
  id: number;
  news_id?: number;
  preview: string;
  created_at: string;
  updated_at: string;
  news: FeaturedItem;
}

export interface HomeRepsonse {
  top_banners: Banner[];
  bottom_banners: Banner[];
  featured_items: FeaturedItem[];
  latest_news: LatestNews[];
}

export interface ResponseSearchNews {
  id: number;
  headline: string;
  date: string;
  category: string;
  author: string;
  img: string;
  website: string;
  article: string;
  is_visible: number;
  created_at: string;
  updated_at: string;
}

interface UserOrder {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  address: string;
  addtional_address: string | null;
  postal_code: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  stripe_id: string | null;
  pm_type: string | null;
  pm_last_four: string | null;
  trial_ends_at: string | null;
}

interface OrderItem {
  id: number;
  order_id: number;
  type: string;
  name: string;
  author: string | null;
  desc: string;
  price: number;
  tags: string[] | null;
  img: string;
  qty: number;
  created_at: string;
  updated_at: string;
}


export interface Order {
  id: number;
  order_code: string;
  user_id: number;
  total_price: number;
  taxes: number;
  delivery_fee: number;
  grand_total: number;
  payment_methods: string;
  status: string;
  admin_remarks: string | null;
  created_at: string;
  updated_at: string;
  user: UserOrder;
  order_items: OrderItem[];
}

export interface UserSetting {
  id: number;
  name: string;
  email: string;
  img: string | null;
  email_verified_at: string | null;
  address: string | null;
  additional_address: string | null;
  postal_code: string | null;
  phone_number: string;
  created_at: string;
  updated_at: string;
  stripe_id: string | null;
  pm_type: string | null;
  pm_last_four: string | null;
  trial_ends_at: string | null;
}