const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./Controllers/user');
const loginRouter=require('./Controllers/loginRouter')

app.use(cors());


app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/Login',loginRouter);

module.exports = app;

