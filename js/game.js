define([
    'player',
    '../lib/domReady',
    'scene',
    'globals'
], function(Player, domready, Scene, globals) {

    var Game = {};
    Game.new = function() {
        var public = {},
            private = {
                game: null,
                scene: null,
                map: null,
                layers: null,
                cursors: null,
                player: null,
            };

        public.preload = function (game) {
            Player.preload(game);
            Scene.preload(game);
        };

        public.create = function (game) {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            // Create player
            private.player = Player.new(game);
            // Create scene manager
            private.scene = Scene.new(game);

            private.cursors = game.input.keyboard.createCursorKeys();
            private.map = private.scene.loadMap('area01');
        };

        public.update = function (game) {
            private.map.collide(game, private.player);
        };

        public.render = function (game) {
        };

        public.start = function() {
            var transparent = false;
            var antialias = true;
            new Phaser.Game(
                640, 480,
                Phaser.AUTO,
                'game-div',
                public,
                transparent,
                antialias
            );
        };

        return public;
    };

    return Game;
});
