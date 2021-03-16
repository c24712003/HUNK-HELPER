"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const axios_1 = require("../http/axios");
const linebot_1 = require("../loaders/linebot");
const LineMessage_1 = require("../models/LineMessage");
const TRAINMENU_1 = require("../template/wger/TRAINMENU");
const firebase_1 = require("../loaders/firebase");
class WgerService {
    getScheduleId() {
        return new Promise((res, rej) => {
            axios_1.getSchedule().then(resp => {
                let f = resp.data.results.find(i => i.is_active === true);
                res(f.id);
            });
        });
    }
    getScheduleIsStartOrIsEnd() {
        return new Promise((res, rej) => {
            Promise.all([axios_1.getSchedule(), axios_1.getScheduleStep()]).then(vs => {
                let f = vs[0].data.results.find(i => i.is_active === true);
                let d = vs[1].data.results.find(a => a.schedule === f.id);
                let today = new Date().toLocaleDateString("en-US", { timeZone: "Asia/Shanghai" });
                let endDate = this.getEndDate(f.start_date, d.duration);
                let sch = {
                    Date: today,
                    isStart: false,
                    isEnd: false
                };
                if ((Date.parse(today) - Date.parse(f.start_date)) < 0) {
                    res(sch);
                }
                else {
                    sch.isStart = true;
                    sch.WorkoutId = d.workout;
                    if ((Date.parse(f.start_date) - Date.parse(endDate)) > 0) {
                        sch.isEnd = true;
                        res(sch);
                    }
                    else {
                        res(sch);
                        console.log(sch);
                    }
                }
            }).catch(err => {
                console.log(err);
            });
        });
    }
    getAllWorkout(userId, id, date, replyMessage = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.getWorkoutAll(id).then(rep => {
                const r = rep.data;
                let week = new Date(date).getDay();
                let workoutItems = [];
                let wger = {
                    date: date,
                    id: 0,
                    workoutName: "",
                    week: "",
                    items: workoutItems
                };
                if (week === 0) {
                    week = 7;
                }
                r.day_list.forEach(dl => {
                    if (dl.obj.day.some(s => s == week)) {
                        wger.id = dl.obj.id;
                        wger.workoutName = dl.obj.description;
                        wger.week = weeks[week - 1];
                        dl.set_list.forEach(set => {
                            let sls = [];
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
                        return new Promise((res, rej) => res(wger));
                    }
                });
            }).catch(err => {
                console.log(err);
                return null;
            });
        });
    }
    updateCurrentWeight(date, weight) {
        return new Promise((res, rej) => {
            axios_1.updateCurrentWeight({ date: date, weight: weight })
                .then((rep) => {
                res({
                    type: "text",
                    text: "紀錄成功"
                });
            }).catch((err) => {
                res({
                    type: "text",
                    text: "今日已經輸入過體重了"
                });
            });
        });
    }
    replaceTemplate(wger) {
        let items = "";
        wger.items.forEach(w => {
            w.exercise_ids.forEach(ed => {
                let i = TRAINMENU_1.trainitem()
                    .replace('{~ItemName~}', w.is_super_set ? `${map[ed]} (超級組)` : map[ed])
                    .replace('{~ItemSets~}', w.item_setting_list[w.exercise_ids.indexOf(ed)].setting_text);
                items += i;
                if (w.exercise_ids[w.exercise_ids.length - 1] !== ed) {
                    items += ',';
                }
            });
            if (wger.items[wger.items.length - 1] !== w) {
                items += ',';
            }
        });
        let t = TRAINMENU_1.trainbox()
            .replace('{~MenuName~}', wger.workoutName)
            .replace('{~TrainDate~}', `${wger.week} ${wger.date}`)
            .replace('{~TrainItem~}', items);
        return new Promise((res, rej) => {
            let result = {
                type: LineMessage_1.messageType.flexMessage,
                altText: "Today Train Menu",
                contents: JSON.parse(t)
            };
            res(result);
        });
    }
    save(input) {
        firebase_1.default.collection('user').doc(input.id).collection(input.date).doc('train record').set(input.value).then(() => {
            console.log('set data successful');
        });
    }
    getEndDate(date, days) {
        let d = new Date(date);
        d.setDate(d.getDate() + (days * 7));
        return d.toString();
    }
    sendTrainMenu(msg) {
        if (msg !== undefined) {
            linebot_1.default.pushFlexMessage(config_1.default.line_bot.pushMessageUserId, msg);
        }
        else {
            console.log('msg is empty !!');
        }
    }
}
exports.default = WgerService;
let weeks = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
let map = {
    81: "啞鈴二頭彎舉",
    84: "法式彎舉",
    89: "三頭滑輪下拉",
    97: "啞鈴臥推",
    98: "蝴蝶夾胸",
    105: "硬舉",
    110: "反向槓鈴划船",
    111: "深蹲",
    117: "坐姿腿彎舉",
    119: "槓鈴肩推",
    124: "反向蝴蝶",
    138: "錘式滑輪",
    143: "坐姿划船",
    154: "趴姿腿彎舉",
    192: "握推",
    289: "錘式",
    788: "器械式腿推",
    802: "啞鈴飛鳥"
};
//# sourceMappingURL=WgerService.js.map