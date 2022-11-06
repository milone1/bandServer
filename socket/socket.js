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
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands);
    });
    client.on('add-band', (payload) => {    
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });
    client.on('delete-band', (payload) => {    
        bands.deleteBand(payload.id)
        io.emit('active-bands', bands.getBands());  
    });
});