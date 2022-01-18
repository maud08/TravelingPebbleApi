module.exports = app => {
    const pebble = require('../controllers/pebble.controller');
    
    let unsecured = require("express").Router();
    let secured = require("express").Router();

    unsecured.post("/", pebble.create);
    unsecured.get("/", pebble.findAll);
    unsecured.get("/:id", pebble.findOne);
    unsecured.put("/:id", pebble.update);
    unsecured.delete("/:id", pebble.delete);

    app.use('/api/pebble', unsecured);

}