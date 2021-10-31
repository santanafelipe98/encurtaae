module.exports = (application) => {
    application.get('/about', (req, res) => {
        application.app.controllers.about.about(application, req, res);
    });
};