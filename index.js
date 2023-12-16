const mongoose = require('mongoose');
const app = require('./app');
const { MONGODB_URI, PORT, HOSTNAME } = require('./utils/config');

mongoose.set('strictQuery', false);


mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected sucessfully..');

        app.listen(PORT,HOSTNAME, () => {
            console.log(`Server listening to http://${HOSTNAME}:${PORT}..`);
        })

    })
    .catch((error) => {
        console.log(error);
    });