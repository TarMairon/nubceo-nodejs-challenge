const bcrypt = require("bcrypt");

const User = require("../models/User");

const auth = require("../helpers/auth");

//GET
function getUserById (req, res) {
	const id = req.params.id;

	if (!id) {
		return res.status(400).send({error: 'Params not complete'});
	}
	
	User.findById(id)
		.populate('favorites')
		.exec(function(error, foundUser) {
			if (error) {
				res.status(500).send({error: 'Error finding existing user', description: error})
			} else {
				if (!foundUser) {
					res.status(204).send({error: 'User not found'})
				} else {
					res.status(200).send({foundUser})
				}
			}
		})
}

function getUsers (req, res) {
	const { userName, name, email } = req.query;

	if (!userName && !name && !email) {
		return res.status(400).send({error: 'No query params'});
	}

	var query = User.find({});

	if (userName){
		query.where('userName', new RegExp(userName, 'i'));
	}
	if (name){
		query.where('name', new RegExp(name, 'i'));
	}
	if (email){
		query.where('email', new RegExp(email, 'i'));
	}

    query.sort('userName')
		.populate('favorites')
		.exec(function(error, foundUsers) {
			if (error) {
				res.status(500).send({error: 'Error finding existing user', description: error})
			} else {
				if (!foundUsers || foundUsers.length === 0) {
					res.status(204).send({error: "No users matching the data were found"})
				} else {
					res.status(200).send({foundUsers})
				}
			}
		})
}

//POST
function createUser (req, res) {
	const body = req.body;

	if (!body || !body.name || !body.userName || !body.email || !body.password) {
		return res.status(400).send({error: 'Body not complete'});
	}

	User.findOne({ $or:[ { userName: body.userName }, { email: body.email } ]})
		.exec(function(error, foundUser) {
			if (error) {
				res.status(500).send({error: 'Error finding existing user', description: error});
			} else {
				if (!foundUser) {
					var user = new User();
					
					user.userName = body.userName;
					user.email = body.email;
                    user.name = body.name;
                    user.aboutMe = body.aboutMe;

					bcrypt.hash(body.password, 10, function (error, hash) {
						user.password = hash;

						user.save((error,savedUser) => {
							if (error) {
								res.status(500).send({error: 'Error saving user', description: error});
							} else {
								res.status(201).send({savedUser})
							}
						})
					})
				} else {
					res.status(409).send({error: 'User already exists', user: foundUser})
				}
			}

		})
}

function login (req, res) {
	const {userName, password } = req.body;

	if(!userName || !password) {
		return res.status(400).send({error: 'Body not complete'});
	}

	User.findOne({ userName : userName })
		.exec(function(error, loggedUser) {
			if (error) {
				res.status(500).send({error: 'Error finding existing user', description: error});
			} else {
				if (!loggedUser) {
					res.status(404).send({error: 'User not found'})
				} else {
					bcrypt.compare(password, loggedUser.password, function(error, ok) {
						if (ok) {
							res.status(200).send({
                                loggedUser: loggedUser, 
                                token: auth.createToken(loggedUser),
                                refreshToken: auth.createRefreshToken(loggedUser)
                            })
						} else {
							res.status(401).send({error: 'Wrong password', description: error});
						}
					})
				}
			}
		})
}

module.exports = {
	getUserById,
	getUsers,
	createUser,
	login
}