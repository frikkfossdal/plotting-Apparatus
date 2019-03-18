//client program for talking and sending commands to server 
const readline = require('readline');
const io = require('socket.io-client'); 

console.log('Client starting');

//boot sockets
const client = io.connect('http://localhost:8080');

client.on('feedback', (message) => {
    console.log("From server:",message);
});

client.on('welcome', (message)=>{
	console.log(message);
}); 

//handle user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (input) => {
    client.emit('command', input);
});
