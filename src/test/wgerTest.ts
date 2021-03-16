import { expect } from 'chai';
import WgerService from '../services/WgerService';

const service = new WgerService();

describe("Get wger workout schedule id.", () => {
    it("Get id", (done) => {
        service.getScheduleId().then(id => {
            expect(id).to.be.an('number');
        });
        done();
    });
});