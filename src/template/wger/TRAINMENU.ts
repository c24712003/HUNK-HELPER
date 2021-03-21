export let trainbox = () => {
  return `{
        "type": "bubble",
        "size": "giga",
        "header": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "{~MenuName~}",
                  "color": "#ffffff",
                  "size": "xl",
                  "flex": 4,
                  "weight": "bold"
                }
              ]
            }
          ],
          "paddingAll": "20px",
          "backgroundColor": "#0367D3",
          "spacing": "md",
          "height": "80px",
          "paddingTop": "8%"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "{~TrainDate~}",
              "color": "#b7b7b7",
              "size": "md"
            },
            {~TrainItem~}
          ]
        }
      }`;
}

export let trainitem = () => {
  return `{
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "filler"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [],
                "cornerRadius": "30px",
                "height": "24px",
                "width": "24px",
                "borderColor": "{~CircleColor~}",
                "borderWidth": "2px"
              },
              {
                "type": "filler"
              }
            ],
            "flex": 0
          },
          {
            "type": "text",
            "text": "{~ItemName~}",
            "gravity": "center",
            "flex": 2,
            "size": "md"
          }
        ],
        "spacing": "lg",
        "cornerRadius": "30px",
        "margin": "xl"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "{~ItemSets~}",
            "gravity": "center",
            "flex": 0,
            "size": "sm",
            "wrap": true,
            "weight": "regular",
            "margin": "sm",
            "decoration": "none",
            "offsetStart": "10%"
          },
          {
            "type": "filler"
          }
        ],
        "flex": 5
      }
    ]
  }`;
}