"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.item = exports.box = void 0;
let box = () => {
    return `{
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "{~FoodName~}",
              "weight": "bold",
              "size": "{~NameSize~}",
              "margin": "md",
              "wrap": true
            },
            {
              "type": "text",
              "text": "{~Calories~}",
              "size": "xs",
              "color": "#aaaaaa",
              "wrap": true
            },
            {
              "type": "separator",
              "margin": "xxl"
            },
            {
              "type": "box",
              "layout": "horizontal",
              "margin": "md",
              "spacing": "none",
              "contents": [
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                      {~LeftItems~}
                  ]
                },
                {
                  "type": "separator",
                  "margin": "lg"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                      {~RightItems~}
                  ],
                  "paddingStart": "md",
                  "spacing": "none",
                  "offsetStart": "none"
                }
              ]
            },
            {
              "type": "separator",
              "margin": "xxl"
            }
          ]
        },
        "styles": {
          "footer": {
            "separator": true
          }
        }
      }`;
};
exports.box = box;
let item = () => {
    return `{
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "{~Name~}",
            "size": "xxs",
            "color": "#555555"
          },
          {
            "type": "text",
            "text": "{~Value~}",
            "size": "xxs",
            "color": "#111111",
            "align": "end"
          }
        ],
        "margin": "md"
      }`;
};
exports.item = item;
//# sourceMappingURL=MODEL.js.map