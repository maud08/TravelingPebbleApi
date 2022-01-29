module.exports = app => {
    const pebble = require('../controllers/pebble.controller');
    
    let unsecured = require("express").Router();
    let secured = require("express").Router();

    unsecured.post("/", pebble.create);
    unsecured.get("/", pebble.findAll);
    unsecured.get("/:id", pebble.findOne);
    unsecured.get("/creator/:id", pebble.findCreator);
    unsecured.get("/player/:id", pebble.findPlayer);
    unsecured.put("/:id", pebble.update);
    unsecured.delete("/:id", pebble.delete);
    unsecured.patch("/addPlayer/:id", pebble.addPlayer);

    app.use('/api/pebble', unsecured);

}