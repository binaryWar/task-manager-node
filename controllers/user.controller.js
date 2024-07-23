const User = require("../models/User");
const {CustomError,BadRequestError} = require("../config/customError");
const jwt = require('jsonwebtoken');

const registerUser = async(req,res,next)=>{
    try{
        const { firstName, lastName, emailAddress, password } = req.body;
        if(!firstName || !lastName || !emailAddress || !password)
            throw new BadRequestError("Invalid payload body");

        const newUser = new User({
            firstName,
            lastName,
            emailAddress,
            password
        });
        await newUser.save();
        
        const token = jwt.sign({ 
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            emailAddress: newUser.emailAddress 
            }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).send({
            message : "User Created",
            id : newUser.id,
            firstName : newUser.firstName,
            lastName : newUser.lastName,
            emailAddress : newUser.emailAddress,
            token
        });
    }catch(err){
       next(err);
    }
}

const loginUser = async(req,res,next)=>{
    try{
        const { emailAddress, password } = req.body;
        if(!emailAddress || !password)
            throw new BadRequestError("Invalid payload");

        const user = await User.findOne({ emailAddress,password });
        
        if (!user) {
            throw new CustomError("User Not Found",401);
        }

        const token = jwt.sign({ 
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message : "User Found",
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            token
        });
    }catch(err){
        next(err);
    }
}

const fetchUserDetails = async(req,res,next)=>{
    try{
        const {userId} =  req.params;
        if(!userId)
            throw new BadRequestError("Invalid User Id");

        const user = await User.findOne({id : userId});

        if(!user)
            return res.status(400).send({message : "User not found"});
        res.status(200).send({
            message : "User Found",
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress
        });
    }catch(error){
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    fetchUserDetails
}