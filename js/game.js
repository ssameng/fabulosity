/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
/*global Phaser:true*/

// Make this false to to turn off debugging (will run faster)
var enableDebugging = true;

var game = null;
var map = null;
var layers = null;
var cursors = null;
var player = null;

function setupCollisionLayer(game, map, layer) {
    layer.visible = false;
    map.setCollisionByExclusion([], true, layer);
    layer.resizeWorld();
}

function Player(game) {
        this.sprite = game.add.sprite(32*10, 32*4, 'gripe_run_right');
        // rotate & flip around the center of the sprite
        this.sprite.anchor.setTo(0.5, 0.5);
        // width, height, translateX, translateY
        game.physics.arcade.enableBody(this.sprite);
        this.sprite.body.setSize(40, 56, 15, 24);
        // Use all of the frames for the 'walk' animation
        this.sprite.animations.add('walk');

        this.sprite.body.gravity.y = 250;
        this.sprite.body.bounce.y = 0;
        this.sprite.body.linearDamping = 1;
        this.sprite.body.collideWorldBounds = true;
        game.camera.follow(this.sprite);
}

Player.prototype.animations = function() { return this.animations; };

Player.prototype.killx = function() {
    this.sprite.body.velocity.x = 0;
};

Player.prototype.handleCursor = function(cursor) {
    if (cursors.up.isDown) {
        if (this.sprite.body.onFloor()) {
            this.sprite.body.velocity.y = -300;
        }
    }
    if (cursors.left.isDown) {
        this.animations().play('walk', 15, true);
        this.sprite.body.velocity.x = -150;
        // flip left
        this.sprite.scale.x = -1;
    } else if (cursors.right.isDown) {
        this.animations().play('walk', 15, true);
        this.sprite.body.velocity.x = 150;
        // flip right
        this.sprite.scale.x = 1;
    } else {
        this.animations().stop();
    }
};

var gameState = {
    preload: function (game) {
        // Load the area01 map and its tiles
        game.load.tilemap('area01', 'data/map/area01.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('area01_level_tiles', 'data/img/map/area01_level_tiles.png');
        // Load the main player spritesheet
        game.load.spritesheet('gripe_run_right', 'data/img/sprite/gripe_run_right.png', 64, 64);
    },
    create: function (game) {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#21C3FC';

        // Create the map and associate the tiles with it
        map = game.add.tilemap('area01');
        map.addTilesetImage('area01_level_tiles', 'area01_level_tiles');

        // Create all of the layers from the tileset,
        // but set visible to false if the name is 'collision'
        layers = {};
        map.layers.forEach(function (layerData) {
            var layer = map.createLayer(layerData.name);
            if (layerData.name === 'collision') {
                setupCollisionLayer(game, map, layer);
            }
            layers[layerData.name] = layer;
        });

        player = new Player(game);


        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function (game) {
        game.physics.arcade.collide(player.sprite, layers.collision);
        player.killx();
    },
    render: function (game) {
        if (enableDebugging) {
            //game.debug.cameraInfo(game.camera, 16, 16);
            game.debug.body(player.sprite);
        }
    }
};

window.onload = function() {
    var transparent = false;
    var antialias = true;
    game = new Phaser.Game(
        640, 480,
        (enableDebugging ? Phaser.CANVAS : Phaser.AUTO),
        'game-div',
        gameState,
        transparent,
        antialias);
};
