var lowPunch = State.extend({
    init: function () {

    },

    state: "lowPunch",
		
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
