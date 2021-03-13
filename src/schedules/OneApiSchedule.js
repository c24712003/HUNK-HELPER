"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Schedule_1 = require("../interfaces/Schedule");
const OneApiService_1 = require("../services/OneApiService");
class OneApiSchedule extends Schedule_1.default {
    constructor() {
        super(...arguments);
        this.days = [1, 2, 3, 4, 5, 6, 7];
        this.hours = [9, 21];
    }
    doThing() {
        new OneApiService_1.default().SendOneApi();
    }
}
exports.default = OneApiSchedule;
//# sourceMappingURL=OneApiSchedule.js.map