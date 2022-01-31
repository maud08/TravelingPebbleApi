const auth = require('../tools/authentificator');

module.exports = app => {

    const user = require('../controllers/user.controller')

    let router = require("express").Router();
    
    //unsecured
    router.post("/register", user.create);

    //secured
    router.patch("/register/group/:id", auth.authentificateToken, user.addGroup);
    router.patch("/register/role/:id", auth.authentificateToken, user.addRole);
    router.get("/", auth.authentificateToken, user.findAll);
    router.get("/:id", auth.authentificateToken, user.findById);
    router.put("/:id", auth.authentificateToken, user.update);
    router.delete("/:id", auth.authentificateToken, user.delete);


    app.use('/api/user', router);


}
