const parse = require('csv-parse');
const fs = require('fs');

const results = [];

fs.createReadStream('kepler_data.csv')
    //reading the data
    .on('data', (data) => {
        results.push(data);
    })
    //throwing an error in case there is one
    .on('error', (err) => {
        console.log(err);
    })
    //what to do on completion
    .on('end', () => {
        console.log(results);
        console.log('done');
    });

// parse();