import MatrixPosition from "./MatrixPosition";
import { UUID, TemplateID } from "./type";


export default interface Accessory{
id:UUID,
template: TemplateID,
position: null | MatrixPosition,
scale: null| MatrixPosition,
rotation : null | MatrixPosition
}