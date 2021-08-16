"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.news = void 0;
let news = () => {
    return `{
        "type": "bubble",
        "header": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "text",
              "text": "最新消息",
              "weight": "bold",
              "size": "sm",
              "color": "#AAAAAA",
              "contents": []
            }
          ]
        },
        "hero": {
          "type": "image",
          "url": "https://www.topnoble.com.tw/skin/banner.jpg",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "label": "Action",
            "uri": "https://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "horizontal",
          "spacing": "md",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "flex": 1,
              "contents": [
                {
                  "type": "image",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/02_1_news_thumbnail_1.png",
                  "gravity": "bottom",
                  "size": "sm",
                  "aspectRatio": "4:3",
                  "aspectMode": "cover"
                },
                {
                  "type": "image",
                  "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/02_1_news_thumbnail_2.png",
                  "margin": "md",
                  "size": "sm",
                  "aspectRatio": "4:3",
                  "aspectMode": "cover"
                }
              ]
            },
            {
              "type": "box",
              "layout": "vertical",
              "flex": 2,
              "contents": [
                {
                  "type": "text",
                  "text": "貴族相關資訊手機模板上線囉",
                  "size": "xs",
                  "flex": 1,
                  "gravity": "top",
                  "action": {
                    "type": "uri",
                    "uri": "https://www.topnoble.com.tw/hot_233015.html"
                  },
                  "contents": []
                },
                {
                  "type": "separator"
                },
                {
                  "type": "text",
                  "text": "專任內科專科護理師為長者服務",
                  "size": "xs",
                  "flex": 2,
                  "gravity": "center",
                  "action": {
                    "type": "uri",
                    "uri": "https://www.topnoble.com.tw/hot_100211.html"
                  },
                  "contents": []
                },
                {
                  "type": "separator"
                },
                {
                  "type": "text",
                  "text": "跨專業團隊服務",
                  "size": "xs",
                  "flex": 2,
                  "gravity": "center",
                  "action": {
                    "type": "uri",
                    "uri": "https://www.topnoble.com.tw/hot_164777.html"
                  },
                  "contents": []
                },
                {
                  "type": "separator"
                },
                {
                  "type": "text",
                  "text": "本中心提供社區服務方案",
                  "size": "xs",
                  "flex": 1,
                  "gravity": "bottom",
                  "action": {
                    "type": "uri",
                    "uri": "https://www.topnoble.com.tw/hot_172596.html"
                  },
                  "contents": []
                }
              ]
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "更多消息",
                "uri": "https://www.topnoble.com.tw/hot.html"
              }
            }
          ]
        }
      }`;
};
exports.news = news;
//# sourceMappingURL=NEWS.js.map