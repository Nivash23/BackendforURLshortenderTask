const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./Controllers/user');
const loginRouter = require('./Controllers/loginRouter');
const EntryRouter = require('./Controllers/entry');

app.use(cors());


app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/Login', loginRouter);
app.use('/api/entry', EntryRouter);

module.exports = app;

