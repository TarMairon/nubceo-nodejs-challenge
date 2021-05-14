const { Schema, model } = require('mongoose');

const ScreeningSchema = new Schema ({
    imdb_id: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    director: { type: Schema.Types.ObjectId, ref: 'People', required: false },
    actors: [{ type: Schema.Types.ObjectId, ref: 'People', required: false }],
    genre: { type: Schema.Types.ObjectId, ref: 'Genre', required: true },
    releaseDate: { type: Date, required: true },
    type: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
    seasons: [{ type: Schema.Types.ObjectId, ref: 'Season', required: false }],
    rating: { type: Number, required: false }
});

module.exports = model('Screening', ScreeningSchema);