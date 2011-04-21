var standing = State.extend({
    init: function () {

    },

    state: "standing",
		
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
