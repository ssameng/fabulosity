define(["globals"],function(Globals){

    var BeefCake = {};

    BeefCake.BeefCakeGroup;

    BeefCake.new = function(globalGame, originX, originY) {
        var game = globalGame.phaser;
        var public = game.add.sprite(originX, originY, 'beefcake');
        var private = {};

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