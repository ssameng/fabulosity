define(["globals", 'projectile'],function(globals, Projectile){

    var BeefCake = {};

    BeefCake.BeefCakeGroup;
    BeefCake.ProjectileGroup;

    BeefCake.new = function(globalGame, originX, originY) {
        var game = globalGame.phaser;
        var public = game.add.sprite(originX-100, originY-90, 'beefcake');
        var private = {};

        public.animations.frame = 1;

        // rotate & flip around the center of the sprite
        public.anchor.setTo(0.5, 0.5);
        // width, height, translateX, translateY
        game.physics.arcade.enableBody(public);
        public.body.setSize(152, 160, 0, 0);


        //public.body.gravity.y = globals.GRAVITY;
        public.body.bounce.y = 0;
        public.body.linearDamping = 1;
        //public.body.collideWorldBounds = true;
        private.fireRateTimer = .5;
        private.canFire = true;

        public.shoot = function() {
            if (!private.canFire) return;
            globalGame.levelscript.displayNextBuff(originX, originY);
            //spawn particle here. just one.
            var projectile = Projectile.new(globalGame, BeefCake.ProjectileGroup,
                public.body.x, public.body.y+100, globals.direction.left, 'dumbell');

            private.canFire = false;
        };

        public.onHit = function(){
            //on the rainbow hit basically

        };

        public.update = function(){
            if (private.fireRateTimer>0)
                private.fireRateTimer -= globalGame.phaser.time.physicsElapsed;

            if (private.fireRateTimer <= 0){
                private.canFire = true;
                private.fireRateTimer = .5;
            }
        };


        return public;
    };




    BeefCake.preload = function(game){
        game.load.spritesheet('beefcake', 'data/img/sprite/beefcake-sheet.png', 152, 160);
        //dumbell projectile
        game.load.spritesheet('dumbell', 'data/img/sprite/dumbbell-sprite2.png', 80, 48);
        BeefCake.BeefCakeGroup = game.add.group();
        BeefCake.ProjectileGroup = game.add.group();
    };



    return BeefCake;
});