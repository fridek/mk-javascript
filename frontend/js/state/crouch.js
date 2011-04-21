var crouch = State.extend({
    init: function () {

    },

    state: "crouch",
		
    lockTime: 500,

    possibleTransitions: [
        'walkRight',
        'walkLeft',
        //'jump',
        'crouch',
        'highPunch',
        'lowPunch',
        'highKick',
        'lowKick'
    ]
});
