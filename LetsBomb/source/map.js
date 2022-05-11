import {Powerup} from './powerup.js'
export class Map {
    constructor(canvas, extent, spritesheet, fire, powerUps, context, socket) {
        this.canvas = canvas;
        this.extent = extent;

        //name of assets
        this.spritesheet = spritesheet;
        this.fire = fire;
        this.powerUps = powerUps;

        this.context = context;
        this.socket = socket; 

        this.cellSize = this.canvas.width / this.extent;
        
        this.solidBlocks = [];
        this.borderBlocks = [];
        this.powerup = [];
        this.destructibleBlocks = [];
        this.blocksToRemove = [];
        this.bombs = [];
    }
   
    generatePowerUps(powerupJSON) {
        for (let i = 0; i < powerupJSON.length; i++) {
            this.powerup.push(new Powerup(
                powerupJSON[i].x, 
                powerupJSON[i].y, 
                this.cellSize, 
                this.context, 
                this.powerUps,
                powerupJSON[i].type)
                );    
        }
    }

    deletePowerUps(x,y){
        for (let i = 0; i < this.powerup.length; i++) {
            if (this.powerup[i].x === x &&  this.powerup[i].y === y) {
                this.powerup.splice(i,1);
            }
        }
    }


    removeBlocks(blocksToRemove){
        for(let i=this.destructibleBlocks.length - 1; i>=0; i--){
            for( let j=0; j < blocksToRemove.length; j++){
                if(this.destructibleBlocks[i] && (this.destructibleBlocks[i].x === blocksToRemove[j].x) &&
                      (this.destructibleBlocks[i].y === blocksToRemove[j].y)){
                    this.destructibleBlocks.splice(i, 1);
                }
            }
        } 
    }


    checkIfCoordinateIsIncluded(coordinate, array){
        for (let i = 0; i < array.length; i++){
            if ((coordinate.x == array[i].x) && (coordinate.y == array[i].y)){
                return true;
            }
        }
        return false;
    }

    
    drawLine(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }
    
    drawGrid() {
        for(let i = 1; i < this.extent; i++) {
            this.drawLine(0, i * this.cellSize, this.canvas.width, i * this.cellSize);
            this.drawLine(i * this.cellSize, 0, i * this.cellSize, this.canvas.height);
        }
    }

    drawAll(a,b,c,d,xsize,ysize){
        
        this.context.drawImage(
            this.spritesheet,
            a,
            b,
            c,
            d,
            xsize,
            ysize,
            this.cellSize,
            this.cellSize
            ); 

    }
    
    drawfield(){
        for(let x = 0; x < this.extent; x++) {
            for (let y = 0; y < this.extent; y++) {
                this.drawAll(568,413.1,142,137.7,x*this.cellSize,y*this.cellSize)
            }
        }
    }
    drawSolidBlocks(){
        for (let i = 0; i < this.solidBlocks.length; i++) {
            this.drawAll(568,137.7,142,137.7,this.solidBlocks[i].x*this.cellSize,this.solidBlocks[i].y*this.cellSize)
       }
    }
    drawBorderBlocks(){
        for (let i=0; i< this.borderBlocks.length; i++)  {
            this.drawAll(568,550.8,142,137.7,this.borderBlocks[i].x*this.cellSize,this.borderBlocks[i].y*this.cellSize)
        }  
    }
    drawDestructibleBlocks(){
        for(let i = 0; i < this.destructibleBlocks.length; i++) {
            this.drawAll(568,275.4,142,137.7,this.destructibleBlocks[i].x*this.cellSize,this.destructibleBlocks[i].y*this.cellSize)   
        }
    }

    drawBombs() { 
        for (let i = 0; i < this.bombs.length; i++) {
            let bomb = this.bombs[i];
            for (let j = 0; j<5; j++){
                setTimeout(() => { 
                    bomb.drawAssetBomb(568,413.1);  //draw bomb
                }, 350); //timeout 350 ms
                bomb.drawAssetBomb(568,825);
            }
        }
    }

    drawExplosion(explosion){
        setTimeout(() => {
        for (let i = 0; i < explosion.length; i++) {
            this.context.drawImage(
                this.fire,
                0,
                0, 
                48,
                48,
                explosion[i].x*this.cellSize,
                explosion[i].y*this.cellSize,
                this.cellSize,
                this.cellSize
                );
        }      
    }, 300);}
}



