const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../Model/users');
const nodemailer = require('nodemailer');


userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;
        
        const passwordHash = await bcrypt.hash(password, 10);
    
        const user = new User({
            username,
            name,
            passwordHash,
        });
     const html = `
    <h1>Hello</h1>
    <p>Welcome to our website,${name}</p>
    `
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'billanivash52@gmail.com',
            pass: 'yglubdayulcahfhr'
        }
    });
    const mailOption = {
        from: 'billanivash52@gmail.com',
        to: `${username}`,
        subject: 'MailFromWebsite',
        html:html,
    }
    if (user)
    {
        transporter.sendMail(mailOption, function (err, info) {
            if (err)
            {
                console.log(err);
            }
            else {
                console.log(info.response);
            }
       })
        }
        const saveduser = await user.save();
    
        res.status(200).json(saveduser);

});

module.exports = userRouter;