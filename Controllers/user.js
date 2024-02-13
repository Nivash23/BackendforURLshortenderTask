const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../Model/users');
const  sendActivationMail = require('./sendingmail');
const crypto = require('crypto');


userRouter.post('/', async (req, res) => {

    const { username, name, password } = req.body; 
    const isuser = await User.findOne({ username });
    const passwordHash = await bcrypt.hash(password, 10);
    const ActivationToken = await crypto.randomBytes(20).toString('hex');
    if (isuser)
    {
        return res.status(404).json({message: 'User already exist'})
        }
        const user = new User({
            username,
            name,
            passwordHash,
            ActivationToken,
        });
    const Activationlink=`https://www.Accountactivation.com/`
    if (user)
    {
        sendActivationMail(username, Activationlink, name,ActivationToken);  
    }
        const saveduser = await user.save();
    
    res.status(200).json({
        saveduser
    });
    

});


module.exports = userRouter;