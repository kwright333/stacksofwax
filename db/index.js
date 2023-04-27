let mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const connectionOptions = {
    host: 'localhost',
    user: 'root',
    database: '40079955',
    port: 3306,
    charset: 'utf8mb4'
};

if (process.env.MYSQL_PASSWORD) {
    connectionOptions.password = process.env.MYSQL_PASSWORD;
}

var connection = mysql.createConnection(connectionOptions);
const sessionStore = new MySQLStore({}, connection);
connection.connect();


exports.executeQuery = async function(query, values) {
    return await new Promise((resolve, reject) => {
        connection.query(query, values, function (error, results, fields) {
            if (error) reject(error);
            if (process.env.LOG_LEVEL === 'debug')
                console.log('The solution is: ', results);
            resolve(results);
        });
    })
}

exports.executeQueryWithCallback = function(query, values, cb) {
    return connection.query(query, values, cb);
}

exports.createSession = function() {
    return session({
        key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    });
}