const auth = require("../tools/authentificator")
const db = require("../models");
const User = db.user;

exports.singIn = async (req, res) => {
    User.findOne({Email: req.body.Email}).then((data) => {
        if(data !== null && data.Email !== null){
            let user = {
                _id: data.Id,
                Email: data.Email,
                Password: data.Password,
                updatedAt: data.updatedAt
            }

            if(user !== null){
                if(req.body.Password !== user.Password){
                    res.status(401).send({message:"Email ou mot de passe incorrect !"})
                    return;
                }
                const accesToken = auth.generateToken(user);
                res.status(200).send({accesToken});
            }
            else{
                res.status(404).send({message: "Not Found"})
            }

        }
        else{
            res.status(404).send({message: `L'utlisateur : ${req.body.Email} n'a pas été trouvé !`})
        }
    })

}