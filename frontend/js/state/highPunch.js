var highPunch = State.extend({
    init: function () {

    },

    state: "highPunch",

    lockTime: 1000,

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
