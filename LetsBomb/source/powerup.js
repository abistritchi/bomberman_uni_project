
export class Powerup{
    constructor(x, y, cellSize, context, powerUps, type, map) {
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.context = context;
        this.powerUps = powerUps;
        this.type = type;
        this.map = map;
    }
    

    drawPowerUps(){
        if (this.type === "speed") { // speed := faster for 10s
            this.drawAsset(270, 0);               
        } else if (this.type === "life") { // life =: extra life
            this.drawAsset(405, 0);           
        }else if (this.type === "bomblevel") { // bomblevel := increases the range of explosions for 10s
            this.drawAsset(135, 0);             
        }else if (this.type === "god"){  // god = invulnerability for 10s
            this.drawAsset(810, 0);
        }
    }



    triggerPowerUp(player) {
        if (this.type === "speed") { // speed := faster for 10s
            console.log("increased speed");
            this.increaseSpeed(player); 
            //function increaseSpeed is triggered after player collides with object (collision function implemented in player)             
        } else if (this.type === "life") { // life =: extra life
            this.addLife(player);
        }else if (this.type === "bomblevel") { // bomblevel := increases the range of explosions for 10s
            player.level += 1;
            setTimeout(() => {player.level = 1},10000);         
        }else if (this.type === "god"){  // god = invulnerability for 10s
            let local_life = player.life;
            player.life = 10;
            player.level += 1;
            setTimeout(() => {player.level = 1; player.life = local_life},10000);
        }
    }


  
    drawAsset(spritex, spritey) {
        this.context.drawImage(
            this.powerUps,
            spritex,
            spritey,
            135,
            125,
            this.x*this.cellSize + 16,
            this.y*this.cellSize + 16,
            40,
            40          
        );
    }


    increaseSpeed(player){
        player.speed = player.speed * 1.4;
        const start_bomb = Date.now();
        setTimeout(() => { 
        const millis = Date.now() - start_bomb;
        player.speed = player.speed / 1.4;
        }, 10000);
    }

    addLife(player){
        player.life += 1;
    
     
    }
}