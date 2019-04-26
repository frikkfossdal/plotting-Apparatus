const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');


class serialTalker {
    constructor(port) {
        this.port = port;
        this.sp = '';
        this.parser = '';
        this.state = 1;
        this.vocabulary = require('../gRouter/vocabulary.json');
    }
    init() {
        this.sp = new SerialPort(this.port, {
            baudRate: 250000
        });
        this.parser = this.sp.pipe(new Readline({ delimiter: '\n' }))
        this.parser.on('data', (data) => {
            console.log('from controller: ' + data);
        });
    }
    async executePck(pck) {
        console.log('executing from vocab: ' + this.vocabulary[pck].name);
        let gBuffer = this.vocabulary[pck].gcode;
        while (gBuffer.length != 0) {
            let msg = gBuffer.shift();
            console.log(msg);
        }
    }


    randomG() {
        let x = (Math.random() * 100).toFixed(2);
        let y = (Math.random() * 200).toFixed(2);
        let coord = 'G0 X' + x + ' Y' + y + ' F2000';
        return coord;
    }

    async main() {
        //logic
        //send something 
        //wait for response
        //if ok, continue 
        //if not, send again 
        await this.init();
        await coms.executePck(1);
    }
}
const coms = new serialTalker('/dev/tty.usbmodem14201');

coms.init();
coms.executePck(1);
//coms.pckExe(2);


