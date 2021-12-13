const editorRouter = require('express').Router();

const editorController = require('./editor.controller');

editorRouter.post('/edit', editorController.editText);

module.exports = editorRouter;