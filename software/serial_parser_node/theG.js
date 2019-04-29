const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const rl = require('readline');
const chalk  = require('chalk');
const log = console.log;

class serialTalker {
    constructor(port) {
        this.port = port;
        this.in = ''; 
        this.sp = '';
        this.parser = '';
        this.buffer = []; 
        this.vocabulary = require('../gRouter/vocabulary.json'); 
    }
    init() {
        this.sp = new SerialPort(this.port, {
            baudRate: 250000
        });
        this.parser = this.sp.pipe(new Readline({ delimiter: '\n' }))
        this.parser.on('data', (data) => {
            log(chalk.white.bgGreen.bold('Controller:') +' '+  data);
            if(data == 'ok'){
                if(this.buffer.length > 0){
                    let nextCmd = this.buffer.shift(); 
                    this.sp.write(nextCmd);
                    log(chalk.yellow(nextCmd));
                }
            }
        });
//handle input from terminal 
        this.in = rl.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });

        this.in.on('line', (input) => {
            let command = this.getCommand(input);
            if(command){
                log(chalk.white.bgGreen.bold('VOCAB->BUFFER:') + ' ' + command.name);
                command.gcode.forEach(g => {
                    this.buffer.push(g+'\n');
                }); 
            }

            if(input == 'send'){
                this.sp.write('G0 F2000\n')
            }
            if(input == 'buffer'){
                this.writeBuffer(); 
            }
            if(input == 'clean'){
                this.buffer = [];
                log(chalk.bold('buffer cleaned. Paranoia Check: ') + chalk.red.bold(this.buffer.length))
            }
            if(input == 'status'){
                log(chalk.bold('buffer length is ' + this.buffer.length));
            }
            if(input.charAt(0) == ':'){
                let command = input.slice(1,input.length);
                log(command); 
            }
        });
    }
    getCommand(command){
        for(let v of this.vocabulary){
            if(v.name.toLowerCase() === command.toLowerCase()) return v; 
        }
        return false; 
    }
}
const coms = new serialTalker('/dev/tty.usbmodem14201');

coms.init();
//coms.writeBuffer();