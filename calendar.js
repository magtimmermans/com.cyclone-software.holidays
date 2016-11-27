const moment = require('moment');


var calendar = {
    year: (new Date()).getFullYear(),
    newYearsDay: function() {
        return moment({ y: this.year, M: 0, d: 1 });
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
    fathersDay: function() {
        return moment([this.year,5,7]).day(14);
    },
    animalDay: function() {
        return moment([this.year,9,4]);
    },
    leapYear: function() {
        return moment([this.year]).isLeapYear();
    },
    valentinDay: function() {
        return moment([this.year,1,14]);
    }

}

exports.calendar = calendar;