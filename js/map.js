define(function() {
    var Map = {};
    Map.new = function (map, layers) {
        var public = {},
            private = {
                map: map,
                layers: layers,
            };

        public.collide = function(game, player) {
            game.physics.arcade.collide(player, private.layers.collision);
        };

        return public;
    };

    return Map;
});
