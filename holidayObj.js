const Homey = require('homey');
const moment = require("moment");


const holidayObj = function(id,when) {
    const self = this;

    var obj = {}
    obj.id=id;
    obj.text = Homey.__(id);
    obj.when = when;

    return obj;
}

exports.holidayObj = holidayObj;