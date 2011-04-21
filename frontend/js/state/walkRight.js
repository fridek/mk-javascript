var walkRight = State.extend({
    init: function () {

    },

    state: "walkRight",
		
    lockTime: 100,

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
