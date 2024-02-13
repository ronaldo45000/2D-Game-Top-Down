class LakeAndOtherSide{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.x = x;
        this.y = y;
        // this.height = 32;
        // this.width = 32;
       // this.game.land = this;
        // spritesheet
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/forest.png");
      // this.loadAnimations();
        this.horizontalDownWaterAnimation = new Animator(this.spritesheet, 107, 345, 64, 24-9, 3, 10, 0, false, true);
        this.verticalLeftWaterAnimation = new Animator(this.spritesheet, 105, 362, 24, 60, 3, 10, 0, false, true);
        this.horizontalUpWaterAnimation = new Animator(this.spritesheet, 107, 429, 63, 31, 3, 10, 0, false, true);
        this.bigWaterFallAnimation = new Animator(this.spritesheet, 360, 352, 80, 97, 3, 0.5, 16, false, true);
        this.campFireAnimation  = new Animator(this.spritesheet, 288, 107, 32, 50, 5, 0.2, 0, false, true);
        this.verticalRightWaterAnimation  = new Animator(this.spritesheet, 187, 366, 14, 53, 3, 5, 0, false, true);
        this.fishSwimming = new Animator(this.spritesheet, 0, 538-48, 48*2, 48, 3, 1, 0, false, true);

        this.updateBB();
       
    }; 
    

    loadAnimations(){

    }
    update(){
        this.updateBB();
    };
    addSmallGrass(ctx,x,y){
        ctx.drawImage(this.spritesheet,256,0, 32,32, x  - this.game.camera.x , y - this.game.camera.y,32,32);
        ctx.drawImage(this.spritesheet,256,0, 32,32, x  - this.game.camera.x , y - this.game.camera.y,32,32);


    }
    addMediumGrass(ctx,x,y){
        ctx.drawImage(this.spritesheet,256+32,0, 32,32, x  - this.game.camera.x , y - this.game.camera.y,32,32);

    }
    addBigGrass(ctx,x,y){
        ctx.drawImage(this.spritesheet,256+32*4,0, 32,32, x  - this.game.camera.x , y - this.game.camera.y,32,32);

    }
    addBiggerGrass(ctx,x,y){
        ctx.drawImage(this.spritesheet,256+32*3,0, 32,32, x  - this.game.camera.x , y - this.game.camera.y,32,32);

    }
    addBigCutTree(ctx,x,y){
        ctx.drawImage(this.spritesheet,211,135, 55,53, x  - this.game.camera.x , y - this.game.camera.y,55,53);

    }
    addBigMossedStone(ctx,x,y){
        ctx.drawImage(this.spritesheet,194,68, 60,57, x  - this.game.camera.x , y - this.game.camera.y, 60,57);

    }
    addWood(ctx,x,y){
        ctx.drawImage(this.spritesheet,255,65, 64,31, x  - this.game.camera.x , y - this.game.camera.y, 64,31);

    }
    addRose(ctx,x,y){
        ctx.drawImage(this.spritesheet,384,32, 31,29, x  - this.game.camera.x , y - this.game.camera.y, 31,29);

    }
    addSunFlower(ctx,x,y){
        ctx.drawImage(this.spritesheet,417,2, 32,58, x  - this.game.camera.x , y - this.game.camera.y, 32,58);

    }
    addWoodBridge(ctx,x,y){
        ctx.drawImage(this.spritesheet,447,180, 30,32, x  - this.game.camera.x , y - this.game.camera.y, 30,40);

    }
    addHorizontalWoodBridge(ctx,x,y){
        ctx.drawImage(this.spritesheet,478,224, 34,32, x  - this.game.camera.x , y - this.game.camera.y, 34,32);

    }
    draw(ctx) {
        

        
        ctx.fillStyle = "#4d65b4";
        ctx.fillRect(0- this.game.camera.x, - this.game.camera.y, 2000, 300);
        ctx.fillStyle = "#4d65b4";

        ctx.fillRect(64*21 - this.game.camera.x,300- this.game.camera.y, 700, 60*10);
        ctx.fillStyle = "#547e64";
        
        ctx.fillRect(64*12 + 285 - this.game.camera.x - 63*6, - this.game.camera.y, 63*8 + 63*6 + 2, 150 + 60);
        for(let i = 0; i < 14; i++ ){
            this.horizontalUpWaterAnimation.drawFrame
            (this.game.clockTick,ctx,64*12 + 285 + 63*i - this.game.camera.x - 63*6,150 + 55 - this.game.camera.y,PARAMS.SCALE);

        }




        this.verticalLeftWaterAnimation.drawFrame
        (this.game.clockTick,ctx,64*21 + 204 - this.game.camera.x,150 - this.game.camera.y,PARAMS.SCALE);



        ctx.fillRect(64*21 + 213 - this.game.camera.x, - this.game.camera.y, 63*7, 150);
        //add grasses
        this.addBigGrass(ctx,1000+32*2,175);
        this.addBigGrass(ctx,1000+32*3,175);
        this.addBigGrass(ctx,1000+32*4,175);

        this.addBigGrass(ctx,1000+32*8,175);
        this.addBigGrass(ctx,1000+32*7,175);
        this.addBigGrass(ctx,1000+32*15,175);
        this.addBigGrass(ctx,1000+32*16,175);

        this.addBigGrass(ctx,1000+32*26,130);
        this.addBigGrass(ctx,1000+32*25,130);
        this.addBigGrass(ctx,1000+32*27,130);
        this.addBigGrass(ctx,1000+32*28,130);

        this.addBigGrass(ctx,1000,0);
        this.addBigGrass(ctx,1000-32,0);
        this.addBigGrass(ctx,1000-32*2,0);


        this.addBigGrass(ctx,1000-32*8,0);
        this.addBigGrass(ctx,1000-32*9,0);

        this.addBigGrass(ctx,1000-32*9,175);
        this.addBigGrass(ctx,1000-32*9,175-32);
        this.addBigGrass(ctx,1000-32*8,175);
        this.addBigGrass(ctx,1000-32*8,175-32);
        this.addBigGrass(ctx,1000-32*10,175);
        this.addBigGrass(ctx,1000-32*10,175-32);
        this.addBigGrass(ctx,1000-32*10,175-32*2);





        this.addSmallGrass(ctx,1550,0);
        this.addSmallGrass(ctx,1770,10);
        this.addSmallGrass(ctx,1470,40);
        this.addSmallGrass(ctx,1450,110);
        this.addSmallGrass(ctx,1650,100);
        this.addSmallGrass(ctx,800,0);
        this.addSmallGrass(ctx,900,10);
        this.addSmallGrass(ctx,850,40);
        this.addSmallGrass(ctx,830,90);
        this.addSmallGrass(ctx,810,160);
        this.addSmallGrass(ctx,950,160);


       this.addMediumGrass(ctx,1480,50);
       this.addMediumGrass(ctx,1480,50 + 32);
       this.addMediumGrass(ctx,1950,50);
       this.addMediumGrass(ctx,1950,50 + 32);


        this.addBiggerGrass(ctx,1450,0);
        this.addBiggerGrass(ctx,1450,32);
        this.addBiggerGrass(ctx,1450,32*2);
        this.addBiggerGrass(ctx,1450,32*3);
        
        //AddCutTree
        this.addRose(ctx,64*25-30 + 10,10);
        this.addRose(ctx,64*23-30 + 10,90);

        this.addRose(ctx,64*25-10 + 10,10);
        this.addWood(ctx,64*24-25 + 40,20);
        this.addRose(ctx,64*24 + 10,30);
        this.addRose(ctx,64*24 + 10,30);

        ctx.drawImage(this.spritesheet,0 ,160, 95 ,124, 1450   - this.game.camera.x ,  -10  - this.game.camera.y,95 ,124);
        ctx.drawImage(this.spritesheet,0 ,160, 95 ,124, 1950   - this.game.camera.x ,  -50  - this.game.camera.y,95 ,124);

        ctx.drawImage(this.spritesheet,0 ,160, 95 ,124, 1900   - this.game.camera.x ,  -50  - this.game.camera.y,95 ,124);

        ctx.drawImage(this.spritesheet,0 ,160, 95 ,124, 1850   - this.game.camera.x ,  -10  - this.game.camera.y,95 ,124);
        this.addBigMossedStone(ctx,1940,90);


        this.addBigCutTree(ctx,1450,32*3);

        //Waterfall HIll
        for(let i = 0; i < 4; i++){
            ctx.drawImage(this.spritesheet,24,285, 47,194, 47*i - i + 64*15 + 285 - this.game.camera.x , -15 - this.game.camera.y,47,194);

        }
         ctx.drawImage(this.spritesheet,24 + 47 ,285, 95-24 - 47 ,194, 64*18 + 275 - this.game.camera.x , -15 - this.game.camera.y,95-24 - 47,194);
        
        //water to waterfall
        ctx.fillStyle = "#4d65b4";
        ctx.fillRect(64*17 + 40- this.game.camera.x,  - this.game.camera.y, 117, 90);
        //Water Big Fall
            this.verticalLeftWaterAnimation.drawFrame
                (this.game.clockTick,ctx,64*17 + 37 - this.game.camera.x, - this.game.camera.y,PARAMS.SCALE);
            this.verticalLeftWaterAnimation.drawFrame
                (this.game.clockTick,ctx,64*17 + 37 - this.game.camera.x, 60 - this.game.camera.y,PARAMS.SCALE);
            this.verticalRightWaterAnimation.drawFrame
                (this.game.clockTick,ctx,64*19 + 20   - this.game.camera.x,  - this.game.camera.y,PARAMS.SCALE);
            this.verticalRightWaterAnimation.drawFrame
                (this.game.clockTick,ctx,64*19 + 20   - this.game.camera.x,53 - this.game.camera.y,PARAMS.SCALE);
                //waterwall itseft
            this.bigWaterFallAnimation.drawFrame
                (this.game.clockTick,ctx,64*17 + 40 - this.game.camera.x,90 - this.game.camera.y,1.5*PARAMS.SCALE);
            
        
            


        //left Hillss
        for(let i = 0; i < 2; i++){
            ctx.drawImage(this.spritesheet,24,285, 47,194, 47*i - i + 64*15 + 75 - this.game.camera.x , -15 - this.game.camera.y,47,194);

        }
        ctx.drawImage(this.spritesheet,0 ,285, 22 ,194, 64*16   - this.game.camera.x , -15 - this.game.camera.y,22,194);

        
        //left Hill Ends

        //Added Camp
        ctx.drawImage(this.spritesheet,192 ,192, 97 ,129, 64*14   - this.game.camera.x , 0  - this.game.camera.y,97 ,129);
        //Added campFire animatino
        this.campFireAnimation.drawFrame
        (this.game.clockTick,ctx,64*14   - this.game.camera.x, 120 - this.game.camera.y,PARAMS.SCALE);


        for(let i = 0; i < 4; i++){
            this.verticalRightWaterAnimation.drawFrame
        (this.game.clockTick,ctx,64*10 + 25   - this.game.camera.x, 53*i - this.game.camera.y,PARAMS.SCALE);
        }
        
        //added big trees.
        ctx.drawImage(this.spritesheet,0 ,160, 95 ,124, 64*11+40   - this.game.camera.x , -10  - this.game.camera.y,95 ,124);
        ctx.drawImage(this.spritesheet,0 ,160, 95 ,124, 64*10+20   - this.game.camera.x , 0  - this.game.camera.y,95 ,124);
        this.addBigCutTree(ctx,64*12.5,90);
        ctx.drawImage(this.spritesheet,0 ,160, 95 ,124, 64*11   - this.game.camera.x , 55  - this.game.camera.y,95 ,124);
        
        this.addSunFlower(ctx,64*12.5,120);
        this.addSunFlower(ctx,64*20,140);
        this.addSunFlower(ctx,64*20+33,140);

        //hidden dungen
        ctx.drawImage(this.spritesheet,288 ,166, 32 ,59, 64*21.5   - this.game.camera.x , 115  - this.game.camera.y,32 ,59);


        for(let i = 0; i < 7; i++ ){
            this.horizontalUpWaterAnimation.drawFrame
            (this.game.clockTick,ctx,64*21 + 213 + 63*i - this.game.camera.x,150 -5 - this.game.camera.y,PARAMS.SCALE);

        }   




        for(let i = 0; i < 21; i++ ){
            this.horizontalDownWaterAnimation.drawFrame
        (this.game.clockTick,ctx,64*i - this.game.camera.x,300 - this.game.camera.y,PARAMS.SCALE);
        }


        for(let i = 0; i < 10; i++ ){
            this.horizontalDownWaterAnimation.drawFrame
            (this.game.clockTick,ctx,64*21 + 64*i - this.game.camera.x,900 - this.game.camera.y,PARAMS.SCALE);
        }

        for(let i = 0; i < 10; i++ ){
            this.verticalLeftWaterAnimation.drawFrame
        (this.game.clockTick,ctx,64*21- 20 - this.game.camera.x,300+60*i - this.game.camera.y,PARAMS.SCALE);
        }


        //add bridge
        for(let i = 0; i < 3; i++){
            this.addWoodBridge(ctx,1750 ,135 + 40*i);
        }
        this.fishSwimming.drawFrame
        (this.game.clockTick,ctx,64*23 - 53  - this.game.camera.x, 420 -15 - this.game.camera.y,PARAMS.SCALE);
        for(let i = 0; i < 3; i++){
            this.addHorizontalWoodBridge(ctx, 1330+ 34*i, 410 );
        }

        

        if (PARAMS.DEBUG) {
             ctx.strokeStyle = 'red';
             ctx.strokeRect(0- this.game.camera.x, 0- this.game.camera.y, 2000, 300);
        
 
 
         }



        
    }
 
    updateBB(){
        this.BB = new BoundingBox(0- this.game.camera.x, 0- this.game.camera.y, 2000, 270);
        
    };

}
