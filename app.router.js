const appRouter = require('express').Router();
const editorRouter = require('./tasker/editor/editor.router');

appRouter.use('/api', editorRouter);

module.exports = appRouter;
