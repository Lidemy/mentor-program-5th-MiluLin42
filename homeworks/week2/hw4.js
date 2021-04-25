function printFactor(n) {
    let result =''
    for(let i=1 ; i<=n ; i++) {
        if( n % i === 0){
            console.log(i)
        }
    }
    return
}

printFactor(10);
printFactor(7);
