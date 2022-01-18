module.exports = app => {

    const user = require('../controllers/user.controller')

    let unsecured = require("express").Router();
    let secured = require("express").Router();
    
    unsecured.post("/register", user.create);
    unsecured.get("/", user.findAll);
    unsecured.get("/:id", user.findById);
    unsecured.put("/:id", user.update);


    app.use('/api/user', unsecured);


}
