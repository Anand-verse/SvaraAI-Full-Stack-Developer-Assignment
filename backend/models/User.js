import mongoose from 'mongoose';
import bcrypt, { hash } from 'bcryptjs';

const userSchema = new mongoose.Schema({
name: {
    type:String,
    required:[true , 'Name is required'],
    trim:true,
    minlength:[1 , 'Name cannot be empty']
},

email:{
    type:String,
    required:[true ,"Email is required"],
    unique:true,
    trim:true,
    lowercase:true,
},

password:{
    type:String,
    required:[true , "Password is required"],
    minlength:[8 , 'password cannot be empty']
}

},
{timestamps:true}
);


userSchema.pre('save', async function(next) {
    
    if(!this.isModified('password')){
        return next();
    }

    
    this.password = await bcrypt.hash(this.password,10);
    next();



});

// Instance method for password comparison
userSchema.methods.comparePassword = async function(enteredPassword) {
  
   return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User" , userSchema);;

export default User;









