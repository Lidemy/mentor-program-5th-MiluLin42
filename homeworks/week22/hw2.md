## 請列出 React 內建的所有 hook，並大概講解功能是什麼
根據官方文件，React 中內建的所有 hook 如下：
* 基礎的 Hook
  * useState：
    用來設定 component 的 state，可透過 setState 來更新 state，state 一旦改變，就會觸發 React 去重新渲染畫面
  * useEffect：
    用來告訴 component 在 render 之後要做的事，第一個參數帶入的 function 會在 render 完成後被呼叫，第二個參數傳入陣列，用來放關注的資料，只要發生改變就會呼叫 useEffect
  * useContext：
    解決跨多層傳遞資料的問題。讓父層的資料能夠在底下的任意子層中存取，不需要像 props 每一層傳遞，避免 props drilling；用 react.createContext 建立 context 物件，由 MyContext.Provider value={} 存取該物件的值，底下的子層就可以直接透過 useContext 來存取 MyContext
* 額外的 Hook
  * useReducer：
    useState 的替代方案，需要操作多種 state 時可使用。
    接收一個 (state, action) => newState 的 reducer，然後回傳現在的 state 以及其配套的 dispatch 方法。
  * useCallback：
    用來記憶父元件的記憶體位置，避免在重新渲染的時候被重新分配。
    在重新渲染時，只會在依賴改變時才更新，防止不必要的渲染，減少效能上的消耗
  * useMemo：
    當 component 重新渲染時，能避免複雜的程式被重複執行。
    在重新渲染時，傳到 useMemo 的 function 就只會在依賴改變時才執行，將 memoized 更新成回傳的值
  * useRef：
    用來抓取 DOM 節點，存放的值不會受到 render 影響。
    當 .current 屬性有變動時不會觸發重新渲染，而每次 render 時都會給同一個 ref 物件
  * useImperativeHandle：
    可以在父層調用子層中的 ref，選取指定的 DOM 節點。
    傳入第一個參數是接收的 ref，第二個參數是傳給父層的方法
  * useLayoutEffect：
    其功能與 useEffect 相似，差別在於 useLayoutEffect 會在 render 之前執行。
  * useDebugValue：
    可用來在 React DevTool 中顯示自定義的 hook 標籤
## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點
在 class-based component 中有提供幾個內建函式，而每個函式代表著 component 的某個階段(時間點)，組在一起就是所謂的 Lifecycle，可以讓開發者掌控一個 component 的生命週期。
Lifecycle Methods 可以分為三大類：
1. Mounting - 裝載，當元件被加入到 DOM 中時會觸發
2. Updating - 更新，當元件的 props 或 state 更新，重新渲染 (re-rendered) DOM 時會觸發
3. Unmounting - 卸載，當元件要從 DOM 中被移除時會觸發
Error Handling - 例外處理，當元件發生 JavaScript errors 時會觸發

### Mounting Lifecycle Methods
React 目前提供這些 Mounting 階段的方法：
* constructor()
* static getDerivedStateFromProps()
* componentWillMount()
* render()
* componentDidMount()
#### constructor(props)
  會在元件還沒被掛載到 DOM 之前先被執行來做初始化。
#### render()
  在每次 props 或是 state 改變時，都會被執行一次。會根據當前 this.props 及 this.state 的資料狀態，來決定該元件當前的 UI 結構和顯示內容。
#### componentDidMount()
  會在元件被掛載到 DOM 後被執行，也就是說元件已經實際存在畫面中，任何需要 DOM 或會 Asynchronous 更新 state 狀態的操作都適合放在 componentDidMount() 做。如 ajax API 串接或綁定 DOM 事件都會在這個函式中執行。
#### static getDerivedStateFromProps(props, state)
  會在「每一次」跑 render() 之前被呼叫執行。
  執行時會傳入當前的 props 和 state，執行後需要返回一個物件 (object) 來表示欲更新的 state 或返回 null 表示不更新。
#### componentWillMount()
  只會執行一次，會在元件被掛載到實際的 HTML DOM 之前被呼叫執行。
  會在第一次的 render() 執行之前就先被執行，所以不能在 componentWillMount() 中做跟 DOM 有關的操作。

### Updating Lifecycle Methods
React 目前提供這些 Updateing 階段的方法：
* componentWillReceiveProps()
* static getDerivedStateFromProps()
* shouldComponentUpdate()
* componentWillUpdate()
* render()
* getSnapshotBeforeUpdate()
* componentDidUpdate()
#### componentWillReceiveProps(nextProps)
  在每次元件接收到 props 更新時被執行，通常會在當中關注 props 的改變來更新元件對應的 State 值
#### shouldComponentUpdate(nextProps, nextState)
  用來想提升最佳化效能 (performance) 時使用，每當 Props 或 State 有更新時，React 會在 call render() 重繪畫面之前，先 call shouldComponentUpdate()，用以決定是否真的需要 render()。
#### componentWillUpdate(nextProps, nextState)
  會在元件準備更新、執行 render() 之前被執行。
  有可能會被執行好幾次，所以要避免有任何 side effect 的 code 寫在裡面，也禁止有任何會更新到元件的動作，如果會更新到 State 請用 getDerivedStateFromProps。
#### getSnapshotBeforeUpdate(prevProps, prevState)
  會在畫面實際渲染 (rendered) 前一刻被呼叫執行，觸發的時機點是在 React 進行修改前，通常是更新 DOM 前。
  被執行後 return 的值會被傳進 componentDidUpdate 的第三個參數。通常用在紀錄畫面準備修改前的當下狀態，像是 scroll position。
#### componentDidUpdate(prevProps, prevState, snapshot)
  會在元件更新完成、執行完 render() 重繪後被執行。而每一次元件更新時，React 確保 componentDidUpdate() 只會被執行一次。
  元件第一次 render() 時，React 並不會 call componentDidUpdate()。

### Unmounting Lifecycle Methods
React 提供這些 Unmounting 階段的方法：
* componentWillUnmount()
#### componentWillUnmount()
component 要被移除的時候會執行此函式，可以做清除綁定 eventlistener，或清除 cookie、local storage 等機制，不過在這裡執行 setState 不會觸發 re-render。

### Error Handling Lifecycle Methods
除了以上三大類方法以外，React 還提供例外處理的方法：
* componentDidCatch()
#### componentDidCatch(error, info)
React 在 V16 版後新增了錯誤邊界 (Error Boundary) 的概念。
用來捕捉從子元件中拋出的錯誤，避免因為一個小元件發生意外錯誤就造成整個頁面掛掉，讓錯誤不會影響到邊界外層的父元件，你可以在 componentDidCatch() 決定這個例外錯誤該怎麼處理，像是 fallback UI。

## 請問 class component 與 function component 的差別是什麼？
Class component
* 需繼承 React.Component
* 具有生命週期，可以針對某些情境決定是否渲染，ex shouldComponentUpdate()
* 具有 state (Stateful component)
* 需要實作 render 方法
* 擁有 this
* 每次都可以拿到最新的 this.props，因為 this 隨時都在變化
* 提供許多 lifecycle methods，方便管理較複雜的 component 狀態

Functional component
* 可以用 arrow function 宣告或是一般的function
* 沒有 this
* 透過閉包的形式來管理狀態的 function component，props 一直會是原本傳進來的那個，並不會隨之更新
* 生命週期的方法，是以 useEffect 來決定 render 要做的事情
* 把許多 method 都寫在 function 中，本身像是 render function，較容易抽出共同邏輯，或是進行模組化測試

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？
在 React 中表單元素的處理主要可以分成兩種 Controlled 和 Uncontrolled 這兩種， 指的是資料有沒有受到 React 所控制
* Controlled：受 React 所控制的資料
* Uncontrolled：不受 React 所控制的資料
在 React 中，我們可以把表單內，使用者輸入的資料交給 React 處理，在使用者輸入資料的同時驗證使用者輸入內容的有效性，並做畫面的更新（例如，輸入內容有誤時跳出提示訊息等）。
相對地，如果不把表單資料交給 React，而是像之前一樣，選取到該表單元素後，才從該表單元素取出值的這種做法，就稱作 Uncontrolled Components，也就是不受 React 控制的資料。

如果要將資料交給 React 處理，先透過 useState 來建立保存資料狀態的地方，接著在表單元素上使用 onChange 事件來監聽使用者輸入的資料，並且當事件觸發時呼叫 handleChange 這個函式，接著，定義 handleChange 函式，當使用者輸入資料時，把資料內容透過 setState 更新 React 內部的資料狀態。

如果只是想要簡單的去取得表單中某個欄位的值，或者是需要直接操作 DOM，便可以使用 Uncontrolled component。若是想要在 React 中選取到某一元素時，就可以使用 useRef 這個 React Hooks。在 useRef 內可以放入一個預設值(initialValue)，useRef 會回傳一個物件(refContainer)，不會隨著每一次畫面重新渲染而指到不同的物件，而是可以一直指到同一個物件。在回傳的物件中，透過 refContainer.current 屬性可以取得預設值或更動後的值。
如果是要把 useRef 當成 document.querySelector 來選取到某一元素的話，可以在該 HTML 元素上使用 ref 屬性，並把 useRef 回傳的物件放進去即可。