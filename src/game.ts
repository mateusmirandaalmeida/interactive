import { GameUtils } from './game.util';

declare let Phaser;

export class Game {
    private game;
    private map;
    private layer;
    private coins;
    private player;
    private cursors;

    constructor() {
        this.game = new Phaser.Game(500, 240, Phaser.CANVAS, '', {
            preload: () => this.preload(),
            create: () => this.create(),
            update: () => this.update(),
        }, false, false);
    }

    private preload() {
        this.game.load.image('js', 'assets/pics/acryl_bladerunner.png');
        this.game.load.spritesheet('tiles', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/tiles_dctsfk.png', 16, 16);
        this.game.load.spritesheet('mario', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/mario_wjlfy5.png', 16, 16);
        this.game.load.spritesheet('coin', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/coin_iormvy.png', 16, 16);
        this.game.load.tilemap('level', 'https://api.myjson.com/bins/3kk2g', null, Phaser.Tilemap.TILED_JSON);
    }

    private create() {
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#5c94fc';
        this.map = this.game.add.tilemap('level');
        this.map.addTilesetImage('tiles', 'tiles');
        this.map.setCollisionBetween(3, 12, true, 'solid');
        GameUtils.addText(this.game, 14, 0, 'Curriculo interativo', { font: "18px Arial" });
        GameUtils.addText(this.game, 14, 24, 'Mateus Miranda', { font: "12px Arial" });
        this.map.createLayer('background');
        this.layer = this.map.createLayer('solid');
        this.layer.resizeWorld();
        this.coins = this.game.add.group();
        this.coins.enableBody = true;
        this.map.createFromTiles(2, null, 'coin', 'stuff', this.coins);
        this.coins.callAll('animations.add', 'animations', 'spin', [0, 0, 1, 2], 3, true);
        this.coins.callAll('animations.play', 'animations', 'spin');

        this.player = this.game.add.sprite(16, this.game.world.height - 48, 'mario');
        this.game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 370;
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

        if (this.player.body.enable) {
            this.player.body.velocity.x = 0;
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -90;
                this.player.animations.play('walkLeft');
                this.player.goesRight = false;
            } else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 90;
                this.player.animations.play('walkRight');
                this.player.goesRight = true;
            } else {
                this.player.animations.stop();
                if (this.player.goesRight) this.player.frame = 0;
                else this.player.frame = 7;
            }

            if (this.cursors.up.isDown && this.player.body.onFloor()) {
                this.player.body.velocity.y = -190;
                this.player.animations.stop();
            }

            if (this.player.body.velocity.y != 0) {
                if (this.player.goesRight) this.player.frame = 5;
                else this.player.frame = 12;
            }
        }
    }

    private coinOverlap(player, coin) {
        coin.kill();
    }

}
