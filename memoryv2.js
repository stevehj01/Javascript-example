/*-- Steve Hjortness   -->
javascript file for executing the memory game */

window.onload = function(){
    document.getElementById("newGame").onclick = memoryGame;
    };
    
 //global variables to be accessible by all the functions   
var attempt;            //variable to count the number of attempts
var count;              //variable to track the number of cards turned
var index1;             //card array index position
var index2;             //card array index position
var countCorrect;       //variable to count the number of matches
var time;               //variable to count the time
var gameTime;           //variable name for the game timer
var score;              //variable to hold the score
var restart = false;    //variable to define if this is the first game or a restart

//function that initiates the game
function memoryGame(){
    
    //declare initial values for all the necessary variables to start a game
    time = 0;
    document.getElementById("time").innerHTML = time;
    gameTime = setInterval(myTimer , 1000);
    attempt = 0;
    document.getElementById("attempts").innerHTML = attempt;
    countCorrect = 0;
    count = 0;
    score = 0;
    document.getElementById("score").innerHTML = score;
    
    //create an array to hold characteristics of the cards at a given id
    
    var card = [{"pix":"classic-cards/1.png","type":"ace","suit":"black","name":"card0" }, 
    {"pix":"classic-cards/2.png","type":"ace","suit":"black","name":"card1"},
    {"pix":"classic-cards/3.png","type":"ace","suit":"red","name":"card2"},
    {"pix":"classic-cards/4.png","type":"ace","suit":"red","name":"card3"},
    {"pix":"classic-cards/5.png","type":"king","suit":"black","name":"card4"}, 
    {"pix":"classic-cards/6.png","type":"king","suit":"black","name":"card5"},
    {"pix":"classic-cards/7.png","type":"king","suit":"red","name":"card6"},
    {"pix":"classic-cards/8.png","type":"king","suit":"red","name":"card7"},
    {"pix":"classic-cards/9.png","type":"queen","suit":"black","name":"card8"}, 
    {"pix":"classic-cards/10.png","type":"queen","suit":"black","name":"card9"},
    {"pix":"classic-cards/11.png","type":"queen","suit":"red","name":"card10"},
    {"pix":"classic-cards/12.png","type":"queen","suit":"red","name":"card11"},
    {"pix":"classic-cards/13.png","type":"jack","suit":"black" ,"name":"card12"}, 
    {"pix":"classic-cards/14.png","type":"jack","suit":"black","name":"card13"},
    {"pix":"classic-cards/15.png","type":"jack","suit":"red","name":"card14"},
    {"pix":"classic-cards/16.png","type":"jack","suit":"red","name":"card15"}
    ];

    //randomly change the elements in the array that represent the card tied to an id
    for(var i=0; i < card.length; i++){
		//pick a random index j such that i <= j <= a.length-1
		var j = i + parseInt(Math.random() * (card.length - i));
		//swap the element to that index
		var temp = card[i].pix;
		card[i].pix = card[j].pix;
		card[j].pix = temp;
                var temp2 = card[i].type;
		card[i].type = card[j].type;
		card[j].type = temp2;
                var temp3 = card[i].suit;
		card[i].suit = card[j].suit;
		card[j].suit = temp3;
    }
    
    //if this is the first time the game is played, initialize the addEventListeners to an id
    if (restart == false){
        for(var id = 0; id < 16; id++){
            (function(id) {
                document.getElementById("card"+id).addEventListener("mouseover", function() {mouseOver(id);});
                document.getElementById("card"+id).addEventListener("mouseout", function() {mouseOut(id);});
                document.getElementById("card"+id).addEventListener("click", function() {faceUp(card,id);});
            })(id);
        }
    }
    else{    //for subsequent games, the addEventListeners already exist, just make the cards visible again
        for(var id = 0; id < card.length; id++){
            document.getElementById(card[id].name).classList.add("visible");}
    }
    
}
//compare the cards based on the values in the array
function compare(index1, index2,card){
    attempt++;                              //increment the attempt and post it
    document.getElementById("attempts").innerHTML= attempt;
    
    //declare a variable to hold the card id which is the name element in the array
    var firstCard = card[index1].name;
    var secondCard = card[index2].name;
    
    //check to see if the type of card and suit of the card match when two cards are faceup
    if(count ===2 && card[index1].type === card[index2].type && card[index1].suit === card[index2].suit){
        //if a match occurs, call a function that makes the cards invisible in 200ms
        setTimeout(makeInvisible,200, firstCard, secondCard);
        
        countCorrect++;   //increment the number of card matches
        if(countCorrect === 8){     //if 8 matches have occurred, the game is over
            stopTimer();            //call a function to stop the timer
            calculateScore();       //call a function to calculate the score
        }
    }
    else {                  //the cards do not match, call a function to turn them back over
        setTimeout(turnOver,500,firstCard,secondCard);
    }
    count = 0;          //reset the number of cards faceup to zero
}
// function to make the cards invisible
function makeInvisible(firstCard,secondCard){
    document.getElementById(firstCard).src = "classic-cards/b1fv.png";
    document.getElementById(secondCard).src = "classic-cards/b1fv.png";
    
    //once the card id is invisible reset the style to visible for the next game
    document.getElementById(firstCard).classList.remove("visible");
    document.getElementById(secondCard).classList.remove("visible");
    document.getElementById(firstCard).classList.add("hidden");
    document.getElementById(secondCard).classList.add("hidden");
    return;
}
//function to turn the card face back over if no match
function turnOver(firstCard,secondCard){
    document.getElementById(firstCard).src = "classic-cards/b1fv.png";
    document.getElementById(secondCard).src = "classic-cards/b1fv.png";
    return;
}
//function to count the time the game is played
function myTimer() {
    time++;
    document.getElementById("time").innerHTML = time;
}
//function to stop the interval counter
function stopTimer(){
    clearInterval(gameTime);
}
//function to determine the game score and post it to the page
function calculateScore(){
    score = 100 - attempt - time;
    document.getElementById("score").innerHTML = score;
    restart = true;
}
//function to turn the card faceup based on the location in the array
function faceUp(card,index){
    count++;            //increment the count of the number of cards faceup
    
    if( count > 2)          //if user tries to turn up a 3rd card, do nothing
        return;
    
    if (count == 1){        //if first card selected, simply turn it over
        index1 = index;
        document.getElementById("card"+index).src = card[index].pix;
        return;
    } 
    index2 = index;
    if(count == 2 && index1 == index2){      
        count --;
        return;
    }
    else{        //if second card selected, turnover and call comparison function
        document.getElementById("card"+index).src = card[index].pix;
        compare(index1, index2,card);
    }
    return;
}
//event listener for mouse over the card id
function mouseOver(index) {
        document.getElementById("card"+index).classList.add("mouseOverStyle");
}
//event listener for mouse off of the card id
function mouseOut(index) {
    document.getElementById("card"+index).classList.remove("mouseOverStyle");
}

