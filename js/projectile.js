define(["globals"],function(globals) {

    var Projectile = {};

    Projectile.new = function(game, group, originX, originY, direction, spriteName, spriteTrail, owner, damage){
        var public = game.phaser.add.sprite(originX, originY, spriteName);
        var private = {};
        public.anchor.setTo(0.5, 0.5);
        private.length = 1;
        private.lengthTimer = private.length;

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
        var tweenData = 0;
        game.add.tween(public.scale).to({x: 10.0, y: 1.0}, 1000, Phaser.Easing.Sinusoidal.InOut, true);
        //var tween = game.add.tween(tweenData).to(100, 2000, Phaser.Easing.Sinusoidal.InOut);


        public.update = function(){
            //move forward here\
            if (spriteName == "rainbowflicker") {
                public.animations.frame = Math.floor(Math.random() * 12);
            }

        };

        return public;
    };

    Projectile.preload = function(game){
        //globals.randomizer.preload(game, 'rainbow', '.png', 0, 12, globals.fileType.image);
        game.load.spritesheet('rainbowflicker',
            '/data/img/sprite/AllTheRainbows.png', 32, 32);

    };

    return Projectile;
});