class WizardSpawn{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.height = 127;
        this.width = 99;
        // spritesheet
      this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/wizardspawn.png");
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/house.png");

       this.updateBB();

    }; 

    updateBB(){
       // this.BB = new BoundingBox(this.x +50- this.game.camera.x , this.y +1600  - this.game.camera.y ,40, 150);
              
          this.BB = new BoundingBox(this.x - this.game.camera.x , this.y   - this.game.camera.y ,2100, 2100);
     
        ;
    }
  
    update(){
        this.updateBB();
    };
    draw(ctx) {
   
       // ctx.drawImage(this.spritesheet,120,256, 43,96, this.x - this.game.camera.x,this.y - this.game.camera.y,this.width,this.height);
       ctx.drawImage(this.spritesheet2,0,0, 1500,1500, this.x +100- this.game.camera.x,this.y +1800 - this.game.camera.y,1300,1300);
      ctx.drawImage(this.spritesheet,0,0, 1500,1500, this.x +130- this.game.camera.x,this.y +1680 - this.game.camera.y,700,700);

      //  ctx.fillRect(0, 0, 2000, 2500);
      if (PARAMS.DEBUG) {
      ctx.strokeStyle = 'blue';
    //  ctx.strokeRect(this.x +200- this.game.camera.x  , this.y +1720 - this.game.camera.y , 130,170);
      ctx.strokeRect(this.x - this.game.camera.x  , this.y  - this.game.camera.y , 2100,2100);

    //   ctx.strokeRect(this.x +220- this.game.camera.x  , this.y +1600 - this.game.camera.y , 40,150);
    //   ctx.strokeRect(this.x +50- this.game.camera.x  , this.y +1730 - this.game.camera.y , 220,30);

      }
    }

}
 

class Campfire {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });
        this.x = x;
        this.y = y;
        
        this.speed = 0.5;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemyhouse.png");

        this.animations = null;
        this.loadAnimations();
        this.elapsedTime = 0;
        this.updateBB();
    };

    updateBB(){
       
      // this.BB = new BoundingBox(this.x +220- this.game.camera.x , this.y +1600  - this.game.camera.y ,40, 150);
    //  this.BB3 = new BoundingBox(this.x +50- this.game.camera.x , this.y +1730  - this.game.camera.y ,220,30);
      //  console.log(this.BB);
    }
  
    loadAnimations() {
        this.animations = new Animator(this.spritesheet,319, 170, 32, 50, 3, 0.25, 0, false, true);
    };

    update() {
        this.updateBB();
    };
    draw(ctx) {
        this.animations.drawFrame(this.game.clockTick,
            ctx,
            this.x +260- this.game.camera.x - (48/2),
            this.y +1950- this.game.camera.y - (46/2) ,
            1);
    }

}


class WizardSpawn2{
  constructor(game, x, y) {
      Object.assign(this, { game, x, y });

      this.height = 127;
      this.width = 99;
      // spritesheet
    this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/wizardspawn.png");
     this.spritesheet = ASSET_MANAGER.getAsset("./sprites/house.png");


  }; 

  updateBB(){
     // this.BB = new BoundingBox(this.x +50- this.game.camera.x , this.y +1600  - this.game.camera.y ,40, 150);
            
        this.BB = new BoundingBox(this.x +200- this.game.camera.x , this.y +1720  - this.game.camera.y ,130, 170);
   
      ;
  }

  update(){
      this.updateBB();
  };
  draw(ctx) {
 
     // ctx.drawImage(this.spritesheet,120,256, 43,96, this.x - this.game.camera.x,this.y - this.game.camera.y,this.width,this.height);
     ctx.drawImage(this.spritesheet2,0,0, 1500,1500, this.x +100- this.game.camera.x,this.y +1800 - this.game.camera.y,1300,1300);
    ctx.drawImage(this.spritesheet,0,0, 1500,1500, this.x +130- this.game.camera.x,this.y +1680 - this.game.camera.y,700,700);

    //  ctx.fillRect(0, 0, 2000, 2500);
    if (PARAMS.DEBUG) {
    ctx.strokeStyle = 'blue';
  //  ctx.strokeRect(this.x +200- this.game.camera.x  , this.y +1720 - this.game.camera.y , 130,170);
  ctx.strokeRect(this.x +200- this.game.camera.x  , this.y +1720 - this.game.camera.y , 130,170);
  //   ctx.strokeRect(this.x +220- this.game.camera.x  , this.y +1600 - this.game.camera.y , 40,150);
  //   ctx.strokeRect(this.x +50- this.game.camera.x  , this.y +1730 - this.game.camera.y , 220,30);

    }
  }

}