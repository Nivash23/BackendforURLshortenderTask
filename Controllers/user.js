const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../Model/users');

userRouter.post('/', async (req, res) => {
    const { username,name, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        name,
        passwordHash
    });
    const saveduser = await user.save();

    res.status(200).json(saveduser);


});

module.exports = userRouter;