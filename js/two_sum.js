function twoSum(arr, target){
    // loop through the array
    // looking for matches => current position with the hole array
    // if there is a match ( sum === target ), save current position and the compared position
    // return result ( typeof result === array )

    // N2 notation
    // let result = []
    
    let set = new Set(arr)
    
    // for(let i = 0; i < arr.length; i++ ){
    //     for(let j = 0; j < arr.length; j++){
    //         if( arr[i] + arr[j] === target){
    //             result.push(i);
    //             result.push(j);
    //             return result;
    //         }
    //     }        
    // }

    for(let i = 0; i < arr.length; i++){
        if( set.has(target - arr[i]) ){
           return [ i , arr.indexOf(target - arr[i])] 
        }
    }

    return [];
}

let arr = [2, 7, 11, 15]


console.log(twoSum(arr, 9));