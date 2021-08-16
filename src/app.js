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
const config_1 = require("./config");
const linebot_1 = require("./loaders/linebot");
const WgerService_1 = require("./services/WgerService");
const PuppteerService_1 = require("./services/PuppteerService");
const express = require('express');
const app = express();
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // await new scheduleList().runScheduleList();
        app.post('/', linebot_1.default.middware, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield linebot_1.default.handleEvent(req.body.events[0]);
                res.json(res);
            }
            catch (err) {
                console.log(err);
            }
        }));
        app.get('/nurtation.html', (req, res) => {
            res.sendFile(__dirname + '/views/nurtation.html');
        });
        app.get('/getFoodInfo', (req, res) => {
            const service = new PuppteerService_1.default();
            service.getMyFitnessPalFoodInfo(req.query.food).then(data => res.end(JSON.stringify(data)));
        });
        app.get('/recordDietary', (req, res) => {
            const service = new PuppteerService_1.default();
            const id = req.query.userId;
            service.recordDietary(id, req.query.result, req.query.date).then(n => {
                service.replaceTemplate(n, true).then(fm => {
                    service.calcNurtrition(n).then(msg => {
                        linebot_1.default.pushFlexMessage(id, fm);
                        linebot_1.default.pushMessage(id, msg);
                    });
                    res.end(JSON.stringify(true));
                });
            });
        });
        app.get('/getDateDietaryRecord', (req, res) => {
            const service = new PuppteerService_1.default();
            service.getDateDietaryRecord(req.query.userId, req.query.date).then(n => {
                if (n === null) {
                    res.end(JSON.stringify(false));
                }
                else {
                    service.replaceTemplate(n, true).then(fm => {
                        linebot_1.default.pushFlexMessage(req.query.userId, fm);
                        res.end(JSON.stringify(true));
                    });
                }
            });
        });
        app.get('/wger.html', (req, res) => {
            console.log("");
            res.sendFile(__dirname + '/views/wger.html');
        });
        app.get('/getWorkoutId', (req, res) => {
            const service = new WgerService_1.default();
            service.getScheduleIsStartOrIsEnd().then(rep => {
                !rep.isEnd ? (rep.isStart ? res.end(JSON.stringify(rep))
                    : res.end(JSON.stringify(false)))
                    : res.end(JSON.stringify(false));
            });
        });
        app.get('/getTodayWorkout', (req, res) => {
            const service = new WgerService_1.default();
            service.getExistWorkout(req.query.userId, req.query.date).then(wger => {
                console.log(wger);
                if (wger !== null) {
                    res.end(JSON.stringify(wger));
                }
                else {
                    res.end(JSON.stringify(true));
                }
            });
        });
        app.get('/updateTodayWorkout', (req, res) => {
            const service = new WgerService_1.default();
            const data = JSON.parse(req.query.wger);
            service.replaceTemplate(data).then(rep => {
                linebot_1.default.pushFlexMessage(req.query.userId, rep);
                if (data.remarks && data.remarks !== "")
                    linebot_1.default.pushMessage(req.query.userId, data.remarks);
                service.save({ id: req.query.userId, date: req.query.date, value: data });
                res.end(JSON.stringify(true));
            });
        });
        let server = app.listen(config_1.default.port, () => {
            console.log("App now running on port", server.address().port);
        });
    });
}
startServer();
//# sourceMappingURL=app.js.map