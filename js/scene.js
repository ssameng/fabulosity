define(['globals', 'game'], function(globals, game) {
    var Scene = {};
    Scene.new = function (game, map) {
        var public  = {},
            private = {};

        public.loadMap = function() {

        };
    };

    Scene.preload = function(game) {
        // Load the area01 map and its tiles
        game.load.tilemap('area01', 'data/map/area01.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('area01_level_tiles', 'data/img/map/area01_level_tiles.png');
    };

    return Scene;
});

