## 為什麼我們需要 Redux？

在原本的 React 中，每一個 component 都有各自的 state，但隨著專案越來越大，不同的 component 之間可能會共用同一個 state，state 的管理會變得越來越複雜，Redux 可以利用 store，將所有的 state 存在所有 component 的最上層，這樣一來，所有的 state 便可以從最上層開始往下傳遞到每一個 component 中，當你想要資料的時候就從最上層的 store 中拿取，保證資料的一致性、也保持資料單向流。
不過當專案規模不大的時候，使用 Redux 可能會稍嫌複雜，這時候也可以選擇不使用 Redux，但如果一開始使用了 Redux，也不必擔心之後專案規模越來越大之後，資料會變得難以管理。
不只在 React 當中可以使用 Redux，可以將 Redux 視為一種「架構」，在不同的、想要用上這套概念的語言中，也可以利用 Redux 這套資料管理機制幫助開發。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

Redux 是個全域的狀態管理物件。讓開發者可以在 JavaScript 應用程式建立一個而且唯一的資料管理容器，用來集中式的管理資料，這個資料管理容器又稱為 Store (倉庫)，主要由 State、Action、Reducer 組成。

- Store：將所有 state 放在一個全局的 store 中，只會有一個 store。
- State：用來儲存整個應用程式的資料，由一個單一的 Object Tree 構成，以遵循 Single Source of Truth 原則。
- Action：要改變 State 唯一的方式就是指派一個 Action，而 Action 本身就只是一個 Object，所以 Action 並不會直接修改到 State，而是交由 Reducer 來處理。
- Reducer：Reducer 是一個 Pure Function，能夠取得當前的 State 和被指派的 Action，並且回傳一個新的 State。

Redux 架構圍繞著嚴格的單向資料流
要改變 state 就要 dispatch 一個 action，action 到 reducer 之後會產生新的 state，才可以改變 state。

## 該怎麼把 React 跟 Redux 串起來？

- 在 React 專案中安裝 Redux 套件：
  npm install --save react-redux
- 安裝 create-react-app + redux：
  npx create-react-app my-app --template redux
- 在已有的 react-app 當中安裝 Redux：
  npm install react-redux

之後，在專案資料夾當中，可以開始設置 redux 架構：

1. 在主要的 index.js 當中，利用 Provider 使得 App 中的 component 都可以取得 store：
   import { Provider } from 'react-redux';
   render(
   <Provider store={store}>
   <App />
   </Provider>,
   document.getElementById('root')
   )
2. 新增一個 redux 資料夾，底下新增 store.js 檔案，創建我們的 store：
   import { createStore } from "redux";
   import rootReducer from "./reducers";
   export default createStore(rootReducer);
3. 在 redux 資料夾底下，新增 actions.js 檔案
4. 在 redux 資料夾底下，新增一個 reducers 的資料夾，創建一個想要的 Reducer 檔案(ex: todos.js)：
   設定初始 state 值，以及各個 action 對應的 reducer function
5. 在 reducers 資料夾中，創建一個 index.js 檔案，可以將所有 reducers 結合起來、export 使用。
