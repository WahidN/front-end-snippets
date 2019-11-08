const mongoose = require('mongoose');
const Snippet = require('../models/Snippet');

exports.getSnippets = async (req, res, next) => {
    const snippets = await Snippet.find();
    res.send(snippets);
}

exports.addSnippet = (req, res, next) => {
    const snippet = new Snippet({
        title: req.body.name,
        description: req.body.description,
        code: req.body.code,
        category: req.body.category,
        likes: 0
    });
    snippet
        .save()
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
    console.log(id);
    Snippet.findByIdAndRemove(id)
        .then(() => {
            res.status(200).send('Snippet deleted!')
        })
        .catch(err => {
            res.status(404).send({
                error: "Snippet not found"
            });
        })
}

exports.getSnippet = (req, res, next) => {
    const id = req.params.snippetId;
    res.json({
        message: "Showing post",
        Id: id
    });
}