const translatorRouter = require('express').Router();

const translatorController = require('./translator.controller');

translatorRouter.post('/translate', translatorController.translateText);

module.exports = translatorRouter;