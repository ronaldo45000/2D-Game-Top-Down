const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/villager1.png");
ASSET_MANAGER.queueDownload("./sprites/farmAsset.png");
ASSET_MANAGER.queueDownload("./sprites/slime.png");
ASSET_MANAGER.queueDownload("./sprites/farmland.png");
ASSET_MANAGER.queueDownload("./sprites/farmAsset.png");
ASSET_MANAGER.queueDownload("./sprites/forest.png");
ASSET_MANAGER.queueDownload("./sprites/farmHouses.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/wizardRun.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/wizardidle.png");

ASSET_MANAGER.queueDownload("./sprites/enemy/wizardAttack1.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/wizardattack2.png");

ASSET_MANAGER.queueDownload("./sprites/enemy/boarWalk.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/boarThrust.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/boarIdle.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/goblinattack.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/goblinrun.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/4dgoblin.png");

ASSET_MANAGER.queueDownload("./sprites/enemy/wormattack.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/wormwalk.png");
ASSET_MANAGER.queueDownload("./sprites/watereffect.png");
ASSET_MANAGER.queueDownload("./sprites/fireball (2).png");
ASSET_MANAGER.queueDownload("./sprites/wizardspawn.png");
ASSET_MANAGER.queueDownload("./sprites/house.png");
ASSET_MANAGER.queueDownload("./sprites/enemyhouse.png");
ASSET_MANAGER.queueDownload("./sprites/plantkiller.png");
ASSET_MANAGER.queueDownload("./sprites/boarSkill.png");

 
ASSET_MANAGER.queueDownload("./sprites/wolfsheet1.png");
ASSET_MANAGER.queueDownload("./sprites/towers.png");

ASSET_MANAGER.queueDownload("./sprites/shuriken.png");
ASSET_MANAGER.queueDownload("./sprites/endportal.png");
ASSET_MANAGER.queueDownload("./sprites/Bringer-of-Death-SpritSheet.png")
ASSET_MANAGER.queueDownload("./sprites/bossmap.png")
ASSET_MANAGER.queueDownload("./sprites/skeleton.png")
ASSET_MANAGER.queueDownload("./sprites/demonslime.png")
ASSET_MANAGER.queueDownload("./sprites/slash.png")
ASSET_MANAGER.queueDownload("./music/chill.mp3");

ASSET_MANAGER.queueDownload("./sprites/fishing.png");
ASSET_MANAGER.queueDownload("./sprites/Bee_Idle.png");
ASSET_MANAGER.queueDownload("./sprites/Bee_Walk.png");

ASSET_MANAGER.queueDownload("./sprites/enemy/skeletondownattack.png");
 ASSET_MANAGER.queueDownload("./sprites/enemy/skeletonhitright.png");
 ASSET_MANAGER.queueDownload("./sprites/enemy/skeletonleftattack.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/skeletonupattack.png");
 ASSET_MANAGER.queueDownload("./sprites/enemy/skeletonwalkdown.png");
 ASSET_MANAGER.queueDownload("./sprites/enemy/skeletonwalkleft.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/skeletonwalkright.png");
ASSET_MANAGER.queueDownload("./sprites/enemy/skeletonwalkup.png");
ASSET_MANAGER.queueDownload("./sprites/snowm.png");
ASSET_MANAGER.queueDownload("./sprites/snowtree.png");
ASSET_MANAGER.queueDownload("./sprites/snowhouse.png");
ASSET_MANAGER.queueDownload("./sprites/tornado.png");
ASSET_MANAGER.queueDownload("./sprites/turretshadow.png");
ASSET_MANAGER.queueDownload("./sprites/guardian.png");
ASSET_MANAGER.queueDownload("./sprites/props.png");


//audio
ASSET_MANAGER.queueDownload("./audio/slsh2.mp3");
ASSET_MANAGER.queueDownload("./audio/walk1.mp3");
//music
ASSET_MANAGER.queueDownload("./music/bossmusic.mp3");
ASSET_MANAGER.queueDownload("./music/adventure.mp3");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth*.98;
	canvas.height = window.innerHeight*0.9;	
	window.addEventListener("resize", () => {
		canvas.width = window.innerWidth*.98;
		canvas.height = window.innerHeight*0.9;	
		PARAMS.CANVAS_WIDTH = canvas.width;
		PARAMS.CANVAS_HEIGHT = canvas.height;
		// Additional logic to handle resizing if needed
	});
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	
	gameEngine.init(ctx);
	ASSET_MANAGER.autoRepeat("./music/chill.mp3");

	//gameEngine.addEntity(new SceneManager(gameEngine));
	new SceneManager(gameEngine);

	gameEngine.start();
});
