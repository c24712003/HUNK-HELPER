import scheduleService from '../services/ScheduleService'

const schedule = require('node-schedule');

export default abstract class Schedule {
    protected days: number[] = [];
    protected hours: number[] = [];
    protected minute: number = 0;
    protected second: number = 0

    public run() {
        let rule = scheduleService.SetScheduleRule(this.days, this.hours, this.minute, this.second);
        schedule.scheduleJob(rule, () => {
            this.doThing();
        });
    }

    protected abstract doThing();

    protected doSomeThing() { }
}