function verifyCard(number){
    let numberForVerification = number.toString().split('');

    if(numberForVerification.length >= 13){
        luhnAlgorithm(numberForVerification.reverse());

        console.log('We can verify the number ' + number);
    }else{
        console.log('We cannot verify the number ' + number);
    }

    console.log(numberForVerification);

}

function luhnAlgorithm(arr){
    for(let i = 2; i < arr.length; i++){
        console.log(i);
    }
}

verifyCard(4003600000000014);
// verifyCard(4003600000);