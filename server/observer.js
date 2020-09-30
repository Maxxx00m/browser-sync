const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;

class Observer extends EventEmitter {
    constructor() {
        super();
        this.debug = false
    }

    watchFolder(folder) {
        console.log("Watching folder: " + folder);
        let watcher = chokidar.watch(folder, {persistent: true});

        watcher
            .on('add', path => {
                this.log(`File ${path} has been added`);
                this.emit('refresh');
            })
            .on('change', path => {
                this.log(`File ${path} has been changed`);
                this.emit('refresh');
            })
            .on('unlink', path => {
                this.log(`File ${path} has been removed`);
                this.emit('refresh');
            });
    }

    log(message) {
        if (this.debug) {
            console.log(message);
        }
    }
}

module.exports = Observer