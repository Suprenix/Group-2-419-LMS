const User = require('../models/user');
const userSchema = require('../utils/validation');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Register a student
const registerAdmin = async (req, res) => {
    try{
        const {email, name, password} = req.body;
        if(!email || !name || !password){
            return res.status(400).json({message : "All fields are required"});
        }
        const {error, value} = userSchema.validate({email, name, password});
        if(error){
            return res.status(400).json({message : error.details[0].message});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message : "Admin already exists"});
        }
        const newPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email, name, password : newPassword, role : "Admin"});
        await newUser.save();
        return res.status(201).json({message : "Admin registered successfully",  userId: newUser._id});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "An error occured while registering admin"});
    }
}

// Login a student
const loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user || (user.role !== "Admin")){
            return res.status(404).json({message : "Admin not found"});
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(400).json({message : "Invalid email or password"});
        }
        const token = jwt.sign({id: user._id, email : user.email, role : user.role}, process.env.JWT_SECRET, { expiresIn: "2h" });
        return res.status(200).json({message : "Admin logged in successfully", token, userId: user._id});    
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "An error occured while logging in"});
    }
}; 




module.exports = {registerAdmin, loginAdmin};