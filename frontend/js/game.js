var Game = Class.extend({
    // this is a methods that returns a random element from the given array
    or: function (choice){
        return choice[Math.round(Math.random()*(choice.length-1))];
    },

    // return the distance between the opponents
    distance: function (a, b){
        return Math.abs(a.position().left-b.position().left);
    },

    nextMove: function (level, a, b){
        if(Math.random() > level){
            return this.or([STATES.WALK_FORWARD, STATES.IDLE, STATES.WALK_BACKWARD, STATES.BLOCK, STATES.PUNCH]);
        }
        switch(b.data("fighter").currentState){
            // if the adversary is idle or moves away from us we get near him or attack ihm
            case STATES.IDLE:
            case STATES.WALK_BACKWARD:
            case STATES.BLOCK:
                if(this.distance(a,b) < NEAR){
                    return this.or([STATES.KICK, STATES.PUNCH, STATES.WALK_BACKWARD]);
                } else {
                    return this.or([STATES.WALK_FORWARD, STATES.IDLE]);
                }
                break;
            // if the adversary moves toward us we get away or attack ihm
            case STATES.WALK_FORWARD:
                if(this.distance(a,b) < NEAR){
                    return this.or([STATES.KICK, STATES.PUNCH, STATES.WALK_BACKWARD]);
                } else {
                    return this.or([STATES.WALK_FORWARD, STATES.IDLE]);
                }
                break;
            // if we are under attack we either block go back or try to fight back
            case STATES.PUNCH:
            case STATES.KICK:
                return this.or([STATES.BLOCK, STATES.PUNCH, STATES.KICK, STATES.IDLE]);
                break;
            // if beaten we block or go back
            case STATES.BEATEN:
                return this.or([STATES.BLOCK, STATES.WALK_BACKWARD, STATES.IDLE]);
                break;
        }
    },

    animate: function (sprite){
        var sprite = $$("#" + sprite.id),
        fighter = sprite.data("fighter"),
        adversary = $(fighter.adversary),
        adversaryFighter = adversary.data("fighter");

        var nextState = this.nextMove(0.8, sprite, adversary);

        this.changeAnimation(sprite, fighter.animations, nextState, fighter.currentState);

        if(nextState == STATES.PUNCH || nextState == STATES.KICK){
            sprite.css("z-index", 20);
            window.setTimeout(function() {fighter.attacking = true;}, 300);
        } else if(fighter.currentState == STATES.PUNCH || fighter.currentState == STATES.KICK){
            fighter.attacking = false;
            sprite.css("z-index", undefined);
        }

        fighter.currentState = nextState;
    },

    playerAnimate: function (sprite){
        var sprite = $$("#" + sprite),
        fighter = sprite.data("fighter"),
        adversary = $(fighter.adversary),
        adversaryFighter = adversary.data("fighter");

        var nextState = this.input.getState();

        if(fighter.currentState == nextState) {return; }

        this.changeAnimation(sprite, fighter.animations, nextState, fighter.currentState);

        if(nextState == STATES.PUNCH || nextState == STATES.KICK){
            sprite.css("z-index", 20);
            window.setTimeout(function() {fighter.attacking = true;}, 300);
        } else if(fighter.currentState == STATES.PUNCH || fighter.currentState == STATES.KICK){
            sprite.css("z-index", undefined);
            fighter.attacking = false;
        }

        fighter.currentState = nextState;
    },

    scrollStage: function (offset) {

        if(offset > 50){
            offset = 50;
        } else if(offset < -50) {
            offset = -50;
        }
        $$("#foreground").css("left", ""+(-800 + offset/0.5)+"px");

        $$("#ground").css("left", ""+(-300 + offset)+"px");
        $$("#fighters").css("left", ""+ offset +"px");

        $$("#background1").css("left", ""+(50 + offset/2)+"px");
        $$("#background2").css("left", ""+(30 + offset/4)+"px");
        $$("#background3").css("left", ""+(90 + offset/5)+"px");

    },

    /*replace with new*/
    changeAnimation: function(sprite, animationArry, newAnimation , oldAnimation){
        sprite
            .setAnimation(animationArry[newAnimation].animation)
            .width(animationArry[newAnimation].width)
            .height(animationArry[newAnimation].height)
            .css("top",  sprite.position().top  + animationArry[newAnimation].deltaY - animationArry[oldAnimation].deltaY)
            .css("left", sprite.position().left + animationArry[newAnimation].deltaX - animationArry[oldAnimation].deltaX);
    },

    stop: function () {
        var winner = $$("#cvs").data("fighter").health?"Player":"Computer";
        $.gameQuery.resourceManager.refresh = function() {};
        $.gameQuery.resourceManager.running = false;
        $$("#playground").html('<h1 id="win">' + winner + ' wins!</div>');
    },

    init: function () {
        var that = this;

        this.input = new Input();

        // the game
        $$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, refreshRate: 30, keyTracker: true});

        //Playground Sprites
        var foreground 	= new $.gameQuery.Animation({imageURL: "./images/levels/foreground.png", type: $.gameQuery.ANIMATION_VERTICAL});
        var ground 		= new $.gameQuery.Animation({imageURL: "./images/levels/ground.png"});
        var background1 = new $.gameQuery.Animation({imageURL: "./images/levels/background1.png"});
        var background2 = new $.gameQuery.Animation({imageURL: "./images/levels/background2.png"});
        var background3 = new $.gameQuery.Animation({imageURL: "./images/levels/background3.png"});
        $.playground()
            .addSprite(	"background3",
                        {posx: 90, posy: 0,
                         height: 200, width: 534,
                         animation: background3})
            .addSprite(	"background2",
                        {posx:30, posy: -50,
                         height: 180, width: 432,
                         animation: background2})
            .addSprite(	"background1",
                        {posx:50, posy: -150,
                         height: 317, width: 749,
                         animation: background1})
            .addSprite(	"ground",
                        {posx: -300, posy: 0,
                         height: 200, width: 1493,
                         animation: ground}).addGroup("fighters").end()
            .addSprite(	"foreground",
                        {posx:-800, posy: 165,
                         height: 44, width: 2000,
                         animation: foreground});
        $$("#sceengraph").css("background-color","#121423");

        $$("#playground").append('<div class="healthbar" id="player1_healthbar"><div class="innerHealthbar"></div></div>');
        $$("#playground").append('<div class="healthbar" id="player2_healthbar"><div class="innerHealthbar"></div></div>');

        var cvs = new Cvs(that);
        $$("#fighters").addSprite("cvs",
                            {posx: 250,
                             posy: 70,
                             height: 106,
                             width: 58,
                             animation: cvs.animations[STATES.IDLE].animation,
                             geometry: $.gameQuery.GEOMETRY_RECTANGLE
                            });
        $$("#cvs").data("fighter", cvs);
        cvs.dom = $$('#cvs');
        cvs.healthBar = $("#player1_healthbar .innerHealthbar");

        var abobo = new Abobo(that);
        $$("#fighters").addSprite("abobo",
                                    {posx: 550,
                                     posy: 60,
                                     height: 121,
                                     width: 100,
                                     animation: abobo.animations[STATES.IDLE].animation,
                                     geometry: $.gameQuery.GEOMETRY_RECTANGLE,
                                     callback: function (sprite) {that.animate.apply(that,[sprite])}
                                    });
        $$("#abobo").data("fighter", abobo);
        abobo.dom = $$("#abobo");
        abobo.healthBar = $("#player2_healthbar .innerHealthbar");

        var prevState = 0;
        $.playground().registerCallback(function(){
            that.input.processEvent();
        }, 30);
        
        $.playground().registerCallback(function(){
            var cvs = $("#cvs");
            var cvsF = cvs.data("fighter");
            var cvsLeft = cvs.position().left;

            var abobo = $("#abobo");
            var aboboF = abobo.data("fighter");
            var aboboLeft = abobo.position().left;

            that.playerAnimate.apply(that,["cvs"]);


            //hit?
            if(cvsLeft+cvsF.animations[cvsF.currentState].width - 2 > aboboLeft){
                if((cvsF.attacking) && aboboF.currentState != STATES.BEATEN){
                    if (aboboF.attacking) {
                        cvsF.attacking = false;
                        aboboF.beaten();
                        aboboF.attacking = false;
                        cvsF.beaten();
                    } else {
                        cvsF.attacking = false;
                        aboboF.beaten();
                    }
                } else if ((aboboF.attacking) && cvsF.currentState != STATES.BEATEN) {
                    aboboF.attacking = false;
                    cvsF.beaten();
                }
            }

            //Move


            if(cvsF.currentState == STATES.WALK_FORWARD){
                if((cvsLeft+cvsF.animations[cvsF.currentState].width+2) < aboboLeft){
                    cvs.css("left", cvsLeft+2);
                }
            } else if ((cvsLeft > 50) && (cvsF.currentState == STATES.WALK_BACKWARD)){
                cvs.css("left", cvsLeft-2)
            }

            if(aboboF.currentState == STATES.WALK_FORWARD){
                if((cvsLeft+cvsF.animations[cvsF.currentState].width+2) < aboboLeft){
                    abobo.css("left", aboboLeft - 2);
                }
            } else if ((aboboLeft < 650) && (aboboF.currentState == STATES.WALK_BACKWARD)){
                abobo.css("left", aboboLeft + 2);
            }

            var al = abobo.position().left - aboboF.animations[aboboF.currentState].deltaX;
            var cl = cvs.position().left - cvsF.animations[cvsF.currentState].deltaX;

            var centerPos = (al - cl)/2 + cl;
            that.scrollStage(-(centerPos-400)*0.5);

            return false;
            
	    }, 30);

        //start loading!
        $().setLoadBar("loadingBar", 600);
        //initialize the start button
        $.playground().startGame(function(){
            $("#welcomMessage").fadeOut(2000, function(){$(this).remove()});
        });
    }
});
