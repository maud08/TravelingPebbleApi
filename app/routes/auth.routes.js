module.exports = app => {
    const controller = require("../controllers/auth.controller");

    let router = require("express").Router();

    router.post("/", controller.singIn);
    //router.get("/", controller.logout);

    app.use('/api/login', router);

}