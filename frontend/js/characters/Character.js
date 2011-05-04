/**
 * Characters.js description here
 *
 * @author fridek
 * @date 21.04.11
 * @version $
 */

var Character = Class.extend({
    game: null,
    dom: null,

    healthBar: null,
    health: 100,

    updateHealthBar: function () {
        this.healthBar.width(this.health * 2);
    },

    beaten: function () {
        this.game.changeAnimation(this.dom, this.animations, STATES.BEATEN, this.currentState);
        this.currentState = STATES.BEATEN;

        this.health -= 5;
        if(this.health <= 0) {this.game.stop(); }

        this.updateHealthBar();
    },

    init: function (game) {
        this.game = game;
    }
});