function capitalize(str) {
	let ans =''
	if(str[0] >= 'a' && str[0] <= 'z'){
		ans += String.fromCharCode(str.charCodeAt(0) - 32)
	} else {
		ans += str[0]
	}
	for(let i=1; i<str.length ; i++){
		ans += str[i]
	}
	return ans
}


console.log(capitalize('hello'))
console.log(capitalize('nick'))
console.log(capitalize('Nick'))
console.log(capitalize(',hello'))