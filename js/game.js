define([
    'player',
    '../lib/domReady',
    'scene',
    'globals',
    'inputkeys',
    'flyingEnemy'
], function(Player, domready, Scene, globals, InputKeys, FlyingEnemy) {

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
                enemies:[],

                nextQueue: [],
                everyQueue: [],
            };

        public.preload = function (game) {
            Player.preload(public);
            Scene.preload(public);
            FlyingEnemy.preload(public);
        };

        public.create = function () {
            public.phaser.physics.startSystem(Phaser.Physics.ARCADE);

            private.scene = Scene.new(public);
            private.map = private.scene.loadMap('area01');
            public.every(function() {
                private.map.collide(public, private.player);
            });

            private.enemies[0] = FlyingEnemy.new(public);
            // Create player
            private.player = Player.new(public);
            private.input = InputKeys.new(public, private.player);
        };

        public.update = function () {
            var ncb;
            while (private.nextQueue.length > 0) {
                ncb = private.nextQueue.pop();
                ncb(public);
            }

            _.each(private.everyQueue, function(ecb) {
                ecb(public);
            });
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
