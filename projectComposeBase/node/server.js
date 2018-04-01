'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000, host: '0.0.0.0' });

//Initialize the mysql variable and create the connection object with necessary values
//Uses the https://www.npmjs.com/package/mysql package.
var mysql      = require('mysql');
var connection = mysql.createConnection({

    //host will be the name of the service from the docker-compose file. 
    host     : 'mysql',
    user     : 'mark',
    password : 'abc123',
    database : 'cse3330'
});


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log('Server processing a / request');
        reply('Hello, world!');
    }
});

//A new route to test connectivity to MySQL
server.route({
    method: 'GET',
    path: '/getData',
    handler: function (request, reply) {
        console.log('Server processing a /getData request');

        //Creates the connection
        connection.connect();

        //Does a simple select, not from a table, but essentially just uses MySQL
        //to add 1 + 1.
        //function (error, results, fields){...} is a call-back function that the
        //MySQL lib uses to send info back such as if there was an error, and/or the
        //actual results.
        connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
            if (error)
                throw error;
            //Sends back to the client the value of 1 + 1
            reply ('The solution is ' + results[0].solution);

            //for exemplar purposes, stores the returned value in a variable to be
            //printed to log
            var solution = results[0].solution;
            console.log('The solution is: ', solution);
        });
        //close the connection to MySQL
        connection.end();
    }
});


server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        console.log('Server processing /name request');
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
