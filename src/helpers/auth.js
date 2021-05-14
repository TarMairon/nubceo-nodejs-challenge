const jwt = require("jwt-simple");
const moment = require("moment");

const keypath = process.env.TOKEN_KEYPATH;
const refresh_keypath = process.env.REFRESH_TOKEN_KEYPATH;

function createToken (user) {
	var loadToken = {
		sub: user._id,
		userName: user.userName,
		email: user.email,
		fechaCreacion: moment().unix(),
		fechaExpiracion: moment().add(process.env.TOKEN_EXPIRE, "days").unix()
	}

	return jwt.encode(loadToken, keypath);
}

function createRefreshToken (user) {
	var loadToken = {
		sub: user._id,
		userName: user.userName,
		email: user.email,
		fechaCreacion: moment().unix(),
		fechaExpiracion: moment().add(process.env.REFRESH_TOKEN_EXPIRE, "days").unix()
	}

	return jwt.encode(loadToken, refresh_keypath);
}

function authentication (req, res, next) {
	if (!req.headers.authorization) {
		return res.status(403).send({error: "Could not authenticate"})
	} else {
		var sentToken = req.headers.authorization.replace(/['"]+/g, '');

		try {
			var loadToken = jwt.decode(sentToken, keypath);

			if (loadToken.fechaExpiracion <= moment().unix()) {
				return res.status(401).send({error: "Token has expired"})
			}
		} catch (exception) {
			console.log(exception);
			return res.status(403).send({error: "Invalid token"})
		}

		req.userToken = loadToken;

		next();
	}
}

function refreshAuthentication (req, res, next) {
	if (!req.headers.authorization) {
		return res.status(403).send({error: "Could not authenticate"})
	} else {
		var sentToken = req.headers.authorization.replace(/['"]+/g, '');

		try {
			var loadToken = jwt.decode(sentToken, refresh_keypath);

			if (loadToken.fechaExpiracion <= moment().unix()) {
				return res.status(401).send({error: "Token has expired"})
			}
		} catch (exception) {
			console.log(exception);
			return res.status(403).send({error: "Invalid token"})
		}

		req.userToken = loadToken;

		next();
	}
}

function generateNewToken (req, res) {
    const sentToken = jwt.decode(req.headers.authorization.replace(/['"]+/g, ''), refresh_keypath);

    const newTokenInfo = {
        sub: sentToken.sub,
		userName: sentToken.userName,
		email: sentToken.email,
		fechaCreacion: moment().unix(),
		fechaExpiracion: moment().add(process.env.TOKEN_EXPIRE, "days").unix()
	};

    const newToken = jwt.encode(newTokenInfo, keypath);

    res.status(200).json({token: newToken});
}

module.exports = {
    createToken,
    createRefreshToken,
    authentication,
    refreshAuthentication,
    generateNewToken
};