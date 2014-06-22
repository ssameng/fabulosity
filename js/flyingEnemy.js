define(["globals"],function(Globals){

    var Enemy = {};

    Enemy.enemyGroup;

    Enemy.new = function(globalGame, originX, originY)
    {

        //default parameters
        originX = originX || 0;
        originY = originY || 0;

        var game = globalGame.phaser;
        var public = game.add.sprite(originX, originY, 'words');
        public.animations.frame = Math.floor(Math.random()*4);

        Enemy.enemyGroup.add(public);
        var private = {};

        public.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enableBody(public);
        public.body.setSize(40, 56, 15, 24);

        private.hitPoints = 1;




        //particle emitter
        //public.animations.frame = Math.floor(Math.random() * 12);
//        emitter = game.add.emitter(0, originX, originY);
//        emitter.makeParticles('squareparticle0');
//        //	false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
//        //	The 5000 value is the lifespan of each particle
//        emitter.setXSpeed(-50, -50);
//        emitter.start(false, 5000, 500);
//
//        public.addChild(emitter);


        public.setHitPoints= function(points)
        {
            private.hitPoints = points;
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
           // console.log("work!");
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
        game.load.spritesheet('words', 'data/img/sprite/wordEnemies.png', 128, 128);
        Globals.randomizer.preload(game, 'squareparticle', '.png', 0, 3, Globals.fileType.image);
        Enemy.enemyGroup = game.add.group();

    };

    return Enemy;
});