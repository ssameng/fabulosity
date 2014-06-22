define(['globals', 'projectile'], function (globals, Projectile) {

    var Player = {};

    Player.projectileGroup;

    Player.playerGroup;

    Player.new = function (game, endGameTrigger) {
        var public = game.phaser.add.sprite(3060, 32 * 4, 'playersprite');
        var private = {};

        Player.playerGroup.add(public)

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
            canFire: false,
            lock: false
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
        public.animations.add('walk', [4,  2 ], 5, true);


        public.body.gravity.y = globals.GRAVITY;
        public.body.bounce.y = 0;
        public.body.linearDamping = 1;
        public.body.collideWorldBounds = true;

        private.walkable = true;


        //get a random shoot noise

        //call this during update based on cursors
        public.jump = function () {
            if (!private.walkable) return;
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
            if (!private.walkable) return;
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
                    //public.scale.x = -private.scalex;
                    //private.direction = globals.direction.left;
                    break;
                case globals.direction.right:
                    private.motor.currentSpeed += private.motor.acceleration;
                    if (private.motor.currentSpeed > private.motor.speed) {
                        private.motor.currentSpeed = private.motor.speed;
                    }
                    public.animations.play('walk');
                    //public.scale.x = private.scalex;
                    //private.direction = globals.direction.right;
                    break;
            }
            public.faceDirection(direction);
            public.body.velocity.x = private.motor.currentSpeed;

            if (public.body.x >= 3083){
                //LOCK THAT SHIT
                private.walkable = false;
                public.body.velocity.x = 0;
                public.faceDirection(globals.direction.right);
                public.animations.stop();
                public.animations.frame = 0;
                if(endGameTrigger)
                    endGameTrigger();
            }
        };

        public.shoot = function(){
            if (!private.attack.canFire || private.attack.lock) {
                return;
            }

            game.levelscript.displayNextMessage(public.x, public.y-public.height/2, '#000000', globals.direction.left);
            private.sfx.shoot.play();
            var projectile = Projectile.new(game, Player.projectileGroup,
                public.body.x, public.body.y, private.direction, 'rainbowflicker');
            private.attack.fireRateTimer = private.attack.fireRate;
            private.attack.canFire = false;
            return projectile;
        };

        public.update = function(){
            if (private.attack.fireRateTimer>0)
                private.attack.fireRateTimer -= game.phaser.time.physicsElapsed;
            if (private.attack.fireRateTimer <= 0){
                private.attack.canFire = true;
            }
        };

        public.faceDirection = function(direction){
            switch (direction){
                case globals.direction.left:
                    public.scale.x = -private.scalex;
                    private.direction = direction;
                    break;
                case globals.direction.right:
                    public.scale.x = private.scalex;
                    private.direction = direction;
                    break;
                default:
                    break;
            }
        };

        public.disableWalk = function(bool){
            private.walkable = bool;
        };
        return public;
    };


    Player.preload = function(game) {
        // Load the main player spritesheet
        game.load.spritesheet('playersprite',
            '/data/img/sprite/mainchar-sheet.png', 64, 80);


//        for(var i = 0; i < 2; i++){
//            game.load.audio('rainbowelectric'+i, '/data/sfx/rainbowelectric'+i+'.wav');
//        }
        game.load.audio('rainbowelectric', '/data/sfx/rainbowelectric0.wav');


        Player.projectileGroup = game.add.group();
        Player.playerGroup = game.add.group();
    };

    return Player;
});

