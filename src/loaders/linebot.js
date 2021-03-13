"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const bot_sdk_1 = require("@line/bot-sdk");
const TMDBApiService_1 = require("../services/TMDBApiService");
const WgerService_1 = require("../services/WgerService");
const PuppteerService_1 = require("../services/PuppteerService");
const keyWords = ['找電影', '體重', '體重表', '食物'];
const lineConfig = {
    channelAccessToken: config_1.default.line_bot.channelAccessToken,
    channelSecret: config_1.default.line_bot.channelSecret
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
                        this.messageTextToService(event.message.text).then(msg => {
                            this.client.replyMessage(event.replyToken, msg);
                        });
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
                    new TMDBApiService_1.default().searchMovie(msg.replace(keyWords[0], "")).then(msg => {
                        res(msg);
                    });
                    break;
                case 2:
                    let todays = new Date().toLocaleDateString("en-US", { timeZone: "Asia/Shanghai" })
                        .split("/");
                    new WgerService_1.default().updateCurrentWeight(`${todays[2]}-${todays[0]}-${todays[1]}`, Number(msg.replace(keyWords[1], ""))).then(msg => {
                        res(msg);
                    });
                    break;
                case 4:
                    let puppteerService = new PuppteerService_1.default();
                    puppteerService.getMyFitnessPalFoodInfo(msg.replace(keyWords[3], "")).then(d => {
                        puppteerService.replaceTemplate(d).then(msg => {
                            res(msg);
                            //this.pushFlexMessage(config.line_bot.pushMessageUserId, msg);
                        });
                    });
                    break;
                default:
                    res({
                        "type": "text",
                        "text": msg
                    });
            }
        });
    }
}
exports.default = Linebot;
Linebot.middware = bot_sdk_1.middleware(lineConfig);
Linebot.client = new bot_sdk_1.Client(lineConfig);
//# sourceMappingURL=linebot.js.map