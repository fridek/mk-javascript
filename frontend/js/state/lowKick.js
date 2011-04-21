var lowKick = State.extend({
    init: function () {

    },

    state: "lowKick",
		
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
