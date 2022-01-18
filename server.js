//variable d'env
require("dotenv").config({path: './config/.env'});
require('./config/db');

const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT;


//pour accepeter les req de react
let corsOptions = {
    origin: "http://localhost:4200"
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenu sur l'API Traveling Pebble." });
});


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

