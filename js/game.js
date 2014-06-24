define([
    'player',
    '../lib/domReady',
    'scene',
    'globals',
    'inputkeys',
    'flyingEnemy',
    'projectile',
    'text',
    'levelscript',
    'beefcake'
], function(
    Player,
    domready,
    Scene,
    globals,
    InputKeys,
    FlyingEnemy,
    Projectile,
    Text,
    LevelScript,
    BeefCake
) {
    var Game = {};
    Game.new = function() {
        var public = {},
            private = {
                game: null,
                scene: null,
                map: null,
                layers: null,
                cursors: null,
                player: null,
                beefcake: null,

                nextQueue: [],
                everyQueue: []
            };

        public.preload = function (game) {
            public.load.image('scanlines', 'data/img/sprite/scanlines.png');
            globals.randomizer.preload(public, "static", ".jpg", 0, 6, globals.fileType.image);

            Scene.preload(public);
            Player.preload(public);
            Projectile.preload(public);
            FlyingEnemy.preload(public);
            BeefCake.preload(public);

        };

        public.scanlines;
        public.finalSceneReached = false;

        function onPlayerReachEnd()
        {
            private.keepGeneratingEnemies = false;
            private.player.lockShoot();
            public.moveCameraToSpot(finalScene);

        };

        function finalScene()
        {
            private.player.body.gravity.y = 0;
            private.player.lockShoot(true);
            public.finalSceneReached = true;
        }

        function checkEnemyCollisions()
        {
            public.phaser.physics.arcade.overlap(Player.projectileGroup,
                    FlyingEnemy.enemyGroup, function(playa, enemy) {
                enemy.removeHitPoints(100);
            });

            public.phaser.physics.arcade.overlap(private.player,
                    FlyingEnemy.enemyGroup, function(playa, enemy) {
                    enemy.collidedWithPlayer();
                    private.player.onHit();
            });




            public.phaser.physics.arcade.overlap(BeefCake.BeefCakeGroup,
                Player.projectileGroup,
                 function(beefcake, playerBullet) {
                     if(public.finalSceneReached) {
                         private.player.lockShoot();
                         public.finalSceneReached = false;

                         var dialog = public.levelscript.nextDialogue();

                         var text = Text.new(public, dialog,
                             private.player.x, private.player.y + private.player.height/2,
                             { fadeSpeed: 1, fadeOutAfter:1, fadeDir:globals.direction.right, fadeOffset:20, color:'#E0E0EB' });
                         public.doAfter(function() {

                             var dialog = public.levelscript.nextDialogue();
                             Text.new(public, dialog,
                                 private.beefcake.body.x, private.beefcake.body.y,
                                 { fadeSpeed: 1, fadeOutAfter:1, fadeDir:globals.direction.right, fadeOffset:20, color:'#000000' });
                             beefcake.shoot();

                         }, 3.5);
                     //    beefcake.shoot();
                         //delay
/*
                         dialog = public.levelscript.nextDialogue();
                         public.doAfter(function() {
                             var text = Text.new(game, dialog.subtext,
                                 private.player.body.x, private.player.body.y + private.player.height / 2,
                                 { fadeSpeed: 1, fadeOutAfter: .5, fadeDir: globals.direction.right, fadeOffset: 20, color: '#FFFFFF' });
                         },2);
*/
                     }
             });

            public.phaser.physics.arcade.overlap( private.player, BeefCake.ProjectileGroup,
                function(playa, dumbell)
                {
                    if(!public.finalSceneReached) {

                        public.finalSceneReached = true;

                        var dialog = public.levelscript.nextDialogue();
                        Text.new(public, dialog,
                            private.beefcake.body.x, private.beefcake.body.y + 100,
                            { fadeSpeed: 1, fadeOutAfter: 1, fadeDir: globals.direction.right, fadeOffset: 20, color: '#FFFFFF' });

                        private.player.lockShoot(true);
                    }
                   //playa.hitWithDumbell();
             });


        }

        public.create = function () 
        {

            public.juicy = public.phaser.plugins.add(new Phaser.Plugin.Juicy(public));
            
            public.scanlines = public.add.sprite(0, 0, 'scanlines');
            //public.scanlines.scale = {x: 5, y: 5};
            public.scanlines.alpha = .1;


            public.static = [];
            // Load the Start Screen BG an buttob
            //public.phaser.load.image('startScreenBG', 'data/img/title-page/title-page.png');
            //public.phaser.load.image('startBTN', 'data/img/title-page/play-btn.png');
            
            // public.phaser.load.audio('fabMusic', 'data/sfx/fabulousity-theme.ogg');

            // music = public.phaser.add.audio('fabMusic');
            // music.play();
            
            //document.getElementById('gameMusic').play();

            /***** START SCREEN ******/
           
            public.startBTN = document.createElement('a');
            public.startScreenBG = document.createElement('div');

            public.startBTN.setAttribute('style', 'position:absolute;width:167px;height:85px;background:url("data/img/title-page/play-btn.png");bottom:159px;left:74px;');
            public.startScreenBG.setAttribute('style', 'position:absolute;width:640px;height:480px;background:url("data/img/title-page/title-page.png");top:0;left:0px;');

            //public.startBTN.setAttribute('href', '#');

            document.getElementById('game-div').appendChild(public.startScreenBG);
            document.getElementById('game-div').appendChild(public.startBTN);

            //Listen for a click and execute a click handler
            public.startBTN.addEventListener('click', public.startGame, false);

        }

        public.startGame = function () {
            
            // destroy the play button and title screen
            document.getElementById('game-div').removeChild(public.startBTN);
            document.getElementById('game-div').removeChild(public.startScreenBG);

            public.phaser.physics.startSystem(Phaser.Physics.ARCADE);
           
            
            private.scene = Scene.new(public);
            
            private.map = private.scene.loadMap('house');
            public.every(function() {
                private.map.collide(public, private.player);
            });


            // Create player
            private.player = Player.new(public, onPlayerReachEnd);
            private.input = InputKeys.new(public, private.player);
            
            //hudstatic

            for(var i = 0; i < 7; i++){
                public.static.push(public.add.sprite(0, 0, 'static'+i));
                public.static[i].alpha = .1;
                private.player.addChild(public.static[i]);
                public.static[i].x -= 400;
                public.static[i].y -= 400;
                public.static[i].scale = {x: 2, y: 2};
            }

            //create beefcake
            //3083 is the trigger

            private.beefcake = BeefCake.new(public, 3352, 296);
            public.levelscript = LevelScript.new(public, private.player);


//private.testText = Text.new(public, 'Test', 100, 0,
  //              { fadeSpeed: 2, fadeOutAfter:5, fadeDir:globals.direction.down, fadeOffset:5, color:"#00FF00" });
            private.keepGeneratingEnemies = true;

            public.doAfter(enemyFactory, 3);
            /*set up generator
             public.doAfter(function(){
                if(!private.keepGeneratingEnemies)
                    return;

                FlyingEnemy.new(public
            var enemy = FlyingEnemy.new(public);*/


            public.every(checkEnemyCollisions);
            


            public.camera.follow(private.player, Phaser.Camera.FOLLOW_PLATFORMER);
        };

           function enemyFactory()
           {
               if(!private.keepGeneratingEnemies)
                   return;
               FlyingEnemy.new(public, 640+ private.player.x, Math.random()*public.phaser.world.height);
               public.doAfter(enemyFactory, 3);
           }

        public.update = function () {
            
            

            for (var i = 0; i < public.static.length; i++){
                public.static[i].alpha = Math.random()/50;
            };

            var ncb;
            while (private.nextQueue.length > 0) {
                ncb = private.nextQueue.pop();
                ncb(public);
            }

            _.each(private.everyQueue, function(ecb) {
                ecb(public);
            });
        };

        public.render = function () {
        };

        public.start = function() {



            var transparent = false;
            var antialias = false;
            public.phaser = new Phaser.Game(
                640, 480,
                Phaser.AUTO,
                'game-div',
                public,
                transparent
            );
        };

        public.next = function(cb) {
            private.nextQueue.push(cb);
        };

        public.every = function(cb) {
            private.everyQueue.push(cb);
        };

        public.doAfter = function(cb, secs){
           // public.phaser.time.events.add(Phaser.Timer.SECOND * secs, cb);
            setTimeout(function() {public.next(cb)}, secs*1000);
        };


        public.moveCameraToSpot = function(onComplete)
        {

            public.phaser.camera.follow(null);
            var tween =  public.phaser.add.tween(public.camera);
            tween.to({x:3083 - 150},1500, Phaser.Easing.Linear.None,true)
                tween.onComplete.add(onComplete);
           // public.camera.setPosition(3083+50,0);

        };
        
        public.cameraShake = function(duration, strength, refollow){
            public.phaser.camera.follow(null);
            var tween =  public.phaser.add.tween(public.camera);
            var x = public.camera.x;
            var y = public.camera.y;
            tween.to({x:public.camera.x+strength, y:public.camera.y-strength}, duration, Phaser.Easing.Bounce.Out,true);
            //tween.to({x:public.camera.x+strength, y:public.camera.y+strength}, duration, Phaser.Easing.Bounce.Out,true);
            tween.to({x:x, y:y}, duration, Phaser.Easing.Bounce.Out,true);
            if (refollow)
                tween.onComplete.add(public.cameraFollowPlayer);
        };
        
        public.cameraFollowPlayer = function(){
            public.camera.follow(private.player, Phaser.Camera.FOLLOW_PLATFORMER);
        };

        return public;
    };

    return Game;
});


