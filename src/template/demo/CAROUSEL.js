"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carousel = void 0;
let carousel = () => {
    return `{
        "type": "carousel",
        "contents": [
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://www.topnoble.com.tw/images/corpimg.png",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "最新消息、 疫情資訊",
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "message",
                    "label": "疫情資訊",
                    "text": "疫情資訊"
                  },
                  "color": "#298179FF",
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "message",
                    "label": "最新消息",
                    "text": "最新消息"
                  },
                  "color": "#298179",
                  "style": "primary"
                }
              ]
            }
          },
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://scontent.ftpe7-1.fna.fbcdn.net/v/t31.18172-8/13416991_824447890990744_6699909046844326814_o.jpg?_nc_cat=110&ccb=1-5&_nc_sid=e3f864&_nc_ohc=rFBYyR0I8AYAX87HnCh&_nc_ht=scontent.ftpe7-1.fna&oh=92b0b6ddfd5980e6a09ad24a4f0c4985&oe=61472E49",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "住宿問題、 交通資訊",
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "message",
                    "label": "住宿問題",
                    "text": "住宿問題"
                  },
                  "color": "#298179FF",
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "交通資訊",
                    "uri": "https://www.topnoble.com.tw/info.html"
                  },
                  "color": "#298179",
                  "style": "primary"
                }
              ]
            }
          },
          {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://www.topnoble.com.tw/skin/banner.jpg",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "費用計算",
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true,
                  "contents": []
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "月費與保證金",
                    "uri": "https://www.topnoble.com.tw/custom.html"
                  },
                  "color": "#298179FF",
                  "style": "primary"
                },
                {
                  "type": "button",
                  "action": {
                    "type": "uri",
                    "label": "雜項費用",
                    "uri": "https://www.topnoble.com.tw/custom_51199.html"
                  },
                  "color": "#298179FF",
                  "style": "primary"
                }
              ]
            }
          }
        ]
      }`;
};
exports.carousel = carousel;
//# sourceMappingURL=CAROUSEL.js.map