require('dotenv').config();
const db = require("../models");
const User = db.user;



//CRUD

//#region CREATE
exports.create = async (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Pas de données a ajouter !"});
        return;
    }

    if(req.body.Email !== undefined){

        const user =  new User({
            Email: req.body.Email,
            Pseudo: req.body.Pseudo,
            Password: req.body.Password,
            Country: req.body.Country
        })

        user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Erreur lors de la création de l'utlisateur"})
        })

    }
    else{
        res.status(400).send({message: "Pas de données reçues !"});
    }
}
//#endregion

//#region READ
exports.findAll = (req, res) => {
    User.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Erreur lors de la récupération des utlisateurs"})
    })
}

exports.findById = (req, res) => {
    const id = req.params.id;

    User.findById(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err.message || `L'utlisateur avec l'id: ${id} n'a pas pu être trouvé`});
    })
}
//#endregion

//#region Update
exports.update = (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Pas de données a ajouter !"});
        return;
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body,{ useFindAndModify: false })
    .then(data => {
        if(!data){
            res.status(404).send({message: `L'utilisateur avec l'id: ${id} n'a pas pu être modifié`});
        }
        else{
            res.send({message: `L'utilisateur avec l'id: ${id} a été modifié`})
        }
    })
}

//#endregion

//#region Delete
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: `L'utilisateur avec l'id: ${id} n'a pas été trouvé ni supprimé`});
        }
        else{
            res.send({message: `L'utilisateur avec l'id: ${id} a été supprimé`})
        }
    })
    .catch(err => {
        res.status(500).send({message: `L'utilisateur avec l'id: ${id} n'a pas été supprimé`})
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
    const updateUser = await User.findByIdAndUpdate(id, {
        $push:{
            Groups: req.body.GroupId
        }
    }, {returnDocument: 'after'}) // permet de récuper nouvel état
    if(!updateUser){
        res.sendStatus(404);
    }
    else{
        res.json(updateUser);
    }
    res.json(updateUser);
}

//#endregion

//#region AddRole

exports.addRole = async (req, res) => {

    if(!req.body){
        res.status(400).send({message: "Pas de données a ajouter !"});
        return;
    }

    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(id, {
        $push:{
            Roles: req.body.RoleId
        }
    }, {returnDocument: 'after'}) // permet de récuper nouvel état
    if(!updateUser){
        res.sendStatus(404);
    }
    else{
        res.json(updateUser);
    }
    res.json(updateUser);
}

//#endregion