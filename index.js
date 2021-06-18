const parse = require('csv-parse');
const fs = require('fs');

const results = [];

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