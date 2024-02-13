const Activepage = require('express').Router();
const User=require('../Model/users')
Activepage.post('/', async (req, res) => {
    const { ActivationToken } = req.body;
    const user = await User.findOne({ ActivationToken })
    if (!user)
    {
        return res.status(404).json({message:'token does not match'})
    }
    user.isActive = true;
    await user.save();
    res.status(200).json({
        message: 'your Account have Activated sucessfully..',
        isActive:user.isActive,
    })
})
module.exports = Activepage;