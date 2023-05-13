/*class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Demo1, Demo2, Outro],
    title: "Adventure Game",
});

*/

class Entrance extends AdventureScene {
    constructor() {
        super('entrance', 'Entrance');
    }

    preload() {
        this.load.image('door', 'assets/door.png');
        this.load.image('rubble', 'assets/rubble.png');
    }

    onEnter() {
        //The game messes up if I remove this comment so I'll keep it
        //variable declaration
        let doorLiv = this.add.image(350, 500, 'door');
        doorLiv.setScale(0.8);
        doorLiv.setInteractive();
        let doorLivLabel = this.add.text(200,150, 'Living Room');
        doorLivLabel.setColor("black");
        doorLivLabel.setFontSize(this.s*2);
        doorLivLabel.setInteractive();
        doorLivLabel.setAlpha(0);
        doorLiv.on('pointerover', () => this.showAlpha(doorLivLabel));

        let doorHal = this.add.image(1050, 500, 'door');
        doorHal.setScale(0.8);
        doorHal.setInteractive();
        let doorHalLabel = this.add.text(900,150, 'Hallway');
        doorHalLabel.setColor("black");
        doorHalLabel.setFontSize(this.s*2);
        doorHalLabel.setInteractive();
        doorHalLabel.setAlpha(0);
        doorHal.on('pointerover', () => this.showAlpha(doorHalLabel));

        let rubble = this.add.image(1000,600,'rubble');
        rubble.setScale(0.9);

        if (this.rubbleCleared == true) {
            rubble.x = 2000;
            rubble.y = 2000;
        }

        //scene connections
        doorLiv.on('pointerdown', () => this.gotoScene('livingRoom'));
        if (this.rubbleCleared == true) {
            doorHal.on('pointerdown', () => this.gotoScene('hallway'));
        } else {
            doorHal.on('pointerdown', () => this.showMessage("The door to the hallway is blocked!\n\nGet to the other side and clear the rubble first."));
        }        
    }


}

class LivingRoom extends AdventureScene {
    constructor() {
        super('livingRoom', 'Living Room');
    }

    preload() {
        this.load.image('door', 'assets/door.png');
        this.load.image('dog', 'assets/dog.png');
        this.load.image('tv', 'assets/tv.png');
    }

    onEnter() {
        //variable declaration
        let doorKit = this.add.image(1200,200, 'door');
        doorKit.setScale(0.5);
        doorKit.setInteractive();
        let doorKitLabel = this.add.text(900, 100, 'Kitchen');
        doorKitLabel.setColor("black");
        doorKitLabel.setFontSize(this.s*2);
        doorKitLabel.setInteractive();
        doorKitLabel.setAlpha(0);
        doorKit.on('pointerover', () => this.showAlpha(doorKitLabel));

        let doorEnt = this.add.image(350,1000, 'door');
        doorEnt.setScale(0.8);
        doorEnt.setInteractive();
        let doorEntLabel = this.add.text(200,650, 'Entrance');
        doorEntLabel.setColor("black");
        doorEntLabel.setFontSize(this.s*2);
        doorEntLabel.setInteractive();
        doorEntLabel.setAlpha(0);
        doorEnt.on('pointerover', () => this.showAlpha(doorEntLabel));


        let doorHal = this.add.image(1050,1000, 'door');
        doorHal.setScale(0.8);
        doorHal.setInteractive();
        let doorHalLabel = this.add.text(1050, 650, "Hallway");
        doorHalLabel.setColor("black");
        doorHalLabel.setFontSize(this.s*2);
        doorHalLabel.setInteractive();
        doorHalLabel.setAlpha(0);
        doorHal.on('pointerover', () => this.showAlpha(doorHalLabel));


        let tv = this.add.image(300,250, 'tv');
        tv.setScale(0.7);

        let dog = this.add.image(900,550, 'dog');
        dog.setScale(0.7);
        dog.setInteractive();
        let dogLabel = this.add.text(800, 350, 'Dog');
        dogLabel.setColor("black");
        dogLabel.setFontSize(this.s*2);
        dogLabel.setInteractive();
        dogLabel.setAlpha(0);
        dog.on('pointerover', () => this.showAlpha(dogLabel));

        //scene connections

        doorEnt.on('pointerdown', () => this.gotoScene('entrance'));
        doorHal.on('pointerdown', () => this.gotoScene('hallway'));
        doorKit.on('pointerdown', () => this.gotoScene('kitchen'));

    }

}

class Kitchen extends AdventureScene {
    constructor() {
        super('kitchen', 'Kitchen');
    }

    preload() {
        this.load.image('door','assets/door.png');
        this.load.image('stove', 'assets/stove.png');
        this.load.image('fire', 'assets/fire.png');
    }

    onEnter() {
        //variable declaration
        //back door
        let doorExi = this.add.image(1200,200,'door');
        doorExi.setScale(0.5);
        doorExi.setInteractive();
        let doorExiLabel = this.add.text(950, 100, "Exit");
        doorExiLabel.setColor("black");
        doorExiLabel.setFontSize(this.s*2);
        doorExiLabel.setInteractive();
        doorExiLabel.setAlpha(0);
        doorExi.on('pointerover', () => this.showAlpha(doorExiLabel));


        //stove
        let stove = this.add.image(600,350,'stove');
        stove.setScale(0.7);

        //fires
        let fire1 = this.add.image(1200,350, 'fire');
        fire1.setScale(0.7);
        fire1.setInteractive();
        let fire1Label = this.add.text(900, 300, "Fire!");
        fire1Label.setColor("black");
        fire1Label.setFontSize(this.s*2);
        fire1Label.setInteractive();
        fire1Label.setAlpha(0);
        fire1.on('pointerover', () => this.showAlpha(fire1Label));

        let fire2 = this.add.image(550,550,'fire');
        fire2.setScale(0.7);
        fire2.setInteractive();
        let fire2Label = this.add.text(200, 500, "Fire!");
        fire2Label.setColor("black");
        fire2Label.setFontSize(this.s*2);
        fire2Label.setInteractive();
        fire2Label.setAlpha(0);
        fire2.on('pointerover', () => this.showAlpha(fire2Label));

        let fire3 = this.add.image(580,265,'fire');
        fire3.setScale(0.2);
        fire3.setInteractive();
        let fire3Label = this.add.text(400, 250, "Fire!");
        fire3Label.setColor("black");
        fire3Label.setFontSize(this.s*1);
        fire3Label.setInteractive();
        fire3Label.setAlpha(0);
        fire3.on('pointerover', () => this.showAlpha(fire3Label));

        //front doors
        let doorLiv = this.add.image(350,1000, 'door');
        doorLiv.setScale(0.8);
        doorLiv.setInteractive();
        let doorLivLabel = this.add.text(50, 650, "Living Room");
        doorLivLabel.setColor("black");
        doorLivLabel.setFontSize(this.s*2);
        doorLivLabel.setInteractive();
        doorLivLabel.setAlpha(0);
        doorLiv.on('pointerover', () => this.showAlpha(doorLivLabel));

        let doorHal = this.add.image(1050,1000,'door');
        doorHal.setScale(0.8);
        doorHal.setInteractive();
        let doorHalLabel = this.add.text(950, 650, "Hallway");
        doorHalLabel.setColor("black");
        doorHalLabel.setFontSize(this.s*2);
        doorHalLabel.setInteractive();
        doorHalLabel.setAlpha(0);
        doorHal.on('pointerover', () => this.showAlpha(doorHalLabel));

        //scene connections
        doorLiv.on('pointerdown', () => this.gotoScene('livingRoom'));
        doorHal.on('pointerdown', () => this.gotoScene('hallway'));
        doorExi.on('pointerdown', () => this.gotoScene('exit'));


    }


}

class Bedroom extends AdventureScene {
    constructor() {
        super('bedroom', 'Bedroom');
    }

    preload() {
        this.load.image('door', 'assets/door.png');
        this.load.image('bed', 'assets/bed.png');
        this.load.image('woman', 'assets/woman.png');
        this.load.image('beam', 'assets/beam.png');
        this.load.image('extinguisher', 'assets/extinguisher.png');
    }

    onEnter() {
        //variable declaration
        //back door
        let doorBat = this.add.image(1200,200,'door');
        doorBat.setScale(0.5);
        doorBat.setInteractive();
        let doorBatLabel = this.add.text(900, 150, "Bathroom");
        doorBatLabel.setColor("black");
        doorBatLabel.setFontSize(this.s*2);
        doorBatLabel.setInteractive();
        doorBatLabel.setAlpha(0);
        doorBat.on('pointerover', () => this.showAlpha(doorBatLabel));

        let bed = this.add.image(600,400,'bed');
        bed.setScale(1.25);
        bed.flipX = true;

        let woman = this.add.image(750,375, 'woman');
        woman.setScale(0.75);
        woman.flipX = true;
        woman.setInteractive();
        let womanLabel = this.add.text(500, 150, "Woman");
        womanLabel.setColor("black");
        womanLabel.setFontSize(this.s*2);
        womanLabel.setInteractive();
        womanLabel.setAlpha(0);
        woman.on('pointerover', () => this.showAlpha(womanLabel));

        let extinguisher = this.add.image(300,500,'extinguisher');
        extinguisher.setScale(0.3);
        extinguisher.setInteractive();
        let extinguisherLabel = this.add.text(170, 600, "Extinguisher");
        extinguisherLabel.setColor("black");
        extinguisherLabel.setFontSize(this.s*2);
        extinguisherLabel.setInteractive();
        extinguisherLabel.setAlpha(0);
        extinguisher.on('pointerover', () => this.showAlpha(extinguisherLabel));

        let beam = this.add.image(900,0,'beam');
        beam.setAngle(120);
        beam.setScale(0.6);
        //front door
        let doorHal = this.add.image(700,1000,'door');
        doorHal.setScale(0.8);
        doorHal.setInteractive();
        let doorHalLabel = this.add.text(600, 650, "Hallway");
        doorHalLabel.setColor("black");
        doorHalLabel.setFontSize(this.s*2);
        doorHalLabel.setInteractive();
        doorHalLabel.setAlpha(0);
        doorHal.on('pointerover', () => this.showAlpha(doorHalLabel));

        //scene connections
        doorHal.on('pointerdown', () => this.gotoScene('hallway'));
        doorBat.on('pointerdown', () => this.gotoScene('bathroom'));

        
        
    }

    
}

class Bathroom extends AdventureScene {
    constructor() {
        super('bathroom', 'Bathroom');
    }

    preload() {
        this.load.image('door', 'assets/door.png');
        this.load.image('toilet', 'assets/toilet.png');
        this.load.image('man', 'assets/man.png');
        this.load.image('stand', 'assets/stand.png');
        this.load.image('firstAid', 'assets/firstAid.png');
        this.load.image('water', 'assets/water.png');
        this.load.image('lock', 'assets/lock.png');
    }

    onEnter() {
        //variable declaration
        //back door
        let doorHal = this.add.image(1200,200,'door');
        doorHal.setScale(0.5);
        doorHal.setInteractive();
        let doorHalLabel = this.add.text(900, 150, "Hallway");
        doorHalLabel.setColor("black");
        doorHalLabel.setFontSize(this.s*2);
        doorHalLabel.setInteractive();
        doorHalLabel.setAlpha(0);
        doorHal.on('pointerover', () => this.showAlpha(doorHalLabel));

        let lock = this.add.image(1150,250,'lock');
        lock.setScale(0.1);
        lock.setInteractive();
        let lockLabel = this.add.text(975, 250, "Lock");
        lockLabel.setColor("black");
        lockLabel.setFontSize(this.s*2);
        lockLabel.setInteractive();
        lockLabel.setAlpha(0);
        lock.on('pointerover', () => this.showAlpha(lockLabel));

        let toilet = this.add.image(800,500,'toilet');
        toilet.setScale(0.75);

        let man = this.add.image(600,390,'man');
        man.setScale(0.5);
        man.setInteractive();
        let manLabel = this.add.text(700, 200, "Man");
        manLabel.setColor("black");
        manLabel.setFontSize(this.s*2);
        manLabel.setInteractive();
        manLabel.setAlpha(0);
        man.on('pointerover', () => this.showAlpha(manLabel));

        let stand = this.add.image(300,450,'stand');
        stand.setScale(0.75);

        let firstAid = this.add.image(300,300,'firstAid');
        firstAid.setScale(0.25);
        firstAid.setAngle(10);
        firstAid.setInteractive();
        let firstAidLabel = this.add.text(200, 150, "First Aid");
        firstAidLabel.setColor("black");
        firstAidLabel.setFontSize(this.s*2);
        firstAidLabel.setInteractive();
        firstAidLabel.setAlpha(0);
        firstAid.on('pointerover', () => this.showAlpha(firstAidLabel));

        let water = this.add.image(656,1000,'water');
        water.setScale(2);

        //front door
        let doorBed = this.add.image(700,1000,'door');
        doorBed.setScale(0.8);
        doorBed.setInteractive();
        let doorBedLabel = this.add.text(350, 750, "Bedroom");
        doorBedLabel.setColor("black");
        doorBedLabel.setFontSize(this.s*2);
        doorBedLabel.setInteractive();
        doorBedLabel.setAlpha(0);
        doorBed.on('pointerover', () => this.showAlpha(doorBedLabel));

        //scene connections
        doorBed.on('pointerdown', () => this.gotoScene('bedroom'));
        doorHal.on('pointerdown', () => this.gotoScene('hallway'));


    }

    
}

class Hallway extends AdventureScene {
    constructor() {
        super('hallway', 'Hallway');
    }

    preload() {
        this.load.image('door', 'assets/door.png');
        this.load.image('rubble', 'assets/rubble.png');
        this.load.image('lock', 'assets/lock.png');
        this.load.image('fire', 'assets/fire.png');
        this.load.image('occupied', 'assets/occupied.png');
        this.load.image('bark', 'assets/bark.png');
        this.load.image('dotDotDot', 'assets/dotDotDot.png');
    }

    onEnter() {
        //variable declaration
        //doors: act 1
        let doorEnt = this.add.image(2000,2000,'door');
        doorEnt.setScale(0.8);
        doorEnt.setInteractive();
        //TODO: if rubbleCleared = false (rubble is cleared), move to (700, 1000)
        let doorEntLabel = this.add.text(600, 650, "Entrance");
        doorEntLabel.setColor("black");
        doorEntLabel.setFontSize(this.s*2);
        doorEntLabel.setInteractive();
        doorEntLabel.setAlpha(0);
        doorEnt.on('pointerover', () => this.showAlpha(doorEntLabel));

        let doorLiv = this.add.image(200,800,'door');
        doorLiv.setScale(0.75);
        doorLiv.setInteractive();
        let doorLivLabel = this.add.text(400, 550, "Living Room");
        doorLivLabel.setColor("black");
        doorLivLabel.setFontSize(this.s*2);
        doorLivLabel.setInteractive();
        doorLivLabel.setAlpha(0);
        doorLiv.on('pointerover', () => this.showAlpha(doorLivLabel));

        let doorBed = this.add.image(1200,800,'door');
        doorBed.setScale(0.75);
        doorBed.setInteractive();
        let doorBedLabel = this.add.text(600, 600, "Bedroom");
        doorBedLabel.setColor("black");
        doorBedLabel.setFontSize(this.s*2);
        doorBedLabel.setInteractive();
        doorBedLabel.setAlpha(0);
        //TODO: put this under condition if womanSaved = true
        doorBed.on('pointerover', () => this.showAlpha(doorBedLabel));

        //door intermission: fire
        let fire = this.add.image(500,250,'fire');
        fire.setAngle(75);
        fire.setScale(0.5);
        fire.setInteractive();
        //TODO: if fires = false (fires are put out), teleport fire offscreen
        //I move stuff offscreen instead of changing the alpha so it can't be pointed over.

        //doors: act 2
        let doorKit = this.add.image(300,250,'door');
        doorKit.setScale(0.65);
        doorKit.setInteractive();
        let doorKitLabel = this.add.text(450, 50, "Kitchen");
        doorKitLabel.setColor("black");
        doorKitLabel.setFontSize(this.s*2);
        doorKitLabel.setInteractive();
        doorKitLabel.setAlpha(0);
        doorKit.on('pointerover', () => this.showAlpha(doorKitLabel));

        let doorBat = this.add.image(1100,250,'door');
        doorBat.setScale(0.65);
        doorBat.setInteractive();
        let doorBatLabel = this.add.text(750, 300, "Bathroom");
        doorBatLabel.setColor("black");
        doorBatLabel.setFontSize(this.s*2);
        doorBatLabel.setInteractive();
        doorBatLabel.setAlpha(0);
        doorBat.on('pointerover', () => this.showAlpha(doorBatLabel));

        //other
        let rubble = this.add.image(700,900,'rubble');
        rubble.setScale(0.9);
        rubble.setInteractive();
        if (this.rubbleCleared == true) {
            rubble.x = 2000;
            rubble.y = 2000;
        }

        //If clicked on, fade it out, then set rubble = false and fade in Entrance door
        let rubbleLabel = this.add.text(575, 700, "Clear Rubble");
        rubbleLabel.setColor("black");
        rubbleLabel.setFontSize(this.s*2);
        rubbleLabel.setInteractive();
        rubbleLabel.setAlpha(0);
        rubble.on('pointerover', () => this.showAlpha(rubbleLabel));

        let lock = this.add.image(1025,300,'lock');
        lock.setScale(0.1);
        lock.setInteractive();
        //TODO: if lock = false (clicked on in bathroom), teleport offscreen

        let occupied = this.add.image(800,150,'occupied');
        occupied.setScale(0.4);
        occupied.setInteractive();
        occupied.setAlpha(0);
        //TODO: put following under condition if manSaved = false
        doorBat.on('pointerdown', () => this.showAlpha(occupied));

        let bark = this.add.image(450,700,'bark');
        bark.setScale(0.5);
        bark.setInteractive();
        bark.setAlpha(0);
        //TODO: put following under condition if dogSaved = false
        this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: () => {
                this.showAlpha(bark);
            }
        })

        let dotDotDot = this.add.image(900,650,'dotDotDot');
        dotDotDot.setScale(0.5);
        dotDotDot.setInteractive();
        dotDotDot.setAlpha(0);
        //TODO: put following under condition if womanSaved = false
        doorBed.on('pointerover', () => this.showAlpha(dotDotDot));

        //scene connections
        doorEnt.on('pointerdown', () => this.gotoScene('entrance'));
        doorLiv.on('pointerdown', () => this.gotoScene('livingRoom'));
        doorKit.on('pointerdown', () => this.gotoScene('kitchen'));
        doorBed.on('pointerdown', () => this.gotoScene('bedroom'));
        doorBat.on('pointerdown', () => this.gotoScene('bathroom'));

        //object interactions
        rubble.on('pointerdown', () => {
            this.tweens.add({
                targets: rubble,
                alpha: {from: 1, to: 0},
                duration: 1000,
                scale: {from: 0.9, to: 0.01}
            })
            this.tweens.add({
                targets: doorEnt,
                x: 700,
                y: 1000,
                alpha: {from: 0, to: 1},
                duration: 1000
            })
            this.rubbleCleared = true;
        })
    }   
}

class Exit extends AdventureScene {
    constructor() {
        super('exit', 'Exit');
    }

    preload() {
        this.load.image('door', 'assets/door.png');
        this.load.image('cloud', 'assets/cloud.png');
        this.load.image('flyer', 'assets/flyer2.gif');
    }

    onEnter() {
        //variable declaration
        //objects
        let doorExi = this.add.image(300,500,'door');
        doorExi.setScale(1.25);
        doorExi.setInteractive();

        let sky = this.add.rectangle(700,498,500,852, '0x00aaff')

        let doorKit = this.add.image(1200,1000,'door');
        doorKit.setScale(0.75);
        doorKit.setInteractive();

        let cloud1 = this.add.image(600,200,'cloud');
        cloud1.setScale(0.25);

        let cloud2 = this.add.image(800,400,'cloud');
        cloud2.setScale(0.25);

        let flyer = this.add.image(800,300,'flyer');

        //invisible rectangles
        let leftBlocker = this.add.rectangle(350,300,200,400,'0xe17b31');
        let rightBlocker = this.add.rectangle(1050,300,200,400,'0xf5f5de');

        let doorExiLabel = this.add.text(1000, 200, "Exit");
        doorExiLabel.setColor("black");
        doorExiLabel.setFontSize(this.s*3);
        doorExiLabel.setInteractive();
        doorExiLabel.setAlpha(0);
        doorExi.on('pointerover', () => this.showAlpha(doorExiLabel));

        let doorKitLabel = this.add.text(1100, 650, "Kitchen");
        doorKitLabel.setColor("black");
        doorKitLabel.setFontSize(this.s*2);
        doorKitLabel.setInteractive();
        doorKitLabel.setAlpha(0);
        doorKit.on('pointerover', () => this.showAlpha(doorKitLabel));

        //scene connections
        doorKit.on('pointerdown', () => this.gotoScene('kitchen'));
        //TODO: put this in a conditional only if everyone is rescued
        doorExi.on('pointerdown', () => this.scene.start('ending'));



    }

    
}

class Intro extends Phaser.Scene {
    constructor(){
        super('intro');
    }

    preload() {
        this.load.image('siren', 'assets/siren.png');
        this.load.image('house', 'assets/house.png');
        this.load.image('go', 'assets/go.png');
    }

    create() {
        //variable declaration
        let siren = this.add.image(-350,540, 'siren');
        let house = this.add.image(900,500, 'house');
        house.alpha = 0;
        house.setScale(0.1);
        let go = this.add.image(900,500, 'go');
        go.alpha = 0;

        //siren moves across screen
        this.tweens.add({
            targets: siren,
            duration: 2000,
            x: 2200
        });

        //house appears
        this.tweens.add({
            targets: house,
            delay: 2500,
            duration: 1,
            alpha: {from: 0, to: 1}
        })

        //house expands
        this.tweens.add({
            targets: house,
            delay: 2500,
            duration: 1500,
            scale: {from: 0.1, to: 5.0}
        })

        //house disappears
        this.tweens.add({
            targets: house,
            delay: 4000,
            duration: 1,
            alpha: {from: 1, to: 0}
        })

        //go appears and disappears 3 times
        for(let num=1;num<=3;num++) {
            this.tweens.add({
                targets: go,
                delay: 4000 + (num*500),
                duration: 500,
                alpha: {from: 1, to: 0} //I don't need to set alpha to 1 first! I can do it here!
            })
        }

        //start next scene
        this.time.addEvent({
            delay: 6500,
            loop: false,
            callback: () => {
                this.scene.start("entrance");
            }
        })

    }

}

class Ending extends Phaser.Scene {
    constructor(){
        super('ending');
    }

    preload() {
        this.load.image('ghostbusters', 'assets/ghostbusters-ending-e.png');
        this.load.image('button', 'assets/button.png');
    }

    create() {
        //variable declaration
        let ghostbusters = this.add.image(1000,1750,'ghostbusters');
        ghostbusters.setScale(2);
        let button = this.add.image(950,2000,'button');
        button.setScale(0.75);

        //scrolling animations
        this.tweens.add({
            targets: ghostbusters,
            y: -500,
            duration: 15000
        })

        this.tweens.add({
            targets: button,
            delay: 9000,
            y: 550,
            duration: 7500
        })
    }

}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Entrance, LivingRoom, Hallway],
    title: "Adventure Game",
});