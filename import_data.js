const fs = require('fs');
const readline = require('readline');
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'apples1!',
  database : 'stacks_of_wax'
});

// const finished = false;

const fileStream = fs.createReadStream('data.csv');
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

let queryValues = [];

connection.connect();

rl.on('line', (line) => {
    console.log(`Line: ${line.split(',')[0]}`);
    const importValues = line.split(',');
    const values = [`${importValues[0].trim()}`, `${importValues[1].trim()}`, `${importValues[2].trim()}`, `${importValues[3].trim()}`, `${importValues[6].trim()}`];
    const tracklist = importValues.slice(6).filter(x => x.length > 0).map(x => x.trim());
    values.push(`${JSON.stringify(tracklist)}`);
    values.push(0);

    queryValues.push(values);
});

rl.on('close', () => {
    console.log('Finished reading the file.');
    connection.query(`INSERT INTO vinyl (album, artist, year, genre, record_company, tracklist, like_count) VALUES ?`, [queryValues], function (error, results, fields) {
        if (error) throw error;
            console.log('The solution is: ', results[0].solution);
        });
    connection.end();
    // finished = true;
});

// while (!finished) {
//     await new Promise(resolve => setTimeout(resolve, 5000));
// }