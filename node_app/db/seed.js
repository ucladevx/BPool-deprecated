const Ride = require('./ride.js');

// Seed data for mock rides
let seedRides = initialRides();
for (let i = 0; i < seedRides.length; i++) {
    let ride = seedRides[i];
    Ride.insert(ride.origin, ride.destination, ride.price, ride.date, ride.driver, (newRide) => {
        console.log(newRide);
    });    
}

function initialRides() {
    let todayDate = new Date();    
    return [
        {
            origin: "Los Angeles",
            destination: "San Diego",
            price: 20,
            date: todayDate,
            driver: "Joe Bruin"
        },
        {
            origin: "Los Angeles",
            destination: "San Diego",
            price: 20,
            date: todayDate,
            driver: "Joe Bruin"
        },
        {
            origin: "Los Angeles",
            destination: "San Diego",
            price: 20,
            date: todayDate,
            driver: "Joe Bruin"
        },
        {
            origin: "Los Angeles",
            destination: "San Diego",
            price: 20,
            date: todayDate,
            driver: "Joe Bruin"
        }
    ]
};