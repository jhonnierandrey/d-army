function timeConversion(s){
    let modifier = s.indexOf('A') >= 0 ? 'A' : 'P';

    const [ hour, time] = s.split(modifier)

    let [ hours, minutes, seconds ] = hour.split(':')

    if(hours === '12') hours = '00';

    if(modifier == 'P'){
        hours = parseInt(hours, 10) + 12;
    }
    
    return `${hours}:${minutes}:${seconds}`;
}


let str = '07:05:45PM'

console.log(timeConversion(str))