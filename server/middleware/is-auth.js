const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.header('Authorization') || req.get('x-access-token');
	if (!authHeader) {
		const error = new Error('Not Authorized');
		error.statusCode = 401;
		throw error;
	}
	const token = authHeader.split(' ')[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (err) {
		err.statusCode = 500;
		throw err;
	}
	if (!decodedToken) {
		const error = new Error('Not Authorized');
		error.statusCode = 401;
		throw error;
	}

	req.userId = decodedToken.userId;
	next();
};
