const mongoose = require('mongoose');

const { MONGO_HOST, MONGO_DB } = process.env;
const MONGO_URI = `mongodb://${MONGO_HOST}/${MONGO_DB}`;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('Connected to MongoDB Database'))
.catch(err => console.log(err));