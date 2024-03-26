class DemonSlime {
  constructor(game, x, y, path) {
      Object.assign(this, { game, x, y, path });
    
      this.radius = 60;
      this.faceleft = false;

      this.healthbar= new HealthBar(this);
      this.hitpoints = 1000;
      this.maxhitpoints = 1000;

      this.visualRadius = 1000;

      this.initialPoint = { x, y };
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/demonslime.png");
   //   this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/goblinattack.png");
      this.targetID = 0;
      if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

      var dist = distance(this, this.target);
      this.maxSpeed = 40; // pixels per second
      //speed invovle in x, y this case since there are different direciton
      this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
      this.state = 0; // 0 walking, 1 attacking, 2 dead

      this.facing = 0; // 0 = up, clockwise

      this.elapsedTime = 0;
      this.animations = [];
      this.animations.push([]);

      //this.animations.push([]);

      this.animations[0].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
      0,
      165*1,
      288,
      165,
     12,
      0.1,
      0,
      false,
      true));


      this.animations.push([]);

      this.animations[1].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
      0,
      165*2,
      288,
      165,
     15,
      0.1,
      0,
      false,
      true));

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
      
      var that = this;
      for (var i = 0; i < this.game.entities.length; i++){
          var entity = this.game.entities[i];
        
          if (entity.BB && this.BB.collide(entity.BB)) {
   if(
        entity instanceof InvisibleFenceBlocker){
        const collisionDirection = this.BB.checkCollisionSides(entity.BB);
   if(collisionDirection.top) {
    console.log("TRUE TOUCH BOSS BLOCK")

            this.y -= this.speed;
        }
         else if(collisionDirection.bottom) {
          console.log("TRUE TOUCH BOSS BLOCK")

             this.y +=  this.maxSpeed;
        }
    
      }
      
    }}
      for (var i = 0; i < this.game.entities.length; i++) {
          var ent = this.game.entities[i];
          if (ent instanceof Boss){
            if(ent.hitpoints<=0){
              this.removeFromWorld =true;
            }
          }
          if (ent instanceof CharacterClone && canSee(this,  ent)|| ent instanceof MainCharacter && canSee(this, ent)) {
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
          if (ent instanceof CharacterClone && collide(this,  ent)|| ent instanceof MainCharacter && collide(this, ent)) {
           console.log("facelft " + this.faceleft)
            
        


                    
                  this.state = 1;
                  if (this.elapsedTime > 0.9) {
                      var damage = 7 + randomInt(4);
                      ent.hitpoints -= damage;
                     
                      this.game.addEntity(new CharacterGetDamageScore(this.game, ent.x - this.game.camera.x +  Math.floor(Math.random() * (31 - 20) + 20),   ent.y - this.game.camera.y -  Math.floor(Math.random() * (31 - 20) + 20) , damage));
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
          this.x += this.velocity.x * this.game.clockTick;
      
          this.y += this.velocity.y * this.game.clockTick;
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

if(this.state==0 ){//flip
  ctx.save();
  ctx.scale(-1, 1);
  this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x-210 + this.game.camera.x, this.y - 160 - this.game.camera.y, 1.5);
  ctx.restore();
}
else if( this.state==1 && this.faceleft ==true){

this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x-210 - this.game.camera.x, this.y - 160 - this.game.camera.y, 1.5);


}
else if( this.state==1 && this.faceleft ==false){//flip
  ctx.save();
  ctx.scale(-1, 1);
  this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x-210 + this.game.camera.x, this.y - 160 - this.game.camera.y, 1.5);
  ctx.restore();
}
  else if (this.state === 3) { // Example: checking for state 3
 
      this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x -210 -this.game.camera.x, this.y - 160 - this.game.camera.y,1.5);
      
  }


//         // Select the animation based on the current state
//   //     this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, this.x - 120 - this.game.camera.x, this.y - 140 - this.game.camera.y, 1);
  
//      //for carmera view, change this.game.camera.x
// //     ctx.save();
// //     ctx.scale(-1,1)
// //  this.animations[this.state][0].drawFrame(this.game.clockTick, ctx, -this.x+50+this.game.camera.x , this.y-190-this.game.camera.y, 1);
// //      ctx.restore();



      if (PARAMS.DEBUG) {
        ctx.strokeStyle = "orange";
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
