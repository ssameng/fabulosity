define([], function(){
    var globals = {};
    globals.direction = {
        up         : 1,
        down       : 2,
        left       : 3,
        right      : 4,
        stationary : 5
    };


    globals.GRAVITY = 700;
    return globals;
});

