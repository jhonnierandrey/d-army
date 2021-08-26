function diagonalDiff(arr) {

    let matrix = arr.length;
    let diagA = 0;
    let diagB = 0;

    for(let i = 0; i < matrix; i++){
        for(let j = 0; j < matrix; j++){
            if( i == j){
                diagA += arr[i][j]
            }

            if(i + j === matrix - 1){
                diagB += arr[i][j]
            }
        }
    }
    
    return Math.abs(diagA - diagB)
}

let array = [
    [11, 2, 4],
    [4, 5, 6],
    [10, 8, -12]
]

console.log(diagonalDiff(array))