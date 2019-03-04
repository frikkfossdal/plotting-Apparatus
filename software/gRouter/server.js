const io = require('socket.io'); 

console.log('Server starting'); 

//boot sockets
const server = io.listen(8080); 
var date = new Date(); 
server.on('connection', (socket)=>{
	console.log('CONNECTION:', socket.client.id, 'TIME:',  date);
	socket.emit('welcome', 'server ok'); 
	socket.on('test', (data)=>{console.log(data);});
	socket.on('hello', (data)=>{console.log(data);});
});


function parseCommand(command){
	checkCommand(); // => add callback
	//sendCommand(); 
}
//checks if received command exists in vocabulary
function checkCommand(command){

}




//serial stream to machine
//needs logic to check which nodes are active 