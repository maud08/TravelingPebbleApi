module.exports = app => {
    const controller = require('../controllers/role.controller');

    let router = require("express").Router();

    router.post("/", controller.create);
    router.get("/", controller.findAll);
    router.get("/:id", controller.findById);
    router.patch("/:id", controller.addGroup);

    app.use('/api/role', router);
}