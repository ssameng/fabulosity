require([
    'player',
    '../lib/domReady',
    'scene',
    'globals'
], function(Player, domready, Scene, globals) {
    /*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
    /*global Phaser:true*/

    // Make this false to to turn off debugging (will run faster)
    var enableDebugging = true;

    var game = null;
    var map = null;
    var layers = null;
    var cursors = null;

    function setupCollisionLayer(game, map, layer) {
        layer.visible = false;
        map.setCollisionByExclusion([], true, layer);
        layer.resizeWorld();
    }


    var gameState = {
        preload: function (game) {
            Player.preload(game);
            Scene.preload(game);
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

            //create player
            player = Player.new(game);

            cursors = game.input.keyboard.createCursorKeys();
        },
        update: function (game) {
            game.physics.arcade.collide(player, layers.collision);

            if (cursors.left.isDown){
                player.walk(globals.direction.left);
            }
            else if (cursors.right.isDown) {
                player.walk(globals.direction.right);
            }
            else {
                player.walk(globals.direction.stationary);
            }

        },
        render: function (game) {
            if (enableDebugging) {
                //game.debug.cameraInfo(game.camera, 16, 16);
                //game.debug.body(player);
            }
        }
    };

    domready(function() {
        var transparent = false;
        var antialias = true;
        game = new Phaser.Game(
            640, 480,
            (enableDebugging ? Phaser.CANVAS : Phaser.AUTO),
            'game-div',
            gameState,
            transparent,
            antialias);
    });
});
