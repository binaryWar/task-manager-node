const User = require("../models/User");

const registerUser = async(req,res,next)=>{
    try{
        const { firstName, lastName, emailAddress, password } = req.body;
        const newUser = new User({
            firstName,
            lastName,
            emailAddress,
            password
        });
        await newUser.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

const loginUser = async(req,res,next)=>{
    try{
        const { emailAddress, password } = req.body;
        const user = await User.findOne({ emailAddress,password });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message : "User Found",
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress
        });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

const fetchUserDetails = async(req,res,next)=>{
    try{
        const {userId} =  req.params;
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
        res.status(500).send(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    fetchUserDetails
}