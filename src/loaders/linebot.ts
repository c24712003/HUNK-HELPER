import config from '../config';
import { Client, FlexMessage, Message, middleware, TextMessage } from '@line/bot-sdk';
import TMDBApiService from '../services/TMDBApiService';
import WgerService from '../services/WgerService';
import PuppteerService from '../services/PuppteerService';

const keyWords = ['找電影', '體重', '體重表', '食物'];
const lineConfig = {
    channelAccessToken: config.line_bot.channelAccessToken,
    channelSecret: config.line_bot.channelSecret
}

export default class Linebot {
    static middware = middleware(lineConfig);
    private static client = new Client(lineConfig);

    static handleEvent(event: any) {
        switch (event.type) {
            case 'join':
                break;
            case 'follow':
                break;
            case 'message':
                switch (event.message.type) {
                    case 'text':
                        this.messageTextToService(event.message.text).then(msg => this.client.replyMessage(event.replyToken, msg));
                        break;
                    case 'image':
                        //TODO
                        this.client.getMessageContent(event.message.id).then(stream => {
                            stream.on('data', (chunk) => {
                            })
                        });
                        break;
                    case 'sticker':
                        break;
                }
                break;
        }
    }

    static pushMessage(to: string, msg: string = "") {
        this.client.pushMessage(to, {
            type: "text",
            text: msg
        });
    }

    static pushFlexMessage(to: string, msg: any) {
        this.client.pushMessage(to, msg);
    }

    private static messageTextToService(msg: string): Promise<any> {
        return new Promise((res, rej) => {
            let type = 0;

            keyWords.forEach(k => {
                if (msg.indexOf(k) !== -1) {
                    type = keyWords.indexOf(k) + 1;
                }
            })

            switch (type) {
                case 1:
                    new TMDBApiService().searchMovie(msg.replace(keyWords[0], "")).then(msg => res(msg))
                    break;
                case 2:
                    let todays = new Date().toLocaleDateString("en-US", { timeZone: "Asia/Shanghai" })
                        .split("/");
                    new WgerService().updateCurrentWeight(`${todays[2]}-${todays[0]}-${todays[1]}`
                        , Number(msg.replace(keyWords[1], ""))).then(msg => res(msg));
                    break;
                case 4:
                    let puppteerService = new PuppteerService();
                    puppteerService.getMyFitnessPalFoodInfo(msg.replace(keyWords[3], "")).then(d => {
                        puppteerService.replaceTemplate(d).then(msg => res(msg))
                    });
                    break;
                default:
                    res({
                        type: "text",
                        text: msg
                    } as TextMessage);
            }
        })
    }
}