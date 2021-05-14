const { Schema, model } = require('mongoose');

const GenreSchema = new Schema ({
    description: { type: String, required: true }
});

module.exports = model('Genre', GenreSchema);