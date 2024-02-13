const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./Controllers/user');
const loginRouter = require('./Controllers/loginRouter');
const EntryRouter = require('./Controllers/entry');
const PassResetRouter = require('./Controllers/passReset');
const ActivationRouter = require('./Controllers/Activepage');

app.use(cors());


app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/Login', loginRouter);
app.use('/api/entry', EntryRouter);
app.use('/api/Resetpass', PassResetRouter);
app.use('/api/Activation', ActivationRouter);

module.exports = app;

