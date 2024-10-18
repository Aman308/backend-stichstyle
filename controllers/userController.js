import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';



const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
} 

// Route for user login
const loginUser = async (req,res) =>{

    try {
        
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false, message: "User doesn't exists"}) 
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (isMatch) {
            
            const token = createToken(user._id)
            res.json({success:true,token})

        }

        else{
            res.json({success:false , message: ' Inavlid credentials'})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message })
    }

}

// Routes for user registration

const registerUser = async (req,res)=>{
    try {
        // receiving information from user
        const {name , email ,password} = req.body;

        // Checkinig user already exist with same eamil id
        const exits = await userModel.findOne({email})
        if (exits) {
            return res.json({success:false, message: "User already exists"})
        }

        // Vlidating email format and strong password

        if (!validator.isEmail(email)) {
            return res.json({success:false, message: "Please enter a valid email"})
        }
        if (password.length < 8 ) {
            return res.json({success:false, message: "Please enter strong password"})
        }

        // Hashing password using bcrypt

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // Creating new user using hashed password
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        // Storing user info to databse

        const user =  await newUser.save() 

        const token = createToken (user._id)

        res.json({success:true,token})


       } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message })
       }
  
}


// route for admin login

const adminLogin = async (req,res)=>{

    try {

        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({
                success:true,
                token
            })
        } else{
              res.json({
                success:false,
                message: "Invalid Credentials"
              })
        }


    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message })
       }

}

export  { loginUser, registerUser, adminLogin };