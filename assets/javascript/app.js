$(document).ready(function(){

//on click event to start game
//on click lisenter for when user clicks answer button
$("#remaining-time").hide();
$("#start").on("click", trivia.startGame);
$(document).on("click", ".option", trivia.guessChecker);

})

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
        q1:"What is the most populated city (city proper) in the world?",
        q2:"What is the most populated metropolitan area in the world",
        q3:"What country produces the most coffee per year",
        q4:"What is the second highest mountain in the world called?",
        q5:"What city is considered the 'Snowiest Place on Earth'?",
        q6:"Which country has no national debt?",
        q7:"What is the most spoken language in the world?",
        q8:"Which country has the second largest music industry (US is first of course)?",
        q9:"In which country is the deepest man made hole(40,230ft deep)?",
        q10:"Which country has the oldest continuously run company?(1400 years old)",
    },

    options: {
        q1:["Tokyo", "Shanghai", "Mexico City", "Beijing", "Karachi"],
        q2:["Mumbai(Bombay)", "New York City", "Beijing", "Shanghai", "Tokyo"],
        q3:["Vietnam", "Columbia", "Brazil", "Indonesia", "Hawaii"],
        q4:["Mount Fuji", "Denali", "K2", "Mount Kilimanjaro", "Mount Kangchenjunga"],
        q5:["Rochester, New York", "Aomori City, Japan", "Anchorage, Alaska", "Denver, Colorado", "Nagano, Japan"],
        q6:["Switzerland", "Lichtenstein", "Saudi Arabia", "Russia", "UAE"],
        q7:["Chinese", "Spanish", "English", "Hindi", "Arabic"],
        q8:["Germany", "The UK", "South Korea", "Japan", "France"],
        q9:["Russia", "US", "Sweden", "South Africa", "Antartica"],
        q10:["China", "India", "Japan", "Saudi Arabia", "The UK"],
    },

    answers: {
        q1:"Shanghai",
        q2:"Tokyo",
        q3:"Brazil",
        q4:"K2",
        q5:"Aomori City, Japan",
        q6:"Lichtenstein",
        q7:"Chinese",
        q8:"Japan",
        q9:"Russia",
        q10:"Japan",
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
    $("#timer").removeClass('last-seconds');
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


   else if(trivia.currentSet === Object.keys(trivia.question).length){
       $("#results").html("<h3>Good Job! Thanks for Playing!</h3>"+
       "<p>Correct: "+trivia.correct +"</p>"+
       "<P>Incorrect: "+ trivia.incorrect +"</p>"+
       "<p>Unaswered: "+ trivia.unanswered +"</p>"+
       "<p>Try Again!</p>");

       $("#game").hide();

       $("#start").show();
   }
},

    guessChecker: function(){
        var resultId;

        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

        if($(this).text() === currentAnswer){

            $(this).addClass("btn-success").removeClass("btn-info");

            trivia.correct++;
            clearInterval(trivia.timeId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $("#results").html("<h3>Correct Answer!</h3>");
        }
        else{
            $(this).addClass("btn-danger").removeClass("btn-info");

            trivia.incorrect++;
            clearInterval(trivia.timeId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $("#results").html("<h3>Sorry, better try again! "+ currentAnswer +"</h3>");

        }
    },

    guessResult: function(){
        trivia.currentSet++;

        $(".option").remove();
        $("#results h3").remove();

        trivia.nextQuestion();
    }
};





    



// create game properties (timer, correnct/incourtect anwser count, ect)
//question, answer, and chocies array
//dynamically push questions and choices to DOM 
//
