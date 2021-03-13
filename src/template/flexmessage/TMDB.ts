export let tmdb = () => {
  return `{"type": "bubble",
        "hero": {
          "type": "image",
          "url": "{~Image~}",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "https://www.themoviedb.org/movie/{~ID~}?language=zh-TW"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "原標題",
                      "color": "#aaaaaa",
                      "size": "sm",
                      "flex": 1
                    },
                    {
                      "type": "text",
                      "text": "{~OriginalTitle~}",
                      "wrap": true,
                      "size": "sm",
                      "color": "#666666",
                      "flex": 4
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
                      "text": "標題",
                      "color": "#aaaaaa",
                      "size": "sm",
                      "flex": 1
                    },
                    {
                      "type": "text",
                      "text": "{~Title~}",
                      "wrap": true,
                      "color": "#666666",
                      "size": "sm",
                      "flex": 4
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
                      "text": "評分",
                      "color": "#aaaaaa",
                      "size": "sm",
                      "flex": 1
                    },
                    {
                      "type": "text",
                      "text": "{~Vote~}",
                      "wrap": true,
                      "color": "#666666",
                      "size": "sm",
                      "flex": 4
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
                      "text": "發表時間",
                      "color": "#aaaaaa",
                      "size": "sm",
                      "flex": 1
                    },
                    {
                      "type": "text",
                      "text": "{~ReleaseDate~}",
                      "wrap": true,
                      "color": "#666666",
                      "size": "sm",
                      "flex": 4
                    }
                  ]
                }
              ]
            }
          ]
        }
      }`
}