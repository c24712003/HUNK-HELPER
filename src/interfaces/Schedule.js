"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScheduleService_1 = require("../services/ScheduleService");
const schedule = require('node-schedule');
class Schedule {
    constructor() {
        this.days = [];
        this.hours = [];
        this.minute = 0;
        this.second = 0;
    }
    run() {
        let rule = ScheduleService_1.default.SetScheduleRule(this.days, this.hours, this.minute, this.second);
        schedule.scheduleJob(rule, () => {
            this.doThing();
        });
    }
    doSomeThing() { }
}
exports.default = Schedule;
//# sourceMappingURL=Schedule.js.map