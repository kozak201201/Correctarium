const EditorService = require('./editor.service');
const editorService = new EditorService();

class EditorController {
    editText(req, res) {
        const {language, mimetype, count} = req.body;
        const resultObj = editorService.applyTaskToWords(count, language, mimetype);
        res.json(resultObj);
    }
}

module.exports = new EditorController();