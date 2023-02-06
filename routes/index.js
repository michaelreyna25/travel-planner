const express = require('express');
const {Traveller} = require("./models/traveller").Traveller;
const {Location} = require("./models/location").Location;
const {Trip} = require("./models/trip").Trip;

const app = express();
const port = process.env.PORT || 3001;

// Connect to the database
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    storage: './db.schema'
});

sequelize.sync();

// GET route for returning all travellers
app.get("/api/travellers", (req, res) => {
    db.Traveller.findAll().then((travellers) => {
      res.json(travellers);
    });
});

// POST route for creating a traveller
app.post("/api/travellers", (req, res) => {
  db.Traveller.create({
    name: req.body.name,
    email: req.body.email,
  }).then((traveller) => {
    res.json(traveller);
  });
});

// GET route for returning a single traveller
app.get("/api/travellers/:id", (req, res) => {
    db.Traveller.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Trip],
    }).then((traveller) => {
      res.json(traveller);
    });
});

// DELETE route for removing traveller
app.delete("/api/travellers/:id", (req, res) => {
  db.Traveller.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deletedTraveller) => {
    res.json(deletedTraveller);
  });
});

// GET route for returning all locations
app.get("/api/locations", (req, res) => {
    db.Location.findAll().then((locations) => {
      res.json(locations);
    });
});

// POST route for creating a location
app.post("/api/locations", (req, res) => {
    db.Location.create({
      name: req.body.name,
    }).then((location) => {
      res.json(location);
    });
});

// GET route for returning a single location
app.get("/api/locations/:id", (req, res) => {
    db.Location.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Trip],
    }).then((location) => {
      res.json(location);
    });
});

// DELETE route for removing a location
app.delete("/api/locations/:id", (req, res) => {
    db.Location.destroy({
      where: {
        id: req.params.id,
      },
    }).then((deletedLocation) => {
      res.json(deletedLocation);
    });
});

//Creates trip data between associated travellers and locations.
app.post("/api/trips", (req, res) => {
    // Extract trip data from the request body
    const { trip_budget, traveller_amount, traveller_id, location_id } = req.body;
  
    // Create a new trip in the database
    Trip.create({ trip_budget, traveller_amount, traveller_id, location_id })
      .then(trip => {
        res.json(trip);
      })
      .catch(error => {
        // Catching Server Error
        res.status(500).json({ error: error.message });
      });
});

//Delete a trip
app.delete("/api/trips/:id", (req, res) => {
    // Extract the trip ID from the URL parameters
    const { id } = req.params;
  
    // Delete the trip with the specified ID from the database
    Trip.destroy({ where: { id } })
      .then(() => {
        res.status(204).send();
      })
      .catch(error => {
        // Return an Server error if something went wrong
        res.status(500).json({ error: error.message });
      });
});

module.exports = router;
