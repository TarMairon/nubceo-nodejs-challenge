const { Schema, model } = require('mongoose');

const TypeSchema = new Schema ({
    description: { type: String, required: true }
});

module.exports = model('Type', TypeSchema);