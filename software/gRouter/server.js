const io = require('socket.io');
const serial = require('serialport')

class Server {
    constructor(port) {
        this.port = process.env.PORT || port;  
        this.date = new Date(); 
        this.server = io.listen(this.port);
        this.vocabulary = require('./vocabulary.json');  
    }

    /**
     * 
     * @param {command} Name of the command
     * @returns The command object if it exists, otherwise return false
     */
    getCommand(command) {
        for(let v of this.vocabulary) {
            if (v.name.toLowerCase() === command.toLowerCase()) return v; 
        }
        return false;
    }

    sendSerial() {
        //Todo
        //Put packet in buffer
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
                //Get command if it exists, otherwise false
                let command = this.getCommand(data); 
                console.log(command);

                if(command) 
                    socket.emit('feedback', command.description)
                else 
                    socket.emit('feedback', "Command does not exist");
                


            });
        })
    }
}


const server = new Server(8080); 
server.start(); 