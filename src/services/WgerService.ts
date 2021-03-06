import { TextMessage } from '@line/bot-sdk/dist/types';
import config from '../config';
import { getWorkoutAll, getScheduleStep, getSchedule, updateCurrentWeight } from '../http/axios';
import linebot from '../loaders/linebot';
import { LineFlexBubbleMessage, messageType } from '../models/LineMessage';
import { WgerScheduleDate, WgerSchedule, WgerScheduleStep, WgerWorkoutAllData, ItemSettingList, WgerTodayTrainingMenu, WorkoutItem } from '../models/Wger';
import { trainbox, trainitem } from '../template/wger/TRAINMENU';
import { IService } from '../interfaces/IService';
import db from '../loaders/firebase';

export default class WgerService implements IService {
    getScheduleId(): Promise<number> {
        return new Promise((res, rej) => {
            getSchedule().then(resp => {
                let f = (resp.data as WgerSchedule).results.find(i => i.is_active === true);
                res(f.id);
            });
        })
    }

    getScheduleIsStartOrIsEnd(): Promise<WgerScheduleDate> {
        return new Promise((res, rej) => {
            Promise.all([getSchedule(), getScheduleStep()]).then(vs => {
                let f = (vs[0].data as WgerSchedule).results.find(i => i.is_active === true);
                let d = (vs[1].data as WgerScheduleStep).results.find(a => a.schedule === f.id);
                let today = new Date().toLocaleDateString("en-US", { timeZone: "Asia/Shanghai" });
                let endDate = this.getEndDate(f.start_date, d.duration);
                let sch: WgerScheduleDate = {
                    Date: today,
                    isStart: false,
                    isEnd: false
                }

                if ((Date.parse(today) - Date.parse(f.start_date)) < 0) {
                    res(sch);
                } else {
                    sch.isStart = true;
                    sch.WorkoutId = d.workout;

                    if ((Date.parse(f.start_date) - Date.parse(endDate)) > 0) {
                        sch.isEnd = true;
                        res(sch);
                    } else {
                        res(sch);
                        console.log(sch);
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        });
    }

    getExistWorkout(userId: string, date: string): Promise<WgerTodayTrainingMenu> {
        const query = db.collection('user').doc(userId).collection(date.split('/').join('-'));
        return new Promise((res, rej) => {
            query.get().then(docs => {
                if (docs.size === 0) {
                    res(null);
                } else {
                    docs.forEach(doc => res(doc.data() as WgerTodayTrainingMenu));
                }
            })
        });
    }

    async getAllWorkout(userId: string, id: number, date: string, replyMessage = true): Promise<WgerTodayTrainingMenu> {
        return new Promise((res, rej) => {
            getWorkoutAll(id).then(rep => {
                const r = rep.data as WgerWorkoutAllData;
                let week = new Date(date).getDay();
                let workoutItems: WorkoutItem[] = [];
                let wger: WgerTodayTrainingMenu = {
                    date: date,
                    id: 0,
                    workoutName: "",
                    week: "",
                    items: workoutItems,
                    remarks: ""
                };

                if (week === 0) { week = 7; }

                r.day_list.forEach(dl => {
                    if (dl.obj.day.some(s => s == week)) {
                        wger.id = dl.obj.id;
                        wger.workoutName = dl.obj.description;
                        wger.week = weeks[week - 1];

                        dl.set_list.forEach(set => {
                            let sls: ItemSettingList[] = [];

                            set.exercise_list.forEach(s => {
                                sls.push({
                                    set_name: "",
                                    setting_list: s.setting_list,
                                    setting_text: s.setting_text
                                });
                            });

                            set.obj.exercises.forEach(e => {
                                sls[set.obj.exercises.indexOf(e)].set_name = map[e];
                            });

                            workoutItems.push({
                                id: set.obj.id,
                                set_id: set.obj.exerciseday,
                                exercise_ids: set.obj.exercises,
                                item_setting_list: sls,
                                is_super_set: set.is_superset,
                                done: false
                            });
                        });

                        wger.items = workoutItems;

                        if (replyMessage) {
                            this.replaceTemplate(wger).then(msg => {
                                this.sendTrainMenu(msg);
                                this.save({ id: userId, date: date, value: wger });
                            });
                        }

                        return res(wger);
                    }
                });
            }).catch(err => {
                console.log(err);
                return res(null);
            });
        })
    }

    updateCurrentWeight(date: string, weight: number): Promise<TextMessage> {
        return new Promise((res, rej) => {
            updateCurrentWeight({ date: date, weight: weight })
                .then((rep) => {
                    res({
                        type: "text",
                        text: "????????????"
                    });
                }).catch((err) => {
                    res({
                        type: "text",
                        text: "??????????????????????????????"
                    });
                })
        })
    }

    replaceTemplate(wger: WgerTodayTrainingMenu): Promise<LineFlexBubbleMessage> {
        let items: string = "";
        wger.items.forEach(w => {
            w.exercise_ids.forEach(ed => {
                let i = trainitem()
                    .replace('{~ItemName~}', w.is_super_set ? `${map[ed]} (?????????)` : map[ed])
                    .replace('{~ItemSets~}', w.item_setting_list[w.exercise_ids.indexOf(ed)].setting_text)
                    .replace('{~CircleColor~}', w.done ? "#28FF28" : "#ADADAD");
                items += i;

                if (w.exercise_ids[w.exercise_ids.length - 1] !== ed) {
                    items += ','
                }
            })

            if (wger.items[wger.items.length - 1] !== w) {
                items += ','
            }
        });

        let t = trainbox()
            .replace('{~MenuName~}', wger.workoutName)
            .replace('{~TrainDate~}', `${wger.week} ${wger.date}`)
            .replace('{~TrainItem~}', items);

        return new Promise((res, rej) => {
            let result: LineFlexBubbleMessage = {
                type: messageType.flexMessage,
                altText: "Today Train Menu",
                contents: JSON.parse(t)
            };

            res(result);
        });
    }

    save(input: { id: string, date: string, value: unknown }) {
        db.collection('user').doc(input.id).collection(input.date.split('/').join('-')).doc('train record').set(input.value as WgerTodayTrainingMenu).then(() => {
            console.log('set data successful');
        });
    }

    private getEndDate(date: string, days: number): string {
        let d = new Date(date);
        d.setDate(d.getDate() + (days * 7));

        return d.toString();
    }

    private sendTrainMenu(msg: any) {
        if (msg !== undefined) {
            linebot.pushFlexMessage(config.line_bot.pushMessageUserId, msg);
        } else {
            console.log('msg is empty !!');
        }
    }
}

let weeks = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
let map: { [key: number]: string } = {
    81: "??????????????????",
    84: "????????????",
    89: "??????????????????",
    97: "????????????",
    98: "????????????",
    105: "??????",
    110: "??????????????????",
    111: "??????",
    117: "???????????????",
    119: "????????????",
    124: "????????????",
    138: "????????????",
    143: "????????????",
    154: "???????????????",
    192: "??????",
    289: "??????",
    788: "???????????????",
    802: "????????????"
}




