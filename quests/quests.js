class FarmQuest{
    constructor(game) {
        Object.assign(this, { game});
        this.velocity = 0;
        this.requireNum = 30;
        this.currentNum = 0;
        this.dmgAward = 10;
        this.hpAward = 20;
        this.finished = false;

    };

    update() {
        let current = 0;
        this.game.camera.listOfTrippleSoil.forEach((each)=>{
            if(each != null && each.plants.length > 0 ){ 
                console.log(each.plants);
                each.plants.forEach(e=>{
                    if(e) current  += 1;

                })
            }
        })
        if(current === this.requireNum ){
            this.game.character.getAward(this.dmgAward, this.hpAward);
            this.requireNum  = -1;
            this.removeFromWorld = true;
            this.finished = true;
        }
        this.currentNum = current;
    };

    draw(ctx) {
        ctx.font = '15px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";
        ctx.fillText("Plant Seeds: " + this.currentNum + "/" + this.requireNum , 30 , PARAMS.CANVAS_HEIGHT*0.95);
    };
    
};
class KillBugQuest{
    constructor(game) {
        Object.assign(this, { game});
        this.velocity = 0;
        this.requireNum = 0;
        this.currentNum = 0;
        this.dmgAward = 10;
        this.hpAward = 20;
       // this.loadNumOfBug();
        this.finished = false;
    
    };

    loadNumOfBug(){
        this.game.camera.listOfTrippleSoil.forEach((each)=>{
            each.listOfBugs.forEach(each =>{
                if(each != 0)  this.requireNum += 1;
            })

        }
        );
    }
    update() {
        let current = 0;
        this.game.camera.listOfTrippleSoil.forEach((each)=>{
            each.listOfBugs.forEach(each =>{
                if(each != 0)  current += 1;
            })

        }
        );
        if(current === this.requireNum ){
            this.game.character.getAward(this.dmgAward, this.hpAward);
            this.requireNum  = -1;
            this.removeFromWorld = true;
            this.finished = true;
        }
        this.currentNum = current;
    };

    draw(ctx) {
        ctx.font = '15px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";
        ctx.fillText("Clear Bugs: "+ this.currentNum , 30 , PARAMS.CANVAS_HEIGHT*0.95);
    };
    
};

class FishingQuest{
    constructor(game) {
        Object.assign(this, { game});
        this.velocity = 0;
        this.requireNum = 4;
        this.currentNum = 0;
        this.dmgAward = 10;
        this.hpAward = 20;
        this.currentFish = this.game.character.numberOfFish;
        this.finished = false;

    };

    update() {
        let current = 0;
        current = this.game.character.numberOfFish -  this.currentFish;
        if(current === this.requireNum ){
            this.game.character.getAward(this.dmgAward, this.hpAward);
            this.requireNum  = -1;
            this.removeFromWorld = true;
            this.finished = true;

        }
        this.currentNum = current;
    };

    draw(ctx) {
        ctx.font = '15px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";
        ctx.fillText("Catch Fishes: " + this.currentNum + "/" + this.requireNum , 30 , PARAMS.CANVAS_HEIGHT*0.95);
    };
    
};

class SlimeKills{
    constructor(game) {
        Object.assign(this, { game});
        this.velocity = 0;
        this.requireNum = 4;
        this.currentNum = 0;
        this.dmgAward = 20;
        this.hpAward = 30;
        this.current = 0;
        this.temp = 0;
        this.finished = false;

    };

    update() {
        this.current =  0;
        this.game.camera.listOfSlime.forEach(e=>{
            if(e.removeFromWorld == true) {
                this.current += 1;
            
            }
        })
        
        this.temp = this.current;

        if(this.current === this.requireNum ){
            this.game.character.getAward(this.dmgAward, this.hpAward);
            this.requireNum  = -1;
            this.removeFromWorld = true;
            this.finished = true;

        }
        this.currentNum = this.current;
    };

    draw(ctx) {
        ctx.font = '15px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";
        ctx.fillText("Slime Kills: " + this.currentNum + "/" + this.requireNum , 30 , PARAMS.CANVAS_HEIGHT*0.95);
    };
    
};
class MantisKill{
    constructor(game) {
        Object.assign(this, { game});
        this.velocity = 0;
        this.requireNum = 3;
        this.currentNum = 0;
        this.dmgAward = 30;
        this.hpAward = 50;
        this.current = 0;
        this.temp = 0;
        this.finished = false;

    };

    update() {
        this.current =  0;
        this.game.camera.listOfMantis.forEach(e=>{
            if(e.removeFromWorld == true) {
                this.current += 1;
            
            }
        })
        
        this.temp = this.current;

        if(this.current === this.requireNum ){
            this.game.character.getAward(this.dmgAward, this.hpAward);
            this.requireNum  = -1;
            this.removeFromWorld = true;
            this.finished = true;

        }
        this.currentNum = this.current;
    };

    draw(ctx) {
        ctx.font = '15px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";
        ctx.fillText("Mantis Kills: " + this.currentNum + "/" + this.requireNum , 30 , PARAMS.CANVAS_HEIGHT*0.95);
    };
    
};