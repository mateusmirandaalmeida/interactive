import { GameUtils } from './game.util';

declare let PIXI;
declare let Phaser;

export class Game {
    private game;
    private map;
    private layer;
    private coins;
    private goombas;
    private player;
    private cursors;

    constructor(private onGameOver?, private isActiveSound?) {
        this.game = new Phaser.Game(480, 240, Phaser.CANVAS, '', {
            preload: () => this.preload(),
            create: () => this.create(),
            update: () => this.update(),
        });
    }

    private soundCoin() {
        if (this.isActiveSound) {
            const audio = new Audio('src/sounds/smb_coin.wav');
            audio.play();
        }
    }

    private soundGameOver() {
        if (this.isActiveSound) {
            const audio = new Audio('src/sounds/smb_gameover.wav');
            audio.play();
        }
    }

    private soundJump() {
        if (this.isActiveSound) {
            const audio = new Audio('src/sounds/smb_jump-small.wav');
            audio.play();
        }
    }

    private soundGoomba() {
        if (this.isActiveSound) { 
            const audio = new Audio('src/sounds/smb_kick.wav');
            audio.play();
        }
    }

    private preload() {
        this.game.load.spritesheet('goomba', 'src/img/goomba_nmbtds.png', 16, 16);
        this.game.load.spritesheet('tiles', 'src/img/tiles_dctsfk.png', 16, 16);
        this.game.load.spritesheet('mario', 'src/img/mario_wjlfy5.png', 16, 16);
        this.game.load.spritesheet('coin', 'src/img/coin_iormvy.png', 16, 16);
        this.game.load.tilemap('level', 'src/tilemap/level.json', null, Phaser.Tilemap.TILED_JSON);
    }

    private create() {
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        // EXACT_FIT, NO_SCALE, RESIZE, SHOW_ALL, USER_SCALE
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#5c94fc';
        this.map = this.game.add.tilemap('level');
        this.map.addTilesetImage('tiles', 'tiles');
        this.map.setCollisionBetween(3, 12, true, 'solid');
        this.map.createLayer('background');
        this.layer = this.map.createLayer('solid');
        this.layer.resizeWorld();
        this.coins = this.game.add.group();
        this.coins.enableBody = true;
        this.map.createFromTiles(2, null, 'coin', 'stuff', this.coins);
        this.coins.callAll('animations.add', 'animations', 'spin', [0, 0, 1, 2], 3, true);
        this.coins.callAll('animations.play', 'animations', 'spin');

        this.goombas = this.game.add.group();
        this.goombas.enableBody = true;
        this.map.createFromTiles(1, null, 'goomba', 'stuff', this.goombas);
        this.goombas.callAll('animations.add', 'animations', 'walk', [0, 1], 2, true);
        this.goombas.callAll('animations.play', 'animations', 'walk');
        this.goombas.setAll('body.bounce.x', 1);
        this.goombas.setAll('body.velocity.x', -20);
        this.goombas.setAll('body.gravity.y', 500);

        this.player = this.game.add.sprite(16, this.game.world.height - 48, 'mario');
        this.game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('walkRight', [1, 2, 3], 10, true);
        this.player.animations.add('walkLeft', [8, 9, 10], 10, true);
        this.player.goesRight = true;

        this.game.camera.follow(this.player);

        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    private update() {
        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.overlap(this.player, this.coins, (player, coin) => this.coinOverlap(player, coin));
        this.game.physics.arcade.collide(this.goombas, this.layer);
        this.game.physics.arcade.overlap(this.player, this.goombas, (player, goomba) => this.goombaOverlap(player, goomba));

        if (this.player.body.enable) {
            this.player.body.velocity.x = 0;
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -100;
                this.player.animations.play('walkLeft');
                this.player.goesRight = false;
            } else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 100;
                this.player.animations.play('walkRight');
                this.player.goesRight = true;
            } else {
                this.player.animations.stop();
                if (this.player.goesRight) this.player.frame = 0;
                else this.player.frame = 7;
            }

            if (this.cursors.up.isDown && this.player.body.onFloor()) {
                this.soundJump();
                this.player.body.velocity.y = -190;
                this.player.animations.stop();
            }

            if (this.player.body.velocity.y != 0) {
                if (this.player.goesRight) this.player.frame = 5;
                else this.player.frame = 12;
            }
        }

        this.layer.resizeWorld();
    }

    private coinOverlap(player, coin) {
        this.soundCoin();
        coin.kill();
    }

    private goombaOverlap(player, goomba) {
        if (player.body.touching.down) {
            goomba.animations.stop();
            goomba.frame = 2;
            goomba.body.enable = false;
            player.body.velocity.y = -80;
            this.soundGoomba();
            this.game.time.events.add(Phaser.Timer.SECOND, () => {
                goomba.kill();
            });
        } else {
            this.soundGameOver();
            player.frame = 6;
            player.body.enable = false;
            player.animations.stop();
            this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
                this.game.destroy();
                if (this.onGameOver) this.onGameOver();
                console.clear();
            });
        }
    }

}
