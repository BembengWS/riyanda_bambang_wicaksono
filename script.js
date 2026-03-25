function toggleMenu(){
document.querySelector(".nav-links").classList.toggle("active");
}

const text=["Customer Experience Analyst","Data Enthusiast"];
let i=0,j=0,del=false;

function type(){
let current=text[i];
document.getElementById("typing").textContent=current.slice(0,j);

if(!del){j++;if(j>current.length){del=true;setTimeout(type,1000);return;}}
else{j--;if(j<0){del=false;i=(i+1)%text.length;}}

setTimeout(type,del?50:100);
}
type();
