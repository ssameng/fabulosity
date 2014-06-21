define(["globals"],function(Globals){

    var Enemy = {};

    Enemy.enemyGroup;

    Enemy.new=function(globalGame)
    {

        var game = globalGame.phaser;
        var public =game.add.sprite(32 * 1, 32*4, 'wheelie_right');
        Enemy.enemyGroup.add(public);
        var private = {};

        public.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enableBody(public);
        public.body.setSize(40, 56, 15, 24);

        private.hitPoints = 1;


        public.setHitPoints= function(points)
        {
            private.hitPoints= points;
        };

        public.die = function()
        {
            public.kill();
        };

        public.removeHitPoints = function(points) {
            private.hitPoints -= points;
            if (private.hitPoints <= 0) {
                public.die();
            }
        };

        public.shoot = function()
        {

        };

        public.collidedWithPlayer = function()
        {
            console.log("work!");
            public.die();
        };

        public.update = function()
        {
            public.body.x+=1;

//            if(game.phaser.physics.overlap())
        };

        return public;
    };

    Enemy.preload = function(game)
    {
          game.load.spritesheet('wheelie_right', 'data/img/sprite/wheelie_right.png', 64, 64);
        Enemy.enemyGroup = game.add.group();

    };

    return Enemy;
});