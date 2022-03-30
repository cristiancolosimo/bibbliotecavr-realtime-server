export interface SpatialData{
    x: number,
    y: number,
    z: number
}
export interface AdvancedSpatialData{
    type: "controller"| "hand" | "headset"| "object",
    grabbed?: boolean,
    rotation : SpatialData,
    position: SpatialData,
}
