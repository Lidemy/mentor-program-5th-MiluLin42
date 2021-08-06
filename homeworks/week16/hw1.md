#### 題目：
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)

#### 輸出結果：
1
3
5
2
4

#### 說明：
在程序執行的時候，會將執行程序丟到 call stack 裡面，按照執行順序一一執行，而 call stack 同一時間只能執行一件事情，非同步的程序會被瀏覽器丟到另一個 thread 中，所以可以預想，現在 call stack 裡面會依序放入 console.log(1)、console.log(3)、console.log(5)，而 setTimeout 是非同步的 function，就會被瀏覽器放入到另外一個 thread 中，瀏覽器會設定一個計時器，等待 0 秒之後，才會將 () => { console.log(2) } 丟到 callback queue 中等待，同理，() => { console.log(4) } 也會在等待 0 秒之後，才被放入 callbakc queue 當中，這時候，event loop 會不斷偵測 call stack 是否為空，等到執行完 call stack 裡面的所有程序，才會將 callback queue 的事件丟回到 call stack 執行，所以會先印出 1、3、5，這三個在 call stack 中的程序，之後才會再把 () => { console.log(2) }、() => { console.log(4) } 丟回到 call stack 當中執行，才接著印出 2、4。