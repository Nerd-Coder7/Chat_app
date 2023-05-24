var date = new Date().toLocaleDateString();
var time = new Date().toLocaleTimeString();

const id= setInterval(()=>{
    
    console.log("hii")
    
},1000)
if(time.split(":")[1]==47){
clearInterval(id)}


console.log(date,time.split(":")[1]);