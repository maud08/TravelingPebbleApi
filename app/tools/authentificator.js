const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;
const maxAge = 3 * 24 * 60 *60 * 1000;// TODO changer les jours après dev en 1800s


exports.generateToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: maxAge})
}

//next permet d'envoyer à la fonction middleware suivante
exports.authentificateToken = async (req, res, next) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1];

    if(!token){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(401);
        User.findOne({Email: user.Email}).then((data) => {
            if(new Date(user.updatedAt).toString() !== data.updatedAt.toString())
            return res.sendStatus(401)
            req.user = user;
            next();
        })
    })

}