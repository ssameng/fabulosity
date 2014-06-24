define([], function(){
    var globals = {};
    globals.direction = {
        up         : 1,
        down       : 2,
        left       : 3,
        right      : 4,
        stationary : 5
    };

    globals.fileType = {
        sprite  :1,
        image   :2,
        sound   :3
    };

    globals.GRAVITY = 700;

    globals.randomizer = {};
    globals.randomizer.preload = function(game, filePrefix, fileSuffix, from, to, type, path) {
        console.log("COME ON");
        for (var i = from; i < to; i++){
            var obj;
            switch(type){
                case globals.fileType.sprite:
                    break;
                case globals.fileType.image:
                    path = path || 'data/img/sprite/';
                    game.load.image(filePrefix+i, path+filePrefix+i+fileSuffix);
                    console.log("loading "+path+filePrefix+i+fileSuffix);
                    break;
                case globals.fileType.sound:
                    path = path || 'data/sfx/';
                    game.load.audio(filePrefix+i, path+filePrefix+i+fileSuffix);
                    break;
                default:
                    console.log("CAN'T LOAD TYPE");

            }
        }

    };

    return globals;
});

