## 什麼是 DOM？
Document Object Model簡稱 DOM，文件物件模型，可以把 HTML 文件內的各個標籤，都轉換成物件，而這些物件會形成一個樹狀結構。在 DOM 中，每個 element、文字等等都是一個節點，節點通常又分成以下四種：
1. Document：指的是這份文件，也就是這份 HTML 檔案
2. Element：指的是文件內的各個標籤
3. Text：指的是被各個標籤包起來的文字，意指此 Element 的 text
4. Attribute：各個標籤內的標籤屬性
DOM 是給 HTML 與 XML 文件使用的一組 API，提供了文件的結構表述，其本質是建立瀏覽器與程式語言溝通的橋樑，JavaScript 可以藉由 DOM 提供的 API 去存取並改變HTML架構、樣式和內容。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
事件傳遞機制總共分為三大階段：
* 捕獲階段 (Capture Phase)
* 目標階段 (Target Phase)
* 冒泡階段 (Bubbling Phase)
1. 捕獲階段 (Capture Phase)
  在捕獲階段，DOM 的事件會從祖先層開始往下傳遞到 target尋找目標 (target)。
2. 目標階段 (Target Phase)
  當找到目標的時候，就是目標階段(at_target)，此階段並不屬於捕獲或是冒泡階段。
3. 冒泡階段 (Bubbling Phase)
  循著原路回到祖先層的過程，就是冒泡階段。
這個階段的順序為「先捕獲，再冒泡」
當使用 addEventListener 時，其實有第三個參數，為 Boolean 值，當沒有特別填寫時預設為 false，是將監聽器添加在冒泡階段，true 則是添加在捕獲階段，要注意的是，此參數只會改變監聽位置，並不會阻止事件的傳遞。e.stopPropagation 才可以阻止事件的傳遞，不會再把事件傳遞給下一個節點，但如果同一個節點上有不只一個 listener，還是會執行。

## 什麼是 event delegation，為什麼我們需要它？
Event delegation事件委派，是指利用事件傳遞機制以及單一事件監聽器來處理多個事件目標。
實作方法是將監聽事件綁在 parent 上，藉由 Event Bubbling 傳遞給 child，而非直接將事件綁定在 child 上。優點是可減少監聽器的數目，我們把監聽事件改由父層來監聽，利用事件傳遞的原理，判斷 e.target 是我們要的目標節點時，才去執行後續的動作，這樣的好處是事件管理會非常輕鬆，而後續新增的節點也會有同樣監聽事件的效果，無需另外再重寫一次監聽事件。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
* event.preventDefault取消預設行為：取消瀏覽器的預設行為
* event.stopPropagation取消事件傳遞：取消事件繼續往下傳遞
前者是取消瀏覽器的預設行為，比如說按下提交鍵原本會提交表單，但在此加上此行為先取消提交的動作，可以用來先檢查完表單是否填寫正確，再進行提交的動作，但事件一樣會繼續往下傳遞。值得注意的是，preventDefault 加在哪邊，在其之後傳遞下去的事件也會有其效果。
而取消事件傳遞加在哪邊，事件的傳遞就會在哪邊斷掉，不會讓事件再繼續往下傳遞。假如說，想要阻止頁面上所有的 click 事件的話，可以在 window 物件監聽捕獲階段，來阻止底下的所有元素。當元素綁定多個相同事件時，可以用 e.stopImmediatePropagation() 來阻止所有後面的綁定。