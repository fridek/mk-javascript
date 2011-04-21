var walkLeft = State.extend({
    init: function () {

    },

    state: "walkLeft",
		
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
