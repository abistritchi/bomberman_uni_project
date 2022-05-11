class Server {
    constructor() {
    const express = require('express');
    let app = express(); // listener
    let http = require('http').createServer(app);
    let io = require('socket.io')(http);

    const path = require('path');
    var favicon = require('serve-favicon')
    app.use(favicon(path.join(__dirname, 'source/Assets', 'bomb.png')))

    /**
     * As JavaScript paths work relatively from the executed file, we first to navigate from the
     * current path ('__dirname') one directory back ('..') and from there into the directory client ('client').
     */
    const clientPath = path.join(__dirname, 'source');

    app.use(express.static(clientPath))

    this.configureIo(io);

    http.listen(3000, () => {
        console.log(`Serving ${clientPath} on *:3000.`)
    });

    }

  configureIo(io) {
    let id = 0;
    let extent = 11;
    let serverMap = new ServerMap(extent);
    let players = [];
    let gameStarted = false;
    io.on('connection', socket => {
      if (!gameStarted) {
        if (id > 3) {
          id = 0;
        }
        
        if(id == 0){
          players[id] = new ServerPlayer(id, 1, 1, "Cat")
        }
        else if (id == 1) {
          players[id] = new ServerPlayer(id, 1, extent-2, "Chicken")
        } 
        else if (id == 2) {
          players[id] = new ServerPlayer(id, extent-2 , 1, "Fox")
        }
        else if (id == 3){
          players[id] = new ServerPlayer(id, extent-2 , extent-2, "Mouse")
        }
        console.log('Your Player is ' + players[id].name)

        socket.emit('newID', {
          id: id,
          x: players[id].x,
          y: players[id].y
        });

        let activePlayer = players[id];

        socket.on('StartGame', data =>{
          gameStarted = true;
          socket.emit('GameStarted', data);
          socket.broadcast.emit('GameStarted', data);
        });

        socket.on('fetchMap', data => {
          socket.emit('newMap', serverMap.toJSON());
        })
        

        socket.on('playerPos', data =>{
          activePlayer.x = data.x;
          activePlayer.y = data.y;
          socket.broadcast.emit('playerposNew', data)
        }); 

        socket.on('powerup collected', data =>{
          socket.broadcast.emit('powerup is gone', data);
          console.log('powerup is collected '+ data.x + data.y)
        });

        
        //A player set a new Bomb
        socket.on('setBomb', bombData =>{
          socket.broadcast.emit('newBomb', bombData);
          let lebomb = new ServerBomb(bombData.x, bombData.y, bombData.level, bombData.timer);
          lebomb.activateNewBomb(socket, serverMap.solidBlocks, extent, players);
          });

        //Increase id for next player
        id++;
      } else {
        socket.emit('GameInProgress');
        console.log("Joining denied");
      }
      }
    );
  }
}

class ServerPlayer {
  constructor(id, x, y, name) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.name = name;
  }
}



class ServerMap {
  constructor(extent) {
    this.extent = extent;
    this.solidBlocks = this.generateSolidBlocks(this.extent);
    this.borderBlocks = this.generateBorder(this.extent);
    this.destructibleBlocks = this.generateDestructibleBlocks(this.extent, this.solidBlocks, this.borderBlocks)
    this.powerup = this.generatePowerUps(this.extent, this.destructibleBlocks);
  }

  generateSolidBlocks(extent){
    let solidBlocks = [];

    for (let x = 2; x < extent-2; x += 2) {
        for (let y = 2; y < extent-2; y += 2) {
            solidBlocks.push({x: x, y: y});
        } 
    }
    return solidBlocks;
  }

  generateBorder(extent){
    let borderBlocks = [];
    for (let x = 0; x <  extent; x++) {
      for (let y = 0; y < extent; y++) {
        if ((y == 0) || (x == 0) || (x == extent - 1) || (y == extent - 1)){
            borderBlocks.push({x: x, y: y});  
        }
      } 
    }
    return borderBlocks;
  }

  generateDestructibleBlocks(extent, solidBlocks, borderBlocks){
    let destructibleBlocks = [];

    for (let x = 0; x <  extent; x++) {
      for (let y = 0; y < extent; y++) {
          let coordinate = {x: x, y: y};
          if (!(this.checkIfCoordinateIsIncluded(coordinate, solidBlocks) ||
              this.checkIfCoordinateIsIncluded(coordinate, borderBlocks))) {
              destructibleBlocks.push(coordinate);
          }
      } 
    }
    destructibleBlocks = this.removeBlocksfromStartposition(extent, destructibleBlocks);
    return destructibleBlocks;
  }

  generatePowerUps(extent, destructibleBlocks) {
    let powerUpNumber = Math.floor(extent / 3);//amount of powerups on canvas
    
    let powerUpTypes = ["speed", "god", "life", "bomblevel"]// array of powerup types without "bombextra"
    
    let powerup = [];
    for (let i = 0; i < powerUpTypes.length; i++) {
      for (let j = 0; j < powerUpNumber; j++) {
        let poweruppostion = Math.floor(Math.random() * Math.floor(destructibleBlocks.length-1));
            powerup.push(new ServerPowerup(
            destructibleBlocks[poweruppostion].x, 
            destructibleBlocks[poweruppostion].y, 
            powerUpTypes[i])
        ); 
      }
    }
    return powerup;
  }

 
  removeBlocksfromStartposition(extent, destructibleBlocks){ 
    let toRemove = [
      //destructible obsticles upper left corner
      {x: 1, y: 1},
      {x: 1, y: 2},
      {x: 2, y: 1},
      //destructible obsticles bottom left corner
      {x: 1, y: extent-2},
      {x: 1, y: extent-3},
      {x: 2, y: extent-2},
      //destructible obsticles upper right corner
      {x: extent-2 , y: 1},
      {x: extent-3 , y: 1},
      {x: extent-2 , y: 2},
      //destructible obsticles bottom right corner
      {x: extent-2 , y:  extent-2}, 
      {x: extent-2 , y:  extent-3}, 
      {x: extent-3 , y:  extent-2}

    ];
    
    for( let i=destructibleBlocks.length - 1; i>=0; i--){
      for( let j=0; j < toRemove.length; j++){
            if(destructibleBlocks[i] && (destructibleBlocks[i].x === toRemove[j].x) &&
              (destructibleBlocks[i].y === toRemove[j].y)){
          destructibleBlocks.splice(i, 1);
        }
      }
    }

    return destructibleBlocks;    
  }

  checkIfCoordinateIsIncluded(coordinate, array){
    for (let i = 0; i < array.length; i++){
        if ((coordinate.x == array[i].x) && (coordinate.y == array[i].y)){
            return true;
        }
    }
    return false;
  }

  toJSON() {
    //generate powerup JSON object
    let powerupJSON = [];
    for (let i = 0; i < this.powerup.length; i++) {
      let pow = 
      { x: this.powerup[i].x,
        y: this.powerup[i].y,
        type: this.powerup[i].type }

      powerupJSON.push(pow);
    }
    let obj = {
      solidBlocks: this.solidBlocks,
      borderBlocks: this.borderBlocks,
      destructibleBlocks: this.destructibleBlocks,
      powerups: powerupJSON
    }
    return obj;
  }

}

class ServerBomb {
  constructor(x, y, level, timer) {
    this.x = x;
    this.y = y;
    this.level = level;
    this.timer = timer;
  }

  activateNewBomb(socket, solidBlocks, extent, players) {
    //Set timeout for explosion
    setTimeout(() => {
      //Calculate exploded fields
      let explosionarray = this.bombExplosion(solidBlocks, extent);
      
      //Calculate damaged players
      let damagedPlayers = [];
      for (let i = 0; i < players.length; i++) {
        if(!this.fieldIsFreeOf(players[i].x, players[i].y, explosionarray)) {
          damagedPlayers.push(players[i].id);
        }
      }

      let obj = {
        explosion: explosionarray,
        damagedPlayers: damagedPlayers,
        bomb: {x: this.x,
              y: this.y} 
        }
      socket.emit('boom', obj);
      socket.broadcast.emit('boom', obj);
    }, this.timer * 1000);
  }

  bombExplosion(solidBlocks, extent){
    //Explode middle block
    let explosion = [];
    explosion.push({x:this.x, y:this.y});

    for (let i = 1; i <= this.level; i++){
        //Expolode in -x direction
        if (this.fieldIsFreeOf(this.x-i, this.y, solidBlocks)){
            if (this.x > 1){
                if (this.x-i+1 > 1 && this.fieldIsFreeOf(this.x-i+1, this.y, solidBlocks)){
                    explosion.push({x:this.x-i, y:this.y});
                }
            }
        } 
        //Expolode in +x direction
        if (this.fieldIsFreeOf(this.x+i, this.y, solidBlocks)){
            if (this.x < extent -2)    {
                if (this.x+i-1 < extent -2 && this.fieldIsFreeOf(this.x+i-1, this.y, solidBlocks)){
                    explosion.push({x:this.x+i, y:this.y});
                }
            }
        }
        
        //Expolode in -y direction
        if (this.fieldIsFreeOf(this.x, this.y-i, solidBlocks)) {
            if (this.y >1)   {
                if (this.y-i+1 >1 && this.fieldIsFreeOf(this.x, this.y-i+1, solidBlocks)) {
                    explosion.push({x:this.x, y:this.y-i});
                }
            }
        }
        
        //Explode in +y direction  
        if (this.fieldIsFreeOf(this.x, this.y+i, solidBlocks)) {  
            if (this.y < extent -2)    {
                if (this.y+i-1 < extent -2 && this.fieldIsFreeOf(this.x, this.y+i-1, solidBlocks)) {
                    explosion.push({x:this.x, y:this.y+i});
                }
            }  
        }
    }
    return explosion;
  }

  fieldIsFreeOf(x, y, array) {
    let distance = 0.8; //Hardcoded
    for (let i = 0; i < array.length; i++){
        if (((array[i].x + distance) > x) && ((array[i].x - distance) < x)
            && ((array[i].y + distance) > y) && (array[i].y - distance) < y){
            return false;
        }
    }
    return true;
  }
}

class ServerPowerup {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
}

new Server();