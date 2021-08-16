export let healthcare = () => {
    return `{
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "action": {
            "type": "uri",
            "label": "Action",
            "uri": "https://linecorp.com"
          },
          "contents": [
            {
              "type": "text",
              "text": "{~Name~}",
              "weight": "bold",
              "size": "xl",
              "contents": []
            },
            {
              "type": "text",
              "text": "測量日期: {~DateTime~}",
              "size": "xxs",
              "color": "#AAAAAA",
              "wrap": true,
              "contents": []
            },
            {
              "type": "separator"
            },
            {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "offsetTop": "10px",
              "backgroundColor": "#BCB4B400",
              "borderColor": "#AD6B6B00",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://img.icons8.com/fluency/48/000000/star.png"
                    },
                    {
                      "type": "text",
                      "text": "體溫",
                      "weight": "bold",
                      "margin": "sm",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "{~Temperature~}",
                      "size": "sm",
                      "color": "#AAAAAA",
                      "align": "end",
                      "contents": []
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://img.icons8.com/fluency/48/000000/star.png"
                    },
                    {
                      "type": "text",
                      "text": "脈搏",
                      "weight": "bold",
                      "flex": 0,
                      "margin": "sm",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "{~Pulse~}",
                      "size": "sm",
                      "color": "#AAAAAA",
                      "align": "end",
                      "contents": []
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://img.icons8.com/fluency/48/000000/star.png"
                    },
                    {
                      "type": "text",
                      "text": "呼吸",
                      "weight": "bold",
                      "margin": "sm",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "{~Breathe~}下/分鐘",
                      "size": "sm",
                      "color": "#AAAAAA",
                      "align": "end",
                      "contents": []
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://img.icons8.com/fluency/48/000000/star.png"
                    },
                    {
                      "type": "text",
                      "text": "收縮壓",
                      "weight": "bold",
                      "margin": "sm",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "{~Shrinkage~}mmhg",
                      "size": "sm",
                      "color": "#AAAAAA",
                      "align": "end",
                      "contents": []
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://img.icons8.com/fluency/48/000000/star.png"
                    },
                    {
                      "type": "text",
                      "text": "動態血氧飽和度",
                      "weight": "bold",
                      "margin": "sm",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "{~BloodOxygen~}%",
                      "size": "sm",
                      "color": "#AAAAAA",
                      "align": "end",
                      "contents": []
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "paddingBottom": "30px",
                  "contents": [
                    {
                      "type": "icon",
                      "url": "https://img.icons8.com/fluency/48/000000/star.png"
                    },
                    {
                      "type": "text",
                      "text": "舒張壓",
                      "weight": "bold",
                      "margin": "sm",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "{~DiastolicBloodPressure~}mmhg",
                      "size": "sm",
                      "color": "#AAAAAA",
                      "align": "end",
                      "contents": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      }`
}