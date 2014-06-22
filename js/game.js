define([
    'player',
    '../lib/domReady',
    'scene',
    'globals',
    'inputkeys',
    'flyingEnemy',
    'projectile',
    'text',
    'levelscript'
], function(
    Player,
    domready,
    Scene,
    globals,
    InputKeys,
    FlyingEnemy,
    Projectile,
    Text,
    LevelScript
) {
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
                everyQueue: []
            };

        public.preload = function (game) {
            Scene.preload(public);
            Player.preload(public);
            FlyingEnemy.preload(public);
            Player.preload(public);
            Projectile.preload(public);
        };
        
        

        function checkEnemyCollisions()
        {
            public.phaser.physics.arcade.overlap(Player.projectileGroup,
                    FlyingEnemy.enemyGroup, function(playa, enemy) {
                enemy.removeHitPoints(100);
            });

            public.phaser.physics.arcade.overlap(private.player,
                    FlyingEnemy.enemyGroup, function(playa, enemy) {
                //enemy.collidedWithPlayer();
            });

        }

        public.create = function () {
            public.phaser.physics.startSystem(Phaser.Physics.ARCADE);

            private.scene = Scene.new(public);

            private.map = private.scene.loadMap('house');
            public.every(function() {
                private.map.collide(public, private.player);
            });


            // Create player
            private.player = Player.new(public);
            private.input = InputKeys.new(public, private.player);
            private.testText = Text.new(public, 'Test', 0, 0, { fadeSpeed: 100 });
            var enemy = FlyingEnemy.new(public, 32 * 1, 32*8);
            public.doAfter(function(){FlyingEnemy.new(public, 32 * 1, 32*4)}, 5);
            public.every(checkEnemyCollisions);
            
            public.levelscript = LevelScript.new(public, private.player);

            public.camera.follow(private.player, Phaser.Camera.FOLLOW_PLATFORMER);
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

            //resize game if window is resized
            window.addEventListener('resize', function(event){resizeGame();});
            var resizeGame = function () {game.stage.scale.refresh();}


            var transparent = false;
            var antialias = false;
            public.phaser = new Phaser.Game(
                640, 480,
                Phaser.AUTO,
                'game-div',
                public,
                transparent
            );
        };

        public.next = function(cb) {
            private.nextQueue.push(cb);
        };

        public.every = function(cb) {
            private.everyQueue.push(cb);
        };

        public.doAfter = function(cb, secs){
            setTimeout(function() {public.next(cb)}, secs*1000);
        };

        return public;
    };

    return Game;
});


