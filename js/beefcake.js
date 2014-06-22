define(["globals"],function(globals){

    var BeefCake = {};

    BeefCake.BeefCakeGroup;

    BeefCake.new = function(globalGame, originX, originY) {
        var game = globalGame.phaser;
        var public = game.add.sprite(originX, originY, 'beefcake');
        var private = {};

        // rotate & flip around the center of the sprite
        public.anchor.setTo(0.5, 0.5);
        // width, height, translateX, translateY
        game.physics.arcade.enableBody(public);

        //public.body.gravity.y = globals.GRAVITY;
        public.body.bounce.y = 0;
        public.body.linearDamping = 1;
        public.body.collideWorldBounds = true;

        public.shoot = function() {

            game.levelscript.displayNextBuff(originX, originY);
            //spawn particle here. just one.
        };


        return public;
    };




    BeefCake.preload = function(game){
        game.load.spritesheet('beefcake', 'data/img/sprite/beefcake-sheet.png', 128, 128);
        //dumbell projectile
        BeefCake.BeefCakeGroup = game.add.group();
    };



    return BeefCake;
});