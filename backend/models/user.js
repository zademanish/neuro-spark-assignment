import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "patient name is required"],
        trim:true,
        minLength: [4, "First Name Must Contain At Least 3 Characters!"],
    },
    email:{
        type:String,
        required: [true, "Email is Required!"],
        unique:true,
        trim:true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type:String,
        required: [true,"Password is Required!"],
        minLength:6,
    },
    role: {
        type: String,
        required: [true, "User Role Required!"],
        enum: ["user","Admin"],
        default: "user"
      },
},
{ timestamps: true }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// match user entered password to hashed password

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


export const User = mongoose.model('User',userSchema);
