const db = require("../models");
const Group = db.group;

//#region Create
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
//#endregion

//#region READ
exports.findAll = (req, res) => {
    Group.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Erreur lors de la récupération des groupes"})
    })
}

exports.findById = (req, res) => {
    const { id } = req.params;

    Group.findById(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err.message || `Le group avec l'id: ${id} n'a pas pu être trouvé`});
    })
}
//#endregion