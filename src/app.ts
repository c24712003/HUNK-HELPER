import config from './config';
import linebot from './loaders/linebot';
import scheduleList from './schedules/ScheduleList';
import WgerService from './services/WgerService';
import PuppteerService from './services/PuppteerService';
import { WgerTodayTrainingMenu } from './models/Wger';
import { Console } from 'console';

const express = require('express');
const app = express();

async function startServer() {
    // await new scheduleList().runScheduleList();

    app.post('/', linebot.middware, async (req, res) => {
        try {
            await linebot.handleEvent(req.body.events[0]);
            //res.json(res);
        } catch (err) {
            console.log(err);
        }
    });

    // app.get('/nurtation.html', (req, res) => {
    //     res.sendFile(__dirname + '/views/nurtation.html');
    // });

    // app.get('/getFoodInfo', (req, res) => {
    //     const service = new PuppteerService();

    //     service.getMyFitnessPalFoodInfo(req.query.food).then(data => res.end(JSON.stringify(data)));
    // });

    // app.get('/recordDietary', (req, res) => {
    //     const service = new PuppteerService();
    //     const id = req.query.userId;
    //     service.recordDietary(id, req.query.result, req.query.date).then(n => {
    //         service.replaceTemplate(n, true).then(fm => {
    //             service.calcNurtrition(n).then(msg => {
    //                 linebot.pushFlexMessage(id, fm);
    //                 linebot.pushMessage(id, msg);
    //             });
    //             res.end(JSON.stringify(true));
    //         })
    //     });
    // });

    // app.get('/getDateDietaryRecord', (req, res) => {
    //     const service = new PuppteerService();
    //     service.getDateDietaryRecord(req.query.userId, req.query.date).then(n => {
    //         if (n === null) {
    //             res.end(JSON.stringify(false));
    //         } else {
    //             service.replaceTemplate(n, true).then(fm => {
    //                 linebot.pushFlexMessage(req.query.userId, fm);
    //                 res.end(JSON.stringify(true));
    //             });
    //         }
    //     });
    // });

    // app.get('/wger.html', (req, res) => {
    //     console.log("");
    //     res.sendFile(__dirname + '/views/wger.html');
    // });

    // app.get('/getWorkoutId', (req, res) => {
    //     const service = new WgerService();
    //     service.getScheduleIsStartOrIsEnd().then(rep => {
    //         !rep.isEnd ? (rep.isStart ? res.end(JSON.stringify(rep))
    //             : res.end(JSON.stringify(false)))
    //             : res.end(JSON.stringify(false));
    //     })
    // });

    // app.get('/getTodayWorkout', (req, res) => {
    //     const service = new WgerService();
    //     service.getExistWorkout(req.query.userId, req.query.date).then(wger => {
    //         console.log(wger);
    //         if (wger !== null) {
    //             res.end(JSON.stringify(wger))
    //         } else {
    //             res.end(JSON.stringify(true));
    //         }
    //     });
    // });

    // app.get('/updateTodayWorkout', (req, res) => {
    //     const service = new WgerService();
    //     const data = JSON.parse(req.query.wger) as WgerTodayTrainingMenu;
    //     service.replaceTemplate(data).then(rep => {
    //         linebot.pushFlexMessage(req.query.userId, rep);
    //         if (data.remarks && data.remarks !== "") linebot.pushMessage(req.query.userId, data.remarks);

    //         service.save({ id: req.query.userId, date: req.query.date, value: data });
    //         res.end(JSON.stringify(true));
    //     });
    // });

    let server = app.listen(config.port, () => {
        console.log("App now running on port", server.address().port);
    });
}

startServer();
