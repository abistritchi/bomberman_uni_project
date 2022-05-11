import {Player} from './player.js'
import {Map} from './map.js'
import {Bomb} from './bomb.js'
//import {PlayerState} from './playerstate.js';

export class Game {
    constructor(canvas, extent, assets, socket) {
        console.log("new Game started");
        this.canvas = canvas;
        this.extent = extent;

        // spritesheets
        this.fire = assets.fire;
        this.powerUps = assets.powerUps;
        this.spritesheet = assets.spritesheet;
        
        this.socket = socket;
        
        this.context = this.canvas.getContext('2d');
        this.cellSize = this.canvas.width / this.extent;
        
        
        this.map = new Map(this.canvas, this.extent, this.spritesheet, this.fire, this.powerUps, this.context, this.socket);
        //this.playerstate = new PlayerState(document.getElementById('lifeCanvas'), this.spritesheet, this.canvas.getContext('2d'))


        
        //Create own player
        this.self = new Player(socket.startx, socket.starty, this.cellSize, this.context, 
            this.spritesheet, this.fire, this.extent, this.map,  this.socket.playerID, this.socket, true)
        
        this.player = [];
        this.player.push(this.self);

    
        //Never set under 30, too high load for some laptops
        this.activateListeners();
        this.socket.emit('fetchMap');
        setInterval(this.loop.bind(this), 60);   
    }

    getPlayer(id) {
        for (let i = 0; i < this.player.length; i++){
            if (this.player[i].id == id){
                return this.player[i]
            }
        }
        return false
    }

    
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.drawfield();
        for (let i = 0; i < this.player.length; i++){         
            this.player[i].draw(); 
        }
        this.map.drawBorderBlocks();
        this.map.drawGrid();
        this.map.drawSolidBlocks();

        for (let i = 0; i < this.map.powerup.length; i++) {
            this.map.powerup[i].drawPowerUps();
        }

        this.map.drawDestructibleBlocks();
        this.map.drawBombs();
    }

    update() {

        //Update own player motion
        if (this.self.alive) {
            this.self.update();
        }
        
         
        //Send own player position
        this.socket.emit("playerPos", {
            x: this.self.x, 
            y: this.self.y, 
            pressedKey: this.self.pressedKey,
            id: this.self.id,
            life: this.self.life
        });
       
    }

    activateListeners() {

        //Listen for new player position updates
        this.socket.on('playerposNew', data =>{
            let activePlayer = this.getPlayer(data.id);
            //Check if player already existed, create new if needed
            if (!activePlayer) {
                this.player.push(new Player(data.x, data.y, this.cellSize, this.context, 
                    this.spritesheet, this.fire, this.extent, this.map, data.id, this.socket, false));
                //Then set activePlayer again to actually get a player
                activePlayer = this.getPlayer(data.id);
            }

            activePlayer.x = data.x;
            activePlayer.y = data.y;
            activePlayer.pressedKey = data.pressedKey;
            activePlayer.life = data.life;
        });


        //Initial map sent by server
        this.socket.on('newMap', newMapData => {
            this.map.solidBlocks = newMapData.solidBlocks;
            this.map.borderBlocks = newMapData.borderBlocks;
            this.map.destructibleBlocks = newMapData.destructibleBlocks;
            this.map.generatePowerUps(newMapData.powerups);
        });


        
        this.socket.on('powerup is gone', data =>{
            for(let i = 0; i < this.map.powerup.length; i++) {
                if (this.map.powerup[i].x == data.x && this.map.powerup[i].y == data.y) {
                    this.map.deletePowerUps(this.map.powerup[i].x, this.map.powerup[i].y)
                }
            } 
        });


        this.socket.on('newBomb', bombData =>{
            this.map.bombs.push(new Bomb(
                bombData.x, 
                bombData.y,  
                this.spritesheet, 
                this.fire, 
                bombData.level, 
                this.context, 
                this.cellSize));
            console.log("new bomb from other player set");
        });

       

        //A bomb exploded
        this.socket.on('boom', boomData =>{
            for (let i = 0; i < this.map.bombs.length; i++) {    
                let bomb = this.map.bombs[i];
                if (bomb.x == boomData.bomb.x && bomb.y == boomData.bomb.y) {
                    this.map.bombs.splice(i,1);
                }
            }
            this.map.drawExplosion(boomData.explosion);

            for (let i = 0; i < boomData.damagedPlayers.length; i++) {
                let damagedPlayer = this.getPlayer(boomData.damagedPlayers[i]);
                
                damagedPlayer.life -= 1;
                
                if (damagedPlayer.life <= 0) {
                    damagedPlayer.alive = false;
                    //Check if you are dead
                    if (damagedPlayer.id == this.self.id) {
                        alert("You Lost");
                    }
                    let numberOfDead = 0;
                    for(let j = 0; j < this.player.length; j++) {
                        if (!this.player[j].alive) {
                            numberOfDead += 1;
                        }
                    }
                    if ((numberOfDead >= (this.player.length - 1)) && this.self.alive) {
                        alert("You Won!");
                    }
                }
                
            }
            this.map.removeBlocks(boomData.explosion);
        });
    }

    loop() {
        this.update();
        this.draw();
    }
}
