## 什麼是 Ajax？
AJAX(Asynchronous JavaScript and XML) 非同步 JavaScript 與 XML 技術
在原本寫的 JavaScript 都是同步執行，執行到某一行時，會等執行完畢這行，才接著執行下一行，一行一行按照順序執行下去。在非同步中，當你發送了一個 request 出去，並不會等到 response 回來才繼續往下執行，會邊等 response 回來邊執行以下的程序。
需要特別注意的是非同步的 function 不能直接透過 return 將結果傳回來，當非同步的操作完成時，可以透過 callback function 將結果回傳回來。

## 用 Ajax 與我們用表單送出資料的差別在哪？
當我們使用表單送出資料時，瀏覽器會發出 request 到 Server，再回傳 response 到瀏覽器，這時頁面會進行跳轉，每發出一次 request 就會重新載入畫面一次，在這些過程中會耗費許多資源。
但如果使用 JavaScript 發出 Ajax request，這時會變成瀏覽器上的 JavaScript 透過瀏覽器發出 request 給 Server，Server 發出 response 給瀏覽器的 JavaScript，再經由瀏覽器渲染畫面，不必進行換頁也可以拿到 response。

## JSONP 是什麼？
JSON with Padding，是一種資料格式 JSON 的使用模式，可以讓網頁從別的網域取得資料。
由於同源政策，一般來說無法跨網域取得資源，而在 HTML 中的 <img>、<script> 這兩個 Tag 是其中的例外，我們可以使網頁得到其他來源動態產生的 JSON 資料，JSONP 就是利用 <script> 的這個特性來達成跨來源請求的。而使用 JSONP 抓到的資料並不是 JSON，而是任意的 JavaScript，使用 JavaScript 直譯器執行。
在實務操作上，Server 通常會提供一個 callback 的參數讓客戶端帶過去，把 JavaScript 物件整個傳到 function 裡面，就可以在 function 裡面拿到想要的資料。

## 要如何存取跨網域的 API？
在同源政策當中，非同源會被擋下，依此延伸另一個規範叫做 Cross-Origin Resource Sharing(CORS)跨來源資料共享。
如果想開啟跨來源 HTTP 請求的話，需要確保 Server 端在 Response 的 Header 裡面加上Access-Control-Allow-Origin，來取得、存取其他來源（網域）伺服器特定資源的權限。
任何方法都無法跨過 access-controll-allow-origin 來更改存取權限，除非修改到跟網站同源或是 server 端加上 access-controll-allow-origin 的 header。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
在第四週的時候，我們都是透過 node.js 來發出 request，這週是透過瀏覽器來發出 request，而提到的限制都是瀏覽器自動加上的，為了保障其安全性。
