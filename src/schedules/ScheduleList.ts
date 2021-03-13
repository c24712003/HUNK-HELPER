import OneApiSchedule from './OneApiSchedule'
import WgerSchedule from './WgerSchedule';

export default class ScheduleList{
    runScheduleList(){
        new OneApiSchedule().run();
        new WgerSchedule().run();
    }
}