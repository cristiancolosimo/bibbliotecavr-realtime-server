import { UUID } from "../type";

export interface Book{
    id: UUID,
    name: string,
    number_pages: number,
    base_location: string, //minio endpoint
}