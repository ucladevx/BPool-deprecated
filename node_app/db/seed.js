// const moment = require('moment-timezone');

const Ride = require('./ride.js');

// Seed data for mock rides
let seedRides = initialRides();
for (let i = 0; i < seedRides.length; i++) {
    let ride = seedRides[i];
    Ride.insert(ride.origin, ride.destination, ride.price, ride.date, ride.driver);    
}

function initialRides() {
    let todayDate = new Date(); 
    // TODO moment-timeline for timezone discrepancies
    // let todayDate = moment.tz(new Date(), "America/Los_Angeles").format().toString();

    return [
        {
            origin: "Los Angeles",
            destination: "Santa Monica",
            price: 35,
            date: todayDate,
            driver: "Joe Bruin"
        },
        {
            origin: "Los Angeles",
            destination: "San Diego",
            price: 15,
            date: todayDate,
            driver: "Joe Bruin"
        },
        {
            origin: "Los Angeles",
            destination: "San Luis Obispo",
            price: 50,
            date: todayDate,
            driver: "Joe Bruin"
        },
        {
            origin: "Los Angeles",
            destination: "Long Beach",
            price: 25,
            date: todayDate,
            driver: "Joe Bruin"
        },
        {
            origin: "UCLA",
            destination: "Long Beach",
            price: 22,
            date: todayDate,
            driver: "Joe Bruin"
        },
        {
            origin: "UCLA",
            destination: "San Diego",
            price: 55,
            date: todayDate,
            driver: "Joe Bruin"
        },
        {
            origin: "UCLA",
            destination: "San Diego",
            price: 50,
            date: todayDate,
            driver: "Josie Bruin"
        }
    ]
};