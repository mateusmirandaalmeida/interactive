/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../src/game.ts":
/*!**********************!*\
  !*** ../src/game.ts ***!
  \**********************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _game_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.util */ "../src/game.util.ts");

var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.game = new Phaser.Game(500, 240, Phaser.CANVAS, '', {
            preload: function () { return _this.preload(); },
            create: function () { return _this.create(); },
            update: function () { return _this.update(); },
        }, false, false);
    }
    Game.prototype.preload = function () {
        this.game.load.image('js', 'assets/pics/acryl_bladerunner.png');
        this.game.load.spritesheet('tiles', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/tiles_dctsfk.png', 16, 16);
        this.game.load.spritesheet('mario', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/mario_wjlfy5.png', 16, 16);
        this.game.load.spritesheet('coin', 'https://res.cloudinary.com/harsay/image/upload/v1464614984/coin_iormvy.png', 16, 16);
        this.game.load.tilemap('level', 'https://api.myjson.com/bins/3kk2g', null, Phaser.Tilemap.TILED_JSON);
    };
    Game.prototype.create = function () {
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#5c94fc';
        this.map = this.game.add.tilemap('level');
        this.map.addTilesetImage('tiles', 'tiles');
        this.map.setCollisionBetween(3, 12, true, 'solid');
        _game_util__WEBPACK_IMPORTED_MODULE_0__["GameUtils"].addText(this.game, 14, 0, 'Curriculo interativo', { font: "18px Arial" });
        _game_util__WEBPACK_IMPORTED_MODULE_0__["GameUtils"].addText(this.game, 14, 24, 'Mateus Miranda', { font: "12px Arial" });
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
    };
    Game.prototype.update = function () {
        var _this = this;
        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.overlap(this.player, this.coins, function (player, coin) { return _this.coinOverlap(player, coin); });
        if (this.player.body.enable) {
            this.player.body.velocity.x = 0;
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -90;
                this.player.animations.play('walkLeft');
                this.player.goesRight = false;
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 90;
                this.player.animations.play('walkRight');
                this.player.goesRight = true;
            }
            else {
                this.player.animations.stop();
                if (this.player.goesRight)
                    this.player.frame = 0;
                else
                    this.player.frame = 7;
            }
            if (this.cursors.up.isDown && this.player.body.onFloor()) {
                this.player.body.velocity.y = -190;
                this.player.animations.stop();
            }
            if (this.player.body.velocity.y != 0) {
                if (this.player.goesRight)
                    this.player.frame = 5;
                else
                    this.player.frame = 12;
            }
        }
    };
    Game.prototype.coinOverlap = function (player, coin) {
        coin.kill();
    };
    return Game;
}());



/***/ }),

/***/ "../src/game.util.ts":
/*!***************************!*\
  !*** ../src/game.util.ts ***!
  \***************************/
/*! exports provided: GameUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameUtils", function() { return GameUtils; });
var GameUtils;
(function (GameUtils) {
    function addText(game, x, y, text, config) {
        var phaserText = new Phaser.Text(game, x, y, text, config || { font: "65px Arial", fill: "#ff0044", align: "center" });
        game.add.existing(phaserText);
    }
    GameUtils.addText = addText;
})(GameUtils || (GameUtils = {}));


/***/ }),

/***/ "../src/index.ts":
/*!***********************!*\
  !*** ../src/index.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "../src/game.ts");

/* harmony default export */ __webpack_exports__["default"] = (new _game__WEBPACK_IMPORTED_MODULE_0__["Game"]());


/***/ })

/******/ });
//# sourceMappingURL=game.js.map