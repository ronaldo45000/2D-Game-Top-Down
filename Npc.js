class myNPC {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });
      
        this.radius = 20;
        this.faceleft = false;

        this.healthbar= new HealthBar(this);
        this.hitpoints = 100;
        this.maxhitpoints = 100;

        this.visualRadius = 400;

        this.initialPoint = { x, y };
        this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/mark.png");
        this.spritesheet3 = ASSET_MANAGER.getAsset("./sprites/ghost2.png");

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
        0,
        231,
        146,
        6,
        0.2,
        0,
        false,
        true));
        this.animations.push([]);

        this.animations[1].push(new Animator( this.spritesheet2, // Assuming spritesheet is a property of the Wizard class
        0,
        0,
        16,
        31,
        8,
        1,
        0,
        false,
        true));
        this.animations.push([]);

        this.animations[2].push(new Animator( this.spritesheet3, // Assuming spritesheet is a property of the Wizard class
        0,
        0,
        64,
        64,
        1,
        0.2,
        0,
        false,
        true));
        this.animations.push([]);
      
        this.updateBB();


    };


    updateBB(){
        this.BB = new BoundingBox(this.x - 365- this.game.camera.x  ,this.y + 488- this.game.camera.y , 55,67);               

      
         ;
     }
    update(){
      //  console.log("THIS X NPC " + this.x)
     //   console.log("THIS Y NPC " + this.y)
        this.BB = new BoundingBox(this.x - 365- this.game.camera.x  ,this.y + 488- this.game.camera.y , 55,67);               
          
    };
    
    

    draw(ctx) {
       
        var xOffset = 25;
        var yOffset = 30;
        var width = this.state ? 64 : 48;
        //  ctx.save();
        //   ctx.scale(-1,1)
    //    this.animator.drawFrame(this.game.clockTick, ctx, this.x-330-this.game.camera.x , this.y-190-this.game.camera.y, 1); // Scale set to 1 for no scaling
  
  //if(this.state==0 ){
    //this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x - 420 - this.game.camera.x, this.y + 460 - this.game.camera.y, 0.8);
    
    this.animations[1][0].drawFrame(this.game.clockTick, ctx, this.x - 342 - this.game.camera.x, this.y + 472 - this.game.camera.y, 0.8);
    //this.animations[1][0].drawFrame(this.game.clockTick, ctx, this.x - 385 - this.game.camera.x, this.y + 1167 - this.game.camera.y, 0.8);


    ctx.save();
    ctx.scale(-1, 1);
    this.animations[2][0].drawFrame(this.game.clockTick, ctx, -this.x + 310 + this.game.camera.x, this.y + 500 - this.game.camera.y, 0.8);

    ctx.restore();




    if (PARAMS.DEBUG) {
        ctx.strokeStyle = 'red';
      //  ctx.strokeRect(this.x +200- this.game.camera.x  , this.y +1720 - this.game.camera.y , 130,170);
        ctx.strokeRect(this.x - 365- this.game.camera.x  ,this.y + 488- this.game.camera.y , 55,67);

}
        this.healthbar.draw(ctx);
    };

}