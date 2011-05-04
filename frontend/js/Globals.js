/**
 * Remove it ASAP!
 *
 * @author fridek
 * @date 21.04.11
 * @version $
 */

var PLAYGROUND_WIDTH = 800,
    PLAYGROUND_HEIGHT = 200,
    // possible move;
    STATES = {
        IDLE:          "idle",
        WALK_FORWARD:  "walk_forward",
        WALK_BACKWARD: "walk_backward",
        PUNCH:         "punch",
        KICK:          "kick",
        BLOCK:         "block",
        BEATEN:        "beaten"
    },
    //constantes:
    NEAR=         100;
