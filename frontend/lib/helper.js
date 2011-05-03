var $$ = function (selector) {
    if($$.members[selector]) {return $$.members[selector];}
    $$.members[selector] = $(selector);
    return $$.members[selector];
};
$$.refresh = function (selector) {
    $$.members[selector] = false;
    return $$(selector);
};
$$.members = {};

if (!Function.prototype.bind) {
    Function.prototype.bind = function (ctx /* ... */) {
        var that  = this;
        var slice = Array.prototype.slice;
        var args  = slice.call(arguments, 1);

        var fn = function () {
            return that.apply(ctx, args.concat(slice.call(arguments)));
        };

        return fn;
    };
}

if (!Object.create) {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}

if (!String.prototype.ucfirst) {
    String.prototype.ucfirst = function () {
        return this.charAt(0).toUpperCase() + this.substr(1);
    }
}
