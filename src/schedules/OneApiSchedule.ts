import Schedule from '../interfaces/Schedule'
import oneApiService from '../services/OneApiService'

export default class OneApiSchedule extends Schedule {
    days = [1, 2, 3, 4, 5, 6, 7];
    hours = [9, 21];

    protected doThing() {
        new oneApiService().SendOneApi();
    }
}
