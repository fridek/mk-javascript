var beingHit = State.extend({
    init: function () {

    },

    state: "beingHit",

    lockTime: 0,

    possibleTransitions: [
        'walkRight',
        'walkLeft',
        'jump',
        'crouch',
        'highPunch',
        'lowPunch',
        'highKick',
        'lowKick'
    ]
});
