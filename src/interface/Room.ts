import Accessory from "./accessory";
import { UUID,TemplateID } from "./type";

type BookcategoryID = string;

type RoomID = UUID;
export default interface Room{
    id: RoomID,
    template: TemplateID,
    description: string,
    bookgategory: BookcategoryID,
    segret: boolean,
    portal: {
        nord: null | RoomID, // mettere o null o l'id della stanza
        est: null | RoomID,
        ovest: null | RoomID,
        sud: null | RoomID
    },
    accessory: Array<Accessory>
}

