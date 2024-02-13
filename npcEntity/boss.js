class Boss {
  constructor(game, x, y, path) {
      Object.assign(this, { game, x, y, path });
      this.cooldown =0;
      this.time =0;
      this.onetime = true;
      this.radius = 50;
      this.faceleft = false;
      this.characterTouchBoss= false;
      this.summonedGoblinFlag = false
      this.healthbar= new HealthBar(this);
      this.hitpoints = 100;
      this.maxhitpoints = 100;
      this.bossDeath = false;
      this.firstsummon = true;
      this.visualRadius = 200;
      this.initialPoint = { x, y };
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Bringer-of-Death-SpritSheet.png");
      this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/Bringer-of-Death-SpritSheet.png");
      this.targetID = 0;
      if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

      var dist = distance(this, this.target);
      this.maxSpeed = 60; // pixels per second
      //speed invovle in x, y this case since there are different direciton
      this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
      this.state = 6; // 0 walking, 1 attacking, 2 dead

      this.facing = 0; // 0 = up, clockwise
      this.updateBB();
      this.onetime = false;
      this.elapsedTime4 =0;
      this.notidle = true;
      this.elapsedTime = 0;
      this.elapsedTime2 = 0;
      this.elapsedTime3 = 0;
      this.tp = false;
      
      this.animations = [];
      this.animations.push([]);
          //walk
      this.animations[0].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
      0,
      99,
      140,
      93,
      8,
      0.2,
      0,
      false,
      true));
      this.animations.push([]);

      //attack
       this.animations[1].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
      0,
      99*2-2,
      140,
      93,
      8,
      0.2,
      0,
      false,
      true));
      this.animations.push([]);

      //skill  attack
          this.animations[2].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
          140*2,
      99*3-2,
      140,
      93,
      2,
      0.5,
      0,
      false,
      true));
      this.animations.push([]);

      //skil2 shadow step tp
           this.animations[3].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
      0,
      99*4-24,
      140,
      93,
      8,
      0.2,
      0,
      false,
      true));
      this.animations.push([]);
      //It add throw things to in all direction

             this.animations[4].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
      0,
      99*5-29,
      140,
      93,
      8,
      0.2,
      0,
      false,
      true));
      this.animations.push([]);

      //this skill appear after skill 3 is used (might be replaced for another summon demon slime when it less than 50% hp)
               this.animations[5].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
      0,
      99*6-29,
      140,
      93,
      8,
      0.2,
      0,
      false,
      true));
      this.animations.push([]);


      this.animations[6].push(new Animator( this.spritesheet2, // idle
      0,
      0,
      140,
      93,
      8,
      0.2,
      0,
      false,
      true));

  };
  summonGoblins() {
    let myx = 900;
      //remove map
      if (!this.summonedGoblinFlag) {
          this.summonedGoblinFlag = true;

    //  this.portalmap = new PortalMap2(this.game,0,0);

          //     this.summonedGoblin = new GreenGoblin2(this.game,600, -20, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);

     // this.game.addEntity(this.summonedGoblin);
     this.skeleton = new Skeleton(this.game,1300, 3700, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
     this.skeleton2 = new Skeleton(this.game,1400, 3700, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
     this.skeleton3 = new Skeleton(this.game,1500, 3700, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
    // this.demonslime = new DemonSlime(this.game,900, -300, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);

       
              this.game.addEntity(this.skeleton);
              this.game.addEntity(this.skeleton2);
              this.game.addEntity(this.skeleton3);
            //  this.game.addEntity(this.demonslime);


           //remove map
      //add map again
   //   this.game.addEntity(this.portalmap);
     // console.log("TRUEEEE")
 }
}
  setTouchBoss(){
    
      this.game.entities.forEach((entity) => {
          if (entity.BB && this.BB.collide(entity.BB) && entity instanceof MainCharacter) {
              this.characterTouchBoss= true;
            
          }
      });

      return  this.characterTouchBoss;
  }
  updateBB() {
      
    this.BB = new BoundingBox(this.x -40- this.game.camera.x, this.y -80- this.game.camera.y, 90,90);
  
  };
  // };
  update() {
    this.updateBB();

     // console.log("CHARACTER " + this.game.character.x)
  //     if (this.state == 0) {
  //         setTimeout(() => {
  //             this.state = 1;
  //         }, 2000); // 2000 milliseconds (2 seconds)
  //     }
  //    else if (this.state == 1) {
  //         setTimeout(() => {
  //             this.state = 0;
  //         }, 3000); // 2000 milliseconds (2 seconds)
  //     }
 // this.x+=-1;
      this.cooldown+=this.game.clockTick;
      this.elapsedTime += this.game.clockTick;
      this.elapsedTime2 += this.game.clockTick;
      this.elapsedTime4 += this.game.clockTick;
      this.elapsedTime3 += this.game.clockTick;

      var dist = distance(this, this.target);
      var that = this;
      for (var i = 0; i < this.game.entities.length; i++){
          var entity = this.game.entities[i];
        
          if (entity.BB && this.BB.collide(entity.BB)) {
   if(
        entity instanceof InvisibleFenceBlocker){
        const collisionDirection = this.BB.checkCollisionSides(entity.BB);
   if(collisionDirection.top) {
    console.log("TRUE TOUCH BOSS BLOCK")

            this.y -= 10+this.speed;
        }
         else if(collisionDirection.bottom) {
          console.log("TRUE TOUCH BOSS BLOCK")

             this.y +=  this.maxSpeed;
        }
    
      }
      
    }}
    
      for (var i = 0; i < this.game.entities.length; i++) {
          var ent = this.game.entities[i];
          // if (!canSee(this, ent)) {
          //     // this.target = ent;
          //     // //character
          //     // this.onetime = false
          //     // console.log("one time skill is " + this.onetime)
          //     // if(this.x > this.target.x){
          //     //    this.state =3;
          //     //    this.faceleft = true;
          //     // }
          //     // else if(this.x <this.target.x){
          //     //         this.state =0;
          //     //         this.faceleft = false;
          //     // }
          //  this.state = 6;
            
          // }
          if(this.onetime ==true&& this.elapsedTime4 <1.5){
                  this.state =4;
          }
          if (ent instanceof MainCharacter && canSee(this, ent)&&this.firstsummon == true) {
              this.elapsedTime2 =0;
            //  console.log("FRIST SUMMON " + this.firstsummon)
            
                  this.firstsummon = false;
              this.state =4;
              setTimeout(() => {
                  this.summonGoblins();
              }, 1000);
       
          }

          if (ent instanceof MainCharacter && canSee(this, ent)){
              this.visualRadius =500;

          }
            if (ent instanceof MainCharacter && canSee(this, ent)&&this.firstsummon == false && this.elapsedTime2>1.5) {
              this.notidle = false;
           //   console.log("NOT IDLE " + this.notidle)
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
 

       //   if(ent instanceof PortalMap){
              //console.log("touching portal map")
         //   this.removeFromWorld = true;
           
        //  }
          if (ent instanceof MainCharacter && collide(this, ent)) {
      //     console.log("facelft " + this.faceleft)
                
         
              //    console.log("TOUCH BOSS")
                //  this.characterTouchBoss = true;
              //  this.setTouchBoss();
                  this.state = 1;
                  this.characterTouchBoss = true;
        //     this.summonGoblins();
                  if (this.elapsedTime > 0.9) {
                      var damage = 7 + randomInt(4);
                      ent.hitpoints -= damage;
                      this.game.addEntity(new CharacterGetDamageScore(this.game, ent.x - this.game.camera.x +  Math.floor(Math.random() * (31 - 20) + 20),   ent.y - this.game.camera.y -  Math.floor(Math.random() * (31 - 20) + 20) , damage));

                      // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                      this.elapsedTime = 0;
                  }
                
             if(this.state ===3){
           //   setTimeout(() => {
                 
           //    }, 2000);
          
              this.state = 1;
              this.elapsedTime = 0;
        
            }
            if(ent.hitpoints<=0){
            ent.isDead();
            this.game.entities.forEach((entity) =>{ 
                if(entity instanceof Boss){
                    entity.removeFromWorld = true;
                }
                if(entity instanceof Skeleton){
                  entity.removeFromWorld = true;
              }
              if(entity instanceof DemonSlime){
                entity.removeFromWorld = true;
            }

            })
            this.game.addEntity(new Boss(this.game,1600, 3700, [{ x: randomInt(0), y: randomInt(0) }, { x: randomInt(0), y: randomInt(0) }, { x: randomInt(0), y: randomInt(0) }, { x: 0, y: 0 }]))

            }
          }
     }

    
if(this.hitpoints<100 &&this.hitpoints>80){
    
  this.elapsedTime4=0;
   this.visualRadius =500;
 }

 if(this.hitpoints<40 && this.hitpoints>15){
  if( this.cooldown > 0.5 && this.time<3){
     // console.log("THIS COUNTER " + this.counter)
      this.time++;
    // for(let i =0; i<0.5;i = i + this.game.clockTick){
     this.game.addEntity(new Slash(this.game, this.x, this.y-1, this, true, true));
 
      this.game.addEntity(new Slash(this.game, this.x-1, this.y, this, true, true));
      this.game.addEntity(new Slash(this.game, this.x+1, this.y, this, true, true));
      this.game.addEntity(new Slash(this.game, this.x, this.y+1, this, true, true));
      this.game.addEntity(new Slash(this.game, this.x+1, this.y+1, this, true, true));
      this.game.addEntity(new Slash(this.game, this.x-1, this.y+1, this, true, true));
      this.game.addEntity(new Slash(this.game, this.x-1, this.y-1, this, true, true));
      this.game.addEntity(new Slash(this.game, this.x+1, this.y-1, this, true, true));
    // }
     }    
 }
 
//console.log("THIS ELAPSED TIME " + this.elapsedTime4)
      if(this.hitpoints<=50&& this.onetime ==false){
          
         this.elapsedTime4 =0;
         this.elapsedTime3 =0;

              this.demonslime = new DemonSlime(this.game,1600, 3800, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]);
       
           
              setTimeout(() => {
                  this.game.addEntity(this.demonslime); }, 1000);
   
         this.onetime= true;
      //    this.maxSpeed +=50;
      //    this.hitpoints+=30;
         
      }
    //tp skill
      if(this.hitpoints<80&& this.hitpoints>70 && this.elapsedTime4<1){
         // let prev = this.state
         this.state = -1;
          setTimeout(() => {
             
           this.x= this.game.character.x +30; //get the position of the character
              this.y = this.game.character.y;


          }, 500);
      }
if(this.hitpoints<=0){

          this.removeFromWorld = true;
    
      }
     
      if(this.hitpoints>10){
        this.bossDeath = false;
                
              }

      if (this.state !== 1 && this.notidle == false) {
          dist = distance(this, this.target);
          this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
          //this help me move
          if(this.elapsedTime3>2){
          this.x += this.velocity.x * this.game.clockTick;
      
          this.y += this.velocity.y * this.game.clockTick;
       }}

      this.facing = getFacing(this.velocity);
  
  };

  draw(ctx) {
     
      var xOffset = 25;
      var yOffset = 30;
      var width = this.state ? 64 : 48;
      //  ctx.save();
      //   ctx.scale(-1,1)
  //    this.animator.drawFrame(this.game.clockTick, ctx, this.x-330-this.game.camera.x , this.y-190-this.game.camera.y, 1); // Scale set to 1 for no scaling
  if(this.state==6 ){

      // this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 300 - this.game.camera.x, this.y - 260 - this.game.camera.y, 3);
      
      ctx.save();
      ctx.scale(-1, 1);
      this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x -210 + this.game.camera.x, this.y - 150 - this.game.camera.y,2);
      ctx.restore();
  
    }
    if(this.state==4 ){

      // this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 300 - this.game.camera.x, this.y - 260 - this.game.camera.y, 3);
      
      ctx.save();
      ctx.scale(-1, 1);
      this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x -210 + this.game.camera.x, this.y - 150 - this.game.camera.y,2);
      ctx.restore();
  
    }



if(this.state==0 ){

  // this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 300 - this.game.camera.x, this.y - 260 - this.game.camera.y, 3);
  
  ctx.save();
  ctx.scale(-1, 1);
  this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x -210 + this.game.camera.x, this.y - 150 - this.game.camera.y,2);
  ctx.restore();

}
//   if(this.state ==1){
//     this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 150 - this.game.camera.x, this.y - 160 - this.game.camera.y, 3);
//   }
// }
else if( this.state==1 && this.faceleft ==true){

this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x -210 - this.game.camera.x, this.y - 150 - this.game.camera.y, 2);
//this.summonGoblins() ;

}
else if( this.state==1 && this.faceleft ==false){
  ctx.save();
  ctx.scale(-1, 1);
  this.animations[1][0].drawFrame(this.game.clockTick, ctx, -this.x-200 + this.game.camera.x, this.y - 150 - this.game.camera.y, 2);
  ctx.restore();
 



}
  else if (this.state === 3) { // Example: checking for state 3 is flip not TELEPORTATRION

      this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x -210- this.game.camera.x, this.y - 150 - this.game.camera.y,2);
    
  }
  else if (this.state === -1) { // Example: checking for state 3 is flip not TELEPORTATRION

      this.animations[3][0].drawFrame(this.game.clockTick, ctx, this.x -210- this.game.camera.x, this.y - 150 - this.game.camera.y,2);
    
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
          ctx.strokeStyle = 'red';
          // this.BB = new BoundingBox(this.x-this.game.camera.x,this.y -this.game.camera.y-20,30,30)

          ctx.strokeStyle = "Black";
          ctx.strokeStyle = 'orange';
          // this.BB = new BoundingBox(this.x-this.game.camera.x,this.y -this.game.camera.y-20,30,30)

          ctx.strokeRect(this.x -40- this.game.camera.x, this.y -80- this.game.camera.y, 90,90);

    //      console.log(this.BB.x - this.game.camera.x)
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
      //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, 50, 50);

      }
   //   ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y-this.game.camera.y, 50, 50);

      this.healthbar.draw(ctx);
  };
};
