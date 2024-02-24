const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./Controllers/user');
const loginRouter = require('./Controllers/loginRouter');
// const EntryRouter = require('./Controllers/entry');
const PassResetRouter = require('./Controllers/passReset');
const ActivationRouter = require('./Controllers/Activepage');
const URLshortRouter = require('./Controllers/URLshortender');
// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(cors())
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// })

// app.get('/', (req, res) => {
//   res.status(200).json({message:"my server is working properly"})
// })
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/Login', loginRouter);
app.use('/api/Urlshort',URLshortRouter );
app.use('/api/Resetpass', PassResetRouter);
app.use('/api/Activation', ActivationRouter);
app.use('/api/RedirectTo',URLshortRouter)

module.exports = app;

