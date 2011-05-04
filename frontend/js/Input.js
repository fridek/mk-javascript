var Input = Class.extend({

    pressedKeys: [],
    _eventCode: STATES.IDLE,
    _eventType: null,

    logKeyboard: function() {
        var str = "--== keyboard states ==--\n";
        for(var i = 0; i < this.pressedKeys.length; i++) {
            if (this.pressedKeys[i] === false || this.pressedKeys[i] === true) {
                str += i + ": " + this.pressedKeys[i] + "\n";
            }
        }
        console.log(str);
        window.setTimeout(this.logKeyboard.bind(this), 3000);
    },

    init: function() {
        var that = this;

        this.logKeyboard();

        $(window).keydown(function(event) {
            var key = event.keyCode;
            if(key >= 37 && key <= 40) {event.preventDefault();}
            that.pressedKeys[key] = true;
        });

        $(window).keyup(function(event) {
            var key = event.keyCode;
            that.pressedKeys[key] = false;
        });
    },


    processEvent: function () {
        this._eventCode = STATES.IDLE;

        if(this.pressedKeys[37]) {
            this._eventCode = STATES.WALK_BACKWARD;
        }
        if(this.pressedKeys[39]) {
            this._eventCode = STATES.WALK_FORWARD;
        }
        if(this.pressedKeys[87]) {
            this._eventCode = STATES.PUNCH;
        }
        if(this.pressedKeys[83]) {
            this._eventCode = STATES.PUNCH;
        }
        if(this.pressedKeys[81]) {
            this._eventCode = STATES.KICK;
        }
        if(this.pressedKeys[65]) {
            this._eventCode = STATES.KICK;
        }

            /*case 38:
                eventCode = app.event.Object.ALL_STATES.JUMP;
                break;
            */

//            case 40:
//                eventCode = app.event.Object.ALL_STATES.CROUCH;
//                break;
    },

    getType: function () {
        return this._eventType;
    },

    getState: function () {
        return this._eventCode;
    }
});
