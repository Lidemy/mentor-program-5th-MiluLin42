//接收兩個參數,一個陣列跟一個字串,會在陣列的每個元素中間插入一個字串,最後回傳
function join(arr, concatStr) {
    let ans =''
    for(let i=0 ; i<arr.length ; i++){
    ans+= arr[i] + concatStr
    return ans
    }
}

//回傳重複n次之後的字串
function repeat(str, times) {
    let ans =''
    for(let i=1 ;i<=times ;i++){
    ans += str
    }
    return ans
}
    

console.log(join([1, 2, 3], ''));
console.log(join(["a", "b", "c"], "!"));
console.log(join(["a", 1, "b", 2, "c", 3], ','));
console.log(join(['a'], '!'));
console.log(repeat('a', 5));
console.log(repeat('yoyo', 2));
