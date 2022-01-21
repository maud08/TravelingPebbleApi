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

//#region READ
exports.findAll = (req, res) => {
    Role.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Erreur lors de la récupération des Roles"})
    })
}

exports.findById = (req, res) => {
    const { id } = req.params;

    Role.findById(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err.message || `Le Role avec l'id: ${id} n'a pas pu être trouvé`});
    })
}
//#endregion


//#region AddGroup

exports.addGroup = async (req, res) => {

    if(!req.body){
        res.status(400).send({message: "Pas de données a ajouter !"});
        return;
    }

    const { id } = req.params;
    const updateRole = await Role.findByIdAndUpdate(id, {
        $push:{
            Groups: req.body.GroupId
        }
    }, {returnDocument: 'after'}) // permet de récuper nouvel état
    if(!updateRole){
        res.sendStatus(404);
    }
    else{
        res.json(updateRole);
    }
}

//#endregion
