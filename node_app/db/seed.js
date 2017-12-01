// const moment = require('moment-timezone');
const datejs = require('datejs');

const Ride = require('./ride.js');

// Seed data for mock rides
let seedRides = initialRides();
for (let i = 0; i < seedRides.length; i++) {
    let ride = seedRides[i];
    Ride.insert(ride.carModel, ride.description, ride.destination, ride.driver, ride.carNumSeats, ride.price, ride.origin, ride.timestamp, (newRide) => {
        console.log(newRide);
    });
}

function initialRides() {
    let date = Date.today().at("6:15pm");
    // TODO moment-timeline for timezone discrepancies
    // let todayDate = moment.tz(new Date(), "America/Los_Angeles").format().toString();

    return [
        { 
            timestamp: date,
            origin: 'UCLA',
            destination: 'Santa Monica',
            carModel: 'Toyota Prius',
            carNumSeats: 4,
            description: 'Carpool when I go to work',
            price: 13, 
            driver: 'Joe Bruin'
        },
        { 
            timestamp: date,
            origin: 'UCLA',
            destination: 'San Diego',
            carModel: 'Toyota Prius',
            carNumSeats: 4,
            description: 'Carpool when I go to work',
            price: 30,
            driver: 'Joe Bruin'
        },
        { 
            timestamp: date,
            origin: 'UCLA',
            destination: 'Santa Barbara',
            carModel: 'Toyota Prius',
            carNumSeats: 4,
            description: 'Carpool when I go to work',
            price: 20,
            driver: 'Joe Bruin'
        }
    ]
};