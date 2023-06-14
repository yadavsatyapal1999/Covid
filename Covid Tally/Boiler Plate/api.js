const express = require('express');
const apirouter = express.Router();
const { connection } = require('./connector');

// total patient recovered
apirouter.get('/totalRecovered', (req, res) => {
    console.log("Recovered")
    let recover = 0;
    connection.find({}).then((rec) => {
        rec.map((item) => {
            recover += Number(item.recovered) // Mapping and adding in total
        })
    }).then(() => {
        res.status(200).json({
            "data": {
                _id: "total",
                recovered: recover
            }
        })
    })
        .catch(err => {
            res.status(400).json(err)
        })
})

// Total Active patient
apirouter.get('/totalActive', (req, res) => {
    console.log("active")
    let recover = 0;
    let infect = 0;
    connection.find({}).then((rec) => {
        rec.map((item) => {
            recover += Number(item.recovered)
            infect += Number(item.infected)
        })
    }).then(() => {
        res.status(200).json({
            "data": {
                _id: "total",
                active: infect - recover
            }
        })
    })
        .catch(err => {
            res.status(400).json(err)
        })
})

// Total Death
apirouter.get('/totalDeath', (req, res) => {
    console.log("death")
    let dead = 0;
    connection.find({}).then((rec) => {
        rec.map((item) => {
            dead += Number(item.death)
        })
    }).then(() => {
        res.status(200).json({
            "data": {
                _id: "total",
                death: dead
            }
        })
    })
        .catch(err => {
            res.status(400).json(err)
        })
})
// Finding Hot Spots states
apirouter.get('/hotspotStates', (req, res) => {
    console.log("hotspot");
    let hot = []
    
    connection.find({}).then((rec) => {
        rec.map((item) => {
            if (Number(((item.infected - item.recovered) / item.infected)) > 0.1) {// Formula to decide hotspot
                hot.push({ state: item.state, rate:  (parseFloat((item.infected - item.recovered) / item.infected)).toFixed(5)  })
            }
        })
    })
    .then(() => {
        res.status(200).json({
            "data": hot
        })
    })
        .catch(err => {
            res.status(400).json(err)
        })
})
// Haelthy States 
apirouter.get('/healthyStates', (req, res) => {
    console.log("Healthy");
    let hot = []
    const num = {$round: [7896.1479, 3]}
    console.log(num)
    connection.find({}).then((rec) => {
        rec.map((item) => {
            if (Number((item.death / item.infected)) < 0.005) {
                hot.push({ state: item.state, rate: (parseFloat(item.death / item.infected).toFixed(5)) })
            }
        })
    }).then(() => {
        res.status(200).json({
            "data": hot
        })
    })
        .catch(err => {
            res.status(400).json(err)
        })
})

module.exports = apirouter;