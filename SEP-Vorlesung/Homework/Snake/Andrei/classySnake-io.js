class SnakeHead {
    constructor(x, y, pressedKey, cellSize, context, assets, spritePositions) {
        this.x = x;
        this.y = y;
        this.assets = assets;
        this.pressedKey = pressedKey;
        this.cellSize = cellSize;
        this.context = context;
        this.spritePositions = {
            ArrowUp: {
               x: 0,
               y: 0,
            },
            
           ArrowDown: {
               x: 96,
               y: 0,
           },
           
           ArrowLeft: {
               x: 144,
               y: 0,
           },
           
           ArrowRight: {
               x: 48,
               y: 0,
           },
       };


        // EventListener mit bind
        document.addEventListener('keyup', this.handleKeyUp.bind(this))

        // EventListener mit Arrow-Funktion
        // document.addEventListener('keyup', event => {
        //     this.handleKeyUp(event);
        // });
    }

    handleKeyUp(event) {
        if (event.code === 'ArrowRight' ||
            event.code === 'ArrowLeft' ||
            event.code === 'ArrowUp' ||
            event.code === 'ArrowDown') {
            this.pressedKey = event.code;
        }
    }
    
    draw() {
        if (this.pressedKey == 'ArrowRight') {
            this.context.drawImage(
                this.assets,
                this.spritePositions.ArrowRight.x,
                this.spritePositions.ArrowRight.y,
                48,
                48,
                this.x * this.cellSize,
                this.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );
        }else if (this.pressedKey == 'ArrowLeft') {
            this.context.drawImage(
                this.assets,
                this.spritePositions.ArrowLeft.x,
                this.spritePositions.ArrowLeft.y,
                48,
                48,
                this.x * this.cellSize,
                this.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );
        }else if (this.pressedKey == 'ArrowUp') {
            this.context.drawImage(
                this.assets,
                this.spritePositions.ArrowUp.x,
                this.spritePositions.ArrowUp.y,
                48,
                48,
                this.x * this.cellSize,
                this.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );
        }else if (this.pressedKey == 'ArrowDown') {
            this.context.drawImage(
                this.assets,
                this.spritePositions.ArrowDown.x,
                this.spritePositions.ArrowDown.y,
                48,
                48,
                this.x * this.cellSize,
                this.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );


        }

        this.context.drawImage(
            this.assets,
            this.spritePositions.x,
            this.spritePositions.y,
            48,
            48,
            SnakeHead.x * this.cellSize,
            SnakeHead.y * this.cellSize,
            this.cellSize,
            this.cellSize
        );
        //this.context.fillStyle = 'yellow';
        //this.context.fillRect(this.x * this.cellSize, this.y * this.cellSize, this.cellSize, this.cellSize);

       
    }

    update() {
        if (this.pressedKey === 'ArrowRight') {
            this.x += 1;
        } else if (this.pressedKey === 'ArrowDown') {
            this.y += 1;
        } else if (this.pressedKey === 'ArrowLeft') {
            this.x -= 1;
        } else if (this.pressedKey === 'ArrowUp') {
            this.y -= 1;
        }
    }

}
//main class
class Game {
    constructor(canvas, extent, assets) {
        this.canvas = canvas;
        this.assets = assets;
        this.context = this.canvas.getContext('2d');
        this.extent = extent;
        this.cellSize = this.canvas.width / this.extent;
        this.gameover = false;
        this.snakehead = new SnakeHead(2, 3, 'ArrowRight', this.cellSize, this.context, this.assets, this.spritePositions);
        
        this.apple = new Apple(Math.floor((Math.random() * this.extent)), Math.floor((Math.random() * this.extent)), this.cellSize, this.context, this.assets);
       
        //this.context.drawImage(this.assets, 10, 10);

        //this.snakesegment = new SnakeSegment (3, 4, this.cellSize, this.context);
        this.snakearray = [
            this.snakehead
        ];
        
        setInterval(this.loop.bind(this), 500);  
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

    drawfield(){
        for(let x = 0; x < this.extent; x++) {
            for (let y = 0; y < this.extent; y++) {
                this.context.drawImage(
                    this.assets,
                    144,
                    144,
                    48,
                    48,
                    x*this.cellSize,
                    y*this.cellSize,
                    this.cellSize,
                    this.cellSize
                    ); 
            }
        }
    }

    drawAsset(i, spritex, spritey) {
        this.context.drawImage(
            this.assets,
            spritex,
            spritey,
            48,
            48,
            this.snakearray[i].x*this.cellSize,
            this.snakearray[i].y*this.cellSize,
            this.cellSize,
            this.cellSize
            );
    }
    
    draw() {
            if (this.gameover === false){
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);                     
                    //this.context.fillStyle = 'red';
                    //this.context.fillRect( this.x*this.cellSize, this.y*this.cellSize, this.cellSize, this.cellSize);
                }
            this.drawfield();
            this.drawGrid();
            this.snakehead.draw();
            this.apple.draw();
        
            //drawing snake sprites
            for(let i = 0; i < (this.snakearray.length -1); i++){
                if (i == 0) {
                    //implementing tail sprite going up
                    if (this.snakearray[i].x == this.snakearray[i + 1].x) {
                        if (this.snakearray[i].y > this.snakearray[i + 1].y) {
                            this.drawAsset(i, 0, 48);
                        } else {
                        //implementing tail sprite going down
                            this.drawAsset(i, 96, 48);
                        }
                    }
                    //implementing tail sprite going left
                    if (this.snakearray[i].y == this.snakearray[i + 1].y)   {
                        if (this.snakearray[i].x > this.snakearray[i + 1].x) {
                            this.drawAsset(i, 144, 48);
                        } else {
                        //implementing tail sprite going right
                        this.drawAsset(i, 48, 48);
                        }
                    }
                   
                }else{
                //snake body part up/down
                    if (this.snakearray[i].x == this.snakearray[i + 1].x && this.snakearray[i].x == this.snakearray[i - 1].x)   {
                        this.drawAsset(i, 0, 144);
                    //snake body sprite left/right
                    } else if (this.snakearray[i].y == this.snakearray[i + 1].y && this.snakearray[i].y == this.snakearray[i - 1].y) {
                        this.drawAsset(i, 48, 144);
                        } else {
                            if (this.snakearray[i].x == this.snakearray[i-1].x) {
                                //Same column with tailing part
                                if (this.snakearray[i].y < this.snakearray[i-1].y) {
                                    //Moving upwards
                                    if (this.snakearray[i].x < this.snakearray[i+1].x) {
                                        //Going right
                                        this.drawAsset(i, 48, 96);
                                    } else {
                                        //Going left
                                        this.drawAsset(i, 96, 96);
                                    }
                                } else {
                                    //Moving downwards
                                    if (this.snakearray[i].x < this.snakearray[i+1].x) {
                                        //Going left
                                        this.drawAsset(i, 0, 96);
                                    } else {
                                        //Going right
                                        this.drawAsset(i, 144, 96);
                                    }                            
                                }       
                            } else {
                                //Same row with tailing part
                                if (this.snakearray[i].x < this.snakearray[i-1].x) {
                                    //Moving left
                                    if (this.snakearray[i].y < this.snakearray[i+1].y) {
                                        //Going down
                                        this.drawAsset(i, 48, 96);
                                    } else {
                                        //Going up
                                        this.drawAsset(i, 0, 96);
                                    }
                                } else {
                                    //Moving right
                                    if (this.snakearray[i].y < this.snakearray[i+1].y) {
                                        //Going down
                                        this.drawAsset(i, 96, 96);
                                    } else {
                                        //Going up
                                        this.drawAsset(i, 144, 96);
                                    }                            
                                }      
                            }
                        }   
                    

                }
            }             
    }

    

    

//Check for collision with apple
    applecollision(lastx, lasty){
        if (this.snakehead.x == this.apple.x && this.snakehead.y == this.apple.y) {
            
            let newsegment = new SnakeSegment(lastx, lasty, this.cellSize, this.context, this.assets);
            this.snakearray.unshift(newsegment);

            let x = Math.floor(Math.random()* Math.floor(this.extent));
            let y = Math.floor(Math.random()* Math.floor(this.extent));
            
            if ( this.snakearray.some(elem => (elem.x ===x && elem.y ==y))){
                this.applecollision();
            } else {
                this.apple.x = x;
                this.apple.y = y;
            }
        }
    }

//Check for collision with apple
    bordercollision(){
        if (this.snakehead.y >= this.extent) {this.snakehead.y = 0;}
        if (this.snakehead.y < 0) {this.snakehead.y = this.extent-1;}
        if (this.snakehead.x >= this.extent) {this.snakehead.x = 0;}
        if (this.snakehead.x < 0) {this.snakehead.x = this.extent-1;}
    }

 //Checking for collision with snake body

 snakecollision(){

    for (let i=1; i<this.snakearray.length-1; i++){
        if (this.snakehead.x == this.snakearray[i].x && this.snakehead.y == this.snakearray[i].y) {
            this.gameover = true;
        }
    }
}


//execution path
    update() {
        //save last x and y coordinates from last segment
        let lastx = this.snakearray[0].x
        let lasty = this.snakearray[0].y

        this.moveSnake();
        this.snakehead.update();
        this.applecollision(lastx, lasty);
        this.bordercollision();
        this.snakecollision();
    }

    moveSnake() {
        for(let i = 0; i < (this.snakearray.length -1); i++){
            this.snakearray[i].x = this.snakearray[i+1].x;
            this.snakearray[i].y = this.snakearray[i+1].y;
        }
        
    }
   
    
    loop() {
        this.update();
        if (this.gameover === true) {
            clearInterval (this.interval);

            if (this.snakearray.length = 99) {
                window.alert('You win! ');
                return;
            }else{
                window.alert('Game Over! \n You ate '+(this.snakearray.length-1)+' rabbits');
                return;
            }
        }
    
        this.draw();
    }
}

class Apple{
    constructor(x, y, cellSize, context, assets) {
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.context = context;
        this.assets = assets;
        

    }

    draw() {
        this.context.drawImage(
        this.assets,
        96,
        144,
        48,
        48,
        this.x*this.cellSize,
        this.y*this.cellSize,
        this.cellSize,
        this.cellSize
        );
        //this.context.fillStyle = 'red';
        //this.context.fillRect( this.x*this.cellSize, this.y*this.cellSize, this.cellSize, this.cellSize);
    }
    
}

class SnakeSegment{
    constructor(x, y, cellSize, context, assets) {
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.context = context;
        this.assets = assets;
    }
    draw() {
        this.context.fillStyle = 'black';
        this.context.fillRect( this.x*this.cellSize, this.y*this.cellSize, this.cellSize, this.cellSize);
    }
}

class AssetLoader {
    loadAsset(name, url) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.addEventListener('load', function() {
          return resolve({ name, image: this });
        });
      });
    }
  
    loadAssets(assetsToLoad) {
      return Promise.all(
        assetsToLoad.map(asset => this.loadAsset(asset.name, asset.url))
      )
        .then(assets =>
          assets.reduceRight(
            (acc, elem) => ({ ...acc, [elem.name]: elem.image }),
            {}
          )
        )
        .catch(error => {
          throw new Error('Not all assets could be loaded.');
        });
    }
  }

let assetloader = new AssetLoader;
let pro = assetloader.loadAsset("nametest", "./assets.png");
pro.then((spritesheet) => {
    new Game(document.getElementById('myCanvas'), 10, spritesheet.image)
})
