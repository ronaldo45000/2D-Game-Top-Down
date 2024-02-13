class StrawberryPlant{
    constructor(game, x, y, dayCounter) {
        Object.assign(this, { game, x, y });

        this.x = x;
        this.y = y;
        this.height = 30;
        this.width = 30.6;
        this.duration  = 2; // take 4 date
        this.state = 2; // there are 3 states.
        this.startDay = dayCounter;
        this.isHarvestable = false;
        this.dayofBugs = new Set();

        // spritesheet
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
    }; 

    getPercentOfCrop(){
        console.log((1 - this.dayofBugs.size/this.duration)*100);

        if(1 - this.dayofBugs.size/this.duration <= 0.2) return 0.2; 
        return 1 - this.dayofBugs.size/this.duration;
    }
    update(dayCounter, hasBug){
        if(hasBug) this.dayofBugs.add(dayCounter);
        else this.dayofBugs.delete(dayCounter);
        switch (dayCounter - this.startDay) {
            case 0:
                this.state = 0;
                break;
            case 1:
                this.state = 1;
                break;
            case 2:
                this.state = 2;           
                break;
            default:
                this.state = 2;   
                break;
        }
        //check if it is ready to harvest.
        if(dayCounter - this.startDay >= this.duration){
            this.isHarvestable = true;
        }
    };
    draw(ctx) {
 
        ctx.drawImage(this.spritesheet,864 + this.width*this.state ,64, this.width ,this.height, this.x - this.game.camera.x ,this.y - this.game.camera.y - this.height + 27,this.width,this.height);

    }

}