import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    clerkuserid :{
        type: String,
        required: true ,
        unique: true,
        trim:true
    },
    username :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        unique: true
    },
    profilepic:{
        type: String,
        default: "" ,
    },
    isadmin :{
        type: Boolean,
        default: false
    },
    isactive :{
        type: Boolean,
        default: true
    }

 }, { timestamps: true });

//   check if user model is already exist , if its exists delete it 
if(mongoose.models &&  mongoose.models['users'] ){
    delete mongoose.models['users'];
}

const UserModel = mongoose.models.users || mongoose.model('users', userSchema);


export default UserModel ;