import config from './config';
import linebot from './loaders/linebot';
import scheduleList from './schedules/ScheduleList';
import WgerService from './services/WgerService';
import PuppteerService from './services/PuppteerService';

const express = require('express');
const app = express();

async function startServer() {
    await new scheduleList().runScheduleList();

    app.post('/', linebot.middware, async (req, res) => {
        try {
            await linebot.handleEvent(req.body.events[0]);
            res.json(res);
        } catch (err) { }
    });

    app.get('/nurtation.html', (req, res) => {
        res.sendFile(__dirname + '/views/nurtation.html');
    });

    app.get('/getFoodInfo', (req, res) => {
        const service = new PuppteerService();
        service.getMyFitnessPalFoodInfo(req.query.food).then(data => res.end(JSON.stringify(data)));
    });

    app.get('/recordDietary', (req, res) => {
        const service = new PuppteerService();
        service.recordDietary(req.query.userId, req.query.result, req.query.date).then(n => {
            service.replaceTemplate(n, true).then(fm => {
                linebot.pushFlexMessage(req.query.userId, fm);
                res.end(JSON.stringify(true));
            })
        });
    });

    app.get('/getDateDietaryRecord', (req, res) => {
        const service = new PuppteerService();
        service.getDateDietaryRecord(req.query.userId, req.query.date).then(n => {
            if (n === null) {
                res.end(JSON.stringify(false));
            } else {
                service.replaceTemplate(n, true).then(fm => {
                    linebot.pushFlexMessage(req.query.userId, fm);
                    res.end(JSON.stringify(true));
                });
            }
        });
    });

    let server = app.listen(config.port, () => {
        console.log("App now running on port", server.address().port);
    });
}

startServer();
