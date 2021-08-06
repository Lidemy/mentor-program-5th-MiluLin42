#### 題目：
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}

#### 輸出結果：
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5

#### 說明：
* 從題目看來，每一個迴圈所做的事情：
  將 console.log('i: ' + i) 這個程序放入 call stack 中，然後 setTimeout 這個非同步的 function 則會被瀏覽器設定為等待 i * 1000 毫秒之後，才會被放入 callback queue 中；如此循環之後，call stack 中，會依序放入 console.log(i) 五個程序，而 callback queue 則會在計時結束之後，被放入 () => { console.log(i) } 五條程序。
* 所以，會先依序輸出 i: 0、i: 1、i: 2、i: 3、i: 4，會先執行完 call stack 中的所有程序。
* 之後 event loop 偵測到 call stack 為空，才會將 callback queue 中的程序放入 call stack。
* 以上，是針對 event loop 方面的說明，之後輪到 Scope 出場了～
* 在迴圈內，有宣告一個變數為 i，而每跑完一圈結束 i 都會 + 1，所以會按照 i 這個變數會按照 0、1、2、3、4 跑完整個迴圈。
* 而此時，輪到 callback queue 中的程序丟回到 call stack 中執行，由於這個 setTimeout 的 function 中，並沒有宣告 i 這個變數，便會往上一層的 function 中尋找，這時候，i 已經跑完整個迴圈，i 也就是 4 + 1 變成 5 了(在跑完第五個迴圈，i 是 4 的時候，印出結果 i 是 4，但迴圈結束後一樣會再 + 1，所以 i 會是 5)，接著便會輸出 i 是 5，總共執行五次。
* 最後有個忘記提到的點，計時器 i * 1000 毫秒的 i，所以在最後嘗試使用程式的執行順序再講一次全部的經過。

以下為執行順序：
1. 執行迴圈，第一圈，設定 i 為 0，檢查 i 是否小於 5，是，將 console.log('i: ' + i) 放入 call stack 中，印出 "i: 0"，跳出堆疊，接著，setTimeout(() => { console.log(i) }, i * 1000) 一樣進入 call stack 中，呼叫 setTimeout 這個 function，瀏覽器設置計時器，等待 0 * 1000 毫秒之後，將 () => { console.log(i) } 放入 callback queue 中等待，迴圈結束，執行 i + 1 = 1。
2. 跑第二圈，此時 i 為 1，檢查 i 是否小於 5，是，將 console.log('i: ' + i) 放入 call stack 中，印出"i: 1"，跳出堆疊，接著，setTimeout(() => { console.log(i) }, i * 1000) 一樣進入 call stack 中，呼叫 setTimeout 這個 function，瀏覽器設置計時器，等待 1 * 1000 毫秒之後，將 () => { console.log(i) } 放入 callback queue 中等待，迴圈結束，執行 i + 1 = 2。
3. 跑第三圈，此時 i 為 2，檢查 i 是否小於 5，是，將 console.log('i: ' + i) 放入 call stack 中，印出"i: 2"，跳出堆疊，接著，setTimeout(() => { console.log(i) }, i * 1000) 一樣進入 call stack 中，呼叫 setTimeout 這個 function，瀏覽器設置計時器，等待 2 * 1000 毫秒之後，將 () => { console.log(i) } 放入 callback queue 中等待，迴圈結束，執行 i + 1 = 3。
4. 跑第四圈，此時 i 為 3，檢查 i 是否小於 5，是，將 console.log('i: ' + i) 放入 call stack 中，印出"i: 3"，跳出堆疊，接著，setTimeout(() => { console.log(i) }, i * 1000) 一樣進入 call stack 中，呼叫 setTimeout 這個 function，瀏覽器設置計時器，等待 3 * 1000 毫秒之後，將 () => { console.log(i) } 放入 callback queue 中等待，迴圈結束，執行 i + 1 = 4。
5. 跑第五圈，此時 i 為 4，檢查 i 是否小於 5，是，將 console.log('i: ' + i) 放入 call stack 中，印出"i: 4"，跳出堆疊，接著，setTimeout(() => { console.log(i) }, i * 1000) 一樣進入 call stack 中，呼叫 setTimeout 這個 function，瀏覽器設置計時器，等待 4 * 1000 毫秒之後，將 () => { console.log(i) } 放入 callback queue 中等待，迴圈結束，執行 i + 1 = 5。
6. 跑第六圈，此時 i 為 5，檢查 i 是否小於 5，否，跳出迴圈。
7. 此時 event loop 偵測到 call stack 為空，而 callback queue 中有程序尚待執行，將佇列中的第一個放入 call stack 中，() => { console.log(i) }，此時自己的作用域裡面沒有 i 這個變數，往上一層找，找到 i 為 5，印出 5，跳出堆疊。
8. event loop 偵測到 call stack 為空，而 callback queue 中有程序尚待執行，將佇列中的第一個放入 call stack 中，() => { console.log(i) }，此時自己的作用域裡面沒有 i 這個變數，往上一層找，找到 i 為 5，印出 5，跳出堆疊。
9. event loop 偵測到 call stack 為空，而 callback queue 中有程序尚待執行，將佇列中的第一個放入 call stack 中，() => { console.log(i) }，此時自己的作用域裡面沒有 i 這個變數，往上一層找，找到 i 為 5，印出 5，跳出堆疊。
10. event loop 偵測到 call stack 為空，而 callback queue 中有程序尚待執行，將佇列中的第一個放入 call stack 中，() => { console.log(i) }，此時自己的作用域裡面沒有 i 這個變數，往上一層找，找到 i 為 5，印出 5，跳出堆疊。
11. event loop 偵測到 call stack 為空，而 callback queue 中有程序尚待執行，將佇列中的第一個放入 call stack 中，() => { console.log(i) }，此時自己的作用域裡面沒有 i 這個變數，往上一層找，找到 i 為 5，印出 5，跳出堆疊。
12. 執行完畢