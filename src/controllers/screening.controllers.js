const Screening = require('../models/Screening');

//GET
function getScreeningById (req , res) {
    const id = req.params.id;

	if (!id) {
		return res.status(400).send({error: 'Params not complete'});
	}

    Screening.findById(id)
        .populate('director')
        .populate('actors')
        .populate('genre')
        .populate('type')
        .populate('seasons')
        .exec(function (error, foundScreening) {
        if (error) {
            res.status(500).send({error: 'Error finding existing screening', description: error});
        } else {
            if (!foundScreening) {
                res.status(204).send({ error: "Screening not found" });
            } else {
                res.status(200).send({ foundScreening });
            }
        }
    });
}

function getScreenings (req , res) {
    var query = Screening.find({});

    if (req.query.imdbID) {
        query.where('imdb_id', new RegExp(req.query.imdbID, 'i'));
    }
    if (req.query.title) {
        query.where('title', new RegExp(req.query.title, 'i'));
    }
    if (req.query.genreID) {
        query.where('genre', mongoose.Types.ObjectId(req.query.genreID));
    }
    if (req.query.typeID) {
        query.where('type', mongoose.Types.ObjectId(req.query.typeID));
    }

    query.sort('title')
        .populate('director')
		.populate('actors')
		.populate('genre')
		.populate('type')
		.populate('seasons')
        .exec(function(error, foundScreenings) {
			if (error) {
				res.status(500).send(error)
			} else {
				if (!foundScreenings || foundScreenings.length === 0) {
					res.status(204).send({error: "No screenings matching the data were found"})
				} else {

					res.status(200).send({foundScreenings})
				}
			}
		})
}

module.exports = {
	getScreeningById,
	getScreenings
}