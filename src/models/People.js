const { Schema, model } = require('mongoose');

const PeopleSchema = new Schema ({
    f_name: { type: String, required: true },
    l_name: { type: String, required: true },
    born: { type: Date, required: true },
    died: { type: Date, required: false },
    nationality: { type: String, required: true }
});

module.exports = model('People', PeopleSchema);