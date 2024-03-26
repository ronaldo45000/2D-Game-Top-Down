const Direction = {
    UP: 3,
    DOWN: 0,
    LEFT: 1,
    RIGHT: 2,
};
class MainCharacter{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.x = x;
        this.y = y;
        this.shurikenSoundCount = 0;
        this.elapsedTimeCounter=0;
        this.elapsedTimeCounter2=0;

        this.InPortal = false;
        this.spawnX = 700;
        this.spawnY = 700;
        this.height = 48;
        this.width = 48;
        this.game.character = this;
        this.radius = 30; //attack range
        this.speed = 1.5;
                // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/villager1.png");
        this.spritesheetFishing = ASSET_MANAGER.getAsset("./sprites/fishing.png");

        //healthbar information
        this.healthbar= new HealthBar(this);
        this.hitpoints = 100;
        this.level = 1;
        this.maxhitpoints = 100 ;
        this.baseDamage = 20 ;
        this.farmInventory = [];
        this.numberOfFish = 5;
        // MainCharacter's state variables
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 0 = walking, 1 = attacking, 2, idling
        this.directionFace  = Direction.DOWN;
        this.oneTime =false;
        this.dead = false;

        // fire mario's state variables
        this.canThrow = true;
        this.throwFireballTimeElapsed = 0;
        this.fireballsThrown = 0;

        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;

        this.updateBB();

  
        this.animations = [];
        this.elapsedTime = 0;
        this.elapsedTime2= 8;

        this.elapsedTimeForShuriken =0;
        this.elapsedTimeForShuriken2 =0;

        this.elapsedTime3 = 0;
        this.elapsedTime10 = 0;

        this.counter =0;
        this.counterForShuriken=0;
        this.characterDeath = false;
        this.dieAtMap1 = false;
        this.playSnowMap = false;
        this.playSnowMap2 = false;

        this.playSnowMap3 = false;

        this.guide = false;
        this.shadow = false;
        this.shadow2 = false;
        //Character Stats

        this.fishingAnimation = [];

        this.loadAnimations();
        this.fishingMode = false;
        this.fishingStatus = 0;
        this.getFish = false;

        //Final Boss information
        this.levelToEnter = 4;
        

        this.tempCameraY = 0;
       ASSET_MANAGER.autoRepeat("./audio/walk1.mp3");
     //   ASSET_MANAGER.autoRepeat("./audio/slsh2.mp3");
        
    };

    loadCharacterInfor(oldCharacter){
        this.level = oldCharacter.level;
        this.maxhitpoints = oldCharacter.maxhitpoints;
        this.hitpoints = oldCharacter.maxhitpoints;
        this.baseDamage = oldCharacter.baseDamage;
        this.farmInventory  = oldCharacter.farmInventory;
        this.numberOfFish = oldCharacter.numberOfFish; 
    }
    getAward(dmg, hp){
        this.baseDamage += dmg;
        this.maxhitpoints += hp;
        this.hitpoints += hp;
        this.game.addEntity(new PlusHP(this.game, this.x - this.game.camera.x, this.y- this.game.camera.y - 20, hp))
        this.game.addEntity(new PlusDMG(this.game, this.x - this.game.camera.x, this.y- this.game.camera.y, dmg))


    }
    
    isDead(){
       // console.log("character is dead");
        this.x = this.spawnX;
        this.y = this.spawnY;
        this.hitpoints = this.maxhitpoints;
        this.game.camera.countDeath += 1;
        this.game.camera.x = 0;
        this.game.camera.y = 329;
        ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playMusic("./music/CornfieldChaseShort.mp3");
        //   ASSET_MANAGER.pauseBackgroundMusic();

    }

    //initially load().
    loadAnimations() {

        this.farmInventory[PLANTNAMES.CORN] = 0;
        this.farmInventory[PLANTNAMES.STRAWBERRY] = 0;
        this.farmInventory[PLANTNAMES.RICE] = 0;




        for (var i = 0; i < 3; i++) {//State: 0 = walking, 1 = attacking 
            this.animations.push([]);
            for (var j = 0; j < 4; j++) { // 4 Directions
                this.animations[i].push([]);

            }
        }


        this.animations[0][Direction.DOWN] = new Animator(this.spritesheet, 0, 0, 48, 48, 3, 0.15, 0, false, true);

        this.animations[0][Direction.LEFT] = new Animator(this.spritesheet, 0, 48+1, 48, 48, 3, 0.15, 0, false, true);

        this.animations[0][Direction.RIGHT] = new Animator(this.spritesheet, 0, 48*2+1, 48, 48, 3, 0.15, 0, false, true);

        this.animations[0][Direction.UP] = new Animator(this.spritesheet, 0, 48*3+1, 48, 48, 3, 0.15, 0, false, true);


     
        this.animations[1][Direction.DOWN] = new Animator(this.spritesheet, 48*6, 0, 32, 32, 4, 0.1, 0, false, true);
        this.animations[1][Direction.LEFT] = new Animator(this.spritesheet, 48*6, 32, 32, 32, 4, 0.1, 0, false, true);
        this.animations[1][Direction.RIGHT] = new Animator(this.spritesheet, 48*6, 32*2, 32, 32, 4, 0.1, 0, false, true);
        this.animations[1][Direction.UP] = new Animator(this.spritesheet, 48*6, 32*3, 32, 32, 4, 0.1, 0, false, true);

        this.animations[2][Direction.DOWN] = new Animator(this.spritesheet, 48*3, 0, 48, 48, 3, 0.20, 0, false, true);

        this.animations[2][Direction.LEFT] = new Animator(this.spritesheet, 48*3, 48+1, 48, 48, 3, 0.20, 0, false, true);

        this.animations[2][Direction.RIGHT] = new Animator(this.spritesheet, 48*3, 48*2+1, 48, 48, 3, 0.20, 0, false, true);

        this.animations[2][Direction.UP] = new Animator(this.spritesheet, 48*3, 48*3+1, 48, 48, 3, 0.20, 0, false, true);

        //fishingAnimation[0] waiting
        this.fishingAnimation.push(new Animator(this.spritesheetFishing,0,0,96,48,3,0.5,0,false,true));
        //fishingAnimation[1] Miss
        this.fishingAnimation.push(new Animator(this.spritesheetFishing,0,48,48+48,48,3,0.5,0,false,true));
         //fishingAnimation[2] Fish a fish
        this.fishingAnimation.push(new Animator(this.spritesheetFishing,0,48+48,48+48,48,3,0.5,0,false,true));
        //fishingAnimation[3] Fish a fish
        this.fishingAnimation.push(new Animator(this.spritesheetFishing,0,48+48+48,48,48,3,0.2,0,false,true))


        
    };
    updateBB() {
        
            this.BB = new BoundingBox(this.x- this.game.camera.x- this.width/2, this.y- this.game.camera.y- this.height/2, this.width, this.height);
        
    };
    updateBBforDashingHorizontal(){
        this.BBDASHHorizonTal = new BoundingBox(this.x- this.game.camera.x- this.width/2 - 130, this.y- this.game.camera.y- this.height/2, this.width +130*2, this.height);

    }
    updateBBforDashingVertical(){
        this.BBDASHVertical = new BoundingBox(this.x- this.game.camera.x- this.width/2 , this.y- this.game.camera.y- this.height/2 - 130, this.width , this.height +130*2);

    }
    // updateLastBB() {
    //     this.lastBB = this.BB;
    // };
    update(){
        this.elapsedTime10+= this.game.clockTick;
        if(!this.game.right&&!this.game.left&&!this.game.up&&!this.game.down && !this.removeFromWorld){
           

            ASSET_MANAGER.playAsset("./audio/walk1.mp3");

        }
        if(this.state === 1){
             ASSET_MANAGER.playAsset2("./audio/slsh2.mp3");
           
         }
/////////////////////////////////////////////////
        //RESET CHARACTER and his stuffs
        if( this.game.camera.countDeath==3){
            this.guide =3;
            this.hitpoints =100;
            this.baseDamage= 10;
            this.maxhitpoints =100;
            this.farmInventory[PLANTNAMES.CORN] = 0;
            this.farmInventory[PLANTNAMES.STRAWBERRY] = 0;
            this.farmInventory[PLANTNAMES.RICE] = 0;          
            PARAMS.DAYCOUNTER =0;
            this.guide = false;
            this.level=1;
          
            this.game.entities.forEach((entity) =>{  
                        entity.removeFromWorld = true;
            });
           // this.game.addEntity(new Start(this.game,300,400) )
           this.game.addEntity(new GameOver(this.game,500,500))
           this.game.camera.inGame = false;
        }

        let canDash = true;

        this.elapsedTimeForShuriken+= this.game.clockTick;

        if(this.elapsedTimeForShuriken2 <= 20) {
            this.elapsedTimeForShuriken2+= this.game.clockTick
            if(this.elapsedTimeForShuriken2 > 15) this.counterForShuriken = 0;
        };

        if(this.game.keyQ == true && this.numberOfFish > 0 && this.elapsedTime3 > 1){
            if(this.hitpoints + this.maxhitpoints*0.25 >= this.maxhitpoints ) this.hitpoints = this.maxhitpoints;
            else this.hitpoints += Math.floor(this.maxhitpoints*0.25);
            this.numberOfFish -= 1;
            this.elapsedTime3 = 0;
        }

        if(this.fishingMode){
            this.game.addEntity(new MessageInteract(this.game, PARAMS.CANVAS_WIDTH*0.9, PARAMS.CANVAS_HEIGHT*0.9, "Press Space to Reel."));
        }

        if(Math.abs(this.x  - 1420) < 25 &&  Math.abs(this.y - 409) < 50 && !this.fishingMode ) {
            this.game.addEntity(new MessageInteract(this.game, PARAMS.CANVAS_WIDTH*0.9, PARAMS.CANVAS_HEIGHT*0.9, "Press E to Fish."));
        }    
        if(this.game.keyE == true && Math.abs(this.x  - 1420) < 25 &&  Math.abs(this.y - 409) < 50 ){ this.fishingMode = true};
   
      if(this.fishingMode && this.elapsedTime3 > 2 && this.elapsedTime3 < 3 ){
         //   console.log("up");
            this.fishingStatus = 0; 
        }
        if(this.fishingMode == true && this.elapsedTime > 5){
            if(Math.random() < 0.5) {
                this.game.addEntity(new FishEatTheBait(this.game,this.x - this.game.camera.x, this.y - this.game.camera.y));
                this.getFish = true;
            }
            this.elapsedTime = 0;
        }
        if(this.game.spaceKey && this.fishingMode == true  && this.elapsedTime <= 0.75 &&  this.getFish){
           this.fishingStatus = 2; 
            this.elapsedTime = 0;
            this.elapsedTime3 = 0;
            this.getFish = false;
            this.numberOfFish += 1;
        } else if(this.game.spaceKey && this.fishingMode == true && this.elapsedTime > 0.75){
             this.fishingStatus = 1;   
             this.elapsedTime3 = 0;
             this.getFish = false;
        }
     

       // console.log(this.fishingMode);
    // console.log(this.elapsedTime);
       if(this.elapsedTime3 <= 3)this.elapsedTime3 += this.game.clockTick;
        if(this.elapsedTime <= 10)this.elapsedTime += this.game.clockTick;
        if(this.elapsedTime2 <= 9) this.elapsedTime2 += this.game.clockTick;
        if (this.game.left && this.game.up  && this.x -  this.width/2 > 0 && this.x +  this.width/2 < 2000 ) {
            // Move diagonally to the top-left
            this.x -= this.speed/ Math.sqrt(2);
            this.y -= this.speed/ Math.sqrt(2);
            this.directionFace = Direction.LEFT;
            this.fishingMode = false;
        } else if (this.game.right && this.game.up&& this.x -  this.width/2 > 0 && this.x +  this.width/2 < 2000 ) {
            // Move diagonally to the top-right
            this.x += this.speed/ Math.sqrt(2);
            this.y -= this.speed/ Math.sqrt(2);
            this.directionFace = Direction.RIGHT;
            this.fishingMode = false;
        } else if (this.game.left && this.game.down&& this.x -  this.width/2 > 0 && this.x +  this.width/2 < 2000) {
            // Move diagonally to the bottom-left
            this.x -= this.speed/ Math.sqrt(2);
            this.y += this.speed/ Math.sqrt(2);
            this.directionFace = Direction.LEFT;
            this.fishingMode = false;
        } else if (this.game.right && this.game.down && this.x -  this.width/2 > 0 && this.x +  this.width/2 < 2000) {
            // Move diagonally to the bottom-right
            this.x += this.speed/ Math.sqrt(2);
            this.y += this.speed/ Math.sqrt(2);
            this.directionFace = Direction.RIGHT;
            this.fishingMode = false;
        } else if (this.game.left && this.x -  this.width/2 > 0 ) {
            this.x -= this.speed;
            this.directionFace = Direction.LEFT;
            this.fishingMode = false;

        } else if (this.game.right && this.x +  this.width/2 < 2000) {
            this.x += this.speed;
            this.directionFace = Direction.RIGHT;
            this.fishingMode = false;

        } else if (this.game.up) {
            this.y -= this.speed;
            this.directionFace = Direction.UP;
            this.fishingMode = false;

        }else if (this.game.down) {
            this.y += this.speed;
            this.directionFace = Direction.DOWN;
            this.fishingMode = false;
 
        }
console.log("GUIDE " + this.guide)
if(this.level>=3){
    this.guide = true;
}
if(this.level<=1){
    this.guide = false;
}
        //clone skill
        if(this.guide){
            if(this.game.keyT&&!this.shadow2){
            
               // setTimeout(() => {
                    this.game.addEntityAtIndex(this.game.camera.characterIndex,new CharacterClone(this.game, this.x+150, this.y+50,[{ x: randomInt(0), y: randomInt(0) }, { x: randomInt(0), y: randomInt(0) }, { x: randomInt(0), y: randomInt(0) }, { x: 0, y: 0 }]));
                    this.game.addEntityAtIndex(this.game.camera.characterIndex,new CharacterClone(this.game, this.x+120, this.y+50,[{ x: randomInt(0), y: randomInt(0) }, { x: randomInt(0), y: randomInt(0) }, { x: randomInt(0), y: randomInt(0) }, { x: 0, y: 0 }]));
            
            //}, 200);
            this.shadow2 = true;
            
            
            
            }
             if(this.game.keyT&& !this.shadow){
                this.elapsedTime10 = 0;
                this.game.addEntity(new Blood(this.game,  this.x+50, this.y-40));
               // this.game.addEntity( new CharacterClone(this.game, 500, 525,[{ x: randomInt(0), y: randomInt(0) }, { x: randomInt(0), y: randomInt(0) }, { x: randomInt(0), y: randomInt(0) }, { x: 0, y: 0 }]));
            this.shadow = true;
            for (var i = 0; i < this.game.entities.length; i++){
                var entity = this.game.entities[i];
            setTimeout(() => {
                if(entity instanceof Blood){
            entity.removeFromWorld = true;
                }
            
            }, 200);
            
            
            
            }
            
            }
            
            if(this.elapsedTime10>55){
                this.shadow = false;
                this.shadow2 = false;
            
            }
            for (var i = 0; i < this.game.entities.length; i++){
                var entity = this.game.entities[i];
            if(this.elapsedTime10>20){
             

                if(entity instanceof CharacterClone){
            entity.removeFromWorld = true;
            
                }
            }
            
            }
            }
            
            /////
        if(this.game.keyF ){
                canDash = true;
            //  console.log(canDash);
                    for (var i = 0; i < this.game.entities.length; i++){
                        var entity = this.game.entities[i];
                       
                        if(entity instanceof LakeAndOtherSide ||entity instanceof InvisibleLakeBlocker ){
                            const collisionDirection1 = this.BBDASHHorizonTal.checkCollisionSides(entity.BB);                       
                            if(this.directionFace == Direction.RIGHT && collisionDirection1.left) {
                         //       console.log("Collision on right with " + entity.constructor.name);

                                canDash = false;
                            }else if(this.directionFace == Direction.LEFT && collisionDirection1.right){
                         //       console.log("Collision on Left with " + entity.constructor.name);
                                canDash = false;
                            } else if(this.directionFace == Direction.UP && collisionDirection1.bottom ){
                         //       console.log("Collision on UP with " + entity.constructor.name);
                                canDash = false;
                            } else if(this.directionFace == Direction.DOWN && collisionDirection1.top ){
                        //        console.log("Collision on DOWN with " + entity.constructor.name);
                                canDash = false;
                            }
                        }
                    }
                
            //  console.log(canDash);
            if(canDash){
                if(this.elapsedTime >0 && this.counter<15){
                    if(this.directionFace == Direction.RIGHT){
                        this.x+=10;
                        this.counter++;
                        this.game.addEntity(new Smoke(this.game, this.x-50, this.y-0  , this, true, true));
                    }else if(this.directionFace == Direction.LEFT){
                        this.x-=10;
                        this.counter++;
                        this.game.addEntity(new Smoke(this.game, this.x-10, this.y-0, this, true, true));
                    }else if(this.directionFace == Direction.UP){
                        this.y-=10;
                        this.counter++;
                        this.game.addEntity(new Smoke(this.game, this.x-30, this.y, this, true, true));
                    } else if(this.directionFace == Direction.DOWN){
                        this.y+=10;
                        this.counter++;
                        this.game.addEntity(new Smoke(this.game, this.x-15, this.y-46, this, true, true));
                    }
                    for (var i = 0; i < this.game.entities.length; i++){
                        var entity = this.game.entities[i];
                        if ((entity instanceof Slime || entity instanceof Boar || entity instanceof GreenGoblin ||entity instanceof BoarSkill||  entity instanceof Boss||
                            entity instanceof Wizard|| entity instanceof Wizard2|| entity instanceof Wizard3|| entity instanceof Skele  ||
                            entity instanceof Skeleton || entity instanceof DemonSlime|| entity instanceof Guardian||  entity instanceof Mantis ) && collide(this,  entity)) {
                                if (this.elapsedTime > 0.001) {
                                var damage = this.baseDamage/2 + randomInt(4);
                                if(entity.hitpoints - damage < 0) {
                                    if(entity instanceof Wizard3|| entity instanceof Skele|| entity instanceof Wizard2|| entity instanceof Wizard){
                                        entity.isDead();
                                    }
                                    const dropX = entity.x;
                                    const dropY = entity.y;
                                //   this.game.addEntity(new HPBottle(this.game, dropX , dropY));
                                    this.game.addEntity(new DMGBottle(this.game, dropX , dropY));
                                    if(entity instanceof Boss){

                                    }
                                    else{
                                    entity.removeFromWorld = true;
                                    }
                                }
                                entity.hitpoints -= damage;
                                this.game.addEntity(new Score(this.game, entity.x - this.game.camera.x +  Math.floor(Math.random() * (31 - 20) + 20), entity.y - Math.floor(Math.random() * (31 - 20) + 20)- this.game.camera.y, damage));
                                this.elapsedTime = 0.00;
                            }

                            }
                            

                       

                    }
                    this.elapsedTime = 0;
                  
                    this.elapsedTime2=0;
                    ASSET_MANAGER.playAsset3("./audio/dash.mp3");

         
            }
            if(this.elapsedTime2>8){
                this.counter =0;
              }

            }
            }

            //This part here is for SHURIKEN SKILL LEFT,RIGHT,UP,DOWN (15 secs reset)
            //KEY G skill
          

            // ... (existing code)
            
            // This part here is for SHURIKEN SKILL LEFT, RIGHT, UP, DOWN (15 secs reset)
            // KEY G skill
       //    console.log(  this.elapsedTimeCounter)
        
 

           if(this.elapsedTimeForShuriken2>15){
        //    console.log("SHURIKEN " + this.elapsedTimeForShuriken2)
            this.elapsedTimeCounter = 0
           }


       //    console.log(  this.elapsedTimeCounter2)

        if(this.elapsedTime2>8){
            this.elapsedTimeCounter2=0;
        }




            if( this.directionFace == Direction.RIGHT){
         
                if(this.game.keyG){
                        this.game.keyG = false;
                   if( this.elapsedTimeForShuriken > 0.5 && this.counterForShuriken<6){
                     this.elapsedTimeForShuriken = 0;
                     this.elapsedTimeForShuriken2=0;
                     this.counterForShuriken++;

                    this.game.addEntity(new Shuriken(this.game, this.x-0.1, this.y, this, true, true));
                   }
                   else if(this.elapsedTimeForShuriken2>15){
                    this.elapsedTimeCounter = 0
                    this.counterForShuriken=0;
                }
                }
            }
           else if( this.directionFace == Direction.LEFT){
         
                if(this.game.keyG){
                    this.game.keyG = false;
                    
                   if( this.elapsedTimeForShuriken > 0.5 && this.counterForShuriken<6){
                     this.elapsedTimeForShuriken = 0;
                     this.elapsedTimeForShuriken2=0;
                     this.counterForShuriken++;
                        

                    this.game.addEntity(new Shuriken(this.game, this.x+0.1, this.y, this, true, true));
                   }
                   else if(this.elapsedTimeForShuriken2>15){
                    this.elapsedTimeCounter = 0

                    this.counterForShuriken=0;
                }
                }
            }

           else if( this.directionFace == Direction.UP){
         
                if(this.game.keyG){
                    this.game.keyG = false;

                   if( this.elapsedTimeForShuriken > 0.5 && this.counterForShuriken<6){
                     this.elapsedTimeForShuriken = 0;
                     this.elapsedTimeForShuriken2=0;
                     this.counterForShuriken++;

                    this.game.addEntity(new Shuriken(this.game, this.x, this.y+0.1, this, true, true));
                   }
                   else if(this.elapsedTimeForShuriken2>15){
                    this.elapsedTimeCounter = 0

                    this.counterForShuriken=0;
                }
                }
            }
           else if( this.directionFace == Direction.DOWN){
         
                if(this.game.keyG){
                    this.game.keyG = false;

                   if( this.elapsedTimeForShuriken > 0.5 && this.counterForShuriken<6){
                     this.elapsedTimeForShuriken = 0;
                     this.elapsedTimeForShuriken2=0;
                     this.counterForShuriken++;

                    this.game.addEntity(new Shuriken(this.game, this.x, this.y-0.1, this, true, true));
                   }
                   else if(this.elapsedTimeForShuriken2>15){
                    this.elapsedTimeCounter = 0

                    this.counterForShuriken=0;
                }
                }
            }


            var that = this;
        for (var i = 0; i < this.game.entities.length; i++){
            var entity = this.game.entities[i];
            if(this.x>300){
       
              //  this.game.click = false;
                
            }
            
            if(this.x<300){
                
            if(entity instanceof myNPC){
                  if (this.game.click) {
            const mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);
           if (mouseBB.collide(entity.BB)&&!that.onlyOne) {
    
            this.game.addEntity( new Guide(this.game,300,400)  )
            that.onlyOne = true;

                }
              }
             
          //  }
           
        }
    }
  
           if(entity instanceof Guide){
            if(entity.exit|| this.x>300|| this.y >1700|| this.y<1400){
                that.onlyOne = false;
                entity.removeFromWorld = true;
            }
           }
//////////////////////////////////////////


            if (entity.BB && this.BB.collide(entity.BB)) {
              //  console.log(this.elapsedTime);
              if(entity instanceof InvisibleSnowMapDoor){
                const dir = this.BB.checkCollisionSides(entity.BB);
                if(this.elapsedTime >= 0.05){
                    if(dir.bottom){
                        ASSET_MANAGER.pauseBackgroundMusic();
                        ASSET_MANAGER.playMusic("./music/snmusic.mp3");
                        this.elapsedTime = 0;
                    } else if(dir.top){
                        ASSET_MANAGER.pauseBackgroundMusic();
                        ASSET_MANAGER.playMusic("./music/CornfieldChaseShort.mp3");
                                                this.elapsedTime = 0;

                    }
                }
                
              }else if(entity instanceof Portal){
                  

               if(this.elapsedTime<=1){
             
               that.oneTime = true;
                   that.game.addEntity(new BossZone(that.game,0,0))
                   setTimeout(() => {
                    that.oneTime = false;

                }, 500);


               }if(this.elapsedTime >= 3){
                       
                        if(this.level >= this.levelToEnter && this.y <= 2200 ){
                            ASSET_MANAGER.pauseBackgroundMusic();

                            ASSET_MANAGER.playMusic("./music/bossmusic.mp3");
                            this.tempCameraY = this.game.camera.y;
                          //  console.log(this.game.camera.y) ;
                            this.x -= 150;
                            this.y += (1000 + 1100);

                            this.game.camera.dog.x = this.x - 50;
                            this.game.camera.dog.y = this.y - 50;
                        }else if( this.y >= 2200 + 1100){
                           ASSET_MANAGER.pauseBackgroundMusic();
                           ASSET_MANAGER.playMusic("./music/CornfieldChaseShort.mp3");

                                this.x-=150;
                            this.y  -= (1000 + 1100);
                            this.game.camera.y =  this.tempCameraY;

                            this.game.camera.dog.x = this.x - 50;
                            this.game.camera.dog.y = this.y - 50;


                     
                    }                          
                        this.elapsedTime=0;
                       
                    

                }
                
                    
                }

              else  if(entity instanceof FarmLandBigTree || entity instanceof LakeAndOtherSide ||entity instanceof InvisibleLakeBlocker
                    || entity instanceof InvisibleFenceBlocker){

                    const collisionDirection = this.BB.checkCollisionSides(entity.BB);
                    if(collisionDirection.left){
                        this.x -= this.speed;
                    }else if(collisionDirection.right) {
                        this.x += this.speed;
                    }else if(collisionDirection.top) {
                        this.y -= this.speed;
                    }else if(collisionDirection.bottom) {
                        this.y += this.speed;
                    }
                
                    
                } 
                if(entity instanceof HorizontalSoil){
                   if( this.BB.collide(entity.BB) && this.state === 1){
                    entity.listOfBugs = [0,0,0];
                   }
                }

                if(entity instanceof WizardSpawn){

                }


                if(entity instanceof WizardSpawn2){
                   const collisionDirection = this.BB.checkCollisionSides(entity.BB);
                   if(collisionDirection.left){
                       this.x -= this.speed;
                   }else if(collisionDirection.right) {
                       this.x += this.speed;
                   }else if(collisionDirection.top) {
                       this.y -= this.speed;
                   }else if(collisionDirection.bottom) {
                       this.y += this.speed;
                   }
                
                    
                } 
                if(entity instanceof SnowMap||entity instanceof SnowMap2 ||entity instanceof SnowMap3 ||entity instanceof GraveYard|| entity instanceof Column){


                    const collisionDirection = this.BB.checkCollisionSides(entity.BB);
                    if(collisionDirection.left){
                        this.x -= this.speed;
                    }else if(collisionDirection.right) {
                        this.x += this.speed;
                    }else if(collisionDirection.top) {
                        this.y -= this.speed;
                    }else if(collisionDirection.bottom) {
                        this.y += this.speed;
                    }
                 
                     
                } 
                if(entity instanceof Chest){

                    entity.removeFromWorld = true;
                    this.baseDamage +=1;
                    this.maxhitpoints+=5;
                    this.game.addEntity(new PlusDMG(this.game, this.x - this.game.camera.x, this.y- this.game.camera.y, 1))
                 this.game.addEntity(new PlusHP(this.game, this.x + - this.game.camera.x, this.y+20- this.game.camera.y, 5))
                }

                if(entity instanceof Guardian){
                    if(this.state === 1){
                        if (this.elapsedTime > 0.2) {
                            var damage = this.baseDamage + randomInt(4);
                            if(entity.hitpoints - damage < 0) {
                              
                                    entity.isDead();
                                
                                const dropX = entity.x;
                                const dropY = entity.y;
                             //   this.game.addEntity(new HPBottle(this.game, dropX , dropY));
                                if(Math.random() < 0.5) this.game.addEntity(new DMGBottle(this.game, dropX , dropY))
                                else this.game.addEntity(new HPBottle(this.game, dropX , dropY))
                                entity.removeFromWorld = true;
                            //    this.guide = true;

                            }
                            entity.hitpoints -= damage;

                            this.game.addEntity(new Score(this.game, entity.x - this.game.camera.x, entity.y- this.game.camera.y, damage));
                            this.elapsedTime = 0;
                            
                        }
                       
                    }
                }
                if((entity instanceof HPBottle)){
                    this.maxhitpoints += 5;
                    if(this.hitpoints + 30 > this.maxhitpoints ) this.hitpoints = this.maxhitpoints;
                    else this.hitpoints += 30
                    entity.removeFromWorld = true;
                    this.game.addEntity(new PlusHP(this.game, this.x - this.game.camera.x, this.y- this.game.camera.y, 5))
                }
                if((entity instanceof DMGBottle)){
                    this.baseDamage += 1;
                    entity.removeFromWorld = true;
                    this.game.addEntity(new PlusDMG(this.game, this.x - this.game.camera.x, this.y- this.game.camera.y, 1))
                }
 
            }

            

 
            if ((entity instanceof Slime || entity instanceof Boar || entity instanceof GreenGoblin ||entity instanceof BoarSkill|| 
                entity instanceof Wizard|| entity instanceof Wizard2|| entity instanceof Wizard3|| entity instanceof Skele||
                entity instanceof Skeleton || entity instanceof DemonSlime|| entity instanceof Mantis) && collide(this,  entity)) {
                        if(this.state === 1){
                        if (this.elapsedTime > 0.2) {
                            var damage = this.baseDamage + randomInt(4);
                            if(entity.hitpoints - damage < 0) {
                                if(entity instanceof Wizard3|| entity instanceof Skele|| entity instanceof Wizard2|| entity instanceof Wizard){
                                    entity.isDead();
                                }
                                const dropX = entity.x;
                                const dropY = entity.y;
                             //   this.game.addEntity(new HPBottle(this.game, dropX , dropY));
                                if(Math.random() < 0.5) this.game.addEntity(new DMGBottle(this.game, dropX , dropY))
                                else this.game.addEntity(new HPBottle(this.game, dropX , dropY))
                                entity.removeFromWorld = true;
                            }
                            entity.hitpoints -= damage;

                            this.game.addEntity(new Score(this.game, entity.x - this.game.camera.x, entity.y- this.game.camera.y, damage));
                            this.elapsedTime = 0;
                            
                        }
                       
                    }
            }

            if ((entity instanceof Boss) && collide(this,  entity)) {
                if(this.state === 1){
                if (this.elapsedTime > 0.2) {
                    var damage = this.baseDamage + randomInt(4);
                    if(entity.hitpoints - damage < 0) {
                        const dropX = entity.x;
                        const dropY = entity.y;
                     //   this.game.addEntity(new HPBottle(this.game, dropX , dropY));
                        if(Math.random() < 0.5) this.game.addEntity(new DMGBottle(this.game, dropX , dropY))
                        else this.game.addEntity(new HPBottle(this.game, dropX , dropY))
                        entity.removeFromWorld = true;
                    }
                    entity.hitpoints -= damage;

                    this.game.addEntity(new Score(this.game, entity.x - this.game.camera.x, entity.y- this.game.camera.y, damage));
                    this.elapsedTime = 0;
                    
                }
               
            }
    }
            
    if(entity instanceof Boss){
        if(entity.hitpoints<=0){
            that.endgame = true;

            this.guide = false;
            this.isDead();
            this.hitpoints =100;
            this.baseDamage= 10;
            this.maxhitpoints =100;
            this.farmInventory[PLANTNAMES.CORN] = 0;
            this.farmInventory[PLANTNAMES.STRAWBERRY] = 0;
            this.farmInventory[PLANTNAMES.RICE] = 0;          
            PARAMS.DAYCOUNTER =0;
         
            this.level=1;
          
            this.game.entities.forEach((entity) =>{  
                that.endgame = true;

                        entity.removeFromWorld = true;
            });

            this.game.addEntity(new EndGame(this.game,500,500))
        }

    }
    if(entity instanceof CharacterClone){
        if(entity.youwin){
            this.guide = false;

                that.endgame = true;
                this.isDead();
                this.hitpoints =100;
                this.baseDamage= 10;
                this.maxhitpoints =100;
                this.farmInventory[PLANTNAMES.CORN] = 0;
                this.farmInventory[PLANTNAMES.STRAWBERRY] = 0;
                this.farmInventory[PLANTNAMES.RICE] = 0;          
                PARAMS.DAYCOUNTER =0;
             
                this.level=1;
              
                this.game.entities.forEach((entity) =>{  
                    that.endgame = true;

                            entity.removeFromWorld = true;
                });
                this.game.addEntity(new EndGame(this.game,500,500))
            
        }
        entity.youwin = false;
    }




        }
        // if(this.hitpoints<50){
        //     this.removeFromWorld = true;
          
        // }
        // if(this.hitpoints>0){
        //     this.characterDeath = false;
        // }
      
        this.updateBB();
        this.updateBBforDashingHorizontal();
        this.updateBBforDashingVertical();
    }

    draw(ctx) {

        this.state = 0;

        if(this.fishingMode == true){
                 this.fishingAnimation[3].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
                this.fishingAnimation[this.fishingStatus].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
        }else{
 

        if (this.game.left) {
          
            this.animations[0][Direction.LEFT].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - this.width/2,this.y - this.game.camera.y - this.height/2,PARAMS.SCALE);

        } else if (this.game.right) {
            this.animations[0][Direction.RIGHT].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
        } else if (this.game.up) {
            this.animations[0][Direction.UP].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);

        } else if (this.game.down) {
            this.animations[0][Direction.DOWN].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x- this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
        } else if(!this.game.spaceKey){
          //  ctx.drawImage(this.spritesheet,0,this.directionFace*48+1, 48,48, this.x - this.game.camera.x,this.y - this.game.camera.y,48*PARAMS.SCALE,48*PARAMS.SCALE);
            this.animations[2][this.directionFace].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x- this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
        }
        
        if(this.game.spaceKey ){

            this.state = 1;

            switch(this.directionFace){
                case Direction.DOWN:
                    this.animations[0][Direction.DOWN].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
                    this.animations[1][Direction.DOWN].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 5 - this.width/2,this.y - this.game.camera.y + 30- this.height/2,PARAMS.SCALE);
                
                    break;
                case Direction.LEFT:
                    this.animations[0][Direction.LEFT].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x- this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
                    this.animations[1][Direction.LEFT].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - 10- this.width/2,this.y - this.game.camera.y + 20- this.height/2,PARAMS.SCALE);

                    break;
                case Direction.RIGHT:
                    this.animations[0][Direction.RIGHT].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x- this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);
                    this.animations[1][Direction.RIGHT].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 25- this.width/2,this.y - this.game.camera.y + 20- this.height/2,PARAMS.SCALE);
    
                break;
                case Direction.UP:
                    this.animations[1][Direction.UP].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x + 10- this.width/2,this.y - this.game.camera.y - 15- this.height/2,PARAMS.SCALE);
                    this.animations[0][Direction.UP].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x- this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);

                    break;
            }

        }
    }
        if (PARAMS.DEBUG) {
           //w  ctx.strokeStyle = 'red';
            ctx.strokeRect(this.x - this.game.camera.x- this.width/2, this.y - this.game.camera.y- this.height/2, 48*PARAMS.SCALE, 48*PARAMS.SCALE);
            ctx.setLineDash([]);

            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x, this.y - this.game.camera.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.strokeStyle = "Black";
            ctx.strokeRect(this.x- this.game.camera.x- this.width/2 - 130, this.y- this.game.camera.y- this.height/2, this.width +130*2, this.height );
            ctx.strokeRect(this.x- this.game.camera.x- this.width/2 , this.y- this.game.camera.y- this.height/2 - 130, this.width , this.height +130*2 );

        }   
        this.healthbar.draw(ctx);
        ctx.font = '12px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";

 
    };


    getListOfRequiredForNextLevel() {
         // Adjust the base threshold as needed
        const baseCornThreshold = 1; 
        const baseStrawberryThreshold = 1;  
        const baseRiceThreshold = 2;  

        const cornThreshold = baseCornThreshold + (this.level * 5);
      const strawberryThreshold = baseStrawberryThreshold + (this.level * 5);
       const riceThreshold = baseRiceThreshold + (this.level * 5);
       
        return [cornThreshold,strawberryThreshold,riceThreshold];
    }

    levelUp() {
        const requiredPlants = this.getListOfRequiredForNextLevel(this.level);
    
        if (
            this.farmInventory[PLANTNAMES.CORN] >= requiredPlants[PLANTNAMES.CORN] &&
            this.farmInventory[PLANTNAMES.STRAWBERRY] >= requiredPlants[PLANTNAMES.STRAWBERRY] &&
            this.farmInventory[PLANTNAMES.RICE] >= requiredPlants[PLANTNAMES.RICE]
        ) {

            this.level++;
            this.maxhitpoints += 20 + 5*this.level;
            this.hitpoints = this.maxhitpoints;
            this.baseDamage +=5 + 2*this.level;
            this.farmInventory[PLANTNAMES.CORN] = this.farmInventory[PLANTNAMES.CORN] - requiredPlants[PLANTNAMES.CORN];
            this.farmInventory[PLANTNAMES.STRAWBERRY] = this.farmInventory[PLANTNAMES.STRAWBERRY] - requiredPlants[PLANTNAMES.STRAWBERRY];
            this.farmInventory[PLANTNAMES.RICE] =  this.farmInventory[PLANTNAMES.RICE] - requiredPlants[PLANTNAMES.RICE];
            this.game.addEntity(new LevelUp(this.game, this.x - this.game.camera.x, this.y- this.game.camera.y));
            //console.log("Congratulations! You've leveled up to level " + this.level + "!");
        }
    }

}





class CharacterClone{
    constructor(game, x, y,path) {
        Object.assign(this, { game, x, y, path});
        this.spawnx =0;
        this.x = x;
        this.y = y;
        this.width = 48;
        this.height = 48;
        this.damageBase = 5;
        //walking to the target information
        this.radius = 48/2;
        this.visualRadius = 400;
  
    
        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];
        var dist = distance(this, this.target);
  
        this.maxSpeed = 100; // pixels per second
      //  this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        
        //healthbar information
        this.healthbar= new HealthBar(this, this.game);
        this.hitpoints = 250;
        this.maxhitpoints = 250;
       // this.game.slime = this;
        this.speed = 1;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/villager1.png");
  
        // MainCharacter's state variables
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 2 = idle, 0 = walking, 1 = attack
        this.dir =0;
        this.dead = false;
        this.youwin = false;
  
  
        this.fallAcc = 562.5;
  
        this.updateBB();
  
        
        this.animations = [];
        this.elapsedTime = 0;
        this.attackTarget = null;
     //   this.path.push({x:this.game.character.x,y: this.game.character.y});
     for (var i = 0; i < 3; i++) {//State: 0 = walking, 1 = attacking 
        this.animations.push([]);
        for (var j = 0; j < 4; j++) { // 4 Directions
            this.animations[i].push([]);

        }
    }

// walk down
    this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 48, 48, 3, 0.15, 0, false, true);
// walk left

    this.animations[0][1] = new Animator(this.spritesheet, 0, 48+1, 48, 48, 3, 0.15, 0, false, true);
// walk right

    this.animations[0][2] = new Animator(this.spritesheet, 0, 48*2+1, 48, 48, 3, 0.15, 0, false, true);
// walk up

    this.animations[0][3] = new Animator(this.spritesheet, 0, 48*3+1, 48, 48, 3, 0.15, 0, false, true);


 //attack
    this.animations[1][0] = new Animator(this.spritesheet, 48*6, 0, 32, 32, 4, 0.1, 0, false, true);
    this.animations[1][1] = new Animator(this.spritesheet, 48*6, 32, 32, 32, 4, 0.1, 0, false, true);
    this.animations[1][2] = new Animator(this.spritesheet, 48*6, 32*2, 32, 32, 4, 0.1, 0, false, true);
    this.animations[1][3] = new Animator(this.spritesheet, 48*6, 32*3, 32, 32, 4, 0.1, 0, false, true);

    //idk walk> idle?
    this.animations[2][0] = new Animator(this.spritesheet, 48*3, 0, 48, 48, 3, 0.20, 0, false, true);

    this.animations[2][1] = new Animator(this.spritesheet, 48*3, 48+1, 48, 48, 3, 0.20, 0, false, true);

    this.animations[2][2] = new Animator(this.spritesheet, 48*3, 48*2+1, 48, 48, 3, 0.20, 0, false, true);

    this.animations[2][3] = new Animator(this.spritesheet, 48*3, 48*3+1, 48, 48, 3, 0.20, 0, false, true);
  


    };
    
  isDead(){

  }

    updateBB() {
        
        this.BB = new BoundingBox(this.x - this.game.camera.x - (48/2), this.y - this.game.camera.y - (46/2), 55, 55);
    
    };
    update(){
        
  
        this.updateBB();
        this.elapsedTime += this.game.clockTick;
        var dist = distance(this, this.target);

     
 
       var that = this;
            that.characterlast = false;
       for (var i = 0; i < this.game.entities.length; i++) {
           var ent = this.game.entities[i];
           if (ent.BB && this.BB.collide(ent.BB)) {
           if(ent instanceof CharacterClone){


            const collisionDirection = this.BB.checkCollisionSides(ent.BB);
            if(collisionDirection.left){
                this.x -= this.speed;
            }else if(collisionDirection.right) {
                this.x += this.speed;
            }else if(collisionDirection.top) {
                this.y -= this.speed;
            }else if(collisionDirection.bottom) {
                this.y += this.speed;
            }
        }
             
        }


           if (ent instanceof Boss){
             if(ent.hitpoints<=0){
               this.removeFromWorld =true;
             }
           }
        
//            if (ent instanceof MainCharacter && !canSee(this, ent)) {
// that.notmove = true;
// this.state =2;
//            }
        //    if(ent instanceof Wizard2 || ent instanceof Wizard||ent instanceof MainCharacter&&!canSee(this, ent)){
        //         this.state= 2;
        //    }
      
    

           if ((ent instanceof Wizard2|| ent instanceof Wizard||  ent instanceof Wizard3||ent instanceof Skele|| ent instanceof BoarSkill|| ent instanceof Boar|| ent instanceof Skeleton||ent instanceof DemonSlime||
            ent instanceof Boss||  ent instanceof GreenGoblin ||ent instanceof Boss|| ent instanceof Slime|| ent instanceof Guardian || ent instanceof Mantis  ) && canSee(this, ent)) {

            that.characterlast = true;

               this.target = ent;
               //character
 
           
                       this.state =0;
               if(this.target.x <this.x){
                this.dir = 1;
               }
               if(this.target.x>this.x){
                this.dir = 2;
               }

           }
           else   if ((ent instanceof MainCharacter && !that.characterlast) && canSee(this, ent)){
            this.target = ent;
            //character

            this.state =0;
            if(this.target.x <this.x){
             this.dir = 1;
            }
            if(this.target.x>this.x){
             this.dir = 2;
            }
           }
           if (ent instanceof MainCharacter && collide(this, ent)) {
            this.state = 2;
        }

          if ((ent instanceof Wizard2|| ent instanceof Wizard||ent instanceof Skele|| ent instanceof BoarSkill|| ent instanceof Boar|| ent instanceof Skeleton||ent instanceof DemonSlime||   ent instanceof GreenGoblin 
            ||ent instanceof Boss|| ent instanceof Slime|| ent instanceof Guardian || ent instanceof Mantis ) && collide(this, ent)) {

         //   console.log("facelft " + this.faceleft)
             
         
 
 
                     
                   this.state = 1;
                   if (this.elapsedTime > 0.9) {
                       var damage = 19 + randomInt(4);
                       ent.hitpoints -= damage;
                       this.game.addEntity(new CharacterGetDamageScore(this.game, ent.x - this.game.camera.x +  Math.floor(Math.random() * (31 - 20) + 20),   ent.y - this.game.camera.y -  Math.floor(Math.random() * (31 - 20) + 20) , damage));
                       if(ent.hitpoints<=0){
                        ent.removeFromWorld = true;
                       }
    
                       // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                       this.elapsedTime = 0;
                   }
                   if(ent instanceof Boss){
                    if(ent.hitpoints<=0){
                        this.youwin = true;
                        console.log("YOU WIN")
                    }
                   }


                
         
               
       
           }
       
           

        if (ent instanceof MainCharacter){
            this.spawnx = ent.x;
           }
      if(this.hitpoints<=0){
        this.removeFromWorld = true;
      }
     
      }
   
       if (this.state !== 1&& this.state !==2) {
           dist = distance(this, this.target);
           this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
           //this help me move
           this.x += this.velocity.x * this.game.clockTick;
       
           this.y += this.velocity.y * this.game.clockTick;
        }
 
   //    this.facing = getFacing(this.velocity);
   
   };
     
     
     
       
    draw(ctx) {
        if(this.state==0){
            this.animations[this.state][this.dir].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - (48/2),this.y - this.game.camera.y - (46/2) ,PARAMS.SCALE);

        }
      
        if(this.state==1){
            this.animations[0][this.dir].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - (48/2),this.y - this.game.camera.y - (46/2) ,PARAMS.SCALE);
//2             if
                if(this.dir==2&&this.state!=2){
            this.animations[this.state][this.dir].drawFrame(this.game.clockTick,ctx,this.x +30- this.game.camera.x - (48/2),this.y - this.game.camera.y - (15/2) ,PARAMS.SCALE);
                }
                if(this.dir==1&&this.state!=2){
                    this.animations[this.state][this.dir].drawFrame(this.game.clockTick,ctx,this.x -20- this.game.camera.x - (48/2),this.y - this.game.camera.y - (15/2) ,PARAMS.SCALE);

                }
                // if(this.state ==2){
                // this.animations[2][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - (48/2),this.y - this.game.camera.y - (46/2) ,PARAMS.SCALE);
                // }
             
        }
        else if  (   this.state==2)    {
            this.animations[2][0].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - (48/2),this.y - this.game.camera.y - (46/2) ,PARAMS.SCALE);
            }



        if (PARAMS.DEBUG) {
            ctx.stroke();
  
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.x - this.game.camera.x - (48/2), this.y - this.game.camera.y - (46/2), 48, 46);
  
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x , this.y - this.game.camera.y , this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
  
            ctx.strokeStyle = "Orange";
            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x , this.y - this.game.camera.y , this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
  
            ctx.setLineDash([]);
  
        }
        this.healthbar.draw(ctx);
  
        
    //    this.animations[this.directionFace][0].drawFrame(this.game.clockTick,ctx,this.x,this.y,3);
    //     ctx.fillStyle = "White";
    //     ctx.strokeStyle="Red";
    //     ctx.fill();
    //     ctx.strokeRect(this.x,this.y,100,100);
    //     this.animations[this.direction][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
    //     this.animations[this.direction][1].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
    //     this.animations[this.direction][2].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        
    };
  
  }