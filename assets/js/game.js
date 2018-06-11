$(function (){
var game = {
    questions: ["What colos is the sky?", "What color is the grass?", "How many fingers do I have?"],
    wrongAnswers: ["green, red, yellow", "blue,red,purple", "1,5,8"],
    rightAnswers: ["blue", "green", "10"],
    rightAnswerCount: 0,
    wronganswerCount: 0,
}

var question = game.questions.length -1
var timer = 1;
var intervalVal = setInterval(Timer, 1000);

function Timer()
{
    console.log(--timer)
    if(timer === 0)
    {   
        if (question === -1) {
            clearInterval(intervalVal)
            //call results function
        }
        else{
            showQuestion();
            timer = 5
            question--
        }
       
    }
}

function showQuestion(){
    var currentQuestion = game.questions[question]
    $("#questions").text(currentQuestion)
    var correctAnswer = game.rightAnswers[question]
    var options = game.wrongAnswers[question].split(",")
        $("#answers").empty()
        for(i=0; i< options.length; i++)
        {
            $("#answers").append("<button class='btn btn-primary'>"+ options[i]+"</button")
        }

    console.log("Question "+(question + 1) +": "+currentQuestion + " Wrong Answers: " + options + "\nRight Answer: " + correctAnswer)
}

})