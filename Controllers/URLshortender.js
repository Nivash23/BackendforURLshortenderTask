const URLshortRouter = require('express').Router();
const Shortender = require('../Model/Urlshortender');
const User = require('../Model/users');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const config = require('../utils/config');
// const   nanoid = require('nanoid')
const shortid = require('shortid');

const getTokenfrom = req => {
    const authorization = req.get('Authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        return authorization.substring(7);
    }
    return null;
};

URLshortRouter.post('/', async (req, res) => {
    const { LongURL, Name} = req.body;
    const code = shortid.generate();
    const token = getTokenfrom(req);

    const decodedToken = jwt.verify(token, config.JWT);
     if (!token || !decodedToken.id)
    {
        return res.status(401).json({
            error: 'token missing or invalid'
        });
    }
    const user = await User.findById(decodedToken.id);

    // const user = await User.findOne({})
    
    // console.log(user1)
    const shorturl = new Shortender({
        LongURL,
        Name,
        code,
        user:user._id,
    })
    await shorturl.save();
    user.ShortedURLs.push(shorturl._id);
    await user.save();
    const urlData = await User.aggregate(
        [{
            $match: {
            _id:new mongoose.Types.ObjectId(decodedToken.id)
        }
        }, {
            $lookup: {
                from: "URLdata",
                localField: "ShortedURLs",
                foreignField: "_id",
                as:"ShortedURLs",
        }
    }]
    )
    res.status(200).json({
        shorturl,
        urlData
    })

})

URLshortRouter.get('/', async (req, res) => {
    const { code } = req.query;
    const URL = await Shortender.findOne({code:code});
    
    console.log(URL,code)
    const longurl = URL.LongURL;
    console.log(longurl);
    res.redirect(longurl);
})
module.exports = URLshortRouter;
