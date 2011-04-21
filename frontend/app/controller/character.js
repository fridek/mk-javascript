app.core.Object.define("app.controller.Character", {
    extend: app.controller.Object,
    constructor: function (model, view, game, fsm, remote) {
        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor
        this.server = game.server;
		this.fsm = fsm;
		
		this._model = model;
		this._moving = 0; //-1 left, 0 none, 1 right
		this._view = view;
        this.remote = remote;
		
		this._init();
    },
    static: {},
    member: {

		fsm: null,
		server: null,
        remote: false,
		
		characterDOM: null,
		
		_init: function() {
			this.characterDOM = document.createElement('div');
			this.characterDOM.className = "character standing";
			if(this.remote) this.characterDOM.className += " remote left";
			else {this.characterDOM.className += " local";}
            this.characterDOM.id = this._model.id;
			var gameContainer = document.getElementById("gamecontainer");

			gameContainer.appendChild(this.characterDOM);
			
			// TODO: refactoring
			this.characterDOM = $(this.characterDOM); // TODO fixme
			
			window.setTimeout(this.update.bind(this), 10);	
			if (app.controller.Game.INITSERVER) {
				if (this.remote) {
					var character = this;
					this.server.on('message', function(data){
						character.runEvent(data.gameObject.state);
						console.log("recieved from server");
						console.log(data);
					});
				}
			}	
		},

		runEvent: function(state) {
			var prevState = this._model.state;
			
            var status = this.fsm.requestState(state);
			if(status = app.controller.Fsm.CHANGE_OK) {
				//wywolac co trzeba bo stan udalo sie zmienic
				
				//console.log("send new state to server");		
				if (app.controller.Game.INITSERVER) {
					this.server.send({
						msg: "state sent",
						action: state
					});
				}
				this.characterDOM.removeClass(prevState);
				this.characterDOM.addClass(state);
				
				switch(state) {
					case app.event.Object.ALL_STATES.DEFAULT:
					 	break;
					case app.event.Object.ALL_STATES.LEFT:
					case app.event.Object.ALL_STATES.RIGHT:
						this._setupDirection(state);
					 	break;
					case app.event.Object.ALL_STATES.JUMP:
						this._jump();
						this.fsm.queue = prevState;
					 	break;
					case app.event.Object.ALL_STATES.CROUCH:
					 	break;
					case app.event.Object.ALL_STATES.HIGH_PUNCH:
					 	break;
					case app.event.Object.ALL_STATES.LOW_PUNCH:
					 	break;
					case app.event.Object.ALL_STATES.HIGH_KICK:
					 	break;
					case app.event.Object.ALL_STATES.LOW_KICK:
					 	break;
                    case app.event.Object.ALL_STATES.BEING_HIT:
					 	break;
				}			
			};

		},
		
		stopEvent: function(state) {
				switch (state) {
					case app.event.Object.ALL_STATES.LEFT:
					case app.event.Object.ALL_STATES.RIGHT:
						this._moving = 0;
						this.fsm.queue = "standing";
						break;
				}		
		},
		
		_jump: function() {
			var scope = this;
			
			$("#" + this._model.id).animate({top: "-=100"}, 500, 'easeOutQuad', function() {
				$(this).animate({top: "+=100"}, 500, 'easeInQuad', function() {
					scope._view.removeClass(scope._model.id, 'jump');
					scope._view.addClass(scope._model.id, 'standing');
				});
			});
		},

		update: function(model) {
			this._model.posX += this._moving;
			
			if(this._moving == 1) this.fsm.queue = app.event.Object.ALL_STATES.RIGHT;
			if(this._moving == -1) this.fsm.queue = app.event.Object.ALL_STATES.LEFT;
			
			$("#" + this._model.id).css({left: this._model.posX});
			
			window.setTimeout(this.update.bind(this), 10);		
		},

        _setupDirection: function setupDirection(state) {
            if (this._model.directionLeft) {
                this._view.addClass(this._model.id, 'left');
                this._view.removeClass(this._model.id, 'right');
				this._moving = -1;
                //console.log('CHAR: moving left');
            } else {
                this._view.addClass(this._model.id, 'right');
                this._view.removeClass(this._model.id, 'left');
				this._moving = 1;
                //console.log('CHAR: moving right');
            }
        }
	}
});

