const EntryRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../Model/users');
const entry = require('../Model/Entry');

const getTokenfrom = (req) => {
    const authorization = req.get('Authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer'))
    {
        return authorization.substring(7);
        }
}

EntryRouter.post('/', async (req, res) => {
    const { Amount, Description } = req.body;

    const token = getTokenfrom(req);

    const decodedToken = jwt.verify(token, config.JWT);

    if (!token || !decodedToken.id)
    {
        return res.status(401).json({
            error:'token missing or invalid'
        })
    }
    const user = await User.findById(decodedToken.id);

    const newentry = new entry({
        Amount,
        Description,
        user:user._id,
    })
    const savedentry = await newentry.save();

    user.entries = user.entries.concat(savedentry.Amount,savedentry.Description);

    await user.save();

    res.status(200).json({
        savedentry,
    })
})

export default EntryRouter;