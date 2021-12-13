const TaskerService = require('../tasker.service');

class TranslatorService extends TaskerService {
    constructor() {
        super();
        let enToUk = {
            pricePerWord: 0.16,
            minimumPrice: 160,
        }

        let ukToEn = {
            pricePerWord: 0.20,
            minimumPrice: 200,
        }

        const fileFactorMap = new Map();
        fileFactorMap.set('doc', 0);
        fileFactorMap.set('docx', 0);
        fileFactorMap.set('rtf', 0);
        fileFactorMap.set('other', 0.2);

        const pricePerWordMap = new Map();
        pricePerWordMap.set('uk-en', ukToEn);
        pricePerWordMap.set('en-uk', enToUk);

        const wordsPerHourMap = new Map();
        wordsPerHourMap.set('uk-en', 200);
        wordsPerHourMap.set('en-uk', 1200);

        this.fileFactorMap = fileFactorMap;
        this.pricePerWordMap = pricePerWordMap;
        this.wordsPerHourMap = wordsPerHourMap;
    }
}

module.exports = TranslatorService;