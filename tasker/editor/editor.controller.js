const EditorService = require('./editor.service');
const editorService = new EditorService();

class EditorController {
    editText(req, res) {
        const {language, mimetype, count} = req.body;
        const resultObj = editorService.useTaskToText(count, language, mimetype);
        res.json(resultObj);
    }
}

module.exports = new EditorController();