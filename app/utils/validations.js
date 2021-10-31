const { check } = require('express-validator');

function parseURL(url) {
    const pattern = /^(?:f|ht)tps?:\/\//;
    
    if (!pattern.test(url)) {
        return `http://${url}`;
    }

    return url;
}

module.exports.shorten = [
    check('original_url')
        .isURL()
        .customSanitizer(parseURL)
        .withMessage('URL inválida.'),
    check('expiration_time')
        .matches(/\d+[simhdwmy]{1}/)
        .withMessage('Tempo de expiração inválido.')
];