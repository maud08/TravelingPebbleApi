module.exports = app => {

    const user = require('../controllers/user.controller')

    let unsecured = require("express").Router();
    let secured = require("express").Router();
    
    unsecured.post("/register", user.create);
    app.use('/api/user', unsecured);


}
