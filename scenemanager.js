class SceneManager {
  constructor(game) {
    //********************************* */
    //THE FINAL BOSS MAP START AT Y = 2200;
    //normalBossesHome.js line 87 for Final Boss Floor.
    //********************************* */
    //GO TO line 606 for The Final Map Bound
    //InvisibleFenceBlocker is used !!!
    //Add the current gameEngine as its property.
    this.game = game;
    //Injecting This SceneManager object with its properites back to GameEngine.
    this.game.camera = this;
    //these values are for camera track.
    //go to line 61, they are set to focus on the main charater.
    this.x = 0;
    this.y = 0;

    this.spritesheetFarmLand = ASSET_MANAGER.getAsset("./sprites/farmland.png");
    this.dayNightManager = new DayNightCycle(this.game, 0);

    this.countDeath = 0;
    this.notInGameYet = false;
    this.onetime =false;
    this.character = new MainCharacter(this.game, 800, 525);

    this.nextNextCutScene = false;

    this.listOfSlime = [];

    this.listOfTree = [];

    this.listOfCutTree = [];

    this.listOfDeadTree = [];

    this.listOfSproutTree = [];

    this.listOfSeedGrass = [];

    this.listOfMediumGrass = [];

    this.listOfThickGrass = [];

    this.listOfTrippleSoil = [];

    this.listOfDirtGround = [];

    this.listOfBuildingsBlOCKCharacter = [];
    this.listOfBuildingsNOTBlOCKCharacter = [];

    this.listOfAnimals = [];

    this.listOfSmallPlants = [];

    this.listOfLakeAndOtherSide = new LakeAndOtherSide(this.game);
    this.normalBossesHouse = new NormalBossesHome(this.game);

    this.listOfInvisibleBlocker = [];
    this.listOfBossTowers = [];

    //added list of normal here please
    this.listofNormallBosses = [];
    //first in first out in the game.
    
    //added list of normal
    this.normalBossesIndexEntity; //keep track of the index where normal should be loaded to entities List

    this.normalGrass = new FarmLandNormalGrass(this.game, 0, 0);
    this.dog = new Dog(this.game, 500, 400, [
      { x: 500, y: 500 },
      { x: 800, y: 800 },
      { x: 700, y: 1200 },
    ]);

    this.wiz = new Wizard(this.game, 330, 2050, [
      { x: randomInt(3800), y: randomInt(3800) },
      { x: randomInt(3800), y: randomInt(3800) },
      { x: randomInt(3800), y: randomInt(3800) },
      { x: 0, y: 0 },
    ]);
    this.wiz2 = new Wizard2(this.game, 400, 2050, [
      { x: randomInt(3800), y: randomInt(3800) },
      { x: randomInt(3800), y: randomInt(3800) },
      { x: randomInt(3800), y: randomInt(3800) },
      { x: 0, y: 0 },
    ]);
    this.wizardspawn = new WizardSpawn(this.game, 110, 110);
    this.wizardspawn2 = new WizardSpawn2(this.game, 510, 110);


    this.camp = new Campfire(this.game, 110, 110);
    this.game.addEntity(new Start(this.game));
    
  
    //this.loadMap();
    this.elapsed = 0;
  }
  loadSlime() {
    this.listOfSlime = [];
    this.listOfSlime.push(
      new Slime(this.game, 1050, 1250, [{ x: 1055, y: 555 }])
    );
    this.listOfSlime.push(
      new Slime(this.game, 1300, 1200, [{ x: 1055, y: 555 }])
    );

    this.listOfSlime.push(
      new Slime(this.game, 1200, 1200, [{ x: 1055, y: 555 }])
    );
    this.listOfSlime.push(
      new Slime(this.game, 966, 1200, [{ x: 1055, y: 555 }])
    );

    for (let i = 0; i < this.listOfSlime.length; i++) {
      this.listOfSlime[i].removeFromWorld = false;
      this.game.addEntity(this.listOfSlime[i]);
    }
  }
  loadMap() {
    //Loading Bosses
    this.listofNormallBosses = [];
    this.listofNormallBosses.push(
      new BoarSkill(this.game, 700, 1200, [{ x: 1720, y: 1322 }])
    );
    this.listofNormallBosses.push(
      new Boar(this.game, 600, 1200, [{ x: 1720, y: 1322 }])
    );
    this.listofNormallBosses.push(
      new GreenGoblin(this.game, 600, 1200, [{ x: 1720, y: 1322 }])
    );
    //Reset for new gameplay.
    this.listOfTrippleSoil = [];

    let houseX = 50;
    let houseY = 460;

    this.game.addEntity(this.normalGrass);

    this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 100, 360));
    this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 200, 450));
    this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 500, 400));
    this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 650, 850));
    this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 650, 750));
    this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 680, 800));

    this.game.addEntity(this.listOfLakeAndOtherSide);
    this.normalBossesHouse.removeFromWorld = false;
    this.game.addEntity(this.normalBossesHouse);

    this.listOfInvisibleBlocker.push(new InvisibleLakeBlocker(this.game));
    for (let i = 0; i < this.listOfInvisibleBlocker.length; i++) {
      this.listOfInvisibleBlocker[i].removeFromWorld = false;
      this.game.addEntity(this.listOfInvisibleBlocker[i]);
    }

    this.character.removeFromWorld = false;



    let offset = 300;

    this.listOfDirtGround.push(
      new FarmLandDirtGround(this.game, 50, 250 + offset, 5, 5)
    );
    this.listOfDirtGround.push(
      new FarmLandDirtGround(this.game, 950, 150 + offset, 7, 4)
    );
    //this.listOfDirtGround.push(new FarmLandDirtGround(this.game, 550, 350 + offset, 4,4 ));

    for (let i = 0; i < this.listOfDirtGround.length; i++) {
      this.listOfDirtGround[i].removeFromWorld = false;
      this.game.addEntity(this.listOfDirtGround[i]);
    }

    this.listOfBuildingsBlOCKCharacter.push(
      new FarmLandBigHouse(this.game, 730, 550)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new FarmLandGiantHouse(this.game, 540, 500)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 515, 570, 15, 330)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 520, 890, 55, 15)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 640, 890, 250, 15)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 864, 570, 15, 330)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 520, 565, 355, 15)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 550, 565, 320, 120)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleMonsterBlocker(this.game, 570, 890, 80, 20)
    );

    this.listOfBuildingsNOTBlOCKCharacter.push(
      new FarmLandStatic(this.game, 60, 650, StaticType.ANIMAL_WATER)
    );
    this.listOfBuildingsNOTBlOCKCharacter.push(
      new FarmLandStatic(this.game, 530, 750, StaticType.ANIMAL_WATER)
    );
    this.listOfBuildingsNOTBlOCKCharacter.push(
      new FarmLandStatic(this.game, 70, 790, StaticType.ANIMAL_Food)
    );
    this.listOfBuildingsNOTBlOCKCharacter.push(
      new FarmLandStatic(this.game, 1280, 820, StaticType.WELL)
    );
    this.listOfBuildingsNOTBlOCKCharacter.push(
      new FarmLandStatic(this.game, 1250, 830, StaticType.BOTTLE)
    );
    this.listOfBuildingsNOTBlOCKCharacter.push(
      new FarmLandStatic(this.game, 150, 330, StaticType.DEADTREE)
    );
    this.listOfBuildingsNOTBlOCKCharacter.push(
      new FarmLandStatic(this.game, 950, 330, StaticType.DEADTREE)
    );
    // this.listOfBuildingsNOTBlOCKCharacter.push(new FarmLandStatic(this.game, 1600, 960, StaticType.CAMP));

    for (let i = 0; i < this.listOfBuildingsNOTBlOCKCharacter.length; i++) {
      this.listOfBuildingsNOTBlOCKCharacter[i].removeFromWorld = false;
      this.game.addEntity(this.listOfBuildingsNOTBlOCKCharacter[i]);
    }

    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 300, 750, AnimalType.COW)
    );
    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 250, 700, AnimalType.COW)
    );
    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 200, 660, AnimalType.COW)
    );
    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 100, 625, AnimalType.CHICKEN)
    );
    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 100, 655, AnimalType.CHICKEN)
    );
    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 100, 685, AnimalType.CHICKEN)
    );

    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 645, 700, AnimalType.SHEEP)
    );
    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 715, 700, AnimalType.SHEEP)
    );
    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 785, 700, AnimalType.SHEEP)
    );

    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 750, 750, AnimalType.SHEEP)
    );
    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 680, 750, AnimalType.SHEEP)
    );
    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 710, 800, AnimalType.SHEEP)
    );

    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 70, 735, AnimalType.EATINGCOW)
    );
    this.listOfAnimals.push(
      new FarmLandAnimal(this.game, 110, 735, AnimalType.EATINGCOW)
    );
    for (let i = 0; i < this.listOfAnimals.length; i++) {
      this.game.addEntity(this.listOfAnimals[i]);
    }

    //small plants
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 350, 880, PlantType.ROSE)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 382, 880, PlantType.ROSE)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 414, 880, PlantType.ROSE)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 350, 910, PlantType.ROSE)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 382, 910, PlantType.ROSE)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 414, 910, PlantType.ROSE)
    );

    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 0, 410, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 0, 440, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 0, 470, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 0, 500, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 0, 530, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 0, 560, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 204, 540, PlantType.BUSH)
    );

    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 0, 580, PlantType.CACTUS)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 0, 900, PlantType.CACTUS)
    );

    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 40, 880, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 70, 880, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 100, 880, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 130, 880, PlantType.BUSH)
    );

    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 40, 910, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 70, 910, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 100, 910, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 130, 910, PlantType.BUSH)
    );

    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 1300, 390, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 1300, 420, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 1300, 450, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 1300, 480, PlantType.BUSH)
    );

    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 1270, 390, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 1270, 420, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 1270, 450, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 1270, 480, PlantType.BUSH)
    );

    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 910, 600, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 910, 570, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 910, 540, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 910, 510, PlantType.BUSH)
    );

    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 880, 600, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 880, 570, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 880, 540, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 880, 510, PlantType.BUSH)
    );

    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 456, 310, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 488, 310, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 520, 310, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 456, 342, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 488, 342, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 520, 342, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 1980, 990, PlantType.BUSH)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 1980, 1020, PlantType.BUSH)
    );

    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 162, 880, PlantType.SUNFLOWER)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 194, 880, PlantType.SUNFLOWER)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 226, 880, PlantType.SUNFLOWER)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 258, 880, PlantType.SUNFLOWER)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 1050, 320, PlantType.CUTTREE)
    );
    this.listOfSmallPlants.push(
      new ForestSmallPlant(this.game, 50, 320, PlantType.CUTTREE)
    );
    //  this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1670, 930, PlantType.FIRE));
    //   this.listOfSmallPlants.push(new ForestSmallPlant(this.game, 1550, 930, PlantType.PURPLEFLOWER));

    for (let i = 0; i < this.listOfSmallPlants.length; i++) {
      this.game.addEntity(this.listOfSmallPlants[i]);
    }

    let soildOffer = 300;
    if (this.listOfTrippleSoil.length <= 12) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 6; j++) {
          this.listOfTrippleSoil.push(
            new HorizontalSoil(
              this.game,
              970 + 140 * i,
              175 + 70 * j + soildOffer
            )
          );
        }
      }
      //  this.listOfTrippleSoil = [];
      for (let i = this.listOfTrippleSoil.length - 1; i >= 0; i--) {
        this.listOfTrippleSoil[i].removeFromWorld = false;
        this.game.addEntity(this.listOfTrippleSoil[i]);
      }
    }

    // // Thick Grass
    this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 80, 420));
    this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 200, 320));
    this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 850, 450));
    this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 300, 350));
    this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 1000, 400));
    this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 750, 550));

    this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 600, 800));
    this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 750, 850));
    this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 900, 700));
    this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 500, 500));
    this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 800, 760));

    for (let i = 0; i < this.listOfSeedGrass.length; i++) {
      this.listOfSeedGrass[i].removeFromWorld = false;
      this.game.addEntity(this.listOfSeedGrass[i]);
    }

    this.listOfMediumGrass.push(new FarmLandMediumGrass(this.game, 400, 600));
    for (let i = 0; i < this.listOfMediumGrass.length; i++) {
      this.listOfMediumGrass[i].removeFromWorld = false;
      this.game.addEntity(this.listOfMediumGrass[i]);
    }
    this.listOfThickGrass.push(new FarmLandThickGrass(this.game, 300, 350));
    for (let i = 0; i < this.listOfThickGrass.length; i++) {
      this.listOfThickGrass[i].removeFromWorld = false;
      this.game.addEntity(this.listOfThickGrass[i]);
    }

    this.listOfLakeAndOtherSide.removeFromWorld = false;
    // this.game.addEntity(this.listOfLakeAndOtherSide);

    this.normalGrass.removeFromWorld = false;

    //  this.game.addEntity(this.gob);
    this.normalBossesIndexEntity = this.game.entities.length;
    console.log(this.normalBossesIndexEntity);
    // this.normalBossesIndexEntity[0].removeFromWorld = false;
    // this.game.addEntity(this.normalBossesIndexEntity[0]);

    //   for (let i = 0; i < this.listofNormallBosses.length; i++) {
    //     this.listofNormallBosses[i].removeFromWorld = false;
    //  }
    if (this.listofNormallBosses.length >= 1) {
      this.game.addEntity(this.listofNormallBosses[0]);
    }
    console.log(this.listofNormallBosses);

    //////////////////////////////////
    this.game.addEntity(new SnowMap(this.game, 0, 0));
    this.game.addEntity(new SnowMap2(this.game, 0, 0));
     this.game.addEntity(new Portal(this.game, 1800, 2000));
     this.game.addEntity(new Portal(this.game, 1800, 3000 + 1100));
     this.game.addEntity(new Skele(this.game,530, 2650, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]));
     this.game.addEntity(new Guardian(this.game,1200, 3170, [{ x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: randomInt(800), y: randomInt(800) }, { x: 0, y: 0 }]));
    this.game.addEntity(new WizardSpawn(this.game, 110, 110));
    this.game.addEntity(new WizardSpawn2(this.game, 650, 110));
    this.game.addEntity(new WizardSpawn2(this.game, 110, 110));
    this.game.addEntity(new Campfire(this.game, 110, 110));
    this.game.addEntity(new Campfire(this.game, 650, 110));
    this.loadSlime();

    this.game.addEntity(
      new Wizard2(this.game, 950, 2050, [
        { x: randomInt(3800), y: randomInt(3800) },
        { x: randomInt(3800), y: randomInt(3800) },
        { x: randomInt(3800), y: randomInt(3800) },
        { x: 0, y: 0 },
      ])
    );
    this.game.addEntity(
      new Wizard2(this.game, 450, 2050, [
        { x: randomInt(3800), y: randomInt(3800) },
        { x: randomInt(3800), y: randomInt(3800) },
        { x: randomInt(3800), y: randomInt(3800) },
        { x: 0, y: 0 },
      ])
    );

    this.game.addEntity(
      new Wizard(this.game, 330, 2050, [{ x: 1720, y: 1322 }])
    );
    this.game.addEntity(
      new Bee(this.game, 400, 1030, [
        { x: randomInt(800), y: randomInt(800) },
        { x: randomInt(800), y: randomInt(800) },
        { x: randomInt(800), y: randomInt(800) },
        { x: 0, y: 0 },
      ])
    );
    ////////////////////////
    //DO NOT BLOCK THE CHARACTER
    /////////////////////////////////////
    this.game.addEntity(this.character);
    //////////////////////////////////////
    this.game.addEntity(this.dog);
    //  this.dog.removeFromWorld = false;
    // BLOCK THE CHARACTER

    //House

    this.listOfBuildingsBlOCKCharacter.push(
      new FarmLandFencedHouse(this.game, houseX + 180, houseY)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new FarmLandHouse(this.game, houseX + 20, houseY)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 85, 540, 110, 40)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 250, 540, 110, 40)
    );
    // Fence with the house
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 50, 540, 10, 320)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 50, 840, 250, 15)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 355, 840, 35, 15)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 380, 555, 15, 300)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 40, 540, 365, 15)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 64 * 21, 300, 700, 65)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 64 * 22 + 40, 370, 500, 80)
    );

    //Final boss map bounds.
    //top
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 0, 2200 + 1100, 2000, 10)
    );
    //bottom.  just right side left side accroding to Bottom
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 0, 2200 + 1000 + 1100, 2000, 100)
    );
    //right side
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 0, 2200, 20, 1000 + 1100)
    );
     //left side
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleFenceBlocker(this.game, 2000 - 20 ,2200, 20, 1000 + 1100)
    );
    this.listOfBuildingsBlOCKCharacter.push(
      new InvisibleMonsterBlocker(this.game, 300, 840, 55, 20)
    );

    for (let i = 0; i < this.listOfBuildingsBlOCKCharacter.length; i++) {
      this.game.addEntity(this.listOfBuildingsBlOCKCharacter[i]);
    }

    // left trees
    this.listOfTree.push(new FarmLandBigTree(this.game, 0, 300));
    this.listOfTree.push(new FarmLandBigTree(this.game, 0, 350));
    this.listOfTree.push(new ForestRedTree(this.game, 0, 700));
    this.listOfTree.push(new FarmLandBigTree(this.game, 0, 800));
    this.listOfTree.push(new FarmLandBigTree(this.game, 0, 850));
    this.listOfTree.push(new FarmLandBigTree(this.game, 0, 950));
    this.listOfTree.push(new ForestRedTree(this.game, 10, 1050));

    this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1150));
    this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1250));
    this.listOfTree.push(new ForestRedTree(this.game, 10, 1350));
    this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1450));
    this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1550));
    this.listOfTree.push(new ForestRedTree(this.game, 10, 1650));
    this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1750));
    this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1850));
    this.listOfTree.push(new FarmLandBigTree(this.game, 0, 1950));

    // top trees
    this.listOfTree.push(new FarmLandBigTree(this.game, 1180, 325));
    this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 325));
    this.listOfTree.push(new FarmLandBigTree(this.game, 610, 325));
    this.listOfTree.push(new ForestRedTree(this.game, 680, 325));
    this.listOfTree.push(new FarmLandBigTree(this.game, 230, 400));
    this.listOfTree.push(new FarmLandBigTree(this.game, 740, 325));
    this.listOfTree.push(new ForestRedTree(this.game, 900, 400));

    // right trees
    this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 550));
    this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 650));
    this.listOfTree.push(new ForestRedTree(this.game, 1280, 750));
    this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 1050));

    this.listOfTree.push(new FarmLandBigTree(this.game, 1280, 930));

    // left bottom trees
    this.listOfTree.push(new ForestRedTree(this.game, 200, 1150));
    this.listOfTree.push(new FarmLandBigTree(this.game, 290, 1150));
    this.listOfTree.push(new FarmLandBigTree(this.game, 380, 1150));
    this.listOfTree.push(new FarmLandBigTree(this.game, 240, 1200));
    this.listOfTree.push(new FarmLandBigTree(this.game, 330, 1200));

    this.listOfTree.push(new FarmLandBigTree(this.game, 500, 1480));
    this.listOfTree.push(new FarmLandBigTree(this.game, 410, 1500));
    this.listOfTree.push(new FarmLandBigTree(this.game, 590, 1500));
    this.listOfTree.push(new ForestRedTree(this.game, 455, 1545));
    this.listOfTree.push(new ForestRedTree(this.game, 545, 1545));
    this.listOfTree.push(new FarmLandBigTree(this.game, 500, 1635));
    this.listOfTree.push(new FarmLandBigTree(this.game, 410, 1590));
    this.listOfTree.push(new FarmLandBigTree(this.game, 590, 1590));

    //forest
    this.listOfTree.push(new FarmLandBigTree(this.game, 840, 1100));
    this.listOfTree.push(new FarmLandBigTree(this.game, 930, 1100));
    this.listOfTree.push(new FarmLandBigTree(this.game, 800, 1150));
    this.listOfTree.push(new FarmLandBigTree(this.game, 890, 1150));
    this.listOfTree.push(new FarmLandBigTree(this.game, 980, 1150));
    this.listOfTree.push(new FarmLandBigTree(this.game, 800, 1220));
    this.listOfTree.push(new FarmLandBigTree(this.game, 890, 1220));
    this.listOfTree.push(new FarmLandBigTree(this.game, 980, 1220));
    this.listOfTree.push(new ForestRedTree(this.game, 850, 1290));
    this.listOfTree.push(new FarmLandBigTree(this.game, 940, 1290));

    this.listOfTree.push(new FarmLandBigTree(this.game, 925, 1560));
    this.listOfTree.push(new ForestRedTree(this.game, 1015, 1560));
    this.listOfTree.push(new FarmLandBigTree(this.game, 880, 1630));
    this.listOfTree.push(new ForestRedTree(this.game, 970, 1630));
    this.listOfTree.push(new FarmLandBigTree(this.game, 1060, 1630));
    this.listOfTree.push(new FarmLandBigTree(this.game, 925, 1700));
    this.listOfTree.push(new FarmLandBigTree(this.game, 1015, 1700));
    this.listOfTree.push(new ForestRedTree(this.game, 1105, 1700));
    this.listOfTree.push(new FarmLandBigTree(this.game, 970, 1770));
    this.listOfTree.push(new FarmLandBigTree(this.game, 1060, 1770));

    this.listOfBossTowers.push(new ObeLisk(this.game, 1800, 1520));
    this.listOfBossTowers.push(new ObeLisk(this.game, 1350, 1520));
    this.listOfBossTowers.push(new ObeLisk(this.game, 1800, 850));
    this.listOfBossTowers.push(new ObeLisk(this.game, 1350, 850));

    this.game.addEntity(new PlantKiller(this.game,550, 400))

    for (let i = 0; i < this.listOfBossTowers.length; i++) {
      this.game.addEntity(this.listOfBossTowers[i]);
    }

    for (let i = 0; i < this.listOfTree.length; i++) {
      this.listOfTree[i].removeFromWorld = false;
      this.game.addEntity(this.listOfTree[i]);
    }
    this.game.addEntity(new Boss(this.game,1600, 3700, [{ x: randomInt(0), y: randomInt(0) }, { x: randomInt(0), y: randomInt(0) }, { x: randomInt(0), y: randomInt(0) }, { x: 0, y: 0 }]))
    this.dayNightManager.time = 6;
    this.dayNightManager.removeFromWorld = false;
    this.game.addEntity(this.dayNightManager);
  }
  draw(ctx) {
   
  
      const requiredPlants = this.character.getListOfRequiredForNextLevel();

      //HUB

      ctx.font = '15px "Press Start 2P"';
      // ctx.strokeStyle = "White";
      if(!this.notInGameYet&&!this.onetime&&this.game.camera.countDeath!=3&&!this.endgame){
        if(this.character.y >= 2200 && this.character.y <= 3300 ) this.game.ctx.fillStyle = "Black";
        else  this.game.ctx.fillStyle = "White";
      this.game.ctx.fillText("Day  " + PARAMS.DAYCOUNTER, 10, 20);
      for(let i = 0; i < (3-this.countDeath); i++){
        this.game.ctx.drawImage(
          this.spritesheetFarmLand,
          0,
          717,
          16,
          16,
          160 + 20*i,
          5,
          16,
          16
        );
      }
      
      this.game.ctx.fillText("Level " + this.character.level, 10, 40);
      ctx.font = '15px "Press Start 2P"';
      
      this.game.ctx.drawImage(
        this.spritesheetFarmLand,
        0,
        648,
        14,
        14,
        10,
        45,
        14 * 1.5,
        14 * 1.5
      );
      this.game.ctx.fillText(
        ":" +
          this.character.farmInventory[PLANTNAMES.STRAWBERRY] +
          "/" +
          requiredPlants[PLANTNAMES.STRAWBERRY],
        10 + 25,
        65
      );

      this.game.ctx.drawImage(
        this.spritesheetFarmLand,
        0,
        663,
        14,
        14,
        10,
        45 + 30,
        14 * 1.5,
        14 * 1.5
      );
      this.game.ctx.fillText(
        ":" +
          this.character.farmInventory[PLANTNAMES.CORN] +
          "/" +
          requiredPlants[PLANTNAMES.CORN],
        10 + 25,
        65 + 30
      );

      this.game.ctx.drawImage(
        this.spritesheetFarmLand,
        0,
        679,
        14,
        14,
        10,
        45 + 60,
        14 * 1.5,
        14 * 1.5
      );
      this.game.ctx.fillText(
        ":" +
          this.character.farmInventory[PLANTNAMES.RICE] +
          "/" +
          requiredPlants[PLANTNAMES.RICE],
        10 + 25,
        65 + 30 + 30
      );
      
      this.game.ctx.drawImage(
        this.spritesheetFarmLand,
        0,
        696,
        16,
        16,
        10,
        45 + 60 + 25,
        14 * 1.5,
        14 * 1.5
      );
      this.game.ctx.fillText(
        ":" +
          this.character.numberOfFish + "(Q)",
        10 + 25,
        65 + 30 + 30 + 25
      );



      this.game.ctx.fillText("DMG :" + this.character.baseDamage, 10, 45 + 120 +10);
      this.game.ctx.fillText(
        "HP  :" + this.character.hitpoints + "/" + this.character.maxhitpoints,
        10,
        45 + 140+10
      );

      if (this.character.numberOfFish >= 1)
        this.game.ctx.drawImage(
          this.spritesheetFarmLand,
          0,
          1063,
          32,
          32,
          290,
          5,
          32,
          32
        );
      else
        this.game.ctx.drawImage(
          this.spritesheetFarmLand,
          0,
          1063 + 32,
          32,
          32,
          290,
          5,
          32,
          32
        );
      ctx.font = '8px "Press Start 2P"';
      

      this.game.ctx.fillText(this.character.numberOfFish, 290, 15);

      ctx.font = '15px "Press Start 2P"';

      if (this.character.elapsedTime2 >= 8)
        this.game.ctx.drawImage(
          this.spritesheetFarmLand,
          0,
          989,
          32,
          32,
          250,
          5,
          32,
          32
        );
      else
        this.game.ctx.drawImage(
          this.spritesheetFarmLand,
          0,
          1027,
          32,
          32,
          250,
          5,
          32,
          32
        );



        if (this.character.counterForShuriken < 6 || this.character.elapsedTimeForShuriken2 >=15 )
        this.game.ctx.drawImage(
          this.spritesheetFarmLand,
          0,
          1135,
          32,
          32,
          290 + 40,
          5,
          32,
          32
        );
      else
        this.game.ctx.drawImage(
          this.spritesheetFarmLand,
          0,
          1167,
          32,
          32,
          290 + 40,
          5,
          32,
          32
        );
        
        ctx.font = '8px "Press Start 2P"';
        this.game.ctx.fillText(6 - this.character.counterForShuriken, 290 + 41, 15);

        }
        
 
      
        

  }
  updateAudio() {
    var mute = document.getElementById("mute").checked;
    var volume = document.getElementById("volume").value;

    ASSET_MANAGER.muteAudio(mute);
   ASSET_MANAGER.adjustVolume(volume);
  }

  update() {
    // console.log("Death " +this.character.countDeath);
    // if(this.character.countDeath==2){
    //   this.game.entities.forEach((entity) =>{  
    //    entity.removeFromWorld = true;
    //   });

    
    //   this.loadMap()
    // }

  this.updateAudio();
    

    if (this.startCounting) this.elapsed += this.game.clockTick;
    let midpointX = PARAMS.CANVAS_WIDTH / 2;
    let midpointY = PARAMS.CANVAS_HEIGHT / 2;
    if (this.game.testSleepCutScene ) {
      
        this.game.addEntity(new NextDayCutScene(this.game));
        this.startCounting = true;
        this.elapsed = 0;
        this.character.hitpoints = this.character.maxhitpoints;
      // if(Math.abs(this.character.x-600-this.game.camera.x) < 50 && Math.abs(this.character.y - 700 -this.game.camera.x) < 50 && this.dayNightManager.time >= 12){
      //   this.game.addEntity(new NextDayCutScene(this.game));
      //   this.startCounting = true;
      //   this.elapsed = 0;
      // }else if(this.dayNightManager.time < 16){
      //   console.log("Can not sleep, its too early!");
      //   this.game.addEntity( new MessageNotification(this.game, PARAMS.CANVAS_WIDTH/2 - 200 , PARAMS.CANVAS_HEIGHT/3,"Can not sleep, its too early!"));
      // } else if(this.dayNightManager.time >= 16){
      //   this.game.addEntity( new MessageNotification(this.game, PARAMS.CANVAS_WIDTH/2 - 200 , PARAMS.CANVAS_HEIGHT/3,"You are not home!"));

      // }
      
    }
    if (this.elapsed > 3.5) {
      this.dayNightManager.time = 6;
      this.loadSlime();
      
      if (this.listofNormallBosses[0].removeFromWorld) {
        this.listofNormallBosses.shift();
        if (this.listofNormallBosses.length > 0)
          this.game.addEntityAtIndex(
            this.normalBossesIndexEntity,
            this.listofNormallBosses[0]
          );
      }
      ++PARAMS.DAYCOUNTER;
      this.elapsed = 0;
      this.startCounting = false;
      this.listOfTrippleSoil.forEach((each)=>{
        each.generateListOfBugs();
        console.log(each);
      })


      console.log("loaded slime");
    }

    if (
      0 < this.character.x - midpointX &&
      this.character.x + midpointX < 2000
    ) {
      this.x = Math.floor(this.character.x - midpointX);
    }

      //top to bottom
    if ((0 < this.character.y - midpointY)
       && (this.character.y + midpointY < 2200 + 1100 ) 
    ) {
      this.y = Math.floor(this.character.y - midpointY);
    }
                 //adj character camera bottom to top
    else if( (this.character.y > 2400 + 1350) && 2200 < this.character.y - midpointY ){
      console.log(this.character.y + midpointY);
      this.y = Math.floor(this.character.y - midpointY);
    }
    this.onetime = this.character.oneTime;
    this.endgame = this.character.endgame;

    this.game.entities.forEach((entity) =>{  
      if(entity instanceof MainCharacter){
     
      }



      if(entity instanceof Start||entity instanceof Credit || entity instanceof About||  entity instanceof EndGame||entity instanceof NextDayCutScene){
    
      this.notInGameYet = true;
    
  }
   
    else{
      this.endgame  = false;
      this.notInGameYet = false;
    }}
  );

  const newDay = PARAMS.DAYCOUNTER;
  PARAMS.DEBUG = document.getElementById("debug").checked;

  PARAMS.Mute = document.getElementById("mute").checked;
  PARAMS.Volume = document.getElementById("volume").checked;
  }
}
