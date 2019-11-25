const Snippet = require('../models/Snippet');
const User = require('../models/User');

exports.getSnippets = async (req, res, next) => {
    const snippets = await Snippet.find();
    res.send(snippets);
}

exports.getUserSnippets = async (req, res, next) => {
    console.log(req.session)
    const snippets = await Snippet.find({
        author: req.userId
    });
    res.send(snippets);
}


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
            return User.findById(req.userId)
        })
        .then((user) => {
            user.posts.push(snippet);
            return user.save();
        })
        .then(() => {
            res.status(200).send(`Snippet ${req.body.name} successfully added!`);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                error: "500"
            });
        })
}

exports.deleteSnippet = (req, res, next) => {
    const id = req.body.Id;
    Snippet.findByIdAndRemove(id)
        .then(() => {
            return User.findById(req.userId);
        })
        .then((user) => {
            user.posts.pull(id);
            return user.save();
        })
        .then(() => {
            res.status(200).send('Snippet deleted!')
        })
        .catch(err => {
            res.status(404).send({
                error: "Snippet not found"
            });
        })
}

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
            return snippet.save()
        })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error(error);
        })
}

exports.getSnippet = (req, res, next) => {
    const id = req.params.snippetId;
    res.json({
        message: "Showing post",
        Id: id
    });
}