define(["globals"], function(globals) {


    var LevelScript = {};
    LevelScript.new = function(game, player) {
        var public = {},
            private = {};

        
        
        private.dialogue = {};
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
            console.log("Trying");
            
            if (private.dialogue.punkcount == private.dialogue.punk.length ||
                private.dialogue.buffcount == private.dialogue.buff.length)
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
        }

        return public;
    };

    return LevelScript
});
