const EditorService = require('./editor.service');

class EditorController {
    constructor() {
        this.editorService = new EditorService();
    }

    editText(req, res) {
        const {language, mimetype, count} = req.body;
        const resultObj = this.editorService.useTaskToText(count, language, mimetype);
        res.json(resultObj);
    }

}

module.exports = EditorController;