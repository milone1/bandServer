const { io } = require('../index.js');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');
const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Amarantos'));
bands.addBand(new Band('Justicy'));
bands.addBand(new Band('Metall'));
//* Message sockets
io.on('connection',client => {
    client.emit('active-bands', bands.getBands());
    client.on('disconnect', () => {
        console.log('Cliente desconectado.')
    });
    client.on('mensaje', (payload) => {
        console.log('mensaje:', payload);
        io.emit('mensaje',{admin: 'Soy nuevo'})
    });
    client.on('emitir-mensaje', (payload) => {
        io.broadcast.emit('nuevo-mensaje', payload);
    });

});