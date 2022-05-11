import {Bomb} from './bomb.js'
export class Player {
    constructor(x, y, cellSize, context, spritesheet, fire, extent, map, id, socket, active) {
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.context = context;
        this.spritesheet = spritesheet;
        this.fire = fire;
        this.extent = extent;
        this.explosion_activate = true;
        this.level = 1;
        this.life = 3;
        this.alive = true;
        this.active = active;

        this.map = map;
        this.id = id;

        this.socket = socket;
        console.log("new player id: " + this.id);

        this.bombs = [];
        this.bombs_number = 1;
      
        this.distance = 0.875;
        this.speed = 0.2;

        this.pressedKey = null;

    
       if(this.active){
        // EventListener mit bind
            document.addEventListener('keyup', this.handleKeyUp.bind(this));
            document.addEventListener('keydown', this.handleKeyDown.bind(this));
       }
    }
    
    handleKeyDown(event) {
        if (event.code === 'ArrowRight' ||
            event.code === 'ArrowLeft' ||
            event.code === 'ArrowUp' ||
            event.code === 'ArrowDown' ||
            event.code === 'Space') {
            this.pressedKey = event.code;
        }
    }

    
    handleKeyUp() { //player stops moving if no key is pressed
        if (this.alive) {
            if (this.pressedKey === 'Space'){ // pruft ob man eine bombe lassen kann
                //Send message about new bomb to server
                this.socket.emit('setBomb', {
                    x: Math.round(this.x),
                    y: Math.round(this.y),
                    level: this.level,
                    timer: 3
                 });
                //Add bomb locally
                this.map.bombs.push(new Bomb(Math.round(this.x), Math.round(this.y), this.spritesheet, this.fire, this.level, this.context, this.cellSize));
            }
        }
        this.pressedKey = null;
    }
    
    //drawing asset function for player
    drawAsset(spritex, spritey) {
        this.context.drawImage(
            this.spritesheet,
            spritex,
            spritey,
            142,
            137.7,
            this.x * this.cellSize,
            this.y * this.cellSize,
            this.cellSize,
            this.cellSize
            );
    }

    drawLife(lives) {
        if (lives >= 1) {
            this.context.drawImage(
                this.spritesheet,
                426,
                828,
                142,
                137.7,
                this.x * this.cellSize,
                this.y * this.cellSize,
                this.cellSize/3,
                this.cellSize/3
                );
            
            if (lives >= 2) {
                this.context.drawImage(
                    this.spritesheet,
                    426,
                    828,
                    142,
                    137.7,
                    this.x * this.cellSize+25,
                    this.y * this.cellSize,
                    this.cellSize/3,
                    this.cellSize/3
                    );
                if (lives >= 3) {
                    this.context.drawImage(
                        this.spritesheet,
                        426,
                        828,
                        142,
                        137.7,
                        this.x * this.cellSize+50,
                        this.y * this.cellSize,
                        this.cellSize/3,
                        this.cellSize/3
                        );
                }
            }
        }
    }


    draw(){
        if (this.alive) {

            this.drawLife(this.life);

            if (this.pressedKey == 'ArrowRight') {
                this.drawAsset(this.id*138.7 ,413.1)
              
            } else if (this.pressedKey == 'ArrowLeft') {
                this.drawAsset(this.id*139.5 , 275.4)
                
            } else if (this.pressedKey == 'ArrowUp') {
                this.drawAsset(this.id*138.2 ,550.8)
               
            } else if (this.pressedKey == 'Space') {
                this.drawAsset(this.id*138.5 , 137)  
            } else {
                //If player is not moving
                this.drawAsset(this.id*138.5 , 137)
            }
        } else {
            //If player is dead
            this.drawAsset(this.id*138.7 ,0)
        }            
    }

    update() {
        var speed = this.speed;    
      
        if (this.pressedKey === 'ArrowRight'){
            if (this.x < this.extent -2)    { 
                if (!this.collisionCheck(this.x+speed, this.y)) {
                    this.x += speed;
                }
            }
                 
        } else if (this.pressedKey === 'ArrowDown') {
            if (this.y < this.extent -2)    {//collision with down border
                if (!this.collisionCheck(this.x, this.y +speed)) {
                    this.y += speed;
                }
            }
        } else if (this.pressedKey === 'ArrowLeft'){
            if (this.x >1)    {//collision with right border
                if (!this.collisionCheck(this.x -speed, this.y)) {
                    this.x -= speed; 
                }
            }
        } else if (this.pressedKey === 'ArrowUp'){
            if (this.y >1)   {//collision with up border
                if (!this.collisionCheck(this.x, this.y -speed)) {
                    this.y -= speed;
                }
            }
        } else if (this.pressedKey === null){
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
        }   
    }

    collisionCheck(x, y) {
        if (!this.fieldIsFreeOf(x, y, this.map.solidBlocks)) {
            return true;
        
        } else if (!this.fieldIsFreeOf(x, y, this.map.destructibleBlocks)){
            return true;
        
        } else if (!this.fieldIsFreeOf(x, y, this.map.powerup)) {//checking if player collides with powerup
            let distance = this.distance;
            for (let i = 0; i < this.map.powerup.length; i++){ //checking every part of powerup array
                if (((this.map.powerup[i].x + distance) > x) && ((this.map.powerup[i].x - distance) < x)
                    && ((this.map.powerup[i].y + distance) > y) && (this.map.powerup[i].y - distance) < y){

                        this.map.powerup[i].triggerPowerUp(this);
                        // if checked powerup array is specific type, this type is triggered (implementation in class powerup)
                        this.socket.emit('powerup collected', {
                            x: this.map.powerup[i].x,
                            y: this.map.powerup[i].y
                            //type: this.map.powerup[i].type
                        })  
                        this.map.deletePowerUps(this.map.powerup[i].x, this.map.powerup[i].y)
                        return false;
                }     
            }
            
        } else {
            return false;
        }
    }


    fieldIsFreeOf(x, y, array) {
        let distance = this.distance;
        for (let i = 0; i < array.length; i++){
            if (((array[i].x + distance) > x) && ((array[i].x - distance) < x)
                && ((array[i].y + distance) > y) && (array[i].y - distance) < y){
                return false;
            }
        }
        return true;
    }

}