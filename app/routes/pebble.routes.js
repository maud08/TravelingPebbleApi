const auth = require('../tools/authentificator');

module.exports = app => {
    const pebble = require('../controllers/pebble.controller');
    
    let router = require("express").Router();

    //unsecured
    router.get("/", pebble.findAll);

    //secured
    router.post("/", auth.authentificateToken, pebble.create);
    router.get("/:id", auth.authentificateToken, pebble.findOne);
    router.get("/creator/:id", auth.authentificateToken, pebble.findCreator);
    router.get("/player/:id", auth.authentificateToken, pebble.findPlayer);
    router.put("/:id", auth.authentificateToken, pebble.update);
    router.delete("/:id", auth.authentificateToken, pebble.delete);
    router.patch("/addPlayer/:id", auth.authentificateToken, pebble.addPlayer);

    app.use('/api/pebble', router);

}