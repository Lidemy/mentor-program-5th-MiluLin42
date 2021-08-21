#### 題目：
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??

#### 輸出結果：
2
2
undefined

#### 說明：
可以看到題目是直接創造一個物件，並沒有透過物件導向；而 this 的值只跟如何呼叫有關，跟程式碼在哪裡沒有關係。
可以把所有的 function call，都轉成利用 call 的形勢來看，在呼叫 function 以前是什麼東西，就把它放到後面去，這樣題目就可以看成為：
obj.inner.hello() => obj.inner.hello.call(obj.inner)
obj2.hello() => obj2.hello.call(obj2)
hello() => hello.call()
1. obj.inner 的值就是 2，所以會輸出 2
2. 按照上方的方法，可以得知 this 的值會是 obj2，而在呼叫這個函式的環境當中，obj2 亦是 obj.inner，所以一樣會輸出 2
3. hello() 的前面沒有東西，所以沒有傳東西進去，會是預設綁定，所以在嚴格模式下會輸出 undefined，而在非嚴格模式下，會根據環境的不同輸出不同的結果，如果是在瀏覽器中會輸出 Window，在 node.js 中會輸出 global。

在寫說明的時候，一邊在對照筆記的時候突然發現，這題有出現在老師的文章中耶！