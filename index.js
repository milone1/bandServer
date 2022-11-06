const express = require('express');
const path = require('path');
require('dotenv').config();
//* app express
const app = express();
//* node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./socket/socket.js');
//* path public 
//* apunta a donde sea que este montado el servidor.
const publicPath = path.resolve( __dirname, 'public' );
app.use(express.static(publicPath));
server.listen(process.env.PORT, ( err ) => {
    if( err ) throw new Error(err);
    console.log('Corriendo en el puerto!!!! ',process.env.PORT);
});