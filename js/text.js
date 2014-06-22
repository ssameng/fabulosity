define([], function() {
    var textStyle = {
        font: '15px silkscreennormal',
        fill: '#fff',
        align: 'left'
    };

    var Text = {};
    Text.new = function(game, text, x, y) {
        var public = {},
            private = {};

        private.t = game.phaser.add.text(x, y, text, textStyle);

        return public;
    };

    return Text;
});
