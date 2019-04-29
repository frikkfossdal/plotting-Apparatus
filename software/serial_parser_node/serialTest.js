const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const vocabulary = require('../gRouter/vocabulary.json');

console.log(vocabulary[1].gcode);

const port = new SerialPort('/dev/tty.usbmodem14201', {
    baudRate: 250000
})
const parser = new Readline();
port.pipe(parser)

parser.on('data', function (data) {
    console.log(data);
    if (data == 'ok') {
        let x = Math.random()*100; 
        let y = Math.random()*200; 
        port.write('G0 X' + x + ' Y'+y +'\n');
    }
});

setInterval(()=>{port.write('G0 X0 Y0 \n');}, 1000); 

//write logic 

function sendCommand(message) {
    port.write(String(message + '\n'))
}
//read logic
