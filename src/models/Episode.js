const { Schema, model } = require('mongoose');

const EpisodeSchema = new Schema ({
    episodeNum: { type: Number, required: true },
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    director: { type: Schema.Types.ObjectId, ref: 'People', required: true },
    actors: [{ type: Schema.Types.ObjectId, ref: 'People', required: false }],
    releaseDate: { type: Date, required: true },
    rating: { type: Number, required: false }
});

module.exports = model('Episode', EpisodeSchema);