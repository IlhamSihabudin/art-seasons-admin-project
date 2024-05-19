import { Artist as ArtistType, Artwork } from '../API'

export interface ArtistsDetail extends ArtistType {
  artworks?: Artwork[]
}
