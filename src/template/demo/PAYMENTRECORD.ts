export let paymentrecord = () => {
  return `{
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "contents": [
            {
              "type": "text",
              "text": "繳費紀錄",
              "weight": "bold",
              "color": "#30C50EFF",
              "style": "normal",
              "contents": []
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": "{~Name~}",
                  "weight": "bold",
                  "size": "xl",
                  "offsetStart": "3px",
                  "contents": []
                }
              ]
            },
            {
              "type": "text",
              "text": "測量日期: {~Date~}",
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
              "offsetTop": "3px",
              "backgroundColor": "#BCB4B400",
              "borderColor": "#AD6B6B00",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "none",
                  "contents": [
                    {
                      "type": "text",
                      "text": "計費區間",
                      "size": "md",
                      "margin": "sm",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "{~DateRange~}",
                      "size": "xxs",
                      "color": "#060303FF",
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
                      "type": "text",
                      "text": "本月應收金額",
                      "flex": 0,
                      "margin": "sm",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "TWD {~Price~}",
                      "size": "sm",
                      "color": "#000000FF",
                      "align": "end",
                      "contents": []
                    }
                  ]
                }
              ]
            },
            {
              "type": "separator",
              "margin": "lg"
            },
            {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "offsetTop": "3px",
              "backgroundColor": "#BCB4B400",
              "borderColor": "#AD6B6B00",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "margin": "none",
                  "contents": [
                    {
                      "type": "text",
                      "text": "繳費日期",
                      "size": "md",
                      "margin": "sm",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "{~PaymentDate~}",
                      "size": "md",
                      "color": "#D54E4EFF",
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
                      "type": "text",
                      "text": "繳費方式",
                      "size": "sm",
                      "flex": 0,
                      "margin": "sm",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": "{~PaymentMethod~}",
                      "size": "sm",
                      "color": "#000000FF",
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