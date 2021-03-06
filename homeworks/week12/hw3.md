## 請簡單解釋什麼是 Single Page Application
單頁應用是一種網路應用程式或網站的模型，透過動態重寫當前頁面來與使用者互動，不用重新載入整個新的頁面，所有必要的代碼都通過單個頁面的載入、根據需要動態添加到頁面上，可以使網頁不需跳轉頁面就可以達到基本的建立、讀取、修改、刪除資料功能，目前最常採用 Ajax 技術。

## SPA 的優缺點為何
優點：
1. 增進使用者的使用體驗，不必一直跳轉頁面，在單一頁面中可以看完所有資訊，直接又快速
2. 讓使用者像是在使用一款 APP，而不是網頁
缺點：
1. 由於將所有資料放在頁面上而非伺服器中，需要解決 SEO 方面的問題
2. 由於首次載入頁面時，需要先拿到所需的代碼，首次載入時間會比傳統 Web 應用程式載入時間還長
3. 將所有資料放在同一頁面中，URL 網址都沒有改變，需要自訂狀態來做判斷

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？
本週教的內容，當檢視原始碼的時候，並不會看到資料，只會看到一堆程式碼，因為內容都是由執行 JavaScript 之後，動態增加進來的。
之前是透過 PHP 產生一個 HTML 的內容傳到網頁上，由後端產生內容傳到前端，可以在程式碼看到所有產生的內容。