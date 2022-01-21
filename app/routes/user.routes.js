module.exports = app => {

    const user = require('../controllers/user.controller')

    let unsecured = require("express").Router();
    let secured = require("express").Router();
    
    unsecured.post("/register", user.create);
    unsecured.patch("/register/group/:id", user.addGroup);
    unsecured.patch("/register/role/:id", user.addRole);


    unsecured.get("/", user.findAll);
    unsecured.get("/:id", user.findById);
    unsecured.put("/:id", user.update);
    unsecured.delete("/:id", user.delete);


    app.use('/api/user', unsecured);


}
