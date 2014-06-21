define(["globals"],function(globals) {

    var Projectile = {};

    Projectile.new = function(game, originX, originY, spriteName, spriteTrail, owner, damage){
        var public = game.phaser.add.sprite(originX, originY, spriteName);
        var private = {};

        damage = damage || 0;


        public.update = function(){
            //move forward here
        };

        return public;
    };

    return Projectile;
});