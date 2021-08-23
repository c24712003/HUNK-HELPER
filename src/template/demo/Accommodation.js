"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acco = void 0;
let acco = () => {
    return `{
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://www.topnoble.com.tw/images/product_l_445746.jpg",
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
              "text": "住宿問題",
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
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "房型選擇",
                "uri": "https://www.topnoble.com.tw/product_cg107528.html"
              },
              "height": "sm",
              "style": "link"
            },
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "安全設施",
                "uri": "https://www.topnoble.com.tw/product_cg107526.html"
              },
              "height": "sm",
              "style": "link"
            },
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "內部設施",
                "uri": "https://www.topnoble.com.tw/product.html"
              },
              "height": "sm"
            },
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "外部設施",
                "uri": "https://www.topnoble.com.tw/product_cg107525.html"
              },
              "height": "sm"
            },
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "就醫、看護、空房相關",
                "text": "其他問題"
              },
              "height": "sm"
            }
          ]
        }
      }`;
};
exports.acco = acco;
//# sourceMappingURL=Accommodation.js.map