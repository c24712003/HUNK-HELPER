import { IOne } from '../models/IOne';
import config from '../config';
import linebot from '../loaders/linebot';

export default class OneApiService {
    SendOneApi() {
        const self = this;
        const axios = require('axios');

        axios.get("https://api.xygeng.cn/one").then((res) => {
            try {
                self.SendOneApiUseLineBot(res.data as IOne);
            } catch (err) {
                console.log("https://api.xygeng.cn/one Error!! :", err);
            }
        })
    }

    private SendOneApiUseLineBot(res: IOne) {
        if (res !== undefined) {
            linebot.pushMessage(config.line_bot.pushMessageUserId,
                `${res.data.content}\n${res.data.origin}\n${res.data.tag}`);
        } else {
            console.log('res is empty !!');
        }
    }
}