//variable d'env
require("dotenv").config({path: './config/.env'});
require('./config/db');



const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT;

//save img
const formData = require("express-form-data");
const os = require("os");

const options = {
  uploadDir: os.tmpdir()
}



//pour accepeter les req de react
var corsOptions = {
  origin: "*"
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenu sur l'API Traveling Pebble." });
});

app.use(formData.parse(options));

//permet de rendre le dossier image public
app.use('/public/images', express.static(__dirname + '/public/images'));



//routes
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/group.routes")(app);
require("./app/routes/pebble.routes")(app);



//server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

