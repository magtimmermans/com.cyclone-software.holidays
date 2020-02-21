const moment = require('moment');


var calendar = {
    year: (new Date()).getFullYear(),
    newYearsDay: function() {
        return moment({ y: this.year, M: 0, d: 1 });
    },
    JanuarySecond: function() {
        return moment({ y: this.year, M: 0, d: 2 });
    },
    StPatricksDay: function() {
        return moment({ y: this.year, M: 2, d: 17 });
    },
    earlyMayBankHoliday: function() {
        return moment([this.year, 4, 6]).day(1); // first monday in may
    },
    springBankHoliday: function() {
        return moment([this.year, 4, 29]).day(1); // last monday in may
    },
    stGeorgesDay: function() {
        return moment([this.year, 3, 23]); 
    },
    battleoftheBoyne : function() {
        return moment([this.year, 6, 12]); 
    },
    earlySummerBankHoliday: function() {
        return moment([this.year, 7, 6]).day(1); // first monday in may
    },
    summerBankHoliday: function() {
        return moment([this.year, 7, 30]).day(1); // last monday in may
    },
    guyFawkesNight: function() {
        return moment([this.year, 10, 5]); 
    },
    remembranceSunday: function() {
        return moment([this.year, 10, 14]).day(0);
    },
    stAndrewsDay: function() {
        return moment([this.year, 10, 30])
    },
    halloween: function() {
        return moment([this.year, 9, 31])
    },
    halloweenBe: function() {
        return moment([this.year, 10, 31])
    },
    threeKingsDay: function() {
        return moment([this.year, 1, 6])
    },
    eastern: function() {
        var C = Math.floor(this.year / 100);
        var N = this.year - 19 * Math.floor(this.year / 19);
        var K = Math.floor((C - 17) / 25);
        var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
        I = I - 30 * Math.floor((I / 30));
        I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
        var J = this.year + Math.floor(this.year / 4) + I + 2 - C + Math.floor(C / 4);
        J = J - 7 * Math.floor(J / 7);
        var L = I - J;
        var M = 3 + Math.floor((L + 40) / 44);
        var D = L + 28 - 31 * Math.floor(M / 4);
        return moment({ y: this.year, M: M - 1, d: D });
    },
    easternMonday: function() {
        return moment(this.eastern()).add(1, "d");
    },
    ascensionDay: function() {
        return moment(this.eastern()).add(39, "d");
    },
    kingsDay: function() {
        return moment({ y: this.year, M: 3, d: 27 });
    },
    remembranceDay: function() {
        return moment({ y: this.year, M: 4, d: 4 });
    },
    laborDay: function() {
        return moment({ y: this.year, M: 4, d: 1 });
    },
    liberationDay: function() {
        return moment({ y: this.year, M: 4, d: 5 });
    },
    goodFriday: function() {
        return moment(this.eastern()).add(-2, "d")
    },
    carnival: function() {
        return moment(this.eastern()).add(-7, "w")
    },
    carnivalEnd: function() {
        return moment(this.eastern()).add(-7, "w").add(2, "d");
    },
    whiteSunday: function() {
        return moment(this.eastern()).add(7, "w");
    },
    whiteMonday: function() {
        return moment(this.whiteSunday()).add(1, "d");
    },
    stNicholasEve: function() {
        return moment({ y: this.year, M: 11, d: 5 });
    },
    stNicholasDay: function() {
        return moment({ y: this.year, M: 11, d: 6 });
    },
    christmasEve: function() {
        return moment({ y: this.year, M: 11, d: 24 });
    },
    christmasDay: function() {
        return moment([this.year, 11, 25]);
    },
    secondDaychristmasDay: function() {
        return moment({ y: this.year, M: 11, d: 26 });
    },
    newYearsEve: function() {
        return moment({ y: this.year, M: 11, d: 31 });
    },
    independenceDay: function() {
        return moment({ y: this.year, M: 6, d: 4 });
    },
    mothersDay: function() {
        return moment([this.year,4,7]).day(7);
    },
    mothersDayNorway: function() {
        return moment([this.year, 1, 6]).day(7);
    },
    mothersDayBe: function() {
        return moment({ y: this.year, M: 5, d: 10 });
    },
    mothersDayBeAntwerp: function() {
        return moment({ y: this.year, M: 8, d: 15 });
    },
    fathersDay: function() {
        return moment([this.year,5,7]).day(14);
    },
    fathersDayNorway: function() {
        return moment([this.year,10,6]).day(7);
    },
    fathersDayBe: function() {
        return moment({ y: this.year, M: 6, d: 14 });
    },
    fathersDayBeAntwerp: function() {
        return moment({ y: this.year, M: 3, d: 19 });
    },
    animalDay: function() {
        return moment([this.year,9,4]);
    },
    leapYear: function() {
        return moment([this.year]).isLeapYear();
    },
    valentinDay: function() {
        return moment([this.year,1,14]);
    },
    startSummerTime: function() {
        return moment([this.year,3,7]).day(-7);
    },
    startWinterTime: function() {
        return moment([this.year,10,7]).day(-7);
    },
    sintOlafNorway: function() {
        return moment([this.year,6,29]).day(-7);
    },
    constitutionDayNorway: function() {
        return moment([this.year,4,17]);
    },
    belgianNationalDay: function() {
        return moment({ y: this.year, M: 7, d: 21 });
    },
    labourDay: function() {
        return moment({ y: this.year, M: 5, d: 1 });
    },
    assumptionofMaryDay: function() {
        return moment({ y: this.year, M: 8, d: 15 });
    },
    allSaintsDay: function() {
        return moment({ y: this.year, M: 11, d: 1 });
    },
    armisticeDay: function() {
        return moment({ y: this.year, M: 11, d: 11 });
    },
    flemishDay: function() {
        return moment({ y: this.year, M: 7, d: 11 });
    },
    allSoulsDay: function() {
        return moment({ y: this.year, M: 11, d: 2 });
    },
    dynastyDay: function() {
        return moment({ y: this.year, M: 11, d: 15 });
    },
    walloonDay: function() {
        return moment({ y: this.year, M: 9, d: 27 });
    },
    germanDay: function() {
        return moment({ y: this.year, M: 11, d: 15 });
    },
    brusselsDay: function() {
        return moment({ y: this.year, M: 5, d: 8 });
    },
    stNicholasDayBe: function() {
        return moment({ y: this.year, M: 12, d: 6 });
    },
    stMaarten: function() {
        return moment({ y: this.year, M: 11, d: 11 });
    },
    testTime: function() {
        return moment([this.year,5,5]);
    }     

}

exports.calendar = calendar;