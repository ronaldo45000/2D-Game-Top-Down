class Portal {
    constructor(game, x, y,size) {
        Object.assign(this, { game, x, y });
        this.x = x;
        this.y = y;
     
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/endportal.png");
        this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/endportal.png");

      

        this.elapsedTime = 0;
        this.animations = [];
        this.animations.push([]);
            //walk
        this.animations[0].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
        0,
        157*5+190,
        317,
        281,
        6,
        0.4,
        0,
        false,
        true));
        this.animations.push([]);

       


        this.animations[1].push(new Animator( this.spritesheet2, // Assuming spritesheet is a property of the Wizard class
        0,
        0,
        150,
        100,
        8,
        0.2,
        0,
        false,
        true));

    };

    updateBB(){
        // this.BB = new BoundingBox(this.x +50- this.game.camera.x , this.y +1600  - this.game.camera.y ,40, 150);
               
        this.BB = new BoundingBox(this.x - this.game.camera.x , this.y  - this.game.camera.y ,100, 120)
      
         ;
     }

    // };
    update() {
        this.updateBB();

          
            }
        
                      

    
    

    draw(ctx) {
        
        var xOffset = 25;
        var yOffset = 30;
        var width = this.state ? 64 : 48;
        //  ctx.save();
        //   ctx.scale(-1,1)
    //    this.animator.drawFrame(this.game.clockTick, ctx, this.x-330-this.game.camera.x , this.y-190-this.game.camera.y, 1); // Scale set to 1 for no scaling
  
 // if(this.state==0 ){

    this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x -40 - this.game.camera.x, this.y  - 20  - this.game.camera.y, 0.5);
    if (PARAMS.DEBUG) {
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.x - this.game.camera.x , this.y  - this.game.camera.y ,100, 120);
     

    }
    };
};

// class PortalMap{
//     constructor(game, x, y) {
//         Object.assign(this, { game, x, y });

//         this.x = 400;
//         this.y = 400;
//         this.game.land = this;
//         // spritesheet
//         this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bossmap.png");
       
//         this.state = 0; 
//         this.test = false;
//         this.listOf4Plant  = [];
//         this.characterBoss =  new Boss(this.game,800, -31, [{ x: randomInt(0), y: randomInt(0) }, { x: randomInt(0), y: randomInt(0) }, { x: randomInt(0), y: randomInt(0) }, { x: 0, y: 0 }]);
       
//         this.BB = new BoundingBox(this.x-609,this.y-690,290+1000,360+1000)

//       //  this.updateBB();

//         // mario's animations
//         //find condition for this
//         // collide boss
//         //2 maps, 1 map to delete then add greengoblim then map
//         //only remove if character interact boss
//        //this.characterBoss.characterTouchBoss
     
//     }; 

   

//     update(){
//     //     this.test = this.characterBoss.setTouchBoss();
//     console.log("PORTAL MAP IS AT " + this.x)
//     //     if(this.test == true){
//     //    //     console.log("THIS>TEST IS " + this.test)
//     //  //setTimeout(() => {
//     //        //  this.removeFromWorld = true;
//     //     //  }, 6000);
//     //   }
//     };
//     draw(ctx) {
//         const scale = 0.5;
//         ctx.clearRect(0, 0,1000, 1000);
//         ctx.drawImage(this.spritesheet,0,0,2000,2100, (this.x +690- this.game.camera.x)-1100,(this.y +1190- this.game.camera.y-1300) -300,6110,4090) 
    
//         if (PARAMS.DEBUG) {
//             ctx.strokeStyle = 'red';
//             // ctx.strokeRect( this.BB.x - (this.game.camera.x+200), this.BB.y -this.game.camera.y-190 , this.BB.width+250, this.BB.height + 310);
//             ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, this.BB.width+1000, this.BB.height+1000);

//         }
//     }

// }



