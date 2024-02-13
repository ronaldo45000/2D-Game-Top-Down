class SnowMap{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

       
        // spritesheet
     this.spritesheet = ASSET_MANAGER.getAsset("./sprites/snowm.png");
     this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/snowtree.png");
     this.spritesheet3 = ASSET_MANAGER.getAsset("./sprites/snowhouse.png");
     this.spritesheet4 = ASSET_MANAGER.getAsset("./sprites/props.png");

     this.updateBB();

    }; 
    updateBB(){
        // this.BB = new BoundingBox(this.x +50- this.game.camera.x , this.y +1600  - this.game.camera.y ,40, 150);
               
           this.BB = new BoundingBox(this.x - this.game.camera.x , this.y  +2175- this.game.camera.y , 800,50);
      
         ;
     }
    update(){
        this.BB = new BoundingBox(this.x - this.game.camera.x  , this.y  +2175- this.game.camera.y , 800,50);

    };
    draw(ctx) {
        
     let val = 0;
        //bricks




    //    ctx.fillStyle = "#5e4030";
 
    //     ctx.fillRect(0- this.game.camera.x, this.y + 2400- this.game.camera.y, 2000, 500);
   // ctx.drawImage(this.spritesheet,0,0, 20,20, this.x -  this.game.camera.x,this.y +2200- this.game.camera.y,20,20);
   // ctx.drawImage(this.spritesheet,0,0, 20,20, this.x + 20 -  this.game.camera.x,this.y +2200- this.game.camera.y,20,20);
   // ctx.drawImage(this.spritesheet,0,0, 20,20, this.x + 140-  this.game.camera.x,this.y +2200- this.game.camera.y,20,20);
   // ctx.drawImage(this.spritesheet,0,0, 20,20, this.x + 260-  this.game.camera.x,this.y +2200- this.game.camera.y,20,20);
   // ctx.drawImage(this.spritesheet,0,0, 20,20, this.x + 480-  this.game.camera.x,this.y +2200- this.game.camera.y,20,20);
  //  ctx.drawImage(this.spritesheet,0,0, 20,20, this.x + 140-  this.game.camera.x,this.y +2100- this.game.camera.y,20,20);
   // ctx.drawImage(this.spritesheet,0,0, 20,20, this.x + 260-  this.game.camera.x,this.y +2250- this.game.camera.y,20,20);
    
    //ctx.drawImage(this.spritesheet,0,0, 20,20, this.x + 480-  this.game.camera.x,this.y +2100- this.game.camera.y,20,20);

//snow map
        ctx.drawImage(this.spritesheet,0,0, 500,500, this.x -  this.game.camera.x,this.y +2200- this.game.camera.y,500,500);
        ctx.drawImage(this.spritesheet,0,0, 500,500, this.x + 500-  this.game.camera.x,this.y +2200- this.game.camera.y,500,500);
        ctx.drawImage(this.spritesheet,0,0, 500,500, this.x +1000-  this.game.camera.x,this.y +2200- this.game.camera.y,500,500);
        ctx.drawImage(this.spritesheet,0,0, 500,500, this.x +1500-  this.game.camera.x,this.y +2200- this.game.camera.y,500,500);

        ctx.drawImage(this.spritesheet,0,0, 500,500, this.x -  this.game.camera.x,this.y +2400- this.game.camera.y,500,500);
        ctx.drawImage(this.spritesheet,0,0, 500,500, this.x + 500-  this.game.camera.x,this.y +2400- this.game.camera.y,500,500);
        ctx.drawImage(this.spritesheet,0,0, 500,500, this.x +1000-  this.game.camera.x,this.y +2400- this.game.camera.y,500,500);
        ctx.drawImage(this.spritesheet,0,0, 500,500, this.x +1500-  this.game.camera.x,this.y +2400- this.game.camera.y,500,500);
        ctx.drawImage(this.spritesheet,0,0, 500,500, this.x -  this.game.camera.x,this.y +2800- this.game.camera.y,500,500);
        ctx.drawImage(this.spritesheet,0,0, 500,500, this.x + 500-  this.game.camera.x,this.y +2800- this.game.camera.y,500,500);
        ctx.drawImage(this.spritesheet,0,0, 500,500, this.x +1000-  this.game.camera.x,this.y +2800- this.game.camera.y,500,500);
        ctx.drawImage(this.spritesheet,0,0, 500,500, this.x +1500-  this.game.camera.x,this.y +2800- this.game.camera.y,500,500);
        

        //bricks
        let brickVal =0;
        let brickValEnd =0;
        for(let i =0; i<68;i++){
            ctx.drawImage(this.spritesheet3,318,125, 33,32, this.x -5 + brickVal-  this.game.camera.x,this.y +2195- this.game.camera.y,33,32);
            brickVal+=30;
        }
        for(let i =0; i<68;i++){
        ctx.drawImage(this.spritesheet3,318,125, 33,32, this.x -5+ brickValEnd -  this.game.camera.x,this.y +3275- this.game.camera.y,33,32);
        brickValEnd+=30;
    }
     
        
//FENCES

                for(let i =0; i<20;i++){
            ctx.drawImage(this.spritesheet3,0,34, 61,31, this.x -20+ val-  this.game.camera.x,this.y +2179- this.game.camera.y,65,31);
            val+=40;
        }
        for(let i =0; i<30;i++){
            ctx.drawImage(this.spritesheet3,0,34, 61,31, this.x +100+ val-  this.game.camera.x,this.y +2179- this.game.camera.y,65,31);

           // ctx.drawImage(this.spritesheet2,200,16, 54,80, this.x + 100+ val-  this.game.camera.x,this.y +2322- this.game.camera.y,54,80);
                val+=40;
            }

         //BROWN TREE
                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 200-  this.game.camera.x,this.y +2522- this.game.camera.y,54,86);
                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 400-  this.game.camera.x,this.y +2922- this.game.camera.y,54,86);
                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 100-  this.game.camera.x,this.y +3222- this.game.camera.y,54,86);

                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 578-  this.game.camera.x,this.y +2469- this.game.camera.y,54,86);
                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 747-  this.game.camera.x,this.y +3079- this.game.camera.y,54,86);
                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 644-  this.game.camera.x,this.y +2748- this.game.camera.y,54,86);
                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1760-  this.game.camera.x,this.y +2935- this.game.camera.y,54,86);
                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1058-  this.game.camera.x,this.y +2984- this.game.camera.y,54,86);
                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1603-  this.game.camera.x,this.y +2791- this.game.camera.y,54,86);
                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 322-  this.game.camera.x,this.y +7- this.game.camera.y,54,86);


                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 950-  this.game.camera.x,this.y +2522- this.game.camera.y,54,86);
                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 900-  this.game.camera.x,this.y +2722- this.game.camera.y,54,86);
                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1100-  this.game.camera.x,this.y +3202- this.game.camera.y,54,86);




                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1600-  this.game.camera.x,this.y +2522- this.game.camera.y,54,86);
                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1300-  this.game.camera.x,this.y +2822- this.game.camera.y,54,86);
                // ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1500-  this.game.camera.x,this.y +3202- this.game.camera.y,54,86);

//




            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'red';
              //  ctx.strokeRect(this.x +200- this.game.camera.x  , this.y +1720 - this.game.camera.y , 130,170);
                ctx.strokeRect(this.x - this.game.camera.x  , this.y  +2175- this.game.camera.y , 800,50);
    }   

//house of boss
    //ctx.drawImage(this.spritesheet3,0,257, 349,193, this.x +1800-  this.game.camera.x,this.y +2650- this.game.camera.y,200,100);

    // ctx.drawImage(this.spritesheet4,349,267, 100,80, this.x +900-  this.game.camera.x,this.y +2760- this.game.camera.y,90,80);
    // ctx.drawImage(this.spritesheet4,442,17, 45,80, this.x +925-  this.game.camera.x,this.y +2740- this.game.camera.y,45,80);
    //collumn

    // ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1125-  this.game.camera.x,this.y +2720- this.game.camera.y,45,85);
    // ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1025-  this.game.camera.x,this.y +2620- this.game.camera.y,45,85);
    // ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1225-  this.game.camera.x,this.y +2620- this.game.camera.y,45,85);
    // ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1125-  this.game.camera.x,this.y +2520- this.game.camera.y,45,85);

    //direction
   ctx.drawImage(this.spritesheet4,95,157, 35,40, this.x +755-  this.game.camera.x,this.y +2199- this.game.camera.y,35,50);
    //rock
//    ctx.drawImage(this.spritesheet4,0,427, 65,50, this.x +255-  this.game.camera.x,this.y +2599- this.game.camera.y,65,50);
//    ctx.drawImage(this.spritesheet4,0,427, 65,50, this.x +1695-  this.game.camera.x,this.y +2519- this.game.camera.y,65,50);

   //cross
//    ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x -  this.game.camera.x,this.y +2699- this.game.camera.y,35,50);
//    ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x+40 -  this.game.camera.x,this.y +2699- this.game.camera.y,35,50);
//    ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x +80-  this.game.camera.x,this.y +2699- this.game.camera.y,35,50);
//    ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x +120-  this.game.camera.x,this.y +2699- this.game.camera.y,35,50);
//   ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x -  this.game.camera.x,this.y +2759- this.game.camera.y,35,50);
//    ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x+40 -  this.game.camera.x,this.y +2759- this.game.camera.y,35,50);
//    ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x +80-  this.game.camera.x,this.y +2759- this.game.camera.y,35,50);
//    ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x +120-  this.game.camera.x,this.y +2759- this.game.camera.y,35,50);
//    ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x -  this.game.camera.x,this.y +2809- this.game.camera.y,35,50);
//    ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x+40 -  this.game.camera.x,this.y +2809- this.game.camera.y,35,50);
//    ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x +80-  this.game.camera.x,this.y +2809- this.game.camera.y,35,50);
//    ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x +120-  this.game.camera.x,this.y +2809- this.game.camera.y,35,50);



//snowboi
    //  ctx.drawImage(this.spritesheet3,385,191, 50,61, this.x +1500-  this.game.camera.x,this.y +2650- this.game.camera.y,50,61);
    //  ctx.drawImage(this.spritesheet3,0,203, 31,51, this.x +900-  this.game.camera.x,this.y +2950- this.game.camera.y,31,51);
    //  ctx.drawImage(this.spritesheet3,0,203, 31,51, this.x +100-  this.game.camera.x,this.y +2850- this.game.camera.y,31,51);
    //  ctx.drawImage(this.spritesheet3,0,203, 31,21, this.x +600-  this.game.camera.x,this.y +2750- this.game.camera.y,31,51);


    //ice
var iceV =0;

for(var i =0; i<5;i++){
    ctx.drawImage(this.spritesheet3,95,224, 46,46, this.x+1950 + iceV -  this.game.camera.x,this.y +3070- this.game.camera.y,46,46);
    ctx.drawImage(this.spritesheet3,95,224, 46,46, this.x+1950 + iceV -  this.game.camera.x,this.y +3100- this.game.camera.y,46,46);
    ctx.drawImage(this.spritesheet3,95,224, 46,46, this.x+1950 + iceV -  this.game.camera.x,this.y +3130- this.game.camera.y,46,46);
    ctx.drawImage(this.spritesheet3,95,224, 46,46, this.x+1950 + iceV -  this.game.camera.x,this.y +3160- this.game.camera.y,46,46);
    ctx.drawImage(this.spritesheet3,95,224, 46,46, this.x+1950 + iceV -  this.game.camera.x,this.y +3180- this.game.camera.y,46,46);


    iceV-=40;

}
ctx.drawImage(this.spritesheet3,95,224, 46,46, this.x+1970 + iceV -  this.game.camera.x,this.y +3070- this.game.camera.y,36,46);
ctx.drawImage(this.spritesheet3,95,224, 46,46, this.x+1970 + iceV -  this.game.camera.x,this.y +3100- this.game.camera.y,36,46);
ctx.drawImage(this.spritesheet3,95,224, 46,46, this.x+1970 + iceV -  this.game.camera.x,this.y +3130- this.game.camera.y,36,46);
ctx.drawImage(this.spritesheet3,95,224, 46,46, this.x+1970 + iceV -  this.game.camera.x,this.y +3160- this.game.camera.y,36,46);
ctx.drawImage(this.spritesheet3,95,224, 46,46, this.x+1970 + iceV -  this.game.camera.x,this.y +3180- this.game.camera.y,36,46);
}

}
class SnowMap2{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

       
        // spritesheet
     this.spritesheet = ASSET_MANAGER.getAsset("./sprites/snowm.png");
     this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/snowtree.png");
     this.updateBB();
  
     this.game.addEntity(new SnowMap3(this.game, 970, -110));
     this.game.addEntity(new SnowMap3(this.game, 910, -170));
     this.game.addEntity(new SnowMap3(this.game, 970, -170));
     this.game.addEntity(new SnowMap3(this.game, 910, -110));

     this.game.addEntity(new SnowMap3(this.game, -570, -310));
     this.game.addEntity(new SnowMap3(this.game, -510, -370));
     this.game.addEntity(new SnowMap3(this.game, -570, -370));
     this.game.addEntity(new SnowMap3(this.game, -510, -310));

     this.game.addEntity(new SnowMap3(this.game, 370, -310));
     this.game.addEntity(new SnowMap3(this.game, 310, -370));
     this.game.addEntity(new SnowMap3(this.game, 370, -370));
     this.game.addEntity(new SnowMap3(this.game, 310, -310));

     this.game.addEntity(new SnowMap3(this.game, 570, -310));
     this.game.addEntity(new SnowMap3(this.game, 510, -370));
     this.game.addEntity(new SnowMap3(this.game, 570, -370));
     this.game.addEntity(new SnowMap3(this.game, 510, -310));

     this.game.addEntity(new SnowMap3(this.game, -570, 410));
     this.game.addEntity(new SnowMap3(this.game, -510, 470));
     this.game.addEntity(new SnowMap3(this.game, -570, 470));
     this.game.addEntity(new SnowMap3(this.game, -510, 410));

     this.game.addEntity(new SnowMap3(this.game, 410, 470));
     this.game.addEntity(new SnowMap3(this.game, 470, 470));
     

     this.game.addEntity(new SnowMap3(this.game, 570, 110));
     this.game.addEntity(new SnowMap3(this.game, 510, 170));
     this.game.addEntity(new SnowMap3(this.game, 570, 170));
     this.game.addEntity(new SnowMap3(this.game, 510, 110));

     
     this.game.addEntity(new GraveYard(this.game, 0, 0));
     this.game.addEntity(new Column(this.game, 760, 270));
     this.game.addEntity(new Column(this.game, 790, 270));
     this.game.addEntity(new Column(this.game, 820, 270));
     this.game.addEntity(new Column(this.game, 850, 270));
     this.game.addEntity(new Column(this.game, 730, 270));
     this.game.addEntity(new Column(this.game, 700, 270));
     this.game.addEntity(new Column(this.game, 670, 270));
     this.game.addEntity(new Column(this.game, 640, 270));



     this.game.addEntity(new Column(this.game, 760, 480));
     this.game.addEntity(new Column(this.game, 790, 480));
     this.game.addEntity(new Column(this.game, 820, 480));
     this.game.addEntity(new Column(this.game, 850, 480));
     this.game.addEntity(new Column(this.game, 730, 480));
     this.game.addEntity(new Column(this.game, 700, 480));
     this.game.addEntity(new Column(this.game, 670, 480));
     this.game.addEntity(new Column(this.game, 640, 480));

     this.game.addEntity(new Chest(this.game, 820, -1120));
     this.game.addEntity(new Chest(this.game, 800, 40));
     this.game.addEntity(new Chest(this.game, -220, -80));
     this.game.addEntity(new Chest(this.game, -190, -80));
     this.game.addEntity(new Chest(this.game, -160, -80));
   
     this.game.addEntity(new Skele2(this.game,940, 2790, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]));

     this.game.addEntity(new Turret(this.game, 0, 0));
  

    //  this.game.addEntity(new SnowMap3(this.game, 400, 95));


    //  this.game.addEntity(new SnowMap3(this.game, 500, 0));
    //  this.game.addEntity(new SnowMap3(this.game, 400, 95));
    //  this.game.addEntity(new SnowMap3(this.game, 0, 0));
    //  this.game.addEntity(new SnowMap3(this.game, 400, 95));
    //  this.game.addEntity(new SnowMap3(this.game, 0, 0));
    //  this.game.addEntity(new SnowMap3(this.game, 400, 95));
    //  this.game.addEntity(new SnowMap3(this.game, 0, 0));
    //  this.game.addEntity(new SnowMap3(this.game, 400, 95));
    //  this.game.addEntity(new SnowMap3(this.game, 0, 0));
    //  this.game.addEntity(new SnowMap3(this.game, 400, 95));
    //  this.game.addEntity(new SnowMap3(this.game, 0, 0));
    //  this.game.addEntity(new SnowMap3(this.game, 400, 95));
   //  this.game.addEntity(new SnowMap3(this.game, 0, -200));

    }; 
    updateBB(){
            this.BB = new BoundingBox(this.x +900- this.game.camera.x  , this.y  +2175- this.game.camera.y , 1800,50);
      
         ;
     }
    update(){
        this.BB = new BoundingBox(this.x +900- this.game.camera.x  , this.y  +2175- this.game.camera.y , 1800,50);
    };
    draw(ctx) {
     let val =0;
        for(let i =0; i<20;i++){
         
            val+=40;
        }
        for(let i =0; i<30;i++){
         
          //  ctx.drawImage(this.spritesheet2,200,16, 54,80, this.x + 100+ val-  this.game.camera.x,this.y +2322- this.game.camera.y,54,80);
                val+=40;
            }

            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'red';
              //  ctx.strokeRect(this.x +200- this.game.camera.x  , this.y +1720 - this.game.camera.y , 130,170);
                ctx.strokeRect(this.x +900- this.game.camera.x  , this.y  +2175- this.game.camera.y , 1800,50);

    }

}
}
class SnowMap3{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

       
        // spritesheet
     this.spritesheet = ASSET_MANAGER.getAsset("./sprites/snowm.png");
     this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/snowtree.png");
     this.updateBB();

    }; 
    updateBB(){
        this.BB = new BoundingBox(this.x +900- this.game.camera.x  , this.y  +2725- this.game.camera.y , 54,86);               

      
         ;
     }
    update(){
        this.BB = new BoundingBox(this.x +900- this.game.camera.x  , this.y  +2725- this.game.camera.y , 54,86);               
          
    };
    draw(ctx) {
     let val =0;
        for(let i =0; i<20;i++){
         
            val+=40;
        }
        for(let i =0; i<30;i++){
         
       //     ctx.drawImage(this.spritesheet2,200,16, 54,80, this.x + 100+ val-  this.game.camera.x,this.y +2322- this.game.camera.y,54,80);
                val+=40;
            }
  //BROWN TREE
  ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 900-  this.game.camera.x,this.y +2722- this.game.camera.y,54,86);
//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 400-  this.game.camera.x,this.y +2922- this.game.camera.y,54,86);
//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 100-  this.game.camera.x,this.y +3222- this.game.camera.y,54,86);

//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 578-  this.game.camera.x,this.y +2469- this.game.camera.y,54,86);
//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 747-  this.game.camera.x,this.y +3079- this.game.camera.y,54,86);
//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 644-  this.game.camera.x,this.y +2748- this.game.camera.y,54,86);
//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1760-  this.game.camera.x,this.y +2935- this.game.camera.y,54,86);
//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1058-  this.game.camera.x,this.y +2984- this.game.camera.y,54,86);
//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1603-  this.game.camera.x,this.y +2791- this.game.camera.y,54,86);
//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 322-  this.game.camera.x,this.y +7- this.game.camera.y,54,86);


//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 950-  this.game.camera.x,this.y +2522- this.game.camera.y,54,86);
//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 900-  this.game.camera.x,this.y +2722- this.game.camera.y,54,86);
//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1100-  this.game.camera.x,this.y +3202- this.game.camera.y,54,86);




//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1600-  this.game.camera.x,this.y +2522- this.game.camera.y,54,86);
//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1300-  this.game.camera.x,this.y +2822- this.game.camera.y,54,86);
//   ctx.drawImage(this.spritesheet2,200,121, 54,86, this.x + 1500-  this.game.camera.x,this.y +3202- this.game.camera.y,54,86);
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'red';
              //  ctx.strokeRect(this.x +200- this.game.camera.x  , this.y +1720 - this.game.camera.y , 130,170);
                ctx.strokeRect(this.x +900- this.game.camera.x  , this.y  +2725- this.game.camera.y , 54,86);

    }

}
}

class GraveYard{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

       
        // spritesheet
        this.spritesheet4 = ASSET_MANAGER.getAsset("./sprites/props.png");

     this.updateBB();

    }; 
    updateBB(){
        this.BB = new BoundingBox(this.x +5- this.game.camera.x  , this.y  +2700- this.game.camera.y , 150,160);               

      
         ;
     }
    update(){
        this.BB = new BoundingBox(this.x +5- this.game.camera.x  , this.y  +2700- this.game.camera.y , 150,160);               
          
    };
    draw(ctx) {

        ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x -  this.game.camera.x,this.y +2699- this.game.camera.y,35,50);
        ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x+40 -  this.game.camera.x,this.y +2699- this.game.camera.y,35,50);
        ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x +80-  this.game.camera.x,this.y +2699- this.game.camera.y,35,50);
        ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x +120-  this.game.camera.x,this.y +2699- this.game.camera.y,35,50);
       ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x -  this.game.camera.x,this.y +2759- this.game.camera.y,35,50);
        ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x+40 -  this.game.camera.x,this.y +2759- this.game.camera.y,35,50);
        ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x +80-  this.game.camera.x,this.y +2759- this.game.camera.y,35,50);
        ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x +120-  this.game.camera.x,this.y +2759- this.game.camera.y,35,50);
        ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x -  this.game.camera.x,this.y +2809- this.game.camera.y,35,50);
        ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x+40 -  this.game.camera.x,this.y +2809- this.game.camera.y,35,50);
        ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x +80-  this.game.camera.x,this.y +2809- this.game.camera.y,35,50);
        ctx.drawImage(this.spritesheet4,220,298, 35,50, this.x +120-  this.game.camera.x,this.y +2809- this.game.camera.y,35,50);
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'red';
              //  ctx.strokeRect(this.x +200- this.game.camera.x  , this.y +1720 - this.game.camera.y , 130,170);
                ctx.strokeRect(this.x +5- this.game.camera.x  , this.y  +2700- this.game.camera.y , 150,160);

    }

}

}

class Column{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

       
        // spritesheet
        this.spritesheet4 = ASSET_MANAGER.getAsset("./sprites/props.png");

     this.updateBB();

    }; 
    updateBB(){
        this.BB = new BoundingBox(this.x +1120- this.game.camera.x  , this.y  +2726- this.game.camera.y , 50,80);               

      
         ;
     }
    update(){
        this.BB = new BoundingBox(this.x +1120- this.game.camera.x  , this.y  +2726- this.game.camera.y , 50,80);               
          
    };
    draw(ctx) {

        ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1125-  this.game.camera.x,this.y +2720- this.game.camera.y,45,85);
    // ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1025-  this.game.camera.x,this.y +2620- this.game.camera.y,45,85);
    // ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1225-  this.game.camera.x,this.y +2620- this.game.camera.y,45,85);
    // ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1125-  this.game.camera.x,this.y +2520- this.game.camera.y,45,85);
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'red';
              //  ctx.strokeRect(this.x +200- this.game.camera.x  , this.y +1720 - this.game.camera.y , 130,170);
                ctx.strokeRect(this.x +1120- this.game.camera.x  , this.y  +2726- this.game.camera.y , 50,80);

    }

}

}
class Chest{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

       
        // spritesheet
        this.spritesheet4 = ASSET_MANAGER.getAsset("./sprites/props.png");

     this.updateBB();

    }; 
    updateBB(){
        this.BB = new BoundingBox(this.x +1125- this.game.camera.x  , this.y +2920- this.game.camera.y , 39,37);               

      
         ;
     }
    update(){
        this.BB = new BoundingBox(this.x +1125- this.game.camera.x  , this.y +2920- this.game.camera.y , 39,37);               
          
    };
    draw(ctx) {

        ctx.drawImage(this.spritesheet4,93,27, 35,37, this.x +1125-  this.game.camera.x,this.y +2920- this.game.camera.y,35,37);

    // ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1025-  this.game.camera.x,this.y +2620- this.game.camera.y,45,85);
    // ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1225-  this.game.camera.x,this.y +2620- this.game.camera.y,45,85);
    // ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1125-  this.game.camera.x,this.y +2520- this.game.camera.y,45,85);
            if (PARAMS.DEBUG) {
                ctx.strokeStyle = 'red';
              //  ctx.strokeRect(this.x +200- this.game.camera.x  , this.y +1720 - this.game.camera.y , 130,170);
                ctx.strokeRect(this.x +1125- this.game.camera.x  , this.y +2920- this.game.camera.y , 39,37);

    }

}

}


class Turret{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.radius = 45*5;
        this.initialPoint = { x, y };
        this.elaspedTime =0;
        // spritesheet
        this.spritesheet4 = ASSET_MANAGER.getAsset("./sprites/props.png");

     this.updateBB();

    }; 
    updateBB(){
        this.BB = new BoundingBox(this.x +780- this.game.camera.x  , this.y +2640- this.game.camera.y , 329,327);               

      
        
     }
    update(){
        this.elaspedTime+= this.game.clockTick;
    //    console.log(this.elaspedTime)
        this.BB = new BoundingBox(this.x +780- this.game.camera.x  , this.y +2640- this.game.camera.y , 329,327);               
      
           // }
    };
    draw(ctx) {

        ctx.drawImage(this.spritesheet4,349,267, 100,80, this.x +900-  this.game.camera.x,this.y +2760- this.game.camera.y,90,80);
        ctx.drawImage(this.spritesheet4,442,17, 45,80, this.x +925-  this.game.camera.x,this.y +2740- this.game.camera.y,45,80);
    // ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1025-  this.game.camera.x,this.y +2620- this.game.camera.y,45,85);
    // ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1225-  this.game.camera.x,this.y +2620- this.game.camera.y,45,85);
    // ctx.drawImage(this.spritesheet4,348,167, 45,85, this.x +1125-  this.game.camera.x,this.y +2520- this.game.camera.y,45,85);
            if (PARAMS.DEBUG) {
            //     ctx.strokeStyle = 'red';
            //   //  ctx.strokeRect(this.x +200- this.game.camera.x  , this.y +1720 - this.game.camera.y , 130,170);
            //     ctx.strokeRect(this.x +780- this.game.camera.x  , this.y +2640- this.game.camera.y , 329,327);

            //     ctx.strokeStyle = "Black";
            //     ctx.beginPath();
            //     ctx.moveTo(this.initialPoint.x, this.initialPoint.y);
            //     // for (var i = 0; i < this.path.length; i++) {
            //     //     ctx.lineTo(this.path[i].x, this.path[i].y);
            //     // };
            //     ctx.stroke();
    
            //     ctx.strokeStyle = "orange";
            //     ctx.beginPath();
            //    ctx.arc(this.x+950-this.game.camera.x, this.y+2800-this.game.camera.y, this.radius , 0, 2 * Math.PI);
            //     ctx.closePath();
            //     ctx.stroke();
    
            //     ctx.setLineDash([5, 15]);
            //     ctx.beginPath();
            //     ctx.arc(this.x-this.game.camera.x, this.y-this.game.camera.y, this.visualRadius, 0, 2 * Math.PI);
            //      ctx.closePath();
            //     ctx.stroke();
            //      ctx.setLineDash([]);

    }

}

}

