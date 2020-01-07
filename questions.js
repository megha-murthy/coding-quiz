let start= document.querySelector("#start");
let landing= document.querySelector(".landing");
let divOne= document.querySelector(".content");
let result= document.querySelector(".result");
let question= document.querySelector(".question");
let answerContainer= document.querySelector(".answer-container");
let ul=document.querySelector("#ans-cont");
let para= document.querySelector("#para-q");
let timer= document.querySelector("#timer");
let score= document.querySelector("#final-score");
let allDone= document.querySelector(".all-done");
let questionIndex= document.querySelector(".question-index");
let qa= document.querySelector(".qa");
let highScores=document.querySelector(".high-scores");
let high=document.querySelector("#high");
let clear=document.querySelector("#clear");



let qCount=0;
let correctCount=0;
let incorrectCount=0;

let formDiv;
let submitButton;
let time;
let sec;
let input;
//let data=[];
let obj;
let label;
let counterVar=1;
let newDiv;
let sepDiv;


let questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Inside which HTML element where do we put the JavaScript?",
      choices: ["<javascript>", "<scripting>", "<script>", "<js>"],
      answer: "<script>"
    },
    {
        title: "How to write an IF statement in JavaScript",
        choices: ["if i=5 then", "if(i==5)", "if(i==5) then", "if i=5"],
        answer: "if(i==5)"
    },
    {
        title: "Which of the following is the correct syntax to display “Hello” in an alert box using JavaScript?",
        choices: ["alertbox(“Hello”)", "msg(“Hello”)", "msgbox(“Hello”)", "alert(“Hello”)"],
        answer: "alert(“Hello”)"
    },
    {
        title: "The external JavaScript file must contain <script> tag. True or False?",
        choices: ["True", "False"],
        answer: "False"
    },
    {
        title: "Which function of an Array object calls a function for each element in the array?",
        choices: ["forEach()", "every()", "forEvery()", "each()"],
        answer: "forEach()"
    },
    {
        title: "What is the JavaScript syntax for printing values in Console?",
        choices: ["<javascript>", "<scripting>", "<script>", "<js>"],
        answer: "<script>"
    },
    {
        title: "What is the method in JavaScript used to remove the whitespace at the beginning and end of any string ?",
        choices: ["strip()", "trim()", "stripped()", "trimmed()"],
        answer: "trim()"
    },
    {
        title: "How do you declare a JavaScript variable?",
        choices: ["v carName", "var carName", "variable carName"],
        answer: "var carName"
    }


  ];

function startQuiz(){
    event.preventDefault();

    sec=15*(questions.length);
    time=setInterval(function(){
        timer.innerHTML=sec;
        sec--;
        if( sec===-1){
            clearInterval(time);
            //alert("Time Out!");
        }
    },1000);
    
    nextQuestion();
}




function nextQuestion(){
    //debugger;
    divOne.innerHTML="";
    result.innerHTML="";

    if (qCount<questions.length && counterVar!=0){
        ul.innerHTML="";
        let ques= questions[qCount].title;
        para.textContent=ques;
        

        for(let j=0;j<questions[qCount].choices.length;j++){
            let li= document.createElement("li");
            li.setAttribute("id",j)
            li.setAttribute("style","background-color: wheat;width:130px;margin-bottom:10px;padding:5px;border-radius:5px;height:20px;")
            li.textContent=questions[qCount].choices[j]; 
            ul.appendChild(li);
        }

    }
    else{
        //event.preventDefault();
        clearInterval(time);

        questionIndex.innerHTML="";
        // divOne.innerHTML="";
        // result.innerHTML="";

        newDiv= document.createElement("div");
        newDiv.setAttribute("id","new-div");

        allDone.appendChild(newDiv);
        
        let paraOne=document.createElement("h2");
        paraOne.textContent="All Done!";
        newDiv.appendChild(paraOne);

        let newPara= document.createElement("h4");
        newPara.textContent= "Your final score is:  ";
        newDiv.appendChild(newPara);

        let spanTag= document.createElement("span");
        spanTag.setAttribute("id", "score-span");
        spanTag.textContent= correctCount;
        newPara.appendChild(spanTag);


        formDiv= document.createElement("form");
        formDiv.setAttribute("style","margin-right:30px;margin-top:30px;margin-bottom:30px;")
        allDone.appendChild(formDiv);
        label= document.createElement("label");
        
        label.textContent="Enter initials: "
        formDiv.appendChild(label);
        let input= document.createElement("input");
        input.setAttribute("type","text");
        input.setAttribute("id", "one");
        formDiv.appendChild(input);

        sepDiv= document.createElement("span");
        allDone.appendChild(sepDiv);
        submitButton= document.createElement("button");
        submitButton.setAttribute("id","submit");

        submitButton.setAttribute("onclick",'viewHighscores()');
        submitButton.textContent= "Submit";
        submitButton.setAttribute("style","background-color:blue; width:100px; height: 30px; color:white")
        sepDiv.appendChild(submitButton);
        
    }
 

}


function clickAnswer(){
    //debugger;
    if (event.target.matches("li")===true){
        var index= event.target.getAttribute("id");
    
        if (questions[qCount].choices[index]===questions[qCount].answer){
            result.textContent="Correct!";  
            result.setAttribute("style","color:green;")
            correctCount++;
        }
        else{ 
            //debugger;       
            result.textContent="Incorrect";  
            result.setAttribute("style","color:red;")
            incorrectCount++;

            clearInterval(time);
            let val = timer.innerHTML;
            let newSec=val-15;

            time=setInterval(function(){
                timer.innerHTML=newSec;
                newSec--;

                if(newSec<0){
                    clearInterval(time);
                    counterVar=0;
                    newDiv.innerHTML="";
                    formDiv.innerHTML="";
                    sepDiv.innerHTML="";
                    nextQuestion();
                    //alert("Time Out!");
                }
            
            },1000);
                
        }
    }
    qCount++;
    setTimeout(nextQuestion, 1000);
    
}

function viewHighscores(){

    let getLabel=document.querySelector("#one").value;
    let getScore=document.querySelector("#score-span").textContent;

    obj = {"init":getLabel,"score":getScore};
    
    let data = JSON.parse(localStorage.getItem('person'));
    if (data) {
        data.push(obj);
    } else {
        data = [];
        data.push(obj);
    }

    localStorage.setItem('person', JSON.stringify(data));
    location.assign("viewhighscores.html");
}



if (start) {
    start.addEventListener("click",startQuiz);
}


if (ul) {
    ul.addEventListener("click",clickAnswer);
}




