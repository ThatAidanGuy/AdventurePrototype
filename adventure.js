class AdventureScene extends Phaser.Scene {

    init(data) { //I assumed this is for global variables. I added all but the inventory. Commented out because I couldn't get them to work.
        this.inventory = data.inventory || [];
        /*this.manSaved = false;
        this.womanSaved = false;
        this.dogSaved = false;
        this.rubbleCleared = false;
        this.firesExtinguished = false;
        this.doorUnlocked = false;*/
    }

    constructor(key, name) {
        super(key);
        this.name = name;
    }

    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        //background color edited by Aidan
        this.cameras.main.setBackgroundColor('#F5F5DC');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h).setOrigin(0, 0).setFillStyle(0);
        this.add.text(this.w * 0.75 + this.s, this.s)
            .setText(this.name)
            .setStyle({ fontSize: `${3 * this.s}px` })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);
        
        this.messageBox = this.add.text(this.w * 0.75 + this.s, this.h * 0.33)
            .setStyle({ fontSize: `${1.5 * this.s}px`, color: '#eea' }) //Aidan changed font size to from 2 to 1.5
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);

        this.inventoryBanner = this.add.text(this.w * 0.75 + this.s, this.h * 0.66)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setText("Tasks Completed") //Aidan changed the "Inventory" to a list of completed tasks. Same thing in practice.
            .setAlpha(0);

        this.inventoryTexts = [];
        this.updateInventory();

        this.add.text(this.w-3*this.s, this.h-3*this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Fullscreen?'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        this.onEnter();

    }

    showMessage(message) {
        //Aidan altered the duration of the alpha and added a second in order to keep words on screen more without making the fade-out overly gradual.
        this.messageBox.setText(message);
        this.tweens.add({
            targets: this.messageBox,
            alpha: { from: 1, to: 0.99 },
            easing: 'Quintic.in',
            duration: 8 * this.transitionDuration
        });
        this.tweens.add({
            targets: this.messageBox,
            delay: 8 * this.transitionDuration,
            alpha: {from: 0.99, to: 0},
            easing: 'Quintic.in',
            duration: this.transitionDuration
        })
    }

    //The following method was added by Aidan
    //so text objects could appear when image objects were hovered over.
    //Should work for image objects too, come to think of it.
    showAlpha(textObj) {
        this.tweens.add({
            targets: textObj,
            alpha: {from: 5, to: 0}, //alpha>1 means it stays full for longer because it takes longer to get from that number to 0
            easing: 'Quintic.in',
            duration: 1 * this.transitionDuration
        })
    }

    updateInventory() {
        if (this.inventory.length > 0) {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 1,
                duration: this.transitionDuration
            });
        } else {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 0,
                duration: this.transitionDuration
            });
        }
        if (this.inventoryTexts) {
            this.inventoryTexts.forEach((t) => t.destroy());
        }
        this.inventoryTexts = [];
        let h = this.h * 0.66 + 3 * this.s;
        this.inventory.forEach((e, i) => {
            let text = this.add.text(this.w * 0.75 + 2 * this.s, h, e)
                .setStyle({ fontSize: `${1 * this.s}px` }) //Aidan shrunk font size from 1.5 to 1
                .setWordWrapWidth(this.w * 0.75 + 4 * this.s);
            h += text.height + this.s;
            this.inventoryTexts.push(text);
            //Aidan added this too: Remove old text from inventory
            //Didn't work though so it's commented out
            //I just shrunk text size and moved stuff around so it would never be enough to go offscreen
            /*if (this.inventoryTexts.length() == 6) {
                for(let i=5;i>=0;i--) {
                    this.inventoryTexts.splice(i, 1, inventoryTexts[i-1])
                }
            }*/

        });
    }

    hasItem(item) {
        return this.inventory.includes(item);
    }

    gainItem(item) {
        if (this.inventory.includes(item)) {
            console.warn('gaining item already held:', item);
            return;
        }
        this.inventory.push(item);
        this.updateInventory();
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x - 20, to: text.x },
                    alpha: { from: 0, to: 1 },
                    ease: 'Cubic.out',
                    duration: this.transitionDuration
                });
            }
        }
    }

    loseItem(item) {
        if (!this.inventory.includes(item)) {
            console.warn('losing item not held:', item);
            return;
        }
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x, to: text.x + 20 },
                    alpha: { from: 1, to: 0 },
                    ease: 'Cubic.in',
                    duration: this.transitionDuration
                });
            }
        }
        this.time.delayedCall(500, () => {
            this.inventory = this.inventory.filter((e) => e != item);
            this.updateInventory();
        });
    }

    gotoScene(key) {
        this.cameras.main.fadeOut(this.transitionDuration / 5, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration / 5, () => {
            this.scene.start(key, {
                inventory: this.inventory,
                //Aidan, who's getting tired of referring to himself in third-person, added the rest of these variables, but they didn't work so ignore them
                /*manSaved: this.manSaved,
                womanSaved: this.womanSaved,
                dogSaved: this.dogSaved,
                rubbleCleared: this.rubbleCleared,
                firesExtinguished: this.firesExtinguished,
                doorUnlocked: this.doorUnlocked*/

            });
        });
    }

    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }
}