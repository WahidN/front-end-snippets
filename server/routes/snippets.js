const express = require('express');

const snippetController = require('../controllers/snippets');

const router = express.Router();

router.get('/snippets', snippetController.getSnippets);

router.get('/s/:snippetId', snippetController.getSnippet);

router.post('/snippets', snippetController.addSnippet);

router.delete('/snippets', snippetController.deleteSnippet);

module.exports = router;