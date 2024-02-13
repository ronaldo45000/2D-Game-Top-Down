class Wizard {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });
        //   this.x = -700;
        this.radius = 10;
        this.faceleft = false;
        this.counter=0;
        this.healthbar= new HealthBar(this);
        this.hitpoints = 100;
        this.maxhitpoints = 100;

        this.visualRadius = 200;
        this.condition = false;
        this.chase = true;
        this.timer =4000;
        this.initialPoint = { x, y };

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy/wizardRun.png");
        this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/enemy/wizardAttack1.png");
        this.spritesheet3 = ASSET_MANAGER.getAsset("./sprites/enemy/wizardidle.png");

        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

        var dist = distance(this, this.target);
       
        this.speed = 0.5;
        this.maxSpeed = 50; // pixels per second
        //speed invovle in x, y this case since there are different direciton
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        this.state = 0; 

        this.facing = 0;

        this.elapsedTime = 0;
   
        this.animations = [];
        this.animations.push([]);
                                                                   
        this.animations[0].push(new Animator( this.spritesheet, 
        0,
        0,
        251,
        169,
        8,
        0.2,
        0,
        false,
        true)); 

        this.animations.push([]);
        this.animations[1].push(new Animator( this.spritesheet2, 
        0,
        0,
        248,
        169,
        8,
        0.1,
        0,
        false,
        true));       
         this.animations.push([]);

        this.animations[2].push(new Animator( this.spritesheet3, // Assuming spritesheet is a property of the Wizard class
        0,
        0,
        250,
        169,
        8,
        0.2,
        0,
        false,
        true));
    };



    // };
    update() {
      this.counter +=this.game.clockTick
    //  console.log("COUTNER  " + this.counter)
        //    this.x+=1;
        this.elapsedTime += this.game.clockTick;
        var dist = distance(this, this.target);
        
      
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
 
        
      

          if (ent instanceof MainCharacter && !canSee(this, ent)) {
            this.state =0;
            this.chase =false;
          }
       
      

       if (ent instanceof MainCharacter && canSee(this, ent)) {
                this.target = ent;
                this.chase = true;
                //character

                if(this.x > this.target.x){
                   this.state =3;
                   this.faceleft = true;
                }
                else if(this.x <this.target.x){
                        this.state =0;
                        this.faceleft = false;
                }
             
              
            }
            if (ent instanceof MainCharacter && collide(this, ent)) {
             console.log("facelft " + this.faceleft)
          


               
                    this.state = 1;
                      
                    if (this.elapsedTime > 0.8) {
                        var damage = 7 + randomInt(4);
                        ent.hitpoints -= damage;
                        if( ent.hitpoints<=0){
                 
                            ent.isDead();
                            this.state =0;
                         }
                         else{
                        //this.state = 1;
                         }
                        this.elapsedTime = 0;
                    }
             
               if(this.state ===3){
                this.state = 1;
                this.elapsedTime = 0;
          
              }
                
        
            }
          



        }
    
        console.log("Y " + this.y)
        if (this.state !== 1) {
            dist = distance(this, this.target);
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
  if(!this.chase&& this.x<860 && this.y>2000){
    this.state =0;
console.log(this.velocity.x)
    this.x += 0.2;
  }
  if(!this.chase && this.x>=860){
    this.state = 2
  }
  if(!this.chase&&this.y>2055){
    this.y-=0.2
}
if(!this.chase&&this.y<2055){
  this.y+=0.2;
}   
        else if(this.chase){
          this.x += this.velocity.x * this.game.clockTick;
   
          this.y += this.velocity.y * this.game.clockTick;
       }
      }
        this.facing = getFacing(this.velocity);
     
    };

    draw(ctx) {

        var xOffset = 25;
        var yOffset = 30;
        var width = this.state ? 64 : 48;
       
        if(this.state ==2){
          ctx.save();
          ctx.scale(-1, 1);
          this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x - 120 + this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
          ctx.restore();
        }
  if(this.state==0 ){
  
    if (this.velocity.x < 0) { 
       
        ctx.save();
        ctx.scale(-1, 1);
        this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x - 120 + this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
        ctx.restore();
    }
    else{
    this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 120 - this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
    }
  }
  else if( this.state==1 && this.faceleft ==true){
    ctx.save();
ctx.scale(-1, 1);
this.animations[1][0].drawFrame(this.game.clockTick, ctx, -this.x - 120 + this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
ctx.restore();

  }
  else if( this.state==1 && this.faceleft ==false){
    this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 120 - this.game.camera.x, this.y - 140 - this.game.camera.y, 1);

  }
  //face left
    else if (this.state === 3) { 
        ctx.save();
        ctx.scale(-1, 1);
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, -this.x - 120 + this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
        ctx.restore();
    }





        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Black";
            ctx.beginPath();
            ctx.moveTo(this.initialPoint.x, this.initialPoint.y);
       
            ctx.stroke();

            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.arc(this.x-this.game.camera.x, this.y-this.game.camera.y, this.radius , 0, 2 * Math.PI);
            
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x-this.game.camera.x, this.y-this.game.camera.y, this.visualRadius, 0, 2 * Math.PI);
             ctx.closePath();
            ctx.stroke();
             ctx.setLineDash([]);
        }

        this.healthbar.draw(ctx);
    };
};
class Wizard2 {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });
        //   this.x = -700;
        this.radius = 20;
        this.faceleft = false;
        this.fireRate = 1;
  
        this.healthbar= new HealthBar(this);
        this.hitpoints = 100;
        this.maxhitpoints = 100;
  
        this.visualRadius = 200;
  
        this.initialPoint = { x, y };
  
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy/wizardRun.png");
        this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/enemy/wizardattack2.png");
        this.spritesheet3 = ASSET_MANAGER.getAsset("./sprites/enemy/wizardidle.png");

        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];
  
        var dist = distance(this, this.target);
       
  
        this.maxSpeed = 90; // pixels per second
        //speed invovle in x, y this case since there are different direciton
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        this.state = 0; // 0 walking, 1 attacking, 2 dead
  
        this.facing = 0; // 0 = up, clockwise
  
        this.elapsedTime = 0;
        // this.animator = new Animator(
        //     this.spritesheet, // Assuming spritesheet is a property of the Wizard class
        //     0,
        //     0,
        //     251,
        //     169,
        //     8,
        //     0.2,
        //     0,
        //     false,
        //     true
        // );
        this.animations = [];
        this.animations.push([]);
                                                                    //48 bc of one them with sword has that size, check the one largest width and height size
        this.animations[0].push(new Animator(this.spritesheet, // Assuming spritesheet is a property of the Wizard class
        0,
        0,
        250,
        169,
        8,
        0.2,
        0,
        false,
        true)); //top left 5 frames
        // this.animations[0].push(new Animator(this.spritesheet, 88, 9, 48, 53, 5, 0.2, 0, false, true));
        // this.animations[0].push(new Animator(this.spritesheet, 160, 9, 48, 53, 5, 0.2, 0, false, true));
        // this.animations[0].push(new Animator(this.spritesheet, 236, 9, 48, 53, 5, 0.2, 0, false, true));
        // this.animations[0].push(new Animator(this.spritesheet, 308, 9, 48, 53, 5, 0.2, 0, false, true));
  
        this.animations.push([]);
        this.animations[1].push(new Animator( this.spritesheet2, // Assuming spritesheet is a property of the Wizard class
        0,
        0,
        248,
        169,
        4,
        0.15,
        0,
        false,
        true));
  
        this.animations.push([]);
        this.animations[2].push(new Animator( this.spritesheet3, // Assuming spritesheet is a property of the Wizard class
        0,
        0,
        250,
        169,
        8,
        0.2,
        0,
        false,
        true));
  
        //     this.animator = new Animator(
        //     this.spritesheet, // Assuming spritesheet is a property of the Wizard class
        //     0,
        //     0,
        //     251,
        //     169,
        //     8,
        //     0.2,
        //     0,
        //     false,d
        //     true
        // );
     
        // this.animator2 = new Animator(
        //     this.spritesheet2, // Assuming spritesheet is a property of the Wizard class
        //     0,
        //     0,
        //     248,
        //     169,
        //     8,
        //     0.2,
        //     0,
        //     false,
        //     true
        // );
    };
  
  
  
    // };
    update() {
        //    this.x+=1;
        this.elapsedTime += this.game.clockTick;
        var dist = distance(this, this.target);
        
    //     if (ent instanceof MainCharacter  && canSee(this, ent) && this.elapsedTime > this.fireRate) {
    //       console.log("CHARACTER IS IN VISION OF TOWER")
    //   this.elapsedTime = 0;
   
   
  
    //  this.game.addEntity(new FireBall(this.game, this.x, this.y, ent, true, true));
      
   
  
  
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            // if (ent instanceof MainCharacter && !canSee(this, ent)){
            //     this.state = 2;
            // }

            if (ent instanceof MainCharacter && canSee(this, ent) && this.elapsedTime > this.fireRate &&  ent.y < 2200) {
                this.target = ent;
                //character
                this.elapsedTime = 0;
  
                this.game.addEntity(new FireBall(this.game, this.x, this.y, ent, true, true));
                if(this.x > this.target.x){
                   this.state =3;
                   this.faceleft = true;
                }
                else if(this.x <this.target.x){
                        this.state =0;
                        this.faceleft = false;
                }
                this.state = 1;
              
            }
            if (ent instanceof MainCharacter && !canSee(this, ent) && this.elapsedTime > this.fireRate) {
          //   console.log("facelft " + this.faceleft)
              
          
  
  
                      
              //       this.state = 1;
              //       if (this.elapsedTime > 0.8) {
              //           var damage = 7 + randomInt(4);
              //           ent.hitpoints -= damage;
                       
              //           // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
              //           this.elapsedTime = 0;
              //       }
             
              //  if(this.state ===3){
              //   this.state = 1;
              //   this.elapsedTime = 0;
          
              // }
              this.state = 2;
        
            }
  
  if (ent instanceof Boar && canSee(this, ent)) {
                this.target = ent;
                //character
  
                if(this.x > this.target.x){
                   this.state =3;
                   this.faceleft = true;
                }
                else if(this.x <this.target.x){
                        this.state =0;
                        this.faceleft = false;
                }
             
              
            }
            if (ent instanceof Boar && collide(this, ent)) {
             console.log("facelft " + this.faceleft)
              
          
  
  
                      
                    this.state = 1;
                    if (this.elapsedTime > 0.8) {
                        var damage = 7 + randomInt(4);
                        ent.hitpoints -= damage;
                       
                        // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                        this.elapsedTime = 0;
                    }
             
               if(this.state ===3){
                this.state = 1;
                this.elapsedTime = 0;
          
              }
                
        
            }
  
  
        }
    
        if (this.state !== 1) {
            dist = distance(this, this.target);
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
            //this help me move
            // this.x += this.velocity.x * this.game.clockTick;
        
            // this.y += this.velocity.y * this.game.clockTick;
         }
  
        this.facing = getFacing(this.velocity);
     
    };
  
    draw(ctx) {
  
        var xOffset = 25;
        var yOffset = 30;
        var width = this.state ? 64 : 48;
        //  ctx.save();
        //   ctx.scale(-1,1)
    //    this.animator.drawFrame(this.game.clockTick, ctx, this.x-330-this.game.camera.x , this.y-190-this.game.camera.y, 1); // Scale set to 1 for no scaling
  if(this.state ==2){
    ctx.save();
    ctx.scale(-1, 1);
    this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x - 120 + this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
    ctx.restore();
  }



  if(this.state==0 ){
    //velocity is helpful when face left or right on not targeting anyone
    if (this.velocity.x < 0) {  // Check if x velocity is negative (moving left)
        // Draw the wizard facing left
        ctx.save();
        ctx.scale(-1, 1);
        this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x - 120 + this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
        ctx.restore();
    }
    else{
    this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 120 - this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
    }
  }
  else if( this.state==1 && this.faceleft ==true){
    ctx.save();
  ctx.scale(-1, 1);
  this.animations[1][0].drawFrame(this.game.clockTick, ctx, -this.x - 120 + this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
  ctx.restore();
  
  }
  else if( this.state==1 && this.faceleft ==false){
    this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 120 - this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
  
  }
    else if (this.state === 3) { // Example: checking for state 3
        ctx.save();
        ctx.scale(-1, 1);
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, -this.x - 120 + this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
        ctx.restore();
    }
  
  
        // Select the animation based on the current state
  //     this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 120 - this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
    
     //for carmera view, change this.game.camera.x
  //     ctx.save();
  //     ctx.scale(-1,1)
  //  this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x+50+this.game.camera.x , this.y-190-this.game.camera.y, 1);
  //      ctx.restore();
  
  
  
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Black";
            ctx.beginPath();
            ctx.moveTo(this.initialPoint.x, this.initialPoint.y);
            // for (var i = 0; i < this.path.length; i++) {
            //     ctx.lineTo(this.path[i].x, this.path[i].y);
            // };
            ctx.stroke();
  
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.arc(this.x-this.game.camera.x, this.y-this.game.camera.y, this.radius , 0, 2 * Math.PI);
            
            ctx.closePath();
            ctx.stroke();
  
            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x-this.game.camera.x, this.y-this.game.camera.y, this.visualRadius, 0, 2 * Math.PI);
             ctx.closePath();
            ctx.stroke();
             ctx.setLineDash([]);
        }
  
        this.healthbar.draw(ctx);
    };
  };
  