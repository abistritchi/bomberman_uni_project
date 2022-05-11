import {Game} from './game.js'
export class Startscreen {
    constructor(canvas, extent, assets, socket) {
        console.log("new Startscreen drawn");
        this.canvas = canvas;
        this.socket = socket;
        this.context = this.canvas.getContext('2d');
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.centerText(this.context, "If you are ready to play press SPACE", 300);

        this.socket.on('GameStarted', data =>{
            document.removeEventListener('keyup', handleKeyUp);
            new Game(canvas, extent, assets, socket);
        });
    
        document.addEventListener('keyup', handleKeyUp);

        function handleKeyUp(event) {
            if (event.code === 'Space') {
                socket.emit("StartGame", {});
            }
        }
        this.playerName();
    }


    centerText(ctx, text, y) {
        ctx.font = "40px Arial";
        let measurement = ctx.measureText(text);
        let x = (ctx.canvas.width - measurement.width) / 2;
        ctx.fillText(text, x, y);
    }

    playerName(){
        let name = window.prompt("What is your name?");

        let playerType;
        if(this.socket.playerID == 0){
            playerType ="CAT :)";
        }
        else if (this.socket.playerID == 1) {
            playerType ="CHICKEN :)";
        } 
        else if (this.socket.playerID == 2) {
            playerType ="FOX :)";
        }
        else if (this.socket.playerID == 3){
            playerType ="MOUSE :)";
        }

        else {
            playerType ="too late!";
        }

        if (name) {
            alert("Welcome to LetsBomb " + name + "! Your Player is " + playerType);
            }
        }
    
}