define(["globals"],function(globals) {

    var Projectile = {};

    Projectile.new = function(game, group, originX, originY, direction, spriteName, spriteTrail, owner, damage){
        var public = game.phaser.add.sprite(originX, originY, spriteName);
        var private = {};

        group.add(public);
        game.phaser.physics.arcade.enableBody(public);

        damage = damage || 0;
        switch(direction){
            case globals.direction.left:
                public.body.velocity.x = -200;
                break;
            case globals.direction.right:
                public.body.velocity.x = 200;
                break;
        }
        public.body.velocity.x

        public.update = function(){
            //move forward here

        };


        return public;
    };

    Projectile.preload = function(game)
    {
        game.phaser.load.image('rainbowProjectile', 'data/img/sprite/rainbow.png');
    };

    return Projectile;
});