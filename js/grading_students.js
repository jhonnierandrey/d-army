function gradingStudents(grades){
    let newGrades = []

    for(let i = 0; i < grades.length; i++){
        if( grades[i] < 38 ){
            newGrades.push(grades[i])
        }else{
            let nextMul = grades[i]
            while( nextMul % 5 ){
                nextMul++
            }

            if((Math.abs(grades[i] - nextMul)) < 3){
                newGrades.push(nextMul)
            }else{
                newGrades.push(grades[i])
            }
        }
    }

    return newGrades
}

let grades = [73, 67, 38, 33]

console.log(grades)
console.log(gradingStudents(grades))