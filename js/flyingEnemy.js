define([],function(){

    var Enemy = {};

    Enemy.new=function(game)
    {
        var public = game.add.sprite(64*4, 64, 'wheelie_right');

        var private = {};

        private.hitPoints = 1;


        public.setHitPoints= function(points)
        {
            private.hitPoints= points;
        };

        public.die = function()
        {

        };

        public.removeHitPoints = function(points)
        {
             private.hitPoints -= points;
            if(private.hitPoints <=0 )
            {
                public.die();
            }
        };

        public.shoot = function()
        {

        };

        return public;
    };

    Enemy.preLoad = function(game)
    {
          game.load.spritesheet('wheelie_right', 'data/img/sprite/wheelie_right.png', 64, 64);
    };

    return Enemy;
});