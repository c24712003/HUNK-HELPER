"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OneApiSchedule_1 = require("./OneApiSchedule");
const WgerSchedule_1 = require("./WgerSchedule");
class ScheduleList {
    runScheduleList() {
        new OneApiSchedule_1.default().run();
        new WgerSchedule_1.default().run();
    }
}
exports.default = ScheduleList;
//# sourceMappingURL=ScheduleList.js.map