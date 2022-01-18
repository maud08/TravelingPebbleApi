const db = require("../models");
const Role = db.role;


exports.create = async (req, res)=> {
    if(!req.body){
        res.status(400).send({message: "Pas de données a ajouter !"});
        return;
    }

    if(req.body.Label !== undefined){
        const role = new Role({
            Label: req.body.Label
        })

        role
        .save(role)
        .then(data => {res.send(data)})
        .catch(err => {res.status(500).send({message: err.message || "Erreur lors de la création du role"})})
    }
    else{
        res.status(400).send({message: "Pas de données reçues"});
    }
}
