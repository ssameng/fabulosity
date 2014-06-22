define([], function() {
    var textStyle = {
        font: '20px silkscreennormal',
        fill: '#fff',
        align: 'left'
    };

    var Text = {};
    Text.new = function(game, text, x, y, options) {
        var public = {},
            private = {};

        private.t = game.phaser.add.text(x, y, text, textStyle);

        var fadeSpeed = options.fadeSpeed || 10;
        if (fadeSpeed > 0) {
            private.t.alpha = 0;
            // TODO unregister this cb once it's done
            game.every(function() {
                if (private.t.alpha < 1) {
                    private.t.alpha += options.fadeSpeed / 1000;
                }
            });
        }

        return public;
    };

    return Text;
});
