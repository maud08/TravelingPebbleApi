const auth = require("../tools/authentificator")
const db = require("../models");
const User = db.user;
const bcrypt = require('bcrypt');

exports.singIn = async (req, res) => {
    User.findOne({Email: req.body.Email}).then((data) => {
        if(data !== null && data.Email !== null){
            let user = {
                Id: data._id,
                Email: data.Email,
                Password: data.Password,
                UserRoles: data.UserRoles,
                updatedAt: data.updatedAt,
            }

            if(user !== null){
                const decryptPassword = bcrypt.compare(req.body.Password, user.Password)
                if(!decryptPassword){
                    res.status(401).send({message:"Mot de passe incorrect !"})
                    return;
                }
                else{
                    const accesToken = auth.generateToken({
                        Id: user.Id,
                        Email: user.Email,
                        UserRoles: user.UserRoles,
                        updatedAt: user.updatedAt,
                    });
                    res.status(200).send({accesToken});
                }
                
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