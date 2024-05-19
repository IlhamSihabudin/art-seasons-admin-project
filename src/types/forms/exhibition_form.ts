import ArtistsRequest from "../requests/artists_request"

interface ExhibitionForm {
    name: string,
    start_date: string,
    end_date: string,
    organizer: string,
    location: string,
    desc: string,
    tags: string,
    is_visible: string | number,
    img?: File | string,
    attach_doc?: File | string,
    artists?: ArtistsRequest[]
}

export default ExhibitionForm