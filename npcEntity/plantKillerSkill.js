class PlantKiller{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.game = game;
        this.radius = 99/2;
        this.x = x;
        this.y = y;
        this.height = 32;
        this.width = 32;
        this.removeFromWorld = false;
      //  this.game.land = this;
        // spritesheet
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/plantkiller.png");
       this.animations = []
       this.loadAnimation();
       this.updateBB();
       this.elapsedTime = 0;
       this.elapsedTime1 = 0;
       this.damageBase =  50;

    }; 
    loadAnimation(){
        this.animations.push(new Animator(this.spritesheet, 0, 32, 32, 32, 12, 0.15, 0, false, true));   
        this.animations.push(new Animator(this.spritesheet, 0, 128, 96, 96, 11, 0.15, 0, false, true));   

    }
    updateBB(){
        this.BB = new BoundingBox(this.x   - this.game.camera.x - this.width/2, this.y   - this.game.camera.y + this.height/2, this.width, this.height);
      //  console.log(this.BB);
    }

    update(){
        if(this.elapsedTime1 <= 5)  this.elapsedTime1 += this.game.clockTick;

        if(this.elapsedTime >= 10) this.removeFromWorld = true; 
        if(this.elapsedTime <= 11)  this.elapsedTime += this.game.clockTick;
        if (collide(this,  this.game.character)) {
          if (this.elapsedTime1 > 1.5 && this.elapsedTime >= 2 ) {
              var damage = this.damageBase + randomInt(4);
              this.game.character.hitpoints -= damage;
                this.game.addEntity(new CharacterGetDamageScore(this.game, this.game.character.x - this.game.camera.x +  Math.floor(Math.random() * (31 - 20) + 20),   this.game.character.y - this.game.camera.y -  Math.floor(Math.random() * (31 - 20) + 20) , damage));
                this.elapsedTime1 = 0;
                if( this.game.character.hitpoints<=0){
                    //ent.removeFromWorld = true;
                    this.game.countDeath += 1;
                    this.game.character.isDead();
                }
          }
        }


        this.updateBB();
    };
    draw(ctx) {
        if(this.elapsedTime <=2 ) this.animations[0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x ,this.y - this.game.camera.y ,PARAMS.SCALE);
        else
        this.animations[1].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - 32 ,this.y - this.game.camera.y -32,PARAMS.SCALE);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.x   - this.game.camera.x , this.y   - this.game.camera.y , this.width, this.height);
            
           // ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x +this.width/2 , this.y - this.game.camera.y + this.height/2 , this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();


            // ctx.setLineDash([5, 15]);
            // ctx.beginPath();
            // ctx.arc(this.x - this.game.camera.x , this.y - this.game.camera.y   , this.visualRadius, 0, 2 * Math.PI);
            // ctx.closePath();
            // ctx.stroke();

            ctx.setLineDash([]);
        }

    }

}
 