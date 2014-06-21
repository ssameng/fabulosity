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
    var scene = null;
    var map = null;
    var layers = null;
    var cursors = null;


    var gameState = {
        preload: function (game) {
            Player.preload(game);
            Scene.preload(game);
        },
        create: function (game) {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // Create player
            player = Player.new(game);
            // Create scene manager
            scene = Scene.new(game);

            cursors = game.input.keyboard.createCursorKeys();
        },
        update: function (game) {
            map = scene.loadMap('area01');
            map.collide(player, layers.collision);
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
