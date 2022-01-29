const { send } = require('express/lib/response');
const db = require('../models');
const fs = require('fs');
const { nanoid } = require("nanoid");
const Pebble = db.pebble;


//CRUD

exports.create = async (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Pas de données a ajouter !"});
        return;
    }
    var regex = /^data:.+\/(.+);base64,(.*)$/;
    var matches = req.body.Img.match(regex);
    var ext = matches[1];
    var data = matches[2];
    var buffer = Buffer.from(data, 'base64');
    let url = 'public/images/' + nanoid() +'.' + ext;
    fs.writeFileSync(url, buffer);

    if(req.body.IdCreator !== undefined){
        const pebble = new Pebble({
            Label: req.body.Label,
            Img: url,
            Position: req.body.Position,
            IdCreator: req.body.IdCreator,
        })

        pebble
        .save(pebble)
        .then(data => {res.send(data)})
        .catch(err => {
            res.status(500).send({message: err.message || "Erreur lors de la création du galet"})
        })

    }
    else{
        res.status(400).send({message: "Pas de données reçues !"});
    }
}

exports.findAll = (req, res) => {
    Pebble.find()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{res.status(500).send({message: err.message || "Erreur lors de la récupération des galets" })})
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Pebble.findById(id)
    .then(data => {res.send(data)})
    .catch(err => {res.status(500).send({message: err.message || `Le galet avec l'id : ${id} n'a pas pu être trouvé`})})
}

exports.findCreator = (req,res) => {
    const id = req.params.id;

    Pebble.find({IdCreator: id})
    .then(data => {res.send(data)})
    .catch(err => {res.status(500).send({message: err.message || `Le créateur avec l'id : ${id} n'a pas pu être trouvé`})})
}

exports.findPlayer = (req,res) => {
    const id = req.params.id;

    Pebble.find({IdPlayer: id})
    .then(data => {res.send(data)})
    .catch(err => {res.status(500).send({message: err.message || `Le joueur avec l'id : ${id} n'a pas pu être trouvé`})})
}

exports.update = (req,res) => {
    if(!req.body){
        res.status(400).send({message: "Pas de données a ajouter !"});
        return;
    }

    const id = req.params.id;

    Pebble.findByIdAndUpdate(id, req.body,{useFindAndModiFy: false})
    .then(data=>{
        if(!data){
            res.status(404).send({message: `Le galet avec l'id: ${id} n'a pas pu être modifié`});
        }
        else{
            res.send({message: `Le galet avec l'id: ${id} a été modifié`})
        }
    })
}


exports.delete = (req, res) => {
    const id = req.params.id;

    Pebble.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: `Le galet avec l'id: ${id} n'a pas été trouvé ni supprimé`});
        }
        else{
            res.send({message: `Le galet avec l'id: ${id} a été supprimé`})
        }
    })
    .catch(err => {
        res.status(500).send({message: `Le galet avec l'id: ${id} n'a pas été supprimé`})
    })
}

//#region Add player

exports.addPlayer = async (req, res) => {

    const { id } = req.params;
    const updatePebble = await Pebble.findByIdAndUpdate(id, {
        $push:{
            IdPlayer: req.body.IdPlayer
        }
    }, {returnDocument: 'after'});
    if(!updatePebble){
        res.sendStatus(404);
    }
    else{
        res.json(updatePebble);
    }
}
//#endregion

