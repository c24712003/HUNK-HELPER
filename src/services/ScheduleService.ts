export default class ScheduleService {
    static SetScheduleRule(dayOfWeek: number[] = [], hour: number[] = [], minute: number = 0, second: number = 0): any {
        const schedule = require('node-schedule');
        let rule = new schedule.RecurrenceRule();

        rule.dayOfWeek = dayOfWeek;
        rule.hour = hour;
        rule.minute = minute;
        rule.second = second;

        return rule;
    }
}