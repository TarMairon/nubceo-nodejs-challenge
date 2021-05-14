const Episode = require('../models/Episode');

//GET
function getEpisodeById (req , res) {
    const id = req.params.id;

	if (!id) {
		return res.status(400).send({error: 'Params not complete'});
	}

    Episode.findById(id)
        .populate('director')
        .populate('actors')
        .exec(function (error, foundEpisode) {
        if (error) {
            res.status(500).send({error: 'Error finding existing episode', description: error});
        } else {
            if (!foundEpisode) {
                res.status(204).send({ error: "Episode not found" });
            } else {
                res.status(200).send({ foundEpisode });
            }
        }
    });
}

module.exports = {
	getEpisodeById,
    createEpisode
}