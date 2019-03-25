$(document).ready(function(){

//on click event to start game
//on click lisenter for when user clicks answer button
$("#remaining-time").hide();
$("#start").on("click", trivia.startGame);
$(document).on("click", ".option", trivia.guessChecker);

var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timeId: '',
    //questions, answers, and choices array

    question: {
        q1:"",
        q2:"",
        q3:"",
        q4:"",
        q5:"",
        q6:"",
        q7:"",
        q8:"",
        q9:"",
        q10:"",
    },

    options: {
        q1:[],
        q2:[],
        q3:[],
        q4:[],
        q5:[],
        q6:[],
        q7:[],
        q8:[],
        q9:[],
        q10:[],
    },

    answers: {
        q1:"",
        q2:"",
        q3:"",
        q4:"",
        q5:"",
        q6:"",
        q7:"",
        q8:"",
        q9:"",
        q10:"",
    },


    startGame: function(){
    trivia.currentSet = 0;
    trivia.incorrect = 0;
    trivia.correct = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timeId);

    $("#game").show();

    $("#results").html("");

    $("#timer").text(trivia.timer);

    $("#start").hide();

    $("#remaining-time").show();

    trivia.nextQuestion();
 },

  nextQuestion: function(){
    trivia.timer = 10;
    $("#timer").removeaClass('last-seconds');
    $("#timer").text(trivia.timer);

    if(!trivia.timerOn){
        trivia.timeId = setInterval(trivia.timerRunning, 1000);
    }
  var questionContent = Object.values(trivia.question)[trivia.currentSet];
  $("#question").text(questionContent);

  var questionOptions = Object.values(trivia.options)[trivia.currentSet];


  $.each(questionOptions, function(index, key){
    $("#options").append($('<button class="option btn btn-dark">'+key+'</button>'));

 })


 },

 timerRunning: function(){
   if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.question).length){
       $("#timer").text(trivia.timer);
       trivia.timer--;
       if(trivia.timer === 4){
           $("#timer").addClass("last-seconds");
       }
   }

   else if (trivia.timer === -1){
       trivia.unanswered++;
       trivia.result = false;
       clearInterval(trivia.timeId);
       resultId = setTimeout(trivia.guessResult, 1000);
       $("#results").html("<h3> No time left! And the answer is... "+ Object.values(trivia.answers)[trivia.currentSet]+"</h3>");
   }


   else if
}





    



// create game properties (timer, correnct/incourtect anwser count, ect)
//question, answer, and chocies array
//dynamically push questions and choices to DOM 
//
});