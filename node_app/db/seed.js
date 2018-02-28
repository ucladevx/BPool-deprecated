// const moment = require('moment-timezone');
const datejs = require('datejs');

const Ride = require('./ride.js');
const User = require('./user.js');

// Seed data for mock rides
initialRides((seedRides) => {
    for (let i = 0; i < seedRides.length; i++) {
        let ride = seedRides[i];
        Ride.insert(ride.carModel, ride.description, ride.destination, ride.driver, ride.carNumSeats, ride.price, ride.source, ride.timestamp);
    }
});


function initialRides(callback) {
    let date = Date.today().at("6:15pm");
    // TODO moment-timeline for timezone discrepancies
    // let todayDate = moment.tz(new Date(), "America/Los_Angeles").format().toString();

    User.findByProfileId("facebook_id", (user) => {
        if (!user) {
            User.insert("Joe Bruin", "facebook_id", (user) => {
                let driverID = user._id;
                let rides = [
                    {
                        timestamp: date,
                        source: 'UCLA',
                        destination: 'Santa Monica',
                        carModel: 'Toyota Prius',
                        carNumSeats: 4,
                        description: 'Carpool when I go to work',
                        price: 13,
                        driver: driverID
                    },
                    {
                        timestamp: date,
                        source: 'UCLA',
                        destination: 'San Diego',
                        carModel: 'Toyota Prius',
                        carNumSeats: 4,
                        description: 'Carpool when I go to work',
                        price: 30,
                        driver: driverID
                    },
                    {
                        timestamp: date,
                        source: 'UCLA',
                        destination: 'Santa Barbara',
                        carModel: 'Toyota Prius',
                        carNumSeats: 4,
                        description: 'Carpool when I go to work',
                        price: 20,
                        driver: driverID
                    }
                ]

                callback(rides);
            });
        }
    })
};
