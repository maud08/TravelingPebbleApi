// variable d'env
require("dotenv").config({path: './config/.env'});
const dbConfig = process.env.URL_DB;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig;
db.user = require("./user.model")(mongoose);
db.auth = require("./auth.model")(mongoose);

module.exports = db;