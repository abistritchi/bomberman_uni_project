import {Startscreen} from './startscreen.js'
import {AssetLoader} from './assetloader.js'
//import {PlayerState} from './playerstate.js'

let assetloader = new AssetLoader;
let pro = assetloader.loadAssets(
    [
        {name: "spritesheet", url: "./Assets/spritesheetletsbomb.png" },
        {name: "fire", url: "./Assets/Flame_f00.png"},
        {name: "powerUps", url: "./Assets/powerUps.png"}

    ]
)
pro.then((assets) => {
    const socket = io();

    socket.on('GameInProgress', data =>{
        console.log("Impossible to join");
        //document.removeEventListener('keyup', handleKeyUp);
        alert("There is already a game in progress, please wait :) ");
      });
    socket.on('newID', data =>{
        socket.playerID = data.id;
        socket.startx = data.x;
        socket.starty = data.y;
        new Startscreen(document.getElementById('myCanvas'), 11, assets, socket);
        }); 
});