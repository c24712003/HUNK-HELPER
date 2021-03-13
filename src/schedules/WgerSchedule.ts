import Schedule from '../interfaces/Schedule'
import service from '../services/WgerService'

export default class WgerSchedule extends Schedule {
    days = [1, 2, 3, 4, 5, 6, 7];
    hours = [22];

    protected doThing() {
        const s = new service();
        s.getScheduleIsStartOrIsEnd().then(rep => {
            !rep.isEnd ? (rep.isStart ? s.getAllWorkout(rep.WorkoutId, rep.Date)
                : console.log("訓練行程日期還沒開始"))
                : console.log("訓練行程日期已經結束");
        })
    }
}