const TaskerService = require('../tasker.service');

class EditorService extends TaskerService {
    constructor() {
        super();
        let uk = {
            pricePerWord: 0.05,
            minimumPrice: 50,
        }

        let ru = {
            pricePerWord: 0.05,
            minimumPrice: 50,
        }

        let en = {
            pricePerWord: 0.12,
            minimumPrice: 120,
        }

        const fileFactorMap = new Map();
        fileFactorMap.set('doc', 0);
        fileFactorMap.set('docx', 0);
        fileFactorMap.set('rtf', 0);
        fileFactorMap.set('other', 0.2);

        const pricePerWordMap = new Map();
        pricePerWordMap.set('uk', uk);
        pricePerWordMap.set('ru', ru);
        pricePerWordMap.set('en', en);

        const wordsPerHourMap = new Map();
        wordsPerHourMap.set('uk', 1333);
        wordsPerHourMap.set('ru', 1333);
        wordsPerHourMap.set('en', 333);

        this.fileFactorMap = fileFactorMap;
        this.pricePerWordMap = pricePerWordMap;
        this.wordsPerHourMap = wordsPerHourMap;
    }
}

module.exports = EditorService;