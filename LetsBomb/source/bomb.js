export class Bomb{
    constructor(x, y, spritesheet, fire, level,  context, cellSize){
    this.x = Math.round(x);
    this.y = Math.round(y);
    
    
    this.spritesheet = spritesheet;
    this.fire = fire;
    
    
    this.level = level;//explosionrange
    
    this.context = context; 
    this.cellSize = cellSize;
         
    //this.number = 0;
    //this.timer = 0;

    this.explosion =[];
    }

    
    drawAssetBomb(bomb_x, bomb_y){
        this.context.drawImage(
            this.spritesheet,
            bomb_x,
            bomb_y, 
            142,
            137.7,
            this.x*this.cellSize+5,
            this.y*this.cellSize+5,
            this.cellSize-10,
            this.cellSize-10
            );
    }

}