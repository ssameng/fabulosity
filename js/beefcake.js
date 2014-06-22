define(["globals"],function(Globals){

    var Enemy = {};

    Enemy.enemyGroup;

    Enemy.new = function(globalGame, originX, originY) {
        var public = game.add.sprite(originX, originY, 'beefcake');

        return public;
    };


    Enemy.preload = function(game){
        game.load.spritesheet('beefcake', 'data/img/sprite/beefcake-sheet.png', 128, 128);
        Enemy.enemyGroup = game.add.group();
    };



    return Enemy;
});