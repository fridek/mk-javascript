/**
 * Characters.js description here
 *
 * @author fridek
 * @date 21.04.11
 * @version $
 */

var Cvs = Character.extend({
    currentState : IDLE,
    position: 250,
    adversary: "#abobo",
    animations: [ {animation: new $.gameQuery.Animation({	imageURL: "./images/characters/cvs/cvs_idle_59x106x6.png",
                                numberOfFrame: 6,
                                delta: 59,
                                rate:240,
                                type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_CALLBACK}),
            deltaX: 0, deltaY: 0, width: 59, height: 106},
        {animation: new $.gameQuery.Animation({	imageURL: "./images/characters/cvs/cvs_walk_forward_58x106x5.png",
                                numberOfFrame: 5,
                                delta: 58,
                                rate:240,
                                type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_CALLBACK}),
            deltaX: 0, deltaY: 0, width: 58, height: 106},
        {animation: new $.gameQuery.Animation({	imageURL: "./images/characters/cvs/cvs_walk_backward_58x106x5.png",
                                numberOfFrame: 5,
                                delta: 58,
                                rate:240,
                                type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_CALLBACK}),
            deltaX: 0, deltaY: 0, width: 58, height: 106},
        {animation: new $.gameQuery.Animation({	imageURL: "./images/characters/cvs/cvs_punch_120x104x6.png",
                                numberOfFrame: 6,
                                delta: 120,
                                rate:120,
                                type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_CALLBACK}),
            deltaX: 0, deltaY: 2, width: 120, height: 104},
        {animation: new $.gameQuery.Animation({	imageURL: "./images/characters/cvs/cvs_kick_156x106x9.png",
                                numberOfFrame: 9,
                                delta: 156,
                                rate:90,
                                type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_CALLBACK}),
            deltaX: -20, deltaY: 0, width: 156, height: 106},
        {animation: new $.gameQuery.Animation({	imageURL: "./images/characters/cvs/cvs_block_69x99x2.png",
                                numberOfFrame: 2,
                                delta: 69,
                                rate:480,
                                type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_CALLBACK}),
            deltaX: 0, deltaY: 7, width: 69, height: 99},
        {animation: new $.gameQuery.Animation({	imageURL: "./images/characters/cvs/cvs_hit_59x103x1.png",
                                rate: 720,
                                type: $.gameQuery.ANIMATION_CALLBACK}),
            deltaX: 0, deltaY: 3, width: 59, height: 103}],


    init: function () {
        
    }
});