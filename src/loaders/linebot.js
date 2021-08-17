"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const bot_sdk_1 = require("@line/bot-sdk");
const TMDBApiService_1 = require("../services/TMDBApiService");
const WgerService_1 = require("../services/WgerService");
const PuppteerService_1 = require("../services/PuppteerService");
const HEALTHCARE_1 = require("../template//demo/HEALTHCARE");
const PAYMENTRECORD_1 = require("../template/demo/PAYMENTRECORD");
const NEWS_1 = require("../template/demo/NEWS");
const LineMessage_1 = require("../models/LineMessage");
const keyWords = ['找電影', '體重', '體重表', '食物'];
const lineConfig = {
    channelAccessToken: config_1.default.line_bot.channelAccessToken,
    channelSecret: config_1.default.line_bot.channelSecret
};
const paymentRecordDemo = {
    Name: "沈美秀",
    Date: "2021-08-13",
    DateRange: "2021-11-01 ~ 2021-11-30",
    Price: 43000,
    PaymentDate: "未付款",
    PaymentMethod: "尚未付款"
};
const healthCareDemo = {
    Name: "沈美秀",
    DateTime: "2021-08-13",
    Sex: "feminine",
    Temperature: "36.9度",
    Pulse: "77下",
    Breathe: 17,
    Shrinkage: 120,
    BloodOxygen: 98,
    DiastolicBloodPressure: 68
};
class Linebot {
    static handleEvent(event) {
        switch (event.type) {
            case 'join':
                break;
            case 'follow':
                break;
            case 'message':
                switch (event.message.type) {
                    case 'text':
                        console.log('-------------------do message-----------------------');
                        this.doDemoThing(event.message.text).then(msg => this.client.replyMessage(event.replyToken, msg));
                        //this.messageTextToService(event.message.text).then(msg => this.client.replyMessage(event.replyToken, msg));
                        break;
                    case 'image':
                        //TODO
                        this.client.getMessageContent(event.message.id).then(stream => {
                            stream.on('data', (chunk) => {
                            });
                        });
                        break;
                    case 'sticker':
                        break;
                }
                break;
        }
    }
    static pushMessage(to, msg = "") {
        this.client.pushMessage(to, {
            type: "text",
            text: msg
        });
    }
    static pushFlexMessage(to, msg) {
        this.client.pushMessage(to, msg);
    }
    static doDemoThing(msg) {
        return new Promise((res, rej) => {
            let result = {
                type: LineMessage_1.messageType.flexMessage,
                altText: "",
                contents: ""
            };
            let t = "";
            try {
                switch (msg) {
                    case '家屬管理':
                        res({
                            type: "text",
                            text: msg
                        });
                        break;
                    case '繳費紀錄':
                        let contents = PAYMENTRECORD_1.paymentrecord()
                            .replace('{~Name~}', paymentRecordDemo.Name)
                            .replace('{~Date~}', paymentRecordDemo.Date)
                            .replace('{~DateRange~}', paymentRecordDemo.DateRange)
                            .replace('{~PaymentDate~}', paymentRecordDemo.PaymentDate)
                            .replace('{~PaymentMethod~}', paymentRecordDemo.PaymentMethod)
                            .replace('{~Price~}', paymentRecordDemo.Price.toString());
                        res({
                            type: LineMessage_1.messageType.flexMessage,
                            altText: "",
                            contents: JSON.parse(contents)
                        });
                        break;
                    case '健康狀況':
                        result.contents = JSON.parse(HEALTHCARE_1.healthcare()
                            .replace('{~Name~}', healthCareDemo.Name)
                            .replace('{~Sex~}', healthCareDemo.Sex === 'Male' ? 'man' : 'woman-head-emoji')
                            .replace('{~DateTime~}', healthCareDemo.DateTime)
                            .replace('{~BloodOxygen~}', healthCareDemo.BloodOxygen.toString())
                            .replace('{~Breathe~}', healthCareDemo.Breathe.toString())
                            .replace('{~DiastolicBloodPressure~}', healthCareDemo.DiastolicBloodPressure.toString())
                            .replace('{~Pulse~}', healthCareDemo.Pulse)
                            .replace('{~Shrinkage~}', healthCareDemo.Shrinkage.toString())
                            .replace('{~Temperature~}', healthCareDemo.Temperature.toString()));
                        res(result);
                        break;
                    case '最新消息':
                        result.contents = JSON.parse(NEWS_1.news());
                        res(result);
                        break;
                    case '智慧客服':
                        break;
                    case '最新活動照片':
                        // ?
                        break;
                    default:
                        res({
                            type: "text",
                            text: msg
                        });
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    static messageTextToService(msg) {
        return new Promise((res, rej) => {
            let type = 0;
            keyWords.forEach(k => {
                if (msg.indexOf(k) !== -1) {
                    type = keyWords.indexOf(k) + 1;
                }
            });
            switch (type) {
                case 1:
                    new TMDBApiService_1.default().searchMovie(msg.replace(keyWords[0], "")).then(msg => res(msg));
                    break;
                case 2:
                    let todays = new Date().toLocaleDateString("en-US", { timeZone: "Asia/Shanghai" })
                        .split("/");
                    new WgerService_1.default().updateCurrentWeight(`${todays[2]}-${todays[0]}-${todays[1]}`, Number(msg.replace(keyWords[1], ""))).then(msg => res(msg));
                    break;
                case 4:
                    let puppteerService = new PuppteerService_1.default();
                    puppteerService.getMyFitnessPalFoodInfo(msg.replace(keyWords[3], "")).then(d => {
                        puppteerService.replaceTemplate(d).then(msg => res(msg));
                    });
                    break;
                default:
                    res({
                        type: "text",
                        text: msg
                    });
            }
        });
    }
}
exports.default = Linebot;
Linebot.middware = bot_sdk_1.middleware(lineConfig);
Linebot.client = new bot_sdk_1.Client(lineConfig);
//# sourceMappingURL=linebot.js.map