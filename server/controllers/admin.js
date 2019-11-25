const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;

	User.findOne({
		email: email
	})
		.then(userDoc => {
			if (userDoc) {
				return res.send({
					message: 'User with this email adres already exists!'
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
						message: 'User created'
					});
				});
		})
		.catch(error => {
			console.log(error);
		});
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
				res.status(404).json({
					errorMessage: 'User with that email not found!'
				});
			}
			loadedUser = user;
			return bcrypt.compare(password, user.password);
		})
		.then(correctPassword => {
			if (!correctPassword) {
				res.status(404).json({
					errorMessage: 'Wrong password!'
				});
			}
			const token = jwt.sign(
				{
					email: loadedUser.email,
					userId: loadedUser._id.toString()
				},
				'secretTokenButLonger',
				{
					expiresIn: '2h'
				}
			);

			res.status(200).json({
				token: token,
				userId: loadedUser._id.toString()
			});

			req.session.userId = loadedUser._id;
		})
		.catch(error => {
			if (!error.status) {
				error.status = 500;
			}
			next(error);
		});
};

exports.logout = (req, res, next) => {
	req.session.destroy();
	res.json({
		message: 'User logged out'
	});
};
