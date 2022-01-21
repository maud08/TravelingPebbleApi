module.exports = app => {
    const controller = require('../controllers/group.controller');

    let router = require("express").Router();

    router.post("/", controller.create);
    router.get("/", controller.findAll);
    router.get("/:id", controller.findById);

    app.use('/api/group', router);
}