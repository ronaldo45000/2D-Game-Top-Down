class HealthBar {
    constructor(agent) {
        Object.assign(this, {agent});
        
    };

    update() {
       
    };

    draw(ctx) {
        if (this.agent.hitpoints < this.agent.maxhitpoints) {
            var ratio = this.agent.hitpoints / this.agent.maxhitpoints;
            ctx.strokeStyle = "Black";
           ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Yellow" : "Green";
            ctx.fillRect(this.agent.x - this.agent.radius - this.agent.game.camera.x, this.agent.y - this.agent.game.camera.y + this.agent.radius + 5, this.agent.radius * 2 * ratio, 4);
            ctx.strokeRect(this.agent.x - this.agent.radius  - this.agent.game.camera.x , this.agent.y + this.agent.radius + 5 - this.agent.game.camera.y, this.agent.radius * 2, 4);
        }
    };
};

class Score {
    constructor(game, x, y, score) {
        Object.assign(this, { game, x, y, score });
        this.velocity = -32;
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 1) this.removeFromWorld = true;
       
        this.y += this.game.clockTick * this.velocity;
    };

    draw(ctx) {
        var offset = this.score < 10 ? 6 : 12;
        ctx.font = '12px "Press Start 2P"';
        ctx.strokeStyle = "black";
        this.game.ctx.fillStyle = "White";
        ctx.fillText(this.score, this.x - offset + 1, this.y + 1);
  
        
    };
};
class CharacterGetDamageScore {
    constructor(game, x, y, score) {
        Object.assign(this, { game, x, y, score });
        this.velocity = -32;
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 1) this.removeFromWorld = true;
       
        this.y += this.game.clockTick * this.velocity;
    };

    draw(ctx) {
        var offset = this.score < 10 ? 6 : 12;
        ctx.font = '12px "Press Start 2P"';
        ctx.strokeStyle = "black";
        this.game.ctx.fillStyle = "red";
        ctx.fillText(this.score, this.x - offset + 1, this.y + 1);
  
        
    };
};

class LevelUp{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.velocity = -32;
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 2) this.removeFromWorld = true;
       
        this.y += this.game.clockTick * this.velocity;
    };

    draw(ctx) {
        ctx.font = '12px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";
        ctx.fillText("Level Up!", this.x - 48 , this.y + 1 );
    };
};

class HPBottle{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.x = x;
        this.y = y;
        this.width = 12;
        this.height = 14;
        this.velocity = +42;
        this.elapsed = 0;
        this.spritesheetFarmLand = ASSET_MANAGER.getAsset("./sprites/farmland.png");
        this.updateBB();

    };
    update() {
        this.updateBB();
        if (this.elapsed < 4)this.elapsed += this.game.clockTick;
        if (this.elapsed < 1) this.y += this.game.clockTick * this.velocity;
        
    };

    draw(ctx) {
        ctx.font = '12px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";
        ctx.drawImage(this.spritesheetFarmLand, 325, 0,12,14, this.x  - this.game.camera.x, this.y - this.game.camera.y,12*1.5,14*1.5);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.x- this.game.camera.x, this.y- this.game.camera.y, this.width, this.height);
        }
    };
    updateBB() {
        
        this.BB = new BoundingBox(this.x- this.game.camera.x, this.y- this.game.camera.y, this.width, this.height);
    
    };
}
class DMGBottle{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.x = x;
        this.y = y;
        this.width = 12;
        this.height = 14;
        this.velocity = +42;
        this.elapsed = 0;
        this.spritesheetFarmLand = ASSET_MANAGER.getAsset("./sprites/farmland.png");
        this.updateBB();

    };
    update() {
        this.updateBB();
        if (this.elapsed < 4)this.elapsed += this.game.clockTick;
        if (this.elapsed < 1) this.y += this.game.clockTick * this.velocity;
        
    };

    draw(ctx) {
        ctx.font = '12px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";
        ctx.drawImage(this.spritesheetFarmLand, 341, 0,12,16, this.x  - this.game.camera.x, this.y - this.game.camera.y,12*1.5,16*1.5);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.x- this.game.camera.x, this.y- this.game.camera.y, this.width, this.height);
        }
    };
    updateBB() {
        
        this.BB = new BoundingBox(this.x- this.game.camera.x, this.y- this.game.camera.y, this.width, this.height);
    
    };
}

class PlusHP{
    constructor(game, x, y, hp) {
        Object.assign(this, { game, x, y, hp});
        this.velocity = -32;
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 2) this.removeFromWorld = true;
       
        this.y += this.game.clockTick * this.velocity;
    };

    draw(ctx) {
        ctx.font = '12px "Press Start 2P"';
        this.game.ctx.fillStyle = "Red";
        ctx.fillText("+"+ this.hp+" HP!", this.x - 48 , this.y + 1 );
    };
    
};
class PlusDMG{
    constructor(game, x, y, dmg) {
        Object.assign(this, { game, x, y, dmg});
        this.velocity = -32;
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 2) this.removeFromWorld = true;
       
        this.y += this.game.clockTick * this.velocity;
    };

    draw(ctx) {
        ctx.font = '12px "Press Start 2P"';
        this.game.ctx.fillStyle = "Yellow";
        ctx.fillText("+" + this.dmg + " DMG!", this.x - 48 , this.y + 1 );
    };
    
};
class PlusPlant{
    constructor(game, x, y, message) {
        Object.assign(this, { game, x, y, message});
        this.velocity = -32;
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 2) this.removeFromWorld = true;
       
        this.y += this.game.clockTick * this.velocity;
    };

    draw(ctx) {
        ctx.font = '12px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";
        ctx.fillText(this.message, this.x  , this.y - 20 );
    };
    
};

class GoToSleepMessage{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.velocity = 0;
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 5) this.removeFromWorld = true;
       
        this.y += this.game.clockTick * this.velocity;
    };

    draw(ctx) {
        ctx.font = '15px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";
        ctx.fillText("Please go home and Sleep (press I)", this.x - 48 , this.y + 1 );
    };
    
};
class MessageNotification{
    constructor(game, x, y, message) {
        Object.assign(this, { game, x, y});
        this.velocity = 0;
        this.elapsed = 0;
        this.message = message;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 5) this.removeFromWorld = true;
       
        this.y += this.game.clockTick * this.velocity;
    };

    draw(ctx) {
        ctx.font = '15px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";
        ctx.fillText(this.message, this.x - 48 , this.y + 1 );
    };
    
};
class MessageInteract{
    constructor(game, x, y, message) {
        Object.assign(this, { game, x, y});
        this.velocity = 0;
        this.elapsed = 0;
        this.message = message;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 0.1) this.removeFromWorld = true;
    };

    draw(ctx) {
        ctx.font = '10px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";
        ctx.fillText(this.message, PARAMS.CANVAS_WIDTH - 20 - ctx.measureText(this.message).width , PARAMS.CANVAS_HEIGHT*0.95 );
    };
    
};
class FishEatTheBait{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.velocity = 0;
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 2) this.removeFromWorld = true;
       
        this.y += this.game.clockTick * this.velocity;
    };

    draw(ctx) {
        ctx.font = '20px "Press Start 2P"';
        this.game.ctx.fillStyle = "White";
        ctx.fillText("!", this.x - 5, this.y - 20 );
    };
    
};