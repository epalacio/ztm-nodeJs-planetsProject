//using the npm package csv-parse
const parse = require('csv-parse');
const fs = require('fs');

//create an array to store all filtered info.
const habitablePlanets = [];

//creating a function that filters the specific csv file for the column 'koi_disposition' to see if the exoplanet is confirmed.
function isHabitablePlanet(planet) {
    //checking if planet is confirmed
    return planet['koi_disposition'] === 'CONFIRMED'
    //checking if planet is within temperature range for habitability
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    //checking for the upper limit of planet size radius
    && planet['koi_prad'] < 1.6;
};

fs.createReadStream('kepler_data.csv')
    //pipe connects a readable stream source to a writable stream destination
    .pipe(parse({
        //identify the symbol used for comments
        comment: '#',
        //return each row as a js object with key-value pairs
        columns: true,
    }))
    //reading the data
    .on('data', (data) => {
        if(isHabitablePlanet(data)) {
            habitablePlanets.push(data);
        }
    })
    //throwing an error in case there is one
    .on('error', (err) => {
        console.log(err);
    })
    //what to do on completion
    .on('end', () => {
        //mapping the array to extract they key-values of the planet names.
        console.log(habitablePlanets.map((planet) => {
            return planet['kepler_name'];
        }));
        //logging the amount of elements inside the array
        console.log(`${habitablePlanets.length} habitable planets found!`);
    });