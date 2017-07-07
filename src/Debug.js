'use strict';

var Debug = {
    enable: false,
    log: function ($var, $label) {
        if (this.enable == false) {
            return;
        }
        if (typeof $label != 'undefined') {
            console.log([$label, $var]);
        } else {
            console.log($var);

        }
    }
};

module.exports = Debug;