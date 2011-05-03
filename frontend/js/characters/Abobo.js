/**
 * Characters.js description here
 *
 * @author fridek
 * @date 21.04.11
 * @version $
 */

var Abobo = Character.extend({
    currentState : IDLE,
    position: 500,
    adversary: "#cvs",
    animations: [  {animation: new $.gameQuery.Animation({	imageURL: "./frontend/images/characters/abobo/abobo_idle_100x121x3.png",
                                numberOfFrame: 3,
                                delta: 100,
                                rate:190,
                                type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_CALLBACK}),
              deltaX: 0, deltaY: 49, width: 100, height: 121},
            {animation: new $.gameQuery.Animation({	imageURL: "./frontend/images/characters/abobo/abobo_walk_forward_94x126x6.png",
                                numberOfFrame: 6,
                                delta: 94,
                                rate:240,
                                type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_CALLBACK}),
               deltaX: 0, deltaY: 44, width: 94, height: 126},
            {animation: new $.gameQuery.Animation({	imageURL: "./frontend/images/characters/abobo/abobo_walk_backward_94x126x6.png",
                                numberOfFrame: 6,
                                delta: 94,
                                rate:240,
                                type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_CALLBACK}),
                deltaX: 0, deltaY: 44, width: 94, height: 126},
            {animation: new $.gameQuery.Animation({	imageURL: "./frontend/images/characters/abobo/abobo_punch_131x170x4.png",
                                numberOfFrame: 4,
                                delta: 131,
                                rate:150,
                                type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_CALLBACK}),
              deltaX: -30, deltaY: 0, width: 131, height: 170},
            {animation: new $.gameQuery.Animation({	imageURL: "./frontend/images/characters/abobo/abobo_kick_137x130x2.png",
                                numberOfFrame: 2,
                                delta: 137,
                                rate:500,
                                type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_CALLBACK}),
              deltaX: 20, deltaY: 40, width: 137, height: 130},
            {animation: new $.gameQuery.Animation({	imageURL: "./frontend/images/characters/abobo/abobo_block_81x130x1.png",
                                rate:700,
                                type: $.gameQuery.ANIMATION_CALLBACK}),
              deltaX: 0, deltaY: 40, width: 81, height: 130},
            {animation: new $.gameQuery.Animation({	imageURL: "./frontend/images/characters/abobo/abobo_hit_108x120x3.png",
                                numberOfFrame: 3,
                                delta: 108,
                                rate:240,
                                type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_CALLBACK}),
              deltaX: 0, deltaY: 50, width: 108, height: 120}],

    init: function (game) {
        this._super(game);
    }
});