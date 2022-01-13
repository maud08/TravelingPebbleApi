require('dotenv').config();
const db = require("../models");
const User = db.user;

exports.create = async (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Pas de données a ajouté !"});
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