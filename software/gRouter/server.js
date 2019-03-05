const io = require('socket.io');

class Server {
    constructor(port) {
        this.port = process.env.PORT || port;  
        this.date = new Date(); 
        this.server = io.listen(this.port);
        this.vocabulary = require('./vocabulary.json');  
    }

    getCommand(command) {
        for(let v of this.vocabulary) {
            if (v.name.toLowerCase() === command.toLowerCase()) return v; 
        }
        return false;
    }

    sendSerial() {
        //Todo
    }

    parseCommand(command) {
        //Todo
    }

    start() {
        console.log("Starting server..")
        this.server.on('connection', (socket) => {
            console.log('CONNECTION:', socket.client.id, 'TIME:', this.date);
            socket.emit('welcome', 'server ok');

            socket.on('command', (data) => { 
                let command = this.getCommand(data); 
                !command ? socket.emit('feedback', "Command does not exists") : socket.emit('feedback', command.description); 
            });
        })
    }
}


const server = new Server(8080); 
server.start(); 