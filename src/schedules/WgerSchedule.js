"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const Schedule_1 = require("../interfaces/Schedule");
const WgerService_1 = require("../services/WgerService");
class WgerSchedule extends Schedule_1.default {
    constructor() {
        super(...arguments);
        this.days = [1, 2, 3, 4, 5, 6, 7];
        this.hours = [22];
    }
    doThing() {
        const s = new WgerService_1.default();
        s.getScheduleIsStartOrIsEnd().then(rep => {
            !rep.isEnd ? (rep.isStart ? s.getAllWorkout(config_1.default.line_bot.pushMessageUserId, rep.WorkoutId, rep.Date)
                : console.log("訓練行程日期還沒開始"))
                : console.log("訓練行程日期已經結束");
        });
    }
}
exports.default = WgerSchedule;
//# sourceMappingURL=WgerSchedule.js.map