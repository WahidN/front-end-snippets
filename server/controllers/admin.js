const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const validationSchema = Joi.object().keys({
	email: Joi.string().email(),
	password: Joi.string()
		.trim()
		.min(6)
		.required(),
	confirmPassword: Joi.string()
		.min(6)
		.required()
});

exports.registerUser = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;

	const result = validationSchema.validate(req.body);

	if (!result.error) {
		User.findOne({
				email: email
			})
			.then(userDoc => {
				if (userDoc) {
					return res.status(400).send({
						errorMessage: 'User with this email adres already exists!'
					});
				}
				return bcrypt
					.hash(password, 12)
					.then(hashedPassword => {
						const user = new User({
							email: email,
							password: hashedPassword,
							is_Admin: false
						});

						return user.save();
					})
					.then(result => {
						res.send({
							message: 'User created',
							user: result
						});
					});
			})
			.catch(error => {
				console.log(error);
			});
	} else {
		res.status(400).json({
			errorMessage: result.error.details[0].message
		});
	}
};

exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser;
	User.findOne({
			email: email
		})
		.then(user => {
			if (!user) {
				res.status(400).json({
					errorMessage: 'User with that email not found!'
				});
			}
			loadedUser = user;
			return bcrypt.compare(password, user.password);
		})
		.then(correctPassword => {
			if (!correctPassword) {
				res.status(400).json({
					errorMessage: 'Wrong password!'
				});
			}
			const token = jwt.sign({
					email: loadedUser.email,
					userId: loadedUser._id.toString()
				},
				process.env.TOKEN_SECRET, {
					expiresIn: '1d'
				}
			);

			res.status(200).json({
				token: token,
				email: email,
				userId: loadedUser._id.toString()
			});
		})
		.catch(error => {
			if (!error.status) {
				error.status = 500;
			}
			next(error);
		});
};

exports.logout = (req, res, next) => {
	req.userId = null;
	res.json({
		message: 'User logged out'
	});
};