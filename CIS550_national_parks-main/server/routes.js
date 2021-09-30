
var config = require('./db-config.js');
var mysql = require('mysql');

// config.connectionLimit = 10;
var db = mysql.createPool(config);

//Dashboard
const getParks = (req, res) => {
 var query = "SELECT * FROM parks ORDER BY rand() LIMIT 3";

 db.query(query, (err, result, fields) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log(result);
        res.json(result);
    }
 });
};

//SearchPage1
function getRecs1(req, res) {
  console.log('getRecs');
  console.log("getRecs params:" + req.params);
  console.log("decade:" + req.params.search);
  var decade = req.params.search;
  
  var query = `
    WITH temp AS (
	    SELECT DISTINCT unit_name, year, (FLOOR(year/10)*10) AS decade, visitor_cnt
	    FROM visitation
      WHERE unit_name IN (
		    SELECT DISTINCT Park_Name
        FROM parks
      )
    )
    SELECT decade, unit_name, ROUND(AVG(visitor_cnt)) AS avg_visitors
    FROM temp t
    WHERE decade = ${decade}
    GROUP BY decade, unit_name
    ORDER BY decade, avg_visitors DESC
    LIMIT 10; 
    `;
  db.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows); //Test
      res.json(rows);
    }
  });
};


function getParkSpecies(req, res) {
  console.log('getParkSpecies');
  console.log('getParkSpecies params:' + req.params);
  console.log('parkName:' + req.params.parkName);

  var parkName = req.params.parkName;
  var animalClass = req.params.animalClass;
  var query = 
  `SELECT DISTINCT s.common_name AS Species_Name
  FROM species_common_names s JOIN (
  SELECT s1.species_id  
  FROM species s1 JOIN (
  SELECT species_id
  FROM species_at_park
  WHERE park_name LIKE '%${parkName}'
  ) s2 ON s1.species_id = s2.species_id
  WHERE s1.category_ LIKE '%${animalClass}'
  ) p ON s.species_id = p.species_id
  ORDER BY s.common_name
  `;

  db.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        console.log(rows);
        res.json(rows);
    }
  });

};



function getSpecificPark(req, res) {
    var inputPark = req.params.park;
    var query = `
    SELECT Park_Name
    FROM Park
    WHERE Park_Name LIKE '${inputPark}'
    LIMIT 10;
  `;

    db.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            console.log(rows);
            res.json(rows);
        }
    });
};

function getTop5Trails(req, res) {
  var park = req.params.parkcode;
  var query = 
    `SELECT T.name, T.difficulty_rating, ROUND(T.length/5280, 2) AS length
    FROM parks P JOIN trails T ON P.Park_Name = T.Park_Name
    WHERE P.code = '${park}'
    ORDER BY T.populatrity DESC
    LIMIT 5
    `;
  
  db.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
  
};

function getEndangeredSpecies(req, res) {
  var park = req.params.parkcode;
  var query = 
    `SELECT S.sci_name, SCN.common_name, SAP.nativeness
    FROM parks P JOIN species_at_park SAP ON P.Park_Name = SAP.Park_Name JOIN species_common_names SCN ON SAP.species_id = SCN.species_id JOIN species S on S.species_id = SCN.species_id
    WHERE P.code = '${park}' AND SAP.conservation_status = "Endangered"
    `;
  
  db.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
  
};

function getPark(req, res) {
  var park = req.params.parkcode;
  var query = 
    `SELECT * 
    FROM parks P JOIN park_states PS on P.Park_name = PS.Park_Name
    WHERE P.code = '${park}'`;
  
  db.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
  
};

function getParkNames(req, res) {
  var query = 
  `SELECT Park_Name FROM parks`;

  db.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
  
}

function getLatLong(req, res){
  var zip = req.params.zipcode;
  var query = 
    `SELECT * FROM zipcodes WHERE zipcode = ${zip}`;
  
  db.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

function getZipcodes(req, res){
  var query = 
    `SELECT zipcode FROM zipcodes `;
  
  db.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

function getTrails(req, res) {

  let park = req.params.park;
  let diff = req.params.diff;
  let dist = req.params.dist;
  let elev = req.params.elev;
  let rate = req.params.rate;

  var where = ""

  if( park == "National_Park" &&
      diff == "Max_Difficulty" &&
      dist == "Max_Distance" &&
      elev == "Max_Elevation_Gain" &&
      rate == "Min_Rating"){
    where += "";
  } else {
    where += "WHERE ";
  }

  if( park !== "National_Park"){
    if(where != "WHERE "){
      where += " and "
    } 
    where += "Park_Name = '" + park.replace(/_/g," ")+"'";
  }

  if( diff !== "Max_Difficulty"){
    if(where != "WHERE "){
      where += " and "
    } 
    where += "difficulty_rating <= " + diff;
  }

  if( dist !== "Max_Distance"){
    if(where != "WHERE "){
      where += " and "
    } 
    let dist_miles = parseFloat(dist)*5280;
    where += "length <= " + dist_miles;
  }

  if( elev !== "Max_Elevation_Gain"){
    if(where != "WHERE "){
      where += " and "
    } 
    where += "elevation_gain <= " + elev;
  }

  if( rate !== "Min_Rating"){
    if(where != "WHERE "){
      where += " and "
    } 
    where += "avg_rating >= " + rate;
  }

  where += ";"

  var query = 
  `SELECT * FROM trails ${where}`;
  console.log(query);
  db.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
  

}

function getDissimilarParks(req, res){

  let lat = req.params.lat.replace(/%2D/g, '-');
  let long = req.params.long.replace(/%2D/g, '-');

  console.log(lat);
  console.log(long);

  var query = 
  `WITH distance AS(
    SELECT Park_Name AS park,
      ST_Distance_Sphere(point(Longitude, Latitude), point(${long}, ${lat}))* .000621371192 as dist
    FROM parks
  ), selected_parks AS (
    SELECT *
      FROM distance
      WHERE dist < ${req.params.dist}
  ), count AS (
    SELECT sp.park, sp.dist, COUNT(*) as num_species
    FROM selected_parks sp JOIN species_at_park ON sp.park = species_at_park.Park_Name
    GROUP BY sp.park
  ),spec AS (
    SELECT sap.Park_Name, c.num_species, sap.species_id, c.dist
    FROM count c JOIN species_at_park sap ON c.park = sap.Park_Name
  ), intersection AS (
    SELECT s1.Park_Name as park_1, s2.Park_Name AS park_2, s1.num_species AS park_1_spec,
      s2.num_species AS park_2_spec, s1.dist AS park_1_dist, s2.dist AS park_2_dist, Count(*) AS count_similar
    FROM spec s1 JOIN spec s2 ON s1.species_id = s2.species_id
    WHERE s1.Park_Name <> s2.Park_Name
    GROUP BY s1.Park_Name, s2.Park_Name
  ), sim_metric AS (
    SELECT park_1, park_2, park_1_spec, park_2_spec, park_1_dist, park_2_dist, count_similar, 
      count_similar / (park_1_spec + park_2_spec) as sim_metric
    FROM intersection
    ORDER BY park_1, sim_metric
  )
    SELECT *
    FROM sim_metric
    ORDER BY sim_metric
    LIMIT 10;`

  db.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

}

function getRecs(req, res) {
  console.log("REQ______");
  console.log(req.params);
  let state = req.params.state;
  let visit = req.params.visit;
  let tpa = req.params.tpa;
  let activity = req.params.activities;
  let animal = req.params.animals;

  var queryList = [];

  //State selected
  if( state != "Select"){
    // mapLen ++;
    var query = `
      SELECT p.Park_Name  
      FROM parks p JOIN park_states ps ON p.Park_Name = ps.Park_Name  WHERE ps.state = '${state}'
      `
    queryList.push(query);
  }
 
  //Visit selected
  if( visit != "Select"){
    // mapLen ++;
    var query = `
      WITH visit_CTE AS (
	      SELECT DISTINCT Park_Name, ROUND(AVG(visitor_cnt)) AS avg_annual_visitors
	      FROM visitation v JOIN parks p on v.unit_name = p.Park_Name
	      GROUP BY Park_Name
	      HAVING avg_annual_visitors > ${visit}
	      ORDER BY AVG(visitor_cnt) DESC
      )
      SELECT Park_Name
      FROM visit_CTE
      `
    queryList.push(query);
  }

  //TPA selected
  if( tpa != "Select"){
    // mapLen ++;
    var query = `
      	WITH tpa_CTE AS (
		      SELECT p.Park_Name, (COUNT(*)/p.Acres)*10000 AS trails_per_acre
		      FROM trails t JOIN parks p ON t.Park_Name = p.Park_Name
		      GROUP BY Park_Name
		      HAVING trails_per_acre > ${tpa}
	      )
	      SELECT Park_Name
	      FROM tpa_CTE
      `
    queryList.push(query);
  }

  //Activity selected
  if( activity != "Select"){
    // mapLen ++;
    var query = `
      SELECT DISTINCT Park_Name
      FROM trail_activities a JOIN trails t ON a.AllTrails_trail_id = t.AllTrails_trail_id
      WHERE a.activity = '${activity}'
      `
    queryList.push(query);
  }
  //Animal selected
  if( animal != "Select"){
    // mapLen ++;
    var query = `
      	SELECT Park_Name
        FROM species_at_park s JOIN species_common_names c ON s.species_id = c.species_id
        WHERE c.common_name LIKE '%${animal}%' AND s.occurrence = "Present"
      `
    queryList.push(query);
  }
  

  var query = `
  SELECT Park_Name, Code
  FROM parks
  `;

  var count = 0;
  if(queryList.length == 0){
    query += ';';
  }
  else {
    for(q in queryList) {
      count ++;
      var intermediate = queryList[q];
      intermediate = '(' + intermediate + ')';

      if(count == 1) {
        query += ' WHERE Park_Name IN ';
      }
      else {
        query += ' AND Park_Name IN'
      }

      query += intermediate;
      
    }
    query += ';';
  }
  console.log("queryList: " + queryList);
  console.log("ROUTE QUERY: " + query);
  console.log()

  db.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}



module.exports = {
    getParks,
    getRecs1, 
    getParkSpecies,
    getSpecificPark: getSpecificPark,
    getPark,
    getParkNames,
    getTrails,
    getTop5Trails,
    getRecs,
    getLatLong,
    getZipcodes,
    getDissimilarParks,
    getEndangeredSpecies
}