"use strict";

const Homey = require('homey');
const cal = require('./calendar').calendar;
const holidayObj = require('./holidayObj').holidayObj;
const moment = require('moment');

var Days = [];

const nlDayOff = new Homey.FlowCardCondition('cond_nl_day_off');
const ukDayOff = new Homey.FlowCardCondition('cond_uk_day_off');
const leapDay = new Homey.FlowCardCondition('cond_leapyear');
const officalHoliday = new Homey.FlowCardCondition("cond_official_nl_holiday");

class holidaysApp extends Homey.App {

  onInit() {

    Days['nl']=getNLDays();
    Days['uk']=getUKDays();

    console.log("Holidays");

    nlDayOff
    .register()
    .registerRunListener(( args, state ) => {
        // console.log('sun event listner');
        // console.log(args);
        // console.log(state);
        console.log('condition');
        console.log(args);
        var hObj = Days['nl'].filter(function(item) {
            return item.id == args.day.id;
        });
        var result = testCondition(args.condition,hObj[0].when);
        console.log(result);
        return Promise.resolve( result );
     })
    .getArgument('day')
    .registerAutocompleteListener(( query, args ) => {
       // console.log('autocomplete trigger');
       // console.log(args);
       var myItems = [];

       // for(var item in nlDays){
       Days['nl'].forEach(function(item){
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

       return Promise.resolve(myItems);
    })

    ukDayOff
    .register()
    .registerRunListener(( args, state ) => {
        // console.log('sun event listner');
        // console.log(args);
        // console.log(state);
        console.log('condition');
        console.log(args);
        var hObj = Days['uk'].filter(function(item) {
            return item.id == args.day.id;
        });
        var result = testCondition(args.condition,hObj[0].when);
        console.log(result);
        return Promise.resolve( result );
     })
    .getArgument('day')
    .registerAutocompleteListener(( query, args ) => {
       // console.log('autocomplete trigger');
       // console.log(args);
       var myItems = [];

       // for(var item in nlDays){
       Days['uk'].forEach(function(item){
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

       return Promise.resolve(myItems);
    })

    leapDay
    .register()
    .registerRunListener(( args, state ) => {
        return Promise.resolve( moment().isLeapYear() );
    })

    officalHoliday
    .register()
    .registerRunListener(( args, state ) => {
        let holiday = false;
        var today = moment().startOf('day');
        OfficialNLHolidays().forEach(function(item){
            if (item.when.isSame(today)) {
                holiday=true;
            }
        });
        return Promise.resolve(holiday);
    })
  }
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

function OfficialNLHolidays()
{
    var items=[];
    items.push(new holidayObj("newyearsDay",cal.newYearsDay()));
    items.push(new holidayObj("goodfriday",cal.goodFriday()));
    items.push(new holidayObj("eastern",cal.eastern()));
    items.push(new holidayObj("easternMonday",cal.easternMonday()));
    items.push(new holidayObj("kingsDay",cal.kingsDay()));
    items.push(new holidayObj("liberationDay",cal.liberationDay()));
    items.push(new holidayObj("ascensionDay",cal.ascensionDay()));
    items.push(new holidayObj("whitSunday",cal.whiteSunday()));
    items.push(new holidayObj("whitMonday",cal.whiteMonday()));
    items.push(new holidayObj("christmasDay",cal.christmasDay()));
    items.push(new holidayObj("secondDayofChristmas",cal.secondDaychristmasDay()));
    //console.log(items);
    return items;   
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
    items.push(new holidayObj("threeKingsDay",cal.threeKingsDay()));
   
    //console.log(items);
    return items;
}

function getUKDays() {
    var items = [];

    items.push(new holidayObj("newYearsEve",cal.newYearsEve()));
    items.push(new holidayObj("newyearsDay",cal.newYearsDay()));
    items.push(new holidayObj("januarySecond",cal.JanuarySecond()));  
    items.push(new holidayObj("stPatricksDay",cal.StPatricksDay));
    items.push(new holidayObj("goodfriday",cal.goodFriday()));
    items.push(new holidayObj("eastern",cal.eastern()));
    items.push(new holidayObj("easternMonday",cal.easternMonday()));
    items.push(new holidayObj("stGeorgesDay",cal.stGeorgesDay()));
    items.push(new holidayObj("earlyMaybBankHoliday",cal.earlyMayBankHoliday()));
    items.push(new holidayObj("springBankHoliday",cal.springBankHoliday()));
    items.push(new holidayObj("battleoftheBoyne",cal.battleoftheBoyne()));
    items.push(new holidayObj("earlySummerBankHoliday",cal.earlySummerBankHoliday()));
    items.push(new holidayObj("summerBankHoliday",cal.summerBankHoliday()));
    items.push(new holidayObj("halloween",cal.halloween()));
    items.push(new holidayObj("guyFawkesNight",cal.guyFawkesNight()));
    items.push(new holidayObj("remembranceDay",cal.remembranceDay()));
    items.push(new holidayObj("stAndrewsDay",cal.stAndrewsDay()));
    items.push(new holidayObj("christmasEve",cal.christmasEve()));
    items.push(new holidayObj("christmasDay",cal.christmasDay()));
    items.push(new holidayObj("secondDayofChristmas",cal.secondDaychristmasDay()));

   
    //console.log(items);
    return items;
}


module.exports = holidaysApp;