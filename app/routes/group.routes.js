module.exports = app => {
    const controller = require('../controllers/group.controller');

    let router = require("express").Router();

    router.post("/", controller.create);

    app.use('/api/group', router);
}