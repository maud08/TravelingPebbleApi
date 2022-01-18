const db = require("../models");
const Group = db.group;

exports.create = async (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Pas de données a ajouter !"});
        return;
    }

    if(req.body.Label !== undefined){
        const group = new Group({
            Label: req.body.Label
        })

        group
        .save(group)
        .then(data => {res.send(data)})
        .catch(err => {res.status(500).send({message: err.message || "Erreur lors de la création du groupe"})})
    }
    else{
        res.status(400).send({message: "Pas de données reçues"});
    }
}