"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const linebot_1 = require("../loaders/linebot");
class OneApiService {
    SendOneApi() {
        const self = this;
        const axios = require('axios');
        axios.get("https://api.xygeng.cn/one").then((res) => {
            try {
                self.SendOneApiUseLineBot(res.data);
            }
            catch (err) {
                console.log("https://api.xygeng.cn/one Error!! :", err);
            }
        });
    }
    SendOneApiUseLineBot(res) {
        if (res !== undefined) {
            linebot_1.default.pushMessage(config_1.default.line_bot.pushMessageUserId, `${res.data.content}\n${res.data.origin}\n${res.data.tag}`);
        }
        else {
            console.log('res is empty !!');
        }
    }
}
exports.default = OneApiService;
//# sourceMappingURL=OneApiService.js.map