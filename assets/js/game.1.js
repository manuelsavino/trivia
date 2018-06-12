currentGame = {
    questions: ["What colos is the sky?", "What planet do we leave in?", "How many fingers do I have?"],
    wrongAnswers = [",,,",",,,",",,,"],
    rightAnswers = ["Blue","Earth","10"]
}

var timer = 12;
var intervalVar;
var questionCount = questions.length -1

$("#newGame").on("click", game)

function game(){

    intervalVar = setInterval(decreaseTime,1000)
    if(timer === 11)
    {
        if (questionCount >= 0) {
            showQuestion(questionCount)
        }
    }
    else if(timer === 0)
    {   
        //next Question if there are more
        if (questionCount >= 0)
        {
            showQuestion(questionCount)
        }
        else{
            //there are no more question
        }
    }
    else{
        //listen for button click of answer
    }

}

function decreaseTime()
{
    timer--
}

function showQuestion(count)
{
    $("#questions").text(count)
    var correctAnswer = "<button class='btn btn-primary d-block choice' correct='yes'>" + game.rightAnswers[count] + "</button>"
    var options = game.wrongAnswers[count].split(",")
    var allOptions = [correctAnswer];
    options.forEach(function (element) {
    allOptions.push("<button class='btn btn-primary d-block choice' correct='no'>" + element + "</button>")
    })
    questionCount--
}
