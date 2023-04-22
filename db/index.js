let mysql = require('mysql');

const connectionOptions = {
    host: 'localhost',
    user: 'root',
    database: 'stacks_of_wax',
    port: 3306
};

if (process.env.MYSQL_PASSWORD) {
    connectionOptions.password = process.env.MYSQL_PASSWORD;
}

var connection = mysql.createConnection(connectionOptions);
connection.connect();

exports.executeQuery = async function(query) {
    return await new Promise((resolve, reject) => {
        connection.query(query, function (error, results, fields) {
            if (error) reject(error);
            console.log('The solution is: ', results);
            resolve(results);
        });
    })
}