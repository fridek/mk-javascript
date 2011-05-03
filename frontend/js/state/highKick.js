var highKick = State.extend({
    init: function () {

    },

    state: "highKick",
		
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
