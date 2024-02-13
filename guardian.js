class Guardian {
  constructor(game, x, y, path) {
      Object.assign(this, { game, x, y, path });
    
    this.radius = 76;
 // this.radius = 446;
      this.faceleft = false;

      this.healthbar= new HealthBar(this);
      this.hitpoints = 100;
      this.maxhitpoints = 100;
      this.chase = true;
      this.visualRadius = 400;

      this.initialPoint = { x, y };
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/guardian.png");
 
      this.targetID = 0;
      if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

      var dist = distance(this, this.target);
      this.maxSpeed = 70; // pixels per second
      //speed invovle in x, y this case since there are different direciton
      this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
      this.state = 0; // 0 walking, 1 attacking, 2 dead

      this.facing = 0; // 0 = up, clockwise

      this.elapsedTime = 0;
      this.animations = [];
      this.animations.push([]);
      this.animations[0].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
      0,
      127*1,
      192,
      127,
      10,
      0.2,
      0,
      false,
      true));
      this.animations.push([]);

      this.animations[1].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
      0,
      127*4,
      192,
      127,
      11,
      0.1,
      0,
      false,
      true));
      this.animations.push([]);

      this.animations[2].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
      0,
      127*3,
      192,
      127,
      7,
      0.2,
      0,
      false,
      true));
      this.animations.push([]);

      this.updateBB();


  };

  updateBB() {
    
    this.BB = new BoundingBox(this.x -40- this.game.camera.x, this.y -80- this.game.camera.y, 90,90);
  
  };

  // };
  update() {
    this.updateBB();

      this.elapsedTime += this.game.clockTick;
      var dist = distance(this, this.target);

    
      for (var i = 0; i < this.game.entities.length; i++) {



          var ent = this.game.entities[i];
          if (ent.BB && this.BB.collide(ent.BB)) {
          if( ent instanceof InvisibleFenceBlocker){
              const collisionDirection = this.BB.checkCollisionSides(ent.BB);
         if(collisionDirection.top) {
          console.log("TRUE TOUCH BOSS BLOCK")
      
                  this.y -= 60;
              }

          }
          if(ent instanceof SnowMap||ent instanceof SnowMap2 ||ent instanceof SnowMap3 ||ent instanceof GraveYard|| ent instanceof Column){
            const collisionDirection = this.BB.checkCollisionSides(ent.BB);
            var a = 0.5;
            if(collisionDirection.left){
                this.x -= a;
            }else if(collisionDirection.right) {
                this.x += a;
            }else if(collisionDirection.top) {
                this.y -= a;
            }else if(collisionDirection.bottom) {
                this.y += a;
            }
         
        }
        }
          if (ent instanceof MainCharacter && !canSee(this, ent)) {
            this.state =0;
            this.chase =false;
           }
          if (ent instanceof MainCharacter && canSee(this, ent)) {
            this.chase = true;
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
          if (ent instanceof MainCharacter && collide(this, ent)) {
           console.log("facelft " + this.faceleft)
            
          //  if(this.elapsedTime>1){
          //     this.game.addEntity(new SnowThrow(this.game, this.x, this.y-1, this, true, true));
          //     this.game.addEntity(new SnowThrow(this.game, this.x+2, this.y-1, this, true, true));

          //     this.game.addEntity(new SnowThrow(this.game, this.x-1, this.y, this, true, true));
          //     this.game.addEntity(new SnowThrow(this.game, this.x-2, this.y, this, true, true));

          //     this.game.addEntity(new SnowThrow(this.game, this.x+1, this.y, this, true, true));
          //     this.game.addEntity(new SnowThrow(this.game, this.x+2, this.y, this, true, true));

          //     this.game.addEntity(new SnowThrow(this.game, this.x, this.y+1, this, true, true));
          //     this.game.addEntity(new SnowThrow(this.game, this.x+1, this.y+1, this, true, true));
          //     this.game.addEntity(new SnowThrow(this.game, this.x+2, this.y+1, this, true, true));
          //     this.game.addEntity(new SnowThrow(this.game, this.x+2, this.y+2, this, true, true));
          //     this.game.addEntity(new SnowThrow(this.game, this.x+1, this.y+2, this, true, true));

          //     this.game.addEntity(new SnowThrow(this.game, this.x+1, this.y+2, this, true, true));

          //      this.game.addEntity(new SnowThrow(this.game, this.x-1, this.y+1, this, true, true));
          //      this.game.addEntity(new SnowThrow(this.game, this.x-2, this.y+1, this, true, true));

          //     this.game.addEntity(new SnowThrow(this.game, this.x-1, this.y+2, this, true, true));
          //     this.game.addEntity(new SnowThrow(this.game, this.x-2, this.y+2, this, true, true));

          //     this.game.addEntity(new SnowThrow(this.game, this.x-1, this.y-1, this, true, true));
          //     this.game.addEntity(new SnowThrow(this.game, this.x-2, this.y-2, this, true, true));

          //     this.game.addEntity(new SnowThrow(this.game, this.x+1, this.y-1, this, true, true));
          //     this.game.addEntity(new SnowThrow(this.game, this.x+2, this.y-1, this, true, true));
          //     this.game.addEntity(new SnowThrow(this.game, this.x+2, this.y-2, this, true, true));

          //     this.game.addEntity(new SnowThrow(this.game, this.x+1, this.y-2, this, true, true));
          // }
         
        
           
                    
                  this.state = 1;
                  if (this.elapsedTime > 0.9) {
                  
                          this.game.addEntity(new SnowThrow(this.game, this.x, this.y-1, this, true, true));
                          this.game.addEntity(new SnowThrow(this.game, this.x+2, this.y-1, this, true, true));
         
                          this.game.addEntity(new SnowThrow(this.game, this.x-1, this.y, this, true, true));
                          this.game.addEntity(new SnowThrow(this.game, this.x-2, this.y, this, true, true));
         
                          this.game.addEntity(new SnowThrow(this.game, this.x+1, this.y, this, true, true));
                          this.game.addEntity(new SnowThrow(this.game, this.x+2, this.y, this, true, true));
         
                          this.game.addEntity(new SnowThrow(this.game, this.x, this.y+1, this, true, true));
                          this.game.addEntity(new SnowThrow(this.game, this.x+1, this.y+1, this, true, true));
                          this.game.addEntity(new SnowThrow(this.game, this.x+2, this.y+1, this, true, true));
                          this.game.addEntity(new SnowThrow(this.game, this.x+2, this.y+2, this, true, true));
                          this.game.addEntity(new SnowThrow(this.game, this.x+1, this.y+2, this, true, true));
         
                          this.game.addEntity(new SnowThrow(this.game, this.x+1, this.y+2, this, true, true));
         
                           this.game.addEntity(new SnowThrow(this.game, this.x-1, this.y+1, this, true, true));
                           this.game.addEntity(new SnowThrow(this.game, this.x-2, this.y+1, this, true, true));
         
                          this.game.addEntity(new SnowThrow(this.game, this.x-1, this.y+2, this, true, true));
                          this.game.addEntity(new SnowThrow(this.game, this.x-2, this.y+2, this, true, true));
         
                          this.game.addEntity(new SnowThrow(this.game, this.x-1, this.y-1, this, true, true));
                          this.game.addEntity(new SnowThrow(this.game, this.x-2, this.y-2, this, true, true));
         
                          this.game.addEntity(new SnowThrow(this.game, this.x+1, this.y-1, this, true, true));
                          this.game.addEntity(new SnowThrow(this.game, this.x+2, this.y-1, this, true, true));
                          this.game.addEntity(new SnowThrow(this.game, this.x+2, this.y-2, this, true, true));
         
                          this.game.addEntity(new SnowThrow(this.game, this.x+1, this.y-2, this, true, true));
                      
                      var damage = 7 + randomInt(4);
                      ent.hitpoints -= damage;
                    
                      this.game.addEntity(new CharacterGetDamageScore(this.game, ent.x - this.game.camera.x +  Math.floor(Math.random() * (31 - 20) + 20),   ent.y - this.game.camera.y -  Math.floor(Math.random() * (31 - 20) + 20) , damage));
                      this.elapsedTime = 0;
                  }
                  if(ent.hitpoints<=0){
                    
               
                    ent.isDead();
                  
                 
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
          if(!this.chase&&this.x<1900){
     
            this.state =0;
            this.x += 0.2;
         
        }
        if(!this.chase&&this.x>=1900){
       //   console.log("HERE")
          this.state =2;
       
       
      }
        if(!this.chase&&this.y<3180){
          this.y+=0.2
      }
      if(!this.chase&&this.y>3180){
        this.y-=0.2
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
      if(this.state==2 ){

        // this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 300 - this.game.camera.x, this.y - 260 - this.game.camera.y, 3);
        
        ctx.save();
        ctx.scale(-1, 1);
        this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x -110 + this.game.camera.x, this.y - 110 - this.game.camera.y,1.2);
        ctx.restore();
    
      }
      if(this.state==0 ){

        // this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 300 - this.game.camera.x, this.y - 260 - this.game.camera.y, 3);
        
        ctx.save();
        ctx.scale(-1, 1);
        this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x -110 + this.game.camera.x, this.y - 110 - this.game.camera.y,1.2);
        ctx.restore();
    
      }
    //   if(this.state ==1){
    //     this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 150 - this.game.camera.x, this.y - 160 - this.game.camera.y, 3);
    //   }
     // }
      else if( this.state==1 && this.faceleft ==true){
     
    this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x -110 - this.game.camera.x, this.y - 110 - this.game.camera.y,1.1);
    //this.summonGoblins() ;
    
      }
      else if( this.state==1 && this.faceleft ==false){
        ctx.save();
        ctx.scale(-1, 1);
        this.animations[1][0].drawFrame(this.game.clockTick, ctx, -this.x-110 + this.game.camera.x, this.y - 110 - this.game.camera.y, 1.1);
        ctx.restore();
       
    
    
    
    }
        else if (this.state === 3) { // Example: checking for state 3 is flip not TELEPORTATRION
    
            this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x -110- this.game.camera.x, this.y - 110 - this.game.camera.y,1.1);
          
        }



      if (PARAMS.DEBUG) {

        ctx.strokeStyle = 'orange';

        ctx.strokeRect(this.x -40- this.game.camera.x, this.y -80- this.game.camera.y, 90,90);

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
