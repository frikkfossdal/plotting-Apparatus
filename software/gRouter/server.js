const io = require('socket.io');
const fs = require('fs');

console.log('Server starting');
addVocabulary(); 

//boot sockets
const server = io.listen(8080);
var date = new Date();
server.on('connection', (socket) => {
    console.log('CONNECTION:', socket.client.id, 'TIME:', date);
    socket.emit('welcome', 'server ok');
    socket.on('test', (data) => { console.log(data); });
    socket.on('hello', (data) => { console.log(data); });
});


function parseCommand(command) {
    checkCommand(); // => add callback
    //sendCommand(); 
}
//checks if received command exists in vocabulary
function checkCommand(command) {

}

function sendSerial() {

}
//as in parse json file and put all 
function addVocabulary() {
    let obj;
    console.log('adding vocabulary');
    fs.readFile('vocabulary.json', 'utf8', (err, data) =>{
        if (err) { throw err; } else{
            obj = JSON.parse(data);
            console.log('vocabulary loaded');
        }
    });
}




//serial stream to machine
//needs logic to check which nodes are active