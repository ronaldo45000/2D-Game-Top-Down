// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};
        this.keyF = false;
        this.keyG = false;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        this.rightClick = false;
        this.leftClick = false;

        this.testSleepCutScene = false;

        this.mouseClick = false;
        this.keyG = false;
        this.keyE = false;
        this.keyR = false;
        this.keyQ = false;
        this.keyT = false;

        this.spaceKey = false;
        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;

        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {

        this.ctx.canvas.addEventListener("mousedown", e => {
            if (this.options.debugging) {
                console.log("MOUSE_DOWN", getXandY(e));
            }
            this.mouseClick = true; 
      
        });
        this.ctx.canvas.addEventListener("mouseup", e => {
            if (this.options.debugging) {
                console.log("MOUSE_UP", getXandY(e));
            }
            this.mouseClick = false; 
            this.click = null;
        
        });
        


        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
            console.log("CLICK", getXandY(e));

        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });
        
        const keyUpListener = (e)=>{
            switch (e.code) {
                case "KeyQ":
                    this.keyQ = false;
                    break;
                case "KeyR":
                    this.keyR = false;
                    break;
                case "KeyE":
                    this.keyE = false;
                    break;
                case "KeyI":
                   // ++PARAMS.DAYCOUNTER;
                  //  this.game.dayNightManager.time = 6;
                    this.testSleepCutScene = false;
                    break;
                case "ArrowLeft":
                case "KeyA":
                    this.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    this.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.down = false;
                    break;
                case "KeyZ":
                case "Comma":
                    this.B = false;
                    break;
                case "KeyX":
                case "Period":
                    this.A = false;
                    break;
                case "Space":
                    this.spaceKey = false;
                    break;
                case "KeyF":
                        this.keyF = false;
                break
                case "KeyG":
                    this.keyG = true;
            break
            case "KeyT":
                this.keyT = false;
        break
            }
        }

        const keyDownListener = (e)=>{
            switch (e.code) {
                case "KeyQ":
                    this.keyQ = true;
                    break;
                case "KeyR":
                    this.keyR = true;
                    break;
                case "KeyE":
                        this.keyE = true;
                        break;
                case "KeyI":
                    this.testSleepCutScene = true;
                    break;
                case "ArrowLeft":
                case "KeyA":
                    this.left = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.right = true;
                    break;
                case "ArrowUp":
                case "KeyW":
                    this.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.down = true;
                    break;
                case "KeyZ":
                case "Comma":
                    this.B = true;
                    break;
                case "KeyX":
                case "Period":
                    this.A = true;
                    break;
                case "Space":
                    this.spaceKey = true;
                    break;
                case "KeyF":
                    this.keyF = true;
                    break;
                    case "KeyG":
                        this.keyG = false;
                break
                case "KeyT":
                    this.keyT = true;
            break
            }
        }

        this.ctx.canvas.addEventListener("keydown", keyDownListener);
        this.ctx.canvas.addEventListener("keyup", keyUpListener);

        this.ctx.canvas.addEventListener('blur', () => {
            // Reset movement flags when focus is lost
            this.left = false;
            this.right = false;
            this.up = false;
            this.down = false;
            // Optionally, you can stop Mario's movement here as well
            // mario.stopMovement();
        });
    };

    addEntity(entity) {
        this.entities.push(entity);
    };
    addEntityFirst(entity) {
        this.entities.unshift(entity);
    };
    addEntityAtIndex(index, entity){
        this.entities.splice(index,0,entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        //this.ctx.save();
        // Draw latest things first
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
       this.camera.draw(this.ctx);
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];
            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
       this.camera.update();
        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }

    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};

// KV Le was here :)