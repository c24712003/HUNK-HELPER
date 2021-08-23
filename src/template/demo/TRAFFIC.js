"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traffic = void 0;
let traffic = () => {
    return `{
        "type": "bubble",
        "direction": "ltr",
        "hero": {
          "type": "image",
          "url": "https://www.topnoble.com.tw/images/product_l_445745.jpg",
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
              "text": "交通資訊",
              "weight": "bold",
              "size": "xl",
              "wrap": true,
              "contents": []
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "spacing": "sm",
          "margin": "xs",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "交通路線",
                "text": "交通路線"
              },
              "color": "#298179FF",
              "style": "primary",
              "gravity": "top"
            }
          ]
        }
      }`;
};
exports.traffic = traffic;
//# sourceMappingURL=TRAFFIC.js.map