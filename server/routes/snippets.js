const express = require('express');
const isAuth = require('../middleware/is-auth');

const snippetController = require('../controllers/snippets');

const router = express.Router();

router.get('/snippets', snippetController.getSnippets);

router.get('/snippet/:id', snippetController.getSnippet);

router.get('/user-snippets', isAuth, snippetController.getUserSnippets);

router.get('/favsnippets', isAuth, snippetController.getFavSnippets);

router.post('/snippets', isAuth, snippetController.addSnippet);

router.put('/snippets/:id', isAuth, snippetController.updateSnippet);

router.delete('/snippets', isAuth, snippetController.deleteSnippet);

module.exports = router;