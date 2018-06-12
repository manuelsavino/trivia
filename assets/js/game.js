$(function () {
    var game = {
        questions: ["What colos is the sky?", "What color is the grass?", "How many fingers do I have?"],
        wrongAnswers: ["green, red, yellow", "blue,red,purple", "1,5,8"],
        rightAnswers: ["blue", "green", "10"],
        rightAnswerCount: 0,
        wronganswerCount: 0,
    }

    var question = game.questions.length - 1
    var timer = 1;
    var intervalVal = setInterval(StartGame, 1000);

    function StartGame() {
        console.log(--timer)
        if (timer === 0) {
            if (question === -1) {
                clearInterval(intervalVal)
                //call results function
            }
            else {
                showQuestion();
                question--
            }
        }
    }
    function showQuestion() {
        timer = 5
        //fill in question 
        var currentQuestion = game.questions[question]
        $("#questions").text(currentQuestion)


        var correctAnswer = "<button class='btn btn-primary d-block' correct='yes'>" + game.rightAnswers[question] + "</button>"
        var options = game.wrongAnswers[question].split(",")
        var allOptions = [correctAnswer];
        options.forEach(function (element) {
            allOptions.push("<button class='btn btn-primary d-block' correct='no'>" + element + "</button>")
        })

        //Shuffle the order of the answers
        for (var i = allOptions.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = allOptions[i];
            allOptions[i] = allOptions[j];
            allOptions[j] = temp;
        }
        //Clear answers and fil in new set
        $("#answers").empty()
        for (i = 0; i < allOptions.length; i++) {
            $("#answers").append(allOptions[i])
        }


    }



})