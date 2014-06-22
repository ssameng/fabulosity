define(["globals"], function(globals) {

    var InputKeys = {};

    InputKeys.new = function(game, player) {
        var public = {};
        var private = {};

        var cursors = game.phaser.input.keyboard.createCursorKeys();

        //bindings
        private.jump = game.phaser.input.keyboard.addKey(Phaser.Keyboard.Z);
        private.attack = game.phaser.input.keyboard.addKey(Phaser.Keyboard.X);
        private.printLocation = game.phaser.input.keyboard.addKey(Phaser.Keyboard.L);



        //call this in update to handle game.phaser input
        public.update = function(){

            if (cursors.up.isDown){
                player.jump();
            }

            if (cursors.left.isDown){
                player.walk(globals.direction.left);
            }
            else if (cursors.right.isDown){
                player.walk(globals.direction.right);
            }
            else player.walk(globals.direction.stationary);

            //action/shoot and shit
            if (private.attack.isDown){
                player.shoot();
            }

            if (private.printLocation.isDown){
                console.log(player.body.x + ", " + player.body.y);
            }
        };

        game.every(function() {
            public.update();
        });

        return public;
    };
    return InputKeys;
});
