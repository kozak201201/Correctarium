const appRouter = require('express').Router();
const editorRouter = require('./tasker/editor/editor.router');
const translatorRouter = require('./tasker/translator/translator.router');

appRouter.use('/api', editorRouter);
appRouter.use('/api', translatorRouter);

module.exports = appRouter;
