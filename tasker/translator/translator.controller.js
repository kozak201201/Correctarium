const TranslatorService = require('./translator.service');
const translatorService = new TranslatorService();

class TranslatorController {
    translateText(req, res) {
        const {from, to, mimetype, count} = req.body;
        const language = `${from}-${to}`;
        const resultObj = translatorService.useTaskToText(count, language, mimetype);
        res.json(resultObj);
    }
}

module.exports = new TranslatorController();