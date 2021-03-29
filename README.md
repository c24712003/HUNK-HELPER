# HUNK-HELPER

個人健身訓練與飲食紀錄line bot

主要使用工具:

1. Node.js + Heroku (用Node.js建立伺服器端應用程式並發佈於Heroku)
2. Line Message Api (Bot機器人)
3. Line Login + LIFF + Vue(紀錄畫面)
4. Google Firebase (儲存紀錄)
5. Wger Api (申請會員能夠自訂訓練菜單的服務，https://wger.de/en/software/api)
6. MyFitnessPal資料爬蟲(使用puppteer.js)

紀錄今日飲食: (紀錄後會計算主要營養素的攝取情形)

![image](https://github.com/c24712003/HUNK-HELPER/blob/main/recordnurtation.gif)

待實現功能:
1. 體重變化紀錄
2. 每日營養攝取量試算功能(依身高、體重、年齡、性別、運動強度與目前週期(ex:減脂、增肌、維持)做考量)
