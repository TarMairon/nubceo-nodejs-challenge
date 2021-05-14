const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({
    name: { type: String, required: true },
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    aboutMe: { type: String, required: false },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Screening', required: false }]
},
{ 
    timestamps: true
});

module.exports = model('User', UserSchema);