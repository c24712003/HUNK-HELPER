export let acco = () => {
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
      }`
};

export let elseQ = () => {
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
              "text": "就醫、看護相關問題",
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
                "label": "入住流程",
                "uri": "https://www.topnoble.com.tw/hot_91065.html"
              },
              "height": "sm",
              "style": "link"
            },
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "專業服務",
                "uri": "https://www.topnoble.com.tw/hot_164777.html"
              },
              "height": "sm",
              "style": "link"
            },
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "詢問我們了解更多",
                "text": "聯絡方式"
              },
              "height": "sm",
              "style": "link"
            }
          ]
        }
      }`;
};

export let phone = () => {
    return `{
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "label": "Line",
            "uri": "https://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "聯絡方式",
              "weight": "bold",
              "size": "xl",
              "contents": []
            },
            {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "margin": "lg",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Line ID : ",
                      "size": "md",
                      "color": "#100F0FFF",
                      "flex": 2,
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "a48710466",
                      "weight": "bold",
                      "size": "md",
                      "color": "#000000FF",
                      "flex": 5,
                      "wrap": true,
                      "contents": []
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "手機 : ",
                      "size": "md",
                      "color": "#100F0FFF",
                      "flex": 2,
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "0935300049",
                      "weight": "bold",
                      "size": "md",
                      "color": "#000000FF",
                      "flex": 5,
                      "wrap": true,
                      "contents": []
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "市話 : ",
                      "size": "md",
                      "color": "#100F0FFF",
                      "flex": 2,
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "02-2896-5555",
                      "weight": "bold",
                      "size": "md",
                      "color": "#000000FF",
                      "flex": 5,
                      "wrap": true,
                      "contents": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "flex": 0,
          "spacing": "sm",
          "contents": [
            {
              "type": "spacer",
              "size": "sm"
            }
          ]
        }
      }`
}