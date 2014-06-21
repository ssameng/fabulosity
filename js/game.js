define([
    'player',
    '../lib/domReady',
    'scene',
    'globals',
    'inputkeys'
], function(Player, domready, Scene, globals, InputKeys) {

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

                nextQueue: [],
                everyQueue: [],
            };

        public.preload = function (game) {
            Player.preload(public);
            Scene.preload(public);
        };

        public.create = function () {
            public.phaser.physics.startSystem(Phaser.Physics.ARCADE);

            // Create player
            private.player = Player.new(public);
            // Create scene manager
            private.scene = Scene.new(public);

            private.input = InputKeys.new(public, private.player);
            private.map = private.scene.loadMap('area01');

            public.every(function() {
                private.map.collide(public, private.player);
            });
        };

        public.update = function () {
            var ncb;
            while (typeof(ncb = private.nextQueue.pop) !== 'undefined') {
                ncb(public);
            }

            _.each(private.everyQueue, function(ecb) {
                ecb(public);
            });

            private.map.collide(public, private.player);
            private.input.update();
        };

        public.render = function () {
        };

        public.start = function() {
            var transparent = false;
            var antialias = true;
            public.phaser = new Phaser.Game(
                640, 480,
                Phaser.AUTO,
                'game-div',
                public,
                transparent,
                antialias
            );
        };

        public.next = function(cb) {
            private.nextQueue.push(cb);
        };

        public.every = function(cb) {
            private.everyQueue.push(cb);
        };

        return public;
    };

    return Game;
});
