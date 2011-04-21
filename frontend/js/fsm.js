var Fsm = Class.extend({
    init: function () {

    },
    
    BUSY: 1,
    CHANGE_OK: 2,
    QUEUED: 3,

    lock: false,

    character: null,

    currentState: "init",

    _states: {},

    queue: null,

    setCharacter: function(character) {
        this.character = character;
    },

    processQueue: function() {
        //console.log("Queue processing");
        //console.log(this.queue);
        if(this.queue != null) {
            this.character.runEvent(this.queue);
            this.queue = null;
            return false;
        }
        return true;
    },

    _loadStates: function() {
        var ALL_STATES = ALL_STATES;

        for (var i in ALL_STATES) {
            var str = 'this._states.' + ALL_STATES[i] + ' = new app.model.state.' + ALL_STATES[i] + '()';
            eval(str);
        }
    },

    init: function() {
        var ALL_STATES = ALL_STATES;
        var counter = 0;
        //tutaj inicjalizacje wszystkich stanow
        var lastScript = document.getElementsByTagName("script");
        for(var i in ALL_STATES){
            counter++;
            var script = document.createElement("script");
            script.type = 'text/javascript';
            script.src = "js/state/state/" + ALL_STATES[i] + ".js";
            script.scope = this;
            script.onload = function() {
                counter--;
                if(counter == 0){
                    //all scripts loaded
                    this.scope._loadStates();
                }
            };
            lastScript[0].parentNode.appendChild(script);
        }

    },

    _lock: function(time, nextState) {
        this.lock = true;
        setTimeout(app.model.state.prototype.deactivate.bind(this._states[nextState], this), time);
    },

    requestState: function(newState) {
        //console.log('FSM: requested state: ' + newState);
        if (this.lock) {
            if(this._states[this.currentState].queueingAllowed) {
                //console.log('FSM: busy, state queued. Current state: ' + this.currentState);
                this.queue = newState;
                return this.QUEUED;
            }
            else {
                //console.log('FSM: busy, no change. Current state: ' + this.currentState);
                return this.BUSY;
            }
        }

        //console.log('FSM: ok, change. Previous state: ' + this.currentState + ', new state: ' + newState);
        this._states[newState].activate(this);
        //this._states[this.currentState].deactivate(this);
        this.currentState = newState;
        $$('#log').html('Current state: ' + this.currentState);

        this.character._model.state = newState;

        // todo refactor this
        if (newState == ALL_STATES.LEFT) {
            this.character._model.directionLeft = true;
        } else if (newState == ALL_STATES.RIGHT) {
            this.character._model.directionLeft = false;
        }

        return app.controller.Fsm.CHANGE_OK;
    },

    getState: function() {
        return this.currentState;
    },

    forceState: function(newState) {
        //console.log("forced state: " + newState);
        this.lock = false;
        this.character.runEvent(newState);
    }

});
