"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const WgerService_1 = require("../services/WgerService");
const service = new WgerService_1.default();
describe("Get wger workout schedule id.", () => {
    it("Get id", (done) => {
        service.getScheduleId().then(id => {
            chai_1.expect(id).to.be.an('number');
        });
        done();
    });
});
//# sourceMappingURL=wgerTest.js.map