import { AdvancedSpatialData } from "./SpatialData";

export interface PlayerVR {
    id: string,
    color?:string,
    head:AdvancedSpatialData,
    leftController : AdvancedSpatialData,
    rightController: AdvancedSpatialData,
    avatarVR?: string
}

export interface PlayerVRdb {
    id: string,
    head:AdvancedSpatialData,
    avatarVR?: string
}