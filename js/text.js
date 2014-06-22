define(["globals"], function(globals) {


    var Text = {};
    Text.new = function(game, text, x, y, options) {
        var textStyle = {
            font: '40px silkscreennormal',
            fill: options.color || '#fff',
            align: 'left'
        };

       

            var public = game.phaser.add.text(x, y, text, textStyle);
            private = {};

        public.alpha=0;


        var fadeSpeed = options.fadeSpeed || 2;
        game.phaser.add.tween(public).to( { alpha: 1 }, fadeSpeed*1000, Phaser.Easing.Linear.None, true,0,false);

        if (options.fadeOutAfter)
        {
            game.doAfter(function (){
                game.phaser.add.tween(public).to( { alpha: 0 }, fadeSpeed*1000, Phaser.Easing.Linear.None, true);

                if(options.fadeDir)
                {
                    switch (options.fadeDir)
                    {
                        case globals.direction.down:
                            game.phaser.add.tween(public).to(
                                { y: y+ options.fadeOffset}, fadeSpeed*1000, Phaser.Easing.Sinusoidal.InOut, true);
                            break;
                        case globals.direction.left:
                            game.phaser.add.tween(public).to(
                                { x: x+ options.fadeOffset}, fadeSpeed*1000, Phaser.Easing.Sinusoidal.InOut, true);
                            break;
                        case globals.direction.right:
                            game.phaser.add.tween(public).to(
                                { x: x- options.fadeOffset}, fadeSpeed*1000, Phaser.Easing.Sinusoidal.InOut, true);
                            break;
                    }
                }

            }, options.fadeOutAfter);



        }
        return public;
    };

    return Text;
});
