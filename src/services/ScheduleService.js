"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScheduleService {
    static SetScheduleRule(dayOfWeek = [], hour = [], minute = 0, second = 0) {
        const schedule = require('node-schedule');
        let rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = dayOfWeek;
        rule.hour = hour;
        rule.minute = minute;
        rule.second = second;
        return rule;
    }
}
exports.default = ScheduleService;
//# sourceMappingURL=ScheduleService.js.map