$(function () {
    var game = {
        questions: ["What colos is the sky?", "What planet do we leave in?", "How many fingers do I have?"],
        wrongAnswers: ["green,red,purple", "Jupiter,Mars,Saturn", "17,12,6"],
        rightAnswers: ["Blue", "Earth", "10"]
    }
    var clockRunning = false

var time = 10;
    $("#newGame").on("click", start)

    function start() {
        if (!clockRunning) {
            intervalVar = setInterval(decreaseTime, 1000)
            console.log(time)
            clockRunning = true;
            
        }
    }

    function decreaseTime()
    {
        time--
    }



    function showQuestion() {
        //fill in question 
            var currentQuestion = game.questions[question]
            $("#questions").text(currentQuestion)
            var correctAnswer = "<button class='btn btn-primary d-block choice' correct='yes'>" + game.rightAnswers[question] + "</button>"
            var options = game.wrongAnswers[question].split(",")
            var allOptions = [correctAnswer];
            options.forEach(function (element) {
                allOptions.push("<button class='btn btn-primary d-block choice' correct='no'>" + element + "</button>")
            })

            //Shuffle the order of the answers
            for (var i = allOptions.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = allOptions[i];
                allOptions[i] = allOptions[j];
                allOptions[j] = temp;
            }
            //Clear answers and fil in new set for new quetion
            $("#answers").empty()
            for (i = 0; i < allOptions.length; i++) {
                $("#answers").append(allOptions[i])
            }
        
    }
})