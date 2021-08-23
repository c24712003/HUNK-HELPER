import config from '../config';
import { Client, FlexMessage, Message, middleware, TextMessage } from '@line/bot-sdk';
import TMDBApiService from '../services/TMDBApiService';
import WgerService from '../services/WgerService';
import PuppteerService from '../services/PuppteerService';
import { healthcare } from '../template//demo/HEALTHCARE';
import { paymentrecord } from '../template/demo/PAYMENTRECORD';
import { news } from '../template/demo/NEWS';
import { traffic } from '../template/demo/TRAFFIC';
import { acco } from '../template/demo/Accommodation';
import { carousel } from '../template/demo/CAROUSEL';
import { epid } from '../template/demo/EPIDEMIC';
import { LineFlexBubbleMessage, LineFlexMessage, messageType } from '../models/LineMessage';
import { isReturnStatement } from 'typescript';

const keyWords = ['找電影', '體重', '體重表', '食物'];
const lineConfig = {
    channelAccessToken: config.line_bot.channelAccessToken,
    channelSecret: config.line_bot.channelSecret
}

const paymentRecordDemo = {
    Name: "沈美秀",
    Date: "2021-08-13",
    DateRange: "2021-11-01 ~ 2021-11-30",
    Price: 43000,
    PaymentDate: "未付款",
    PaymentMethod: "尚未付款"
}

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
                        console.log('-------------------do message-----------------------');
                        this.doDemoThing(event.message.text).then(msg => this.client.replyMessage(event.replyToken, msg));
                        //this.messageTextToService(event.message.text).then(msg => this.client.replyMessage(event.replyToken, msg));
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

    private static doDemoThing(msg: string): Promise<any> {
        return new Promise((res, rej) => {
            let result: LineFlexBubbleMessage = {
                type: messageType.flexMessage,
                altText: "",
                contents: ""
            };

            try {
                switch (msg) {
                    case '家屬管理':
                        res({
                            type: "text",
                            text: "TO DO"
                        } as TextMessage);
                        break;
                    case '繳費紀錄':
                        result.altText = "繳費紀錄";
                        result.contents = JSON.parse(paymentrecord());
                        res(result);
                        break;
                    case '健康狀況':
                        result.altText = "健康狀況";
                        result.contents = JSON.parse(healthcare()
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
                        result.altText = "最新消息";
                        result.contents = JSON.parse(news());
                        res(result);
                        break;
                    case '智慧客服':
                        let r: LineFlexBubbleMessage = {
                            type: messageType.flexMessage,
                            altText: "智慧客服",
                            contents: {
                                type: messageType.flexCarousel,
                                contents: JSON.parse(carousel())
                            }
                        };

                        res(r);
                        break;
                    case '最新活動照片':
                        res({
                            type: "text",
                            text: "TO DO"
                        } as TextMessage);
                        break;
                    case '疫情資訊':
                        result.altText = "疫情資訊";
                        result.contents = JSON.parse(epid());
                        res(result);
                        break;
                    case '住宿問題':
                        result.altText = "住宿問題";
                        result.contents = JSON.parse(acco());
                        res(result);
                        break;
                    default:
                        res({
                            type: "text",
                            text: msg
                        } as TextMessage);
                }
            } catch (e) {
                console.log(e);
            }
        });
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