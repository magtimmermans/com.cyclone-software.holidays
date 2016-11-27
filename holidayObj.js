const moment = require("moment");


const holidayObj = function(id,when) {
    const self = this;

    var obj = {}
    obj.id=id;
    obj.text = __(id);
    obj.when = when;

    return obj;
}

exports.holidayObj = holidayObj;