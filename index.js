const mongoose = require('mongoose');
const app = require('./app');
const { MONGODB_URI, PORT } = require('./utils/config');
// const nanoid = require('nanoid');
// const code = nanoid(7);
// console.log(code)

mongoose.set('strictQuery', false);


mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected sucessfully..');

    })
    .catch((error) => {
        console.log(error);
    });
    app.listen(PORT, () => {
            console.log(`Server listening ...`);
     })