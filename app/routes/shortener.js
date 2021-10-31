const validations = require('../utils/validations');

module.exports = (application) => {
    application.get('/', (req, res) => {
        application.app.controllers.shortener.home(application, req, res);
    });

    application.get('/:shortURLId', (req, res) => {
        application.app.controllers.shortener.redirect(application, req, res);
    });

    application.post('/shorten', validations.shorten, (req, res) => {
        application.app.controllers.shortener.shorten(application, req, res);
    });
};