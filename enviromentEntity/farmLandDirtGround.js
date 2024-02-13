class FarmLandDirtGround{
    constructor(game, x, y, rows, cols) {
        Object.assign(this, { game, x, y, rows, cols });

        this.x = x;
        this.y = y;
        this.height = 64;  // Adjust the height based on the number of rows
        this.width = 68;
        // this.height = 88;
        // this.width = 89;
       // this.game.land = this;
        // spritesheet
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
    }; 

    update(){

    };
    // draw(ctx) {
 
    //     ctx.drawImage(this.spritesheet,100,36,this.width, this.height, this.x - this.game.camera.x,this.y - this.game.camera.y,this.width,this.height);

    // }
    draw(ctx) {
        // Draw each square in the rectangle
        ctx.fillStyle = "#ff9148";
        ctx.fillRect(this.x- this.game.camera.x, this.y - this.game.camera.y,  this.width*this.cols, this.height*this.rows);

        for (let i = 0; i < this.rows; i++) {
            
            
            for (let j = 0; j < this.cols; j++) {
                if(i == 0)
                    ctx.drawImage(this.spritesheet,110,36,68, 
                        12, this.x - this.game.camera.x+ this.width*j,
                        this.y - this.game.camera.y -11,
                        68,12);
                

                if(j == this.cols - 1){

                    ctx.drawImage(this.spritesheet,178,48,10, 
                        64, -2 + this.x - this.game.camera.x+ this.width*(j+1),
                        this.y - this.game.camera.y + 64*i-2,
                        10,64);
                }

                if(i == this.rows -1 ){
                    ctx.drawImage(this.spritesheet,110,112,66, 
                        14, this.x - this.game.camera.x+ this.width*j,
                        this.y - this.game.camera.y +  this.height*(i+1)-2,
                        66,14);
                }
            }
            ctx.drawImage(this.spritesheet,98,48,12, 
                64, this.x - this.game.camera.x -11,
                this.y - this.game.camera.y + 64*i,
                12,64);
        }
    }

}