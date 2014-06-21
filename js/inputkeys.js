define(["globals"], function(globals) {

    var InputKeys = {};

    InputKeys.new = function(game, player) {
        var public = {};
        var private = {};

        var cursors = game.input.keyboard.createCursorKeys();

        //bindings
        private.jump = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        private.attack = game.input.keyboard.addKey(Phaser.Keyboard.X);

        //call this in update to handle game input
        public.update = function(){
            if (cursors.left.isDown){
                player.walk(globals.direction.left);
            }
            if (cursors.right.isDown){
                player.walk(globals.direction.right);
            }
            if (cursors.up.isDown){
                player.jump();
            }
        };
        return public;
    };
    return InputKeys;
});