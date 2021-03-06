## Webpack 是做什麼用的？可以不用它嗎？
Webpack 是一個打包工具，可以將任何資源作引入跟轉換。將很多模組與資源打包成一包檔案，並且幫忙編譯需要預先處理的內容，轉變成瀏覽器看得懂的檔案，然後上傳到伺服器上。
當然，也可以不使用 Webpack，在瀏覽器不支援的東西，寫工具自己支援也可以達到想要的功能，但是 Webpack 可以讓我們在開發的時候使用其他人寫好的模組，不用自己再特地寫一個，而 webpack 最厲害的地方是可以將任何資源都視成一個模組，webpack 定義了許多 loader，不同的資源有不同的 loader，透過 loader 處理將資源載入，例如在 JS 方面，先不管支不支援的問題，可以寫成最新的語法，然後在載入時利用 babel-loader 把語法轉變成你想要的版本。
所以，使用 webpack 可以讓我們更方便的使用各種衍生語法，以及按照功能切成一個個小模組，之後打包各個 js 檔案成一個檔案，可以更方便我們管理以及開發一個新的專案。

## gulp 跟 webpack 有什麼不一樣？
* gulp(task manager)是一套任務管理工具，可以建構自動化的工作流程，管理以及自訂任務，簡化自己的工作量，把重點專注在開發功能上。
* webpack(module bundler)是一套模組整合工具，利用模組化將各種資源打包成能在瀏覽器上執行的程式碼。
gulp 是用來管理及自訂任務流程的工具，而 webpack 則是用來打包各種模組化資源的工具。

## CSS Selector 權重的計算方式為何？
權重優先權，通常越精準的權重越高，其中有幾項規則，
1. 當權重一樣的時候，後面新加上的 css 會覆蓋掉原本所寫的 css。
2. 當兩個選擇器同時作用在同一個元素時，權重高的優先生效

權重優先順序為以下：
inline style > ID > Class選擇器/psuedo-class(偽類)/attribute(屬性選擇器) > Element

而其他選擇器：*、+、>、:not()等，這類的選擇器並不會被計算到 css 的權重當中；其中，:not()本身並不計算權重，但是寫在它裡面的 css Selector 是需要計算權重的。

最後，有一個例外：!important，是不在 css selector的權重計算範圍內的，可以蓋過所有的權重優先生效，所以通常不提倡使用 !important，總是優先考慮使用權重更高的 css selector。