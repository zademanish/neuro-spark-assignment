
import {User} from '../models/user.js';
import jwt from 'jsonwebtoken';


export const Register =async(req,res)=>{
    try{
        const {name, email, password} = req.body;
        if (!name || !email || !password ) {
            return res.status(400).json({
              message: "something missing",
              success: false,
            });
          }
    
          if(password.length && name.length < 4 ){
            return res.status(400).json({
                message:"email and password should be more than 4 character",
                success:false
            })
          }
    
          
            let user = await User.findOne({ email });
    
            if(user) return res.status(400).json({success:false, message:"User already exists"});
    
            user = new User({name, email, password});
    
            await user.save();
    
            // create JWT payload
            const payload = {user: { id: user._id, email:user.email }};
    
            // sign and return the token long with user data
    
            jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"40h"},(err,token)=>{
                if(err) throw err;
    
                // send the user and token in response
                res.status(201).json({
                    success:true,
                    message:"register successfully",
                    user:{
                        _id: user._id,
                        name:user.name,
                        email:user.email,
                        role:user.role,
                    },
                    token
                })
            })
    
        } catch(error){
            console.log(error);
            res.status(500).send("Server Error");
        }
}

export const Login = async(req,res)=>{
    try{
        const {email, password} = req.body;
    
        if (!email || !password ) {
            return res.status(400).json({
              message: "something missing",
              success: false,
            });
          }
    
        let user = await User.findOne({ email });
         if(!user) return res.status(400).json({success:false,message:"Invalid creadentials"});
         const isMatch = await user.matchPassword(password);
         if(!isMatch) return res.status(400).json({success:false,message:"Invalid credentials"});
    
          // create JWT payload
          const payload = {user: { id: user._id, email:user.email }};
    
          // sign and return the token long with user data
    
          jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"40h"},(err,token)=>{
              if(err) throw err;
    
              user = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
              };  
    
              // send the user and token in response
              res.json({
                  message:"login Successfully",
                  success:true,
                  user,
                  token
              })
          })
        } catch(error){
            console.error(error);
            res.status(500).send("Server Error");
        }
}

export const GetUser = async(req,res)=>{
    res.json(req.user);
}

export const GetSingleUser = async(req,res)=>{
    try{
        const user = await User.findOne(req.user)
        if(!user) return res.status(404).json({message:"user not found", success:false})
        return res.status(200).json({success:true,data:{name:user.name,email:user.email,id:user._id,role:user.role }});
    }catch(error){
        console.log(error);
    }
}