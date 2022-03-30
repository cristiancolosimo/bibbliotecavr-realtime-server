import { PlayerVR } from "../Player";
import { UUID } from "../type";

export interface User{
    user_id:UUID,
    username: string,
    password: string, //hash sha256 + salt
    vrdata? : PlayerVR,
    avatar:  string //endpoint minio

}