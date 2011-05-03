app.core.Object.define("app.controller.Game", {
    extend: app.controller.Object,
    constructor: function (model, view) {
        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor
    },
    static: {
		INITSERVER: false
	},
    member: {
		arena: null,
		character: null,
        character2: null,
		server: null,
		
		pressedKeys: [],
		
		input: null,

		run: function() {
			this.arena = new app.controller.Arena(new app.model.Arena(), new app.view.Arena());
			this.arena.drawBackground();

            if(app.controller.Game.INITSERVER) this._initServer();


            // create all players
            var playerId = 1

            var fsm = new app.controller.Fsm(new app.model.Fsm());
            this.character = new app.controller.Character(new app.model.Character('character' + playerId++, false), new app.view.Character(), this, fsm, false);
            fsm.setCharacter(this.character);

            var fsm2 = new app.controller.Fsm(new app.model.Fsm());
            this.character2 = new app.controller.Character(new app.model.Character('character' + playerId++, true), new app.view.Character(), this, fsm2, true);
            fsm2.setCharacter(this.character2);


			this.bindInput();
		},

		_initServer: function() {
			var server = new io.Socket('192.168.0.114', {port: 3000});
			server.connect();
			
			server.on('connect', function() {
				console.log("send to server on connect");
			});	
			this.server = server;
		},

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

		bindInput: function() {
			var scope = this;
			
			this.logKeyboard();

			$(window).keydown(function(event) {

			  var key = event.keyCode;

			  if(key >= 37 && key <= 40) {event.preventDefault();}

			  scope.input = new app.event.Keyboard(event);
			  var code = scope.input.getCode();
			  
			  // false if event is not binded to any action
			  if (code) {
			  	scope.pressedKeys[key] = true;
			  	scope.character.runEvent(code);
			  }
			});
			
			$(window).keyup(function(event) {
				var key = event.keyCode;
				
				scope.input = new app.event.Keyboard(event);
				var code = scope.input.getCode();
				// false if event is not binded to any action
				if (code) {
					scope.pressedKeys[key] = false;
					scope.character.stopEvent(code);
				}
			});
		}
	}
});
