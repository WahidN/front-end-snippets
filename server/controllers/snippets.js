const Snippet = require('../models/Snippet');
const User = require('../models/User');

exports.getSnippets = async (req, res, next) => {
	const skipped = parseInt(req.query.skip) || 0;
	const limit = parseInt(req.query.limit) || 16;
	const total = await Snippet.find().countDocuments((err, count) => {
		if (err) {
			throw err;
		}
	});
	const snippets = await Snippet.find().sort({
		_id: -1
	}).skip(skipped).limit(limit);
	res.status(200).send({total, snippets});
};

exports.getUserSnippets = async (req, res, next) => {
	const snippets = await Snippet.find({
		author: req.userId
	}).sort({
		_id: -1
	});
	res.status(200).send(snippets);
};

exports.addSnippet = (req, res, next) => {
	const snippet = new Snippet({
		title: req.body.title,
		description: req.body.description,
		code: req.body.code,
		category: req.body.category,
		author: req.userId,
		likes: 0
	});
	snippet
		.save()
		.then(() => {
			return User.findById(req.userId);
		})
		.then(user => {
			user.posts.push(snippet);
			return user.save();
		})
		.then(() => {
			res.status(200).send(`Snippet ${req.body.name} successfully added!`);
		})
		.catch(err => {
			res.status(500).send({
				error: '500',
				message: err.message
			});
		});
};

exports.deleteSnippet = (req, res, next) => {
	const id = req.body.Id;
	Snippet.findByIdAndRemove(id)
		.then(() => {
			return User.findById(req.userId);
		})
		.then(user => {
			user.posts.pull(id);
			user.likedPosts.pull(id);
			return user.save();
		})
		.then(() => {
			res.status(200).send('Snippet deleted!');
		})
		.catch(err => {
			res.status(404).send({
				error: 'Snippet not found',
				message: err.message
			});
		});
};

exports.updateSnippet = (req, res, next) => {
	const id = req.params.id;
	const newTitle = req.body.title;
	const newDescription = req.body.description;
	const newCode = req.body.code;
	const newCategory = req.body.category;
	const newLikes = req.body.likes;

	Snippet.findById(id)
		.then(snippet => {
			snippet.title = newTitle;
			snippet.description = newDescription;
			snippet.code = newCode;
			snippet.category = newCategory;
			snippet.likes = newLikes;
			return snippet.save();
		})
		.then(newSnippet => {
			res.status(200).send(newSnippet);
		})
		.catch(error => {
			res.status(404).send({
				error: 'Snippet not found',
				message: error.message
			});
		});
};

exports.getSnippet = async (req, res, next) => {
	const id = req.params.id;
	const snippet = await Snippet.findById(id);
	if (!snippet) {
		res.status(404).json({
			message: 'Snippet not found!'
		});
	}

	res.status(200).json({
		snippet: snippet
	});
};

exports.getFavSnippets = async (req, res, next) => {
	const user = await User.findById(req.userId, 'likedPosts').exec();
	if (!user) {
		return;
	}
	res.status(200).send(user.likedPosts);
}