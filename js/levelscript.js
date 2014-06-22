define(["globals", "text"], function(globals, Text) {


    var LevelScript = {};
    LevelScript.new = function(game, player) {
        var public = {},
            private = {};

        public.player = player;

        private.dialogue = {};
        private.dialogue.shoot = [
            "Nah.",
            "No.",
            "Stop talking.",
            "I don't care.",
            "Go away.",
            "Uhuh.",
            "Whatever.",
            "Fuck you.",
            "...",
            "Sure.",
            "Silence.",
            "Nope.",
            "Right, right.",
            "Please.",
            "Have a rainbow!",
            ":)",
            "^u^",
            "lol",
            "k"
        ];

        public.getRandomSpeech = function(){
            return private.dialogue.shoot[Math.floor(Math.random()*private.dialogue.shoot.length)];
        };



        private.dialogue.punk = [
            {text: "Hello",                 subtext: "Hello"},
            {text: "What's up?",            subtext: "What's up?"},
            {text: "Oh, cool",              subtext: "Really? I bet you're a dumbass."},
            {text: "Nice.",                 subtext: "HahahahahahahhaHAHAHA"},
            {text: "Thanks.",               subtext: "Fuck you."},
            {text: "Yeah, I love pink.",    subtext: "Yeah, I'm gay."},
            {text: "I like your clothes.",  subtext: "I think your fucking g-string's stupid as shit."} 
        ];
        private.dialogue.buff = [
            {text: "Hey.",                  subtext: "Hey."},
            {text: "Just working out.",     subtext: "Muscles muscules muscles."},
            {text: "Working on my biceps.", subtext: "Muscles muscules."},
            {text: "I like your hair.",     subtext: "Well, your hair's fucking gay."},
            {text: "It has a nice color.",  subtext: "Queer ass cunt bitch."},
            {text: "It's nice.",            subtext: "What a stereotypical color for a punk like you."},
            {text: "Thanks.",               subtext: "Fuck you too, faggot."},
        ];
        
        private.dialogue.punkcount = private.dialogue.buffcount = 0;
        private.dialogue.turntrack = 1;
        public.nextDialogue = function(){
            if (private.dialogue.punkcount == private.dialogue.punk.length ||
                private.dialogue.buffcount == private.dialogue.buff.length)
                console.log("Can't return dialogue");
                return;

            //return punk
            if (private.dialogue.turntrack == 1){
                private.dialogue.turntrack = 2;
                return private.dialogue.punk[private.dialogue.punkcount++];
            }
            //return buff
            else{
                private.dialogue.turntrack = 1;
                return private.dialogue.buff[private.dialogue.buffcount++];
            }
        };

        public.buffEvent = function() {
            //move player, freeze player, center camera
            //every shoot becomes a dialogue. callback on enemy collision
            //callback on player collision too
        };

        public.displayNextBuff = function() {
        };

        public.displayNextMessage = function(originX, originY, color, fadeDirection){
            var testText = Text.new(game, public.getRandomSpeech(), originX, originY,
                { fadeSpeed: 1, fadeOutAfter:.5, fadeDir:fadeDirection, fadeOffset:20, color:color });
        };

        public.displayNextDialogue = function(){
            switch (private.turntrack){
                case 1: //punk
                    private.dialogue.turntrack = 2;
                    var text = Text.new(game, private.dialogue.punk[private.dialogue.punkcount++],
                        originX, originY,
                        { fadeSpeed: 1, fadeOutAfter:.5, fadeDir:fadeDirection, fadeOffset:20, color:color });
                    break;
                case 2: //beef
                    private.dialogue.turntrack = 2;
                    var text = Text.new(game, private.dialogue.beef[private.dialogue.punkcount++],
                        originX, originY,
                        { fadeSpeed: 1, fadeOutAfter:.5, fadeDir:fadeDirection, fadeOffset:20, color:color });
                    break;
                default:
                    break;
            }
            var text =   Text.new(game, public.getRandomSpeech(), originX, originY,
                { fadeSpeed: 1, fadeOutAfter:.5, fadeDir:fadeDirection, fadeOffset:20, color:color });
        };

        return public;
    };

    return LevelScript
});
