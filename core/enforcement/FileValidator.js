const QSTB = require('../QSTB');

const FileValidator = {
    frequency: 741.2,

    validateFile(file) {
        const type = this.getFileType(file);
        return QSTB.emit({
            type: 'file_validate',
            frequency: this.frequency,
            state: {
                file,
                type,
                valid: this.checkFileType(file, type)
            }
        });
    },

    getFileType(file) {
        const types = {
            '.sot': 963,
            '.vibe': 741,
            '.flow': 639,
            '.create': 528
        };

        const ext = file.split('.').pop();
        return types[`.${ext}`];
    }
};

module.exports = FileValidator;