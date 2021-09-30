const express = require('express'); //express
const bodyParser = require('body-parser'); //body parser
const cors = require('cors'); //cors
const app = express(); //express
const mysql = require('mysql'); //mysql
var routes = require('./routes.js'); //routes.js


// app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: false}));

//default route
app.get("/", routes.getParks);
//SearchPage1
app.get("/search1/:search", routes.getRecs1);

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

app.get("/individualPark/:park", routes.getSpecificPark);

//client port: 3000
//server port: 8081
app.listen(8081,() => {
    console.log("Server running on port 8081");
});


app.get("/park/:parkcode", routes.getPark);

app.get("/parksNames", routes.getParkNames);

app.get("/parkSpecies/:parkName/:animalClass", routes.getParkSpecies);

app.get("/trails/:park/:diff/:dist/:elev/:rate", routes.getTrails);

app.get("/park/:parkcode/top5Trails", routes.getTop5Trails);

app.get("/recs/:state/:visit/:tpa/:activities/:animals", routes.getRecs);

app.get("/park/:parkcode/endangeredSpecies", routes.getEndangeredSpecies);

app.get("/lat_long/:zipcode", routes.getLatLong);

app.get("/zipcodes", routes.getZipcodes);

app.get("/dissimilar_parks/:lat/:long/:dist", routes.getDissimilarParks);

