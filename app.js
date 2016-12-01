"use strict";

const cal = require('./calendar').calendar;
const holidayObj = require('./holidayObj').holidayObj;
const moment = require('moment');

var nlDays = [];

function init() {

    nlDays=getNLDays();

    Homey.log("Holidays");

    Homey.manager('flow').on('condition.cond_nl_day_off.day.autocomplete', function(callback, args) {
        // console.log('autocomplete');
        // console.log(args);

        var myItems = [];

       // for(var item in nlDays){
       nlDays.forEach(function(item){
            var e = {};
        	e.name = item.text;
        	e.id = item.id;
        	myItems.push(e);
        });

        myItems.sort(function(a,b){
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;            
        })

        callback(null, myItems); // err, results
    });

    Homey.manager('flow').on('condition.cond_nl_day_off', function(callback, args) {
        Homey.log('condition');
        Homey.log(args);
        var hObj = nlDays.filter(function(item) {
            return item.id == args.day.id;
        });
        var result = testCondition(args.condition,hObj[0].when);
        Homey.log(result);
        callback(null, result );
    });

    Homey.manager('flow').on('condition.cond_leapyear', function(callback, args) {
        callback(null, cal.leapYear());
    });
}

function testCondition(condition, matchDate) {
        var today = moment().startOf('day');
		switch (condition) {
		case '>': return matchDate.isAfter(today);
		case '<': return matchDate.isBefore(today);
		case '>=': return matchDate.isSameOrAfter(today);
		case '<=': return matchDate.isSameOrBefore(today);
		case '==': return matchDate.isSame(today);
		case '!=': return !matchDate.isSame(today);
		default:
			console.log(condition);
            throw new Error('Illegal condition');
		}
}


function getNLDays() {
    var items = [];

    items.push(new holidayObj("newyearsDay",cal.newYearsDay()));
    items.push(new holidayObj("eastern",cal.eastern()));
    items.push(new holidayObj("easternMonday",cal.easternMonday()));
    items.push(new holidayObj("goodfriday",cal.goodFriday()));
    items.push(new holidayObj("kingsDay",cal.kingsDay()));
    items.push(new holidayObj("remembranceDay",cal.remembranceDay()));
    items.push(new holidayObj("liberationDay",cal.liberationDay()));
    items.push(new holidayObj("ascensionDay",cal.ascensionDay()));
    items.push(new holidayObj("carnaval",cal.carnival()));
    items.push(new holidayObj("whitSunday",cal.whiteSunday()));
    items.push(new holidayObj("whitMonday",cal.whiteMonday()));
    items.push(new holidayObj("sinterklaas",cal.stNicholasEve()));
    items.push(new holidayObj("stNicholasDay",cal.stNicholasDay()));
    items.push(new holidayObj("christmasEve",cal.christmasEve()));
    items.push(new holidayObj("christmasDay",cal.christmasDay()));
    items.push(new holidayObj("secondDayofChristmas",cal.secondDaychristmasDay()));
    items.push(new holidayObj("newYearsEve",cal.newYearsEve()));
    items.push(new holidayObj("mothersDay",cal.mothersDay()));
    items.push(new holidayObj("fathersDay",cal.fathersDay()));
    items.push(new holidayObj("animalDay",cal.animalDay()));
    items.push(new holidayObj("valentinDay",cal.valentinDay()));
    items.push(new holidayObj("startSummerTime",cal.startSummerTime()));
    items.push(new holidayObj("startWinterTime",cal.startWinterTime()));
   
    //console.log(items);
    return items;
}


module.exports.init = init;