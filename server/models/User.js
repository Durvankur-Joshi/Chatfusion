import mongoose from 'mongoose';
import { genSalt, hash } from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  firstname:{
    type : String,
    required: false ,
},
lastname:{
    type : String,
    required: false ,
},
image:{
    type : String,
    required: false ,
},
color:{
    type : String,
    required: false ,
},
profileSetup:{
    type : Boolean,
    default: false ,
}
});

userSchema.pre("save" , async function(next) {
    const salt = await genSalt();
    this.password = await hash(this.password , salt);
    next();
    
});

const User = mongoose .model('User', userSchema);
export default User;
