const PassResetRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../Model/users');


PassResetRouter.post("/", async (req, res) => {
    console.log(req.body)
    const { username, newpass, confirmpass } = req.body;
    
    const changedpass = await bcrypt.hash(confirmpass, 10);
    const user = await User.findOne({ username });
    user.passwordHash = changedpass;
    await user.save();
    if (user)
    {
        
        res.status(200).json({
            message:'password changed sucessfully'
        })
    }
    else {
        res.status(401).json("Try again...");
    }


    // await user.save();
})
module.exports = PassResetRouter;
