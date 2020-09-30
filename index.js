const io = require('socket.io')(5000);

const Observer = require('./observer');

let obserser = new Observer();
obserser.watchFolder('/home/maksym/Documents/Projects/browser-sync/server/');
obserser.watchFolder('/home/maksym/Documents/Projects/browser-sync/extentions/');

io.on('connect', () => {
    console.log("New client connected");
});

obserser.on('refresh', () => {
    io.emit('refresh', {})
})