module.exports = (application) => {
    application.get('/about', (req, res) => {
        application.controllers.about.about(application, req, res);
    });
};