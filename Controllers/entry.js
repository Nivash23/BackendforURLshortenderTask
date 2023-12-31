const EntryRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../utils/config');
const User = require('../Model/users');
const entry = require('../Model/Entry');

const getTokenfrom = req => {
    const authorization = req.get('Authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7);
    }
    return null;
};

EntryRouter.post('/', async (req, res) => {
    const { Amount, Description } = req.body;

    const token = getTokenfrom(req);

    const decodedToken = jwt.verify(token, config.JWT);

    if (!token || !decodedToken.id)
    {
        return res.status(401).json({
            error: 'token missing or invalid'
        });
    }
    const user = await User.findById(decodedToken.id);

    const newentry = new entry({
        Amount,
        Description,
        user:user._id,
    })
    const savedentry = await newentry.save();

    user.entries.push(savedentry._id);

    await user.save();

    res.status(200).json({
        savedentry,
    })
})
EntryRouter.get('/', async(req, res) => {
    const token = getTokenfrom(req);
    const decodedToken = jwt.verify(token, config.JWT);
    if (!token || !decodedToken.id)
    {
        return res.status(401).json({

            message:'token is missing or invalid'
        })
    }
    // const user = await User.findById(decodedToken.id).populate('entries' ,{
    //     Amount: 1,
    //     Description:1,
    // });
    const user = await User.aggregate(
        [{
            $match: {
            _id:new mongoose.Types.ObjectId(decodedToken.id)
        }
        }, {
            $lookup: {
                from: "Entries",
                localField: "entries",
                foreignField: "_id",
                as:"entries",
        }
    }]
    )
    
    res.json(user[0].entries);
})


module.exports = EntryRouter;