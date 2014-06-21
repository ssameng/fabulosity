define(['globals'], function (globals) {

    var Player = {};

    Player.new = function (game) {
        var public = game.phaser.add.sprite(32 * 10, 32 * 4, 'gripe_run_right');
        var private = {};

        game.phaser.physics.arcade.enableBody(public);

        private.motor = {
            speed: 200,
            currentSpeed: 0,
            acceleration: 20,
            jumpPower: 75,
        };

        // rotate & flip around the center of the sprite
        public.anchor.setTo(0.5, 0.5);
        // width, height, translateX, translateY
        game.phaser.physics.arcade.enableBody(public);
        public.body.setSize(40, 56, 15, 24);
        // Use all of the frames for the 'walk' animation
        public.animations.add('walk');

        public.body.gravity.y = globals.GRAVITY;
        public.body.bounce.y = 0;
        public.body.linearDamping = 1;
        public.body.collideWorldBounds = true;

        //call this during update based on cursors
        public.jump = function () {
            if (public.body.onFloor()) {
                console.log("jumping");
                //private.motor.jumping = true;
                //private.motor.jumpPack = private.motor.jumpPackFull;
            }
            if (private.motor.jumpPack > 0) {
                private.motor.jumpPack -= game.phaser.time.physicsElapsed;
                public.body.velocity.y -= private.motor.jumpPower;
                console.log(private.motor.jumpPack);
            }
        };




        //direction false is left. call this based on cursors input in update
        public.walk = function (direction) {
            switch(direction){
                case globals.direction.stationary:
                    public.body.velocity.x = 0;
                    break;
                case globals.direction.left:
                    public.body.velocity.x -= private.motor.acceleration;
                    if (private.motor.currentSpeed < -private.motor.speed) {
                        private.motor.currentSpeed = -private.motor.speed;
                    }
                    public.animations.play('walk');
                    break;
                case globals.direction.right:
                    public.body.velocity.x += private.motor.acceleration;
                    if (private.motor.currentSpeed > private.motor.speed) {
                        private.motor.currentSpeed = private.motor.speed;
                    }
                    public.animations.play('walk');
                    break;
            }
        };


        return public;
    };

    Player.preload = function(game) {
        // Load the main player spritesheet
        game.load.spritesheet('gripe_run_right',
            '/data/img/sprite/gripe_run_right.png', 64, 64);
    };

    return Player;
});

