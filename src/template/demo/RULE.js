"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
let rule = () => {
    return `{
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png",
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
              "text": "疫情資訊",
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
          "spacing": "none",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "機構開放狀況",
                "uri": "https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.6435-9/181102022_4635098433172851_7588613217059839143_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=KwTUSpMojAUAX9H8soL&_nc_ht=scontent.ftpe7-3.fna&oh=f42ae3ee1416503cb3a84a8caccb5852&oe=61480BE9"
              },
              "style": "link"
            },
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "參訪規定",
                "uri": "https://www.topnoble.com.tw/hot_90888.html"
              }
            }
          ]
        }
      }`;
};
exports.rule = rule;
//# sourceMappingURL=RULE.js.map