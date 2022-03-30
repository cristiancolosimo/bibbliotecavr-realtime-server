import { Schema, model, connect } from 'mongoose';
import { User } from '../interface/db/User';
import { PlayerVR } from '../interface/Player';



export const PlayerVRSchema = new Schema<PlayerVR>({
    
})



const UserSchema =  new Schema<User>({
    user_id: { type: String, required: true },
    username: { type: String, required: true },
    password:{ type: String, required: true },
    
    avatar: String
});


export const UserModel = model<User>('User', UserSchema);