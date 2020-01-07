let clearScore= document.querySelector("#clear-score");
let storageItem=[];

storageItem= JSON.parse(localStorage.getItem("person"));

if(storageItem!= null){
    storageItem.sort(function(a,b){
        return parseFloat(b.score) - parseFloat(a.score);
    });

    for (let i=0;i<storageItem.length;i++){
        let name="";

        let item= document.createElement("p");
        name+=(i+1)+"."+ storageItem[i].init+ " --- "+ storageItem[i].score;
        item.textContent=name;
        high.appendChild(item);
        
    }
}

clearScore.addEventListener("click",function(){
    high.innerHTML="";
    localStorage.clear();
});


