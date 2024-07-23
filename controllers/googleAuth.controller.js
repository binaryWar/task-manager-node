const { OAuth2Client } = require('google-auth-library');
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const {BadRequestError} = require("../config/customError");

const client = new OAuth2Client(process.env.CLIENT_ID);

const verifyGoogleToken = async(req,res,next)=>{
    try{
        const {idToken,provider,firstName,lastName} = req.body;
        if(!idToken){
            throw new BadRequestError("Invalid Request!! Missing token");
        }else if(!provider){
            throw new BadRequestError("Invalid Request!! Missing provide");
        }else if(!firstName){
            throw new BadRequestError("first Name is required");
        }

        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.CLIENT_ID
        });

        const payload = ticket.getPayload();
        
        const email = payload.email;
        
        let user = await User.findOne({ emailAddress: email });

        if (!user) {
            user = new User({
                firstName: firstName,
                lastName: lastName,
                emailAddress: email,
                password: '########',
            });
            await user.save();
        }

        const token = jwt.sign({ 
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            provider
            }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).send({
            message : "Login Success!!",
            id : newUser.id,
            firstName : newUser.firstName,
            lastName : newUser.lastName,
            emailAddress : newUser.emailAddress,
            token
        })
    }catch(error){
        next(error);
    }
} 
module.exports = {
    verifyGoogleToken
}