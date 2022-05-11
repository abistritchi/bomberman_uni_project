export class PlayerState {
    constructor(canvas, spritesheet, context) {

        this.canvas = canvas;
        this.canvas = document.getElementById('lifeCanvas');
        this.context = context;

        this.spritesheet = spritesheet;


    }

    drawLine(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();

    this.drawLine(0, 100, 800 , 100);
    this.drawLine(400, 0, 400, 200);
    }
    

    drawAsset(sx, sy, dx, dy) {
        this.context.drawImage(
            this.spritesheet,
            sx,
            sy,
            142,
            137.7,
            dx,
            dy,
            this.cellSize,
            this.cellSize
            );
    
        this.drawAsset(0, 142, 0, 0)
        this.drawAsset(137.7, 142, 0, 100)
        this.drawAsset(275.4, 142, 400, 0)
        this.drawAsset(413.1, 142, 400, 100)
    }
}




