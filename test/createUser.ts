import { connectDB } from "../src/database/mongodb";
import { User } from "../src/interface/db/User";
import  {UserModel }  from "../src/schema/User";
const create= async (data:User)=>{
    await connectDB();
    const User = new UserModel(data);
    await User.save();

}


const Usertest : User= {
    user_id:"test",
    username:"testuser",
    password:"test",
    avatar:"ciaomondo"
};
create(Usertest);