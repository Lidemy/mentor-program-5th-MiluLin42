## 請以自己的話解釋 API 是什麼
API(Application Programming Interface)應用程式介面，一般而言，API 是指各種軟體組件之間一套被明確定義的溝通方式，其中最重要的是「介面」這個含意，指的是雙方交換資料的媒介。
如果要用實體物品來比喻，就像是電器的按鈕，假如我今天早上起床之後，想泡一杯咖啡來喝，我會按下咖啡機的按鈕，選擇我要喝什麼種類的咖啡、咖啡的濃淡、要不要加奶泡，這些功能的與否取決於自身咖啡機所提供的按鈕，如果咖啡機上沒有的按鈕，代表他沒有提供你這功能的選擇，比較簡樸的咖啡機，你只能直接沖泡咖啡。而這時候，咖啡機上的按鈕就類似於 API ，它可以接收我的 request: 泡一杯咖啡，然後按照我的請求請咖啡機幫我沖泡一杯咖啡，接著我就有一杯香濃的咖啡可以喝了，而這杯咖啡就是 response。


## 請找出三個課程沒教的 HTTP status code 並簡單介紹
1. 414 URI Too Long
   客戶端的 URI 請求超過伺服器願意解析的長度。
2. 505 HTTP Version Not Supported
   請求使用的 HTTP 版本不被伺服器支援。
3. 413 Payload Too Large
   請求的實體資料大小超過了伺服器定義的上限，伺服器可能會關閉連接或返回"Retry-After"的標題字段。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

API文件
******
Base URL: http://lidemy-Restaurant.com
使用說明
| 說明 | Method | path | 參數 | 範例 |
|:----:|:----:|:----:|:----:|:----:|
|獲取所有餐廳|GET|/restaurant|_limit:限制回傳資料數量|/restaurant?_limit=2|
|獲取單一餐廳|GET|/restaurant/:id|無|/restaurant/2|
|新增餐廳|POST|/restaurant|name:餐廳名稱|無|
|刪除餐廳|DELETE|/restaurant/:id|無|無|
|更改餐廳資訊|PATCH|/restaurant/:id|name:餐廳名|無|
