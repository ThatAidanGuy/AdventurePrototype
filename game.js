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

    }

}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [],
    title: "Adventure Game",
});