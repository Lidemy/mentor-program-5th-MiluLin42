``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])


## 執行流程
1. 現在有一個函式，叫做 isValid，用來檢查陣列中的數字
2. 執行第二行，設定變數 i 是 0 ，檢查 i 是否小於陣列長度，是，繼續執行，開始進入第一個迴圈，
3. 執行第三行，判斷陣列中第 i 個，此時 i 是 0 ，表陣列中第一個數字，是否小於等於 0 ，
   是的話，回傳 'invalid' ，不是的話繼續往下執行
4. 執行第五行，設定變數 i 是 2 ，檢查 i 是否小於陣列長度，是，繼續執行，進入第二個迴圈，
5. 執行第六行，判斷陣列中第 i 個，此時 i 是 2 ，是否不等於陣列中第(i - 1)個加上第(i - 2)個數字，
   是的話回傳 'invalid' ，
6. 如果以上條件都不符合，執行第八行，回傳 'valid' ，
7. 執行完畢