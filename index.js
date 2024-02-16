const mongoose = require('mongoose');
const app = require('./app');
const { MONGODB_URI, PORT} = require('./utils/config');

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