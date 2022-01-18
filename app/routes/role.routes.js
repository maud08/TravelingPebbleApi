module.exports = app => {
    const controller = require('../controllers/role.controller');

    let router = require("express").Router();

    router.post("/", controller.create);

    app.use('/api/role', router);
}