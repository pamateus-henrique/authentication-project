const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('../errors');
const jwt = require('jsonwebtoken');



const register = async (req,res) => {
    const user = await User.create({...req.body});
    res.status(StatusCodes.CREATED).json({ token: user.generateToken()});
}

const login = async (req,res) => {
    const {email, password} = req.body;

    if(!password || !email){
        throw new BadRequestError('Please provide all values');
    }

    const user = await User.findOne({email});

    if(!user){
        throw new UnauthenticatedError('the user does not exists');
    }

    const token = user.generateToken();

    res.status(StatusCodes.OK).json({user : user.name, token});
}


module.exports = {register,login};