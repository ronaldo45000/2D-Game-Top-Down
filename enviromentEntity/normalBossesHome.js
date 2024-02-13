class NormalBossesHome{
    constructor(game) {
        Object.assign(this, { game});

        this.x = 1344;
        this.y = 925;
        this.height = 875;
        this.width = 656;
       // this.game.land = this;
        // spritesheet
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemyhouse.png");
       this.torchAnimation = new Animator(this.spritesheet, 288, 170, 32, 47, 4, 0.9, 0, false, 32, 47);
       this.waterFoundtain =  new Animator(this.spritesheet, 580, 353, 56, 60, 3, 0.3, 8, false, 56, 60);
       this.smallSpririt = new Animator(this.spritesheet, 0, 476, 32, 36, 5, 1.5, 0, false, 32, 36);
      // this.loadAnimations();
      //  this.updateBB();
       
    }; 


    update(){
        
    }

    drawTopWall(ctx, x,y){
        ctx.drawImage(this.spritesheet,96,256, 90,72, x  - this.game.camera.x , y - this.game.camera.y,  90,72);
    }
    drawLeftWall(ctx, x,y){
        ctx.drawImage(this.spritesheet,160,352, 32,34, x  - this.game.camera.x , y - this.game.camera.y,  32,34);

    }
    drawBottomWall(ctx, x,y){
        ctx.drawImage(this.spritesheet,0,512, 32,96, x  - this.game.camera.x , y - this.game.camera.y,  32,96);

    }
    drawType1Floor(ctx, x,y){
        ctx.drawImage(this.spritesheet,64,0, 32,32, x  - this.game.camera.x , y - this.game.camera.y,  32,32);
    }
    drawType1Box(ctx, x,y){
        ctx.drawImage(this.spritesheet,137,99, 46,56, x  - this.game.camera.x , y - this.game.camera.y,  46,56);
    }
    draw(ctx) {
        for(let i = 0; i < 27;i++){
            for(let j = 0; j < 20; j++){
                this.drawType1Floor(ctx,this.x + 32*j, this.y + 32*i );
                if(j == 1 || j == 19 || (i == 0) || i == 26)     ctx.drawImage(this.spritesheet,32,32, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y + 32*i ,  32,32);
                if(j == 5 && i == 5 || j == 10 && i == 2|| j == 15 && i == 12 || j == 9 && i == 12|| j == 7 && i == 16)        this.smallSpririt.drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 32*j,this.y - this.game.camera.y + 32*i - 5 ,PARAMS.SCALE);
                if(j >= 10 && j <= 16 && i == 8) {
                    ctx.drawImage(this.spritesheet,32,0, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1+ 32*i ,  32,32);
                    if(j == 15 ||j == 12 ) ctx.drawImage(this.spritesheet,32*3,0, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1+ 32*i ,  32,32);

                }
                if(j >= 8 && j <= 13 && i == 7){ 
                    ctx.drawImage(this.spritesheet,32,0, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1 + 32*i ,  32,32);
                    if(j == 8 ||j == 11 || j == 12 ) ctx.drawImage(this.spritesheet,32*3,0, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1+ 32*i ,  32,32);
                    if(j == 8 || j == 13 ) ctx.drawImage(this.spritesheet,352,96, 32,31, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1+ 32*i ,  32,31);

                }
                if(j >= 13 && j <= 17 && i == 9) {
                    ctx.drawImage(this.spritesheet,32,0, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1 + 32*i ,  32,32)
                    if(j == 11 ||j == 14 || j == 15| j == 16 ) ctx.drawImage(this.spritesheet,32*3,0, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1+ 32*i ,  32,32);
                    if(j == 14  ) ctx.drawImage(this.spritesheet,352,96, 32,31, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1+ 32*i ,  32,31);

                };
                if(j >= 10 && j <= 11 && i == 19) ctx.drawImage(this.spritesheet,32,0, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1 + 32*i ,  32,32);
                
                if(j >= 10 && j <= 16 && i == 17) {
                    ctx.drawImage(this.spritesheet,32,0, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1+ 32*i ,  32,32);
                    if(j == 15 ||j == 12 ) ctx.drawImage(this.spritesheet,32*3,0, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1+ 32*i ,  32,32);

                }
                if(j >= 8 && j <= 13 && i == 20){ 
                    ctx.drawImage(this.spritesheet,32,0, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1 + 32*i ,  32,32);
                    if(j == 8 ||j == 11 || j == 12 ) ctx.drawImage(this.spritesheet,32*3,0, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1+ 32*i ,  32,32);
                    if(j == 8 || j == 13 ) ctx.drawImage(this.spritesheet,352,96, 32,31, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1+ 32*i ,  32,31);

                }
                if(j >= 8 && j <= 15 && i == 18) {
                    ctx.drawImage(this.spritesheet,32,0, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1 + 32*i ,  32,32)
                    if(j == 11 ||j == 14 || j == 15| j == 16 ) ctx.drawImage(this.spritesheet,32*3,0, 32,32, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1+ 32*i ,  32,32);
                    if(j == 14  ) ctx.drawImage(this.spritesheet,352,96, 32,31, this.x  - this.game.camera.x + 32*j , this.y - this.game.camera.y -1+ 32*i ,  32,31);

                };

            }
        }
        //Final Boss Floor
        for(let i = 0; i < 32;i++){
            for(let j = 0; j < 63; j++){
                this.drawType1Floor(ctx,0 + 32*j, 2200 + 1100+ 32*i );
                if(j == 0 || j == 62   || (i == 0) || i == 31)     ctx.drawImage(this.spritesheet,32,32, 32,32, 0  - this.game.camera.x + 32*j , 2200 + 1100 - this.game.camera.y + 32*i ,  32,32);
                if(j == 5 && i == 5 || j == 10 && i == 2|| j == 15 && i == 12 || j == 9 && i == 12|| j == 7 && i == 16)        this.smallSpririt.drawFrame(this.game.clockTick,ctx,0 - this.game.camera.x + 32*j,2200 + 1100 - this.game.camera.y + 32*i - 5 ,PARAMS.SCALE);
            }
        }
        //Final Boss Floor End
    
        for(let i = 0; i < 7; i++){
            this.drawTopWall(ctx,this.x + 90*i,this.y - 70);
        }


        //torch
        this.torchAnimation.drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 243 ,this.y - this.game.camera.y - 70,PARAMS.SCALE);
        this.torchAnimation.drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 265 ,this.y - this.game.camera.y - 70,PARAMS.SCALE);


        this.torchAnimation.drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 333 ,this.y - this.game.camera.y - 70,PARAMS.SCALE);
        this.torchAnimation.drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 355 ,this.y - this.game.camera.y - 70,PARAMS.SCALE);

        //water Fountain
        this.waterFoundtain.drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 375 ,this.y - this.game.camera.y -50 ,PARAMS.SCALE);
        this.waterFoundtain.drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 195 ,this.y - this.game.camera.y -50 ,PARAMS.SCALE);
        //Temple
        ctx.drawImage(this.spritesheet,0,288, 96,169, this.x  - this.game.camera.x + this.width/2 - 62, this.y - this.game.camera.y - 70  ,  96,169);

        //Small Spririts
        //box type 1
        this.drawType1Box(ctx, this.x  + 32, this.y );
        this.drawType1Box(ctx, this.x  + 22, this.y + 20 );
        //brick
        ctx.drawImage(this.spritesheet,227,353, 61,86, this.x  - this.game.camera.x + 550, this.y - this.game.camera.y   + this.height/9 ,  61,86);

        //hom
        ctx.drawImage(this.spritesheet,448,416, 28,60, this.x  - this.game.camera.x +28 +32, this.y - this.game.camera.y   + this.height/9 ,  28,60);
        ctx.drawImage(this.spritesheet,612,430, 60,44, this.x  - this.game.camera.x +570, this.y - this.game.camera.y   + this.height - 200 ,  60,44);



        ctx.drawImage(this.spritesheet,263,264, 20,79, this.x  - this.game.camera.x, this.y - this.game.camera.y   + this.height/3 - 70,  20,79);
        ctx.drawImage(this.spritesheet,263,264, 20,79, this.x  - this.game.camera.x + 15, this.y - this.game.camera.y   + this.height/3 - 70,  20,79);
        this.torchAnimation.drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 243 - 253 ,this.y - this.game.camera.y + 440,PARAMS.SCALE);
        this.torchAnimation.drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 265 - 253,this.y - this.game.camera.y + 440,PARAMS.SCALE);
        for(let i = 0; i < 28; i++){
            if(i == 9) i += 7;
            this.drawLeftWall(ctx,this.x   ,this.y- 70 + 34*i);
        }
        this.torchAnimation.drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 243 - 253 ,this.y - this.game.camera.y + 220,PARAMS.SCALE);
        this.torchAnimation.drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 265 - 253,this.y - this.game.camera.y + 220,PARAMS.SCALE);


        ctx.drawImage(this.spritesheet,128,512, 96,96, this.x  - this.game.camera.x + 32, this.y - this.game.camera.y  - 96 + this.height,  96,96);
        
        for(let i = 4; i < 21; i++){
            this.drawBottomWall(ctx,this.x + 32*i,this.y + this.height - 96   );
            if(i == 10) {
                i+= 3;
            ctx.drawImage(this.spritesheet,128,512, 96,96, this.x  - this.game.camera.x + 32*(i-2), this.y - this.game.camera.y  - 96 + this.height,  96,96);
            }
        }
        
        for(let i = 0; i < 25; i++){
            this.drawLeftWall(ctx,this.x + 656 - 32 ,this.y- 70 + 34*i);
        }
        
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.x   - this.game.camera.x , this.y   - this.game.camera.y , this.width, this.height);
            
           
        }
    }

}