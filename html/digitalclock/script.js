let c = document.querySelector(".clock");
let d = document.querySelector(".date");

setInterval(()=>{
    let today = new Date();
    let hh = today.getHours();
    let mm = today.getMinutes();
    let ss = today.getSeconds();
    let date = today.toDateString();


    c.innerText =`${padding(hh)} : ${padding(mm)} : ${padding(ss)}`;
    d.innerText = date;
}, 1000);

function padding(n){
    return n.toString().padStart(2, "0")
}