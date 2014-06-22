define(['globals', 'projectile'], function (globals, Projectile) {

    var Player = {};

    Player.projectileGroup;

    Player.new = function (game) {
        var public = game.phaser.add.sprite(32 * 10, 32 * 4, 'gripe_run_right');
        var private = {};

        game.phaser.physics.arcade.enableBody(public);

        private.motor = {
            speed: 200,
            currentSpeed: 0,
            acceleration: 20,
            direction: globals.direction.right,
            jumpPower: 75,
            jumpPackFull:.1,
            jumpPack:.1,
            jumped: false
        };

        private.attack = {
            projectileSprite: 'rainbowflicker',
            projectileTrail: 'rainbowTrail',
            fireRate:.7,
            fireRateTimer:.7,
            canFire: false
        };

        private.sfx = {
            shoot: game.add.audio('rainbowelectric')

        };

        private.scalex = public.scale.x;

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


        //get a random shoot noise

        //call this during update based on cursors
        public.jump = function () {
            if (public.body.onFloor()) {
                private.motor.jumping = true;
                private.motor.jumpPack = private.motor.jumpPackFull;
            }
            if (private.motor.jumpPack > 0) {
                private.motor.jumpPack -= game.phaser.time.physicsElapsed;
                public.body.velocity.y -= private.motor.jumpPower;
            }
            else private.motor.jumping = false;
        };



        //direction false is left. call this based on cursors input in update
        public.walk = function (direction) {
            switch(direction){
                case globals.direction.stationary:
                    if (private.motor.currentSpeed < 0) {
                        private.motor.currentSpeed += private.motor.acceleration * 2;
                        if (private.motor.currentSpeed > 0)
                            private.motor.currentSpeed = 0;
                    }
                    else if (private.motor.currentSpeed > 0) {
                        private.motor.currentSpeed -= private.motor.acceleration * 2;
                        if (private.motor.currentSpeed < 0)
                            private.motor.currentSpeed = 0;
                    }
                    break;
                case globals.direction.left:
                    private.motor.currentSpeed -= private.motor.acceleration;
                    if (private.motor.currentSpeed < -private.motor.speed) {
                        private.motor.currentSpeed = -private.motor.speed;
                    }
                    public.animations.play('walk');
                    public.scale.x = -private.scalex;
                    private.direction = globals.direction.left;
                    break;
                case globals.direction.right:
                    private.motor.currentSpeed += private.motor.acceleration;
                    if (private.motor.currentSpeed > private.motor.speed) {
                        private.motor.currentSpeed = private.motor.speed;
                    }
                    public.animations.play('walk');
                    public.scale.x = private.scalex;
                    private.direction = globals.direction.right;
                    break;
            }
            public.body.velocity.x = private.motor.currentSpeed;
        };

        public.shoot = function(){
            if (!private.attack.canFire) {
                return;
            }
            private.sfx.shoot.play();
            var projectile = Projectile.new(game, Player.projectileGroup,
                public.body.x, public.body.y, private.direction, 'rainbowflicker');
            private.attack.fireRateTimer = private.attack.fireRate;
            private.attack.canFire = false;
            return projectile;
        };

        public.update = function(){
            private.attack.fireRateTimer -= game.phaser.time.physicsElapsed;
            if (private.attack.fireRateTimer <= 0){
                private.attack.canFire = true;
            }
        };

        return public;
    };


    Player.preload = function(game) {
        // Load the main player spritesheet
        game.load.spritesheet('gripe_run_right',
            '/data/img/sprite/gripe_run_right.png', 64, 64);


//        for(var i = 0; i < 2; i++){
//            game.load.audio('rainbowelectric'+i, '/data/sfx/rainbowelectric'+i+'.wav');
//        }
        game.load.audio('rainbowelectric', '/data/sfx/rainbowelectric0.wav');


        Player.projectileGroup = game.add.group();
    };

    return Player;
});

