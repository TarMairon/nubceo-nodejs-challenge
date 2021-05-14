const { Schema, model } = require('mongoose');

const SeasonSchema = new Schema ({
    seasonNum: { type: Number, required: true },
    title: { type: String, required: false },
    episodes: [{ type: Schema.Types.ObjectId, ref: 'Episode', required: false }],
    releaseDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    rating: { type: Number, required: false }
});

module.exports = model('Season', SeasonSchema);