class Skele {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });
      
        this.radius = 60;
        this.faceleft = false;

        this.healthbar= new HealthBar(this);
        this.hitpoints = 5100;
        this.maxhitpoints = 5100;

        this.visualRadius = 400;
        this.chase = true;
        this.initialPoint = { x, y };
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy/skeletondownattack.png");
        this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonhitright.png");
        this.spritesheet3 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonleftattack.png");
        this.spritesheet4 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonupattack.png");
        this.spritesheet5 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonwalkdown.png");
        this.spritesheet6 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonwalkleft.png");
        this.spritesheet7 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonwalkright.png");
        this.spritesheet8 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonwalkup.png");
        this.fireRate = 1;

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
        //walk left
        this.animations[0].push(new Animator( this.spritesheet6, // Assuming spritesheet is a property of the Wizard class
        0,
       0,
        96,
        77,
        8,
        0.2,
        0,
        false,
        true));
        this.animations.push([]);
        //walk right
        this.animations[1].push(new Animator( this.spritesheet7, // Assuming spritesheet is a property of the Wizard class
        0,
       0,
        96,
        77,
        8,
        0.2,
        0,
        false,
        true));
        this.animations.push([]);

    //work  walkdown
    this.animations[2].push(new Animator( this.spritesheet5, // Assuming spritesheet is a property of the Wizard class
        0,
       0,
        80,
        67,
        8,
        0.2,
        0,
        false,
        true));
        this.animations.push([]);
        //walk up
        this.animations[3].push(new Animator( this.spritesheet8, // Assuming spritesheet is a property of the Wizard class
        0,
       0,
        80,
        67,
        8,
        0.2,
        0,
        false,
        true));
        this.animations.push([]);


    // hit left
    this.animations[4].push(new Animator( this.spritesheet3, // Assuming spritesheet is a property of the Wizard class
    0,
   0,
    79.5,
    79,
    7,
    0.1,
    0,
    false,
    true));
    this.animations.push([]);
    //hit right
    this.animations[5].push(new Animator( this.spritesheet2, // Assuming spritesheet is a property of the Wizard class
    0,
   0,
    80.1,
    79,
    7,
    0.1,
    0,
    false,
    true));
    this.animations.push([]);

//work 3,   down,up
    this.animations[6].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
    0,
   0,
    79.8,
    80,
    7,
    0.2,
    0,
    false,
    true));
    this.animations.push([]);

    this.animations[7].push(new Animator( this.spritesheet4, // Assuming spritesheet is a property of the Wizard class
    0,
   0,
    79.8,
    80,
    7,
    0.2,
    0,
    false,
    true));
    this.animations.push([]);

//     };

this.updateBB()

     };

     updateBB() {
      
        this.BB = new BoundingBox(this.x -40- this.game.camera.x, this.y -40- this.game.camera.y, 90,90);
      
      };
     
    update() {
  //  this.x+=0.5;
  this.updateBB()

        this.elapsedTime += this.game.clockTick;
        var dist = distance(this, this.target);
        
      
        for (var i = 0; i < this.game.entities.length; i++) {
           
            var ent = this.game.entities[i];
            if (ent.BB && this.BB.collide(ent.BB)) {
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
                   // this.game.addEntity(new Tornado(this.game, this.x, this.y, ent, true, true));

            

           

                    
                 if(this.target.x < this.x ){
                    this.state =0;
                if(this.target.y < this.y&&this.target.y < this.y-100){

                  this.state =3;
               }

               if(this.target.y > this.y&&this.target.y > this.y+150){

                this.state =2;
             }
               
                 }
                   
                   
                  
                //  }
                // // else 
                 if(this.x <this.target.x){
                  
                  this.state =1;
                  if(this.target.y < this.y&&this.target.y < this.y-100){

                    this.state =3;
                 }
                 if(this.target.y > this.y&&this.target.y > this.y+150){

                    this.state =2;
                 }
                //         if(this.target.y <this.y){
                //             this.state =1;
                //         }
                //         else if(this.target.y >this.y){
                //             this.state = 1;
                //         }

                //         //  if(this.target.y -90 < this.y){
                //         //   this.state =3;
                //         //  }
                //         //  if(this.target.y +60> this.y){
                //         //   this.state =2;
                //         //  }
                       
                //         // else{
                //         //     this.state =1;
                //         //    }
        
                       

}
             

            }
            if (ent instanceof MainCharacter && collide(this, ent) ) {
      //       console.log("facelft " + this.faceleft)
              
         


             if(this.x > this.target.x ){
                this.state =4;
                // if(this.target.x< this.x && this.target.x > this.x-50){
                //     this.state =6
                // }else{
                //     this.state = 4;
                // }
             }
             if(this.x <this.target.x ){
                this.state = 5;
            
                 }

 
                    if(this.elapsedTime> this.fireRate){
                 this.game.addEntity(new Tornado(this.game, this.x, this.y-1, this, true, true));
                 this.game.addEntity(new Tornado(this.game, this.x+2, this.y-1, this, true, true));

                 this.game.addEntity(new Tornado(this.game, this.x-1, this.y, this, true, true));
                 this.game.addEntity(new Tornado(this.game, this.x-2, this.y, this, true, true));

                 this.game.addEntity(new Tornado(this.game, this.x+1, this.y, this, true, true));
                 this.game.addEntity(new Tornado(this.game, this.x+2, this.y, this, true, true));

                 this.game.addEntity(new Tornado(this.game, this.x, this.y+1, this, true, true));
                 this.game.addEntity(new Tornado(this.game, this.x+1, this.y+1, this, true, true));
                 this.game.addEntity(new Tornado(this.game, this.x+2, this.y+1, this, true, true));
                 this.game.addEntity(new Tornado(this.game, this.x+2, this.y+2, this, true, true));
                 this.game.addEntity(new Tornado(this.game, this.x+1, this.y+2, this, true, true));

                 this.game.addEntity(new Tornado(this.game, this.x+1, this.y+2, this, true, true));

                  this.game.addEntity(new Tornado(this.game, this.x-1, this.y+1, this, true, true));
                  this.game.addEntity(new Tornado(this.game, this.x-2, this.y+1, this, true, true));

                 this.game.addEntity(new Tornado(this.game, this.x-1, this.y+2, this, true, true));
                 this.game.addEntity(new Tornado(this.game, this.x-2, this.y+2, this, true, true));

                 this.game.addEntity(new Tornado(this.game, this.x-1, this.y-1, this, true, true));
                 this.game.addEntity(new Tornado(this.game, this.x-2, this.y-2, this, true, true));

                 this.game.addEntity(new Tornado(this.game, this.x+1, this.y-1, this, true, true));
                 this.game.addEntity(new Tornado(this.game, this.x+2, this.y-1, this, true, true));
                 this.game.addEntity(new Tornado(this.game, this.x+2, this.y-2, this, true, true));

                 this.game.addEntity(new Tornado(this.game, this.x+1, this.y-2, this, true, true));
                    }
                  

                    if (this.elapsedTime > 0.9) {
                        var damage = 7 + randomInt(4);
                        ent.hitpoints -= damage;
                        this.game.addEntity(new CharacterGetDamageScore(this.game, ent.x - this.game.camera.x +  Math.floor(Math.random() * (31 - 20) + 20),   ent.y - this.game.camera.y -  Math.floor(Math.random() * (31 - 20) + 20) , damage));

                        // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                        this.elapsedTime = 0;
                    }
                    if(ent.hitpoints<=0){
                      
                 
                        ent.isDead();
                      
                     
                     }
             
                
        
            }
       }
    
      if (this.state !== 4&&this.state!=5&&this.state!=6&&this.state!=7) {
            dist = distance(this, this.target);
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
            //this help me move
            // this.x += this.velocity.x * this.game.clockTick;
        
            // this.y += this.velocity.y * this.game.clockTick;
            if(!this.chase&&this.x>200&& this.y >2450 && this.y <2850){
          //      console.log(this.y)
                this.state =0;
                this.x -= 0.2;
             
            }
            if(!this.chase&&this.y>2850){
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

        if(this.state ==2){
            this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x -60 - this.game.camera.x, this.y -55 - this.game.camera.y, 1.5);

        } 
        
       else if(this.state ==3){
            this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x -60 - this.game.camera.x, this.y -55 - this.game.camera.y, 1.5);

        } 
        else{
     this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x -70 - this.game.camera.x, this.y -65 - this.game.camera.y, 1.5);
       
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'orange';

            ctx.strokeRect(this.x -40- this.game.camera.x, this.y -40- this.game.camera.y, 90,90);
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



class Skele2 {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });
      
        this.radius = 250;
        this.faceleft = false;

        this.healthbar= new HealthBar(this);
        this.hitpoints = 5100;
        this.maxhitpoints = 5100;

        this.visualRadius = 400;

        this.initialPoint = { x, y };
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy/skeletondownattack.png");
        this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonhitright.png");
        this.spritesheet3 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonleftattack.png");
        this.spritesheet4 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonupattack.png");
        this.spritesheet5 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonwalkdown.png");
        this.spritesheet6 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonwalkleft.png");
        this.spritesheet7 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonwalkright.png");
        this.spritesheet8 = ASSET_MANAGER.getAsset("./sprites/enemy/skeletonwalkup.png");
        this.fireRate = 1;

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
        //walk left
        this.animations[0].push(new Animator( this.spritesheet6, // Assuming spritesheet is a property of the Wizard class
        0,
       0,
        96,
        77,
        8,
        0.2,
        0,
        false,
        true));
        this.animations.push([]);
        //walk right
        this.animations[1].push(new Animator( this.spritesheet7, // Assuming spritesheet is a property of the Wizard class
        0,
       0,
        96,
        77,
        8,
        0.2,
        0,
        false,
        true));
        this.animations.push([]);

    //work  walkdown
    this.animations[2].push(new Animator( this.spritesheet5, // Assuming spritesheet is a property of the Wizard class
        0,
       0,
        80,
        67,
        8,
        0.2,
        0,
        false,
        true));
        this.animations.push([]);
        //walk up
        this.animations[3].push(new Animator( this.spritesheet8, // Assuming spritesheet is a property of the Wizard class
        0,
       0,
        80,
        67,
        8,
        0.2,
        0,
        false,
        true));
        this.animations.push([]);


    // hit left
    this.animations[4].push(new Animator( this.spritesheet3, // Assuming spritesheet is a property of the Wizard class
    0,
   0,
    79.5,
    79,
    7,
    0.1,
    0,
    false,
    true));
    this.animations.push([]);
    //hit right
    this.animations[5].push(new Animator( this.spritesheet2, // Assuming spritesheet is a property of the Wizard class
    0,
   0,
    80.1,
    79,
    7,
    0.1,
    0,
    false,
    true));
    this.animations.push([]);

//work 3,   down,up
    this.animations[6].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
    0,
   0,
    79.8,
    80,
    7,
    0.2,
    0,
    false,
    true));
    this.animations.push([]);

    this.animations[7].push(new Animator( this.spritesheet4, // Assuming spritesheet is a property of the Wizard class
    0,
   0,
    79.8,
    80,
    7,
    0.2,
    0,
    false,
    true));
    this.animations.push([]);

//     };


     };

    

    update() {

  //  this.x+=0.5;
        this.elapsedTime += this.game.clockTick;
        var dist = distance(this, this.target);
        
      
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent instanceof MainCharacter && canSee(this, ent)) {
                this.target = ent;
                //character
                   // this.game.addEntity(new Tornado(this.game, this.x, this.y, ent, true, true));

            

           

                    
                 if(this.target.x < this.x ){
                    this.state =0;
                if(this.target.y < this.y&&this.target.y < this.y-100){

                  this.state =3;
               }

               if(this.target.y > this.y&&this.target.y > this.y+150){

                this.state =2;
             }
               
                 }
                   
                   
                  
                //  }
                // // else 
                 if(this.x <this.target.x){
                  
                  this.state =1;
                  if(this.target.y < this.y&&this.target.y < this.y-100){

                    this.state =3;
                 }
                 if(this.target.y > this.y&&this.target.y > this.y+150){

                    this.state =2;
                 }
                //         if(this.target.y <this.y){
                //             this.state =1;
                //         }
                //         else if(this.target.y >this.y){
                //             this.state = 1;
                //         }

                //         //  if(this.target.y -90 < this.y){
                //         //   this.state =3;
                //         //  }
                //         //  if(this.target.y +60> this.y){
                //         //   this.state =2;
                //         //  }
                       
                //         // else{
                //         //     this.state =1;
                //         //    }
        
                       

}
             

            }
            if (ent instanceof MainCharacter && collide(this, ent) ) {
              
         


             if(this.x > this.target.x ){
                this.state =4;
                // if(this.target.x< this.x && this.target.x > this.x-50){
                //     this.state =6
                // }else{
                //     this.state = 4;
                // }
             }
             if(this.x <this.target.x ){
                this.state = 5;
            
                 }

 
                    if(this.elapsedTime> this.fireRate){
               //  this.game.addEntity(new Tornado(this.game, this.x, this.y, this, true, true));
               this.game.addEntity(new TurretShot(this.game, this.x, this.y, ent, true, true));

                        var damage = 7 + randomInt(4);
                    //    ent.hitpoints -= damage;
                       
                        // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                        this.elapsedTime = 0;
                    }
             
             
                
        
            }
       }
    
      if (this.state !== 4&&this.state!=5&&this.state!=6&&this.state!=7) {
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

        if(this.state ==2){
            this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x -2 - this.game.camera.x, this.y -11 - this.game.camera.y, 0.1);

        } 
        
       else if(this.state ==3){
            this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x -2 - this.game.camera.x, this.y -11 - this.game.camera.y, 0.1);

        } 
        else{
     this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x -2 - this.game.camera.x, this.y -11 - this.game.camera.y, 0.1);
       
        }

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

