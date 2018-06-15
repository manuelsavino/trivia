var questions = []
var wrongAnswers = []
var rightAnswers = []
var timer = 5;
var right = 0
var wrong = 0
var unanswered = 0
var intervalVal;
var currentCorrect;
var userChoice;


$(function () {
    $("#newGame").on("click", function () {
        reset()
        start();
        $(this).hide();
    })

    function start() {
        if (questions.length > 0) {
            intervalVal = setInterval(decreaseTime, 1000)
            showQuestion()
        }
        $(".choice").on("click", tandQControl)
    }

    function decreaseTime() {
        $("#timer").text(timer)
        if (timer >= 1) {
            timer--
        }
        else {
            if (questions.length === 0) {
                clearInterval(intervalVal)
                //No more questions
                showRightorWrong("Unanswered")
            }
            else {
                clearInterval(intervalVal)
                timer = 5
                showRightorWrong("Unanswered")
            }
        }
    }

    function reset() {
        questions = ["4. What color is the sky?", "3. What planet do we live in?", "2. How many fingers do I have?", "1. What do you write with?"];
        wrongAnswers = ["Green,Red,Purple", "Jupiter,Mars,Saturn", "17,12,6", "Paper,Mouse,Screen"]
        rightAnswers = ["Blue", "Earth", "10", "Pen"]
        wrong = 0
        right = 0
        unanswered = 0
        timer = 5;
    }

    function showRightorWrong(userChoiceArg) {
        $("#questions").empty()
        $("#answers").empty()
        $("#timer").empty()
        setTimeout(start, 4000)
        // $("#questions").text("You Anwered: " + userChoiceArg)
        // $("#answers").text("The right answer")
        if (userChoiceArg != rightAnswers[questions.length]) {
            if (userChoiceArg === "Unanswered") {
                unanswered++
                $("#questions").text("You're out of time. The right answer was " + rightAnswers[questions.length])
                if (questions.length === 0) {
                    setTimeout(function () { showResults(wrong, right, unanswered) }, 4000)
                }
            }
            else {
                wrong++
                $("#questions").text("The right answer was " + rightAnswers[questions.length])
                if (questions.length === 0) {
                    setTimeout(function () { showResults(wrong, right, unanswered) }, 4000)
                }
            }
        }
        else if (userChoiceArg === rightAnswers[questions.length]) {
            right++
            $("#questions").text("You are correct! " + rightAnswers[questions.length] + " was right!")
            if (questions.length === 0) {
                setTimeout(function () { showResults(wrong, right, unanswered) }, 4000)
            }
        }
        userChice = ""
    }


    function showQuestion() {
        if (questions.length > 0 && rightAnswers.length > 0 && wrongAnswers.length > 0) {
            $("#questions").text(questions.pop())
            //Questions.lenght works here because we are popping on line above reducing its value
            //currentCorrect = rightAnswers.pop() in case we dont want to tell them what was right and wronh at the end, but just a count
            currentCorrect = rightAnswers[questions.length];
            var currentWrong = wrongAnswers.pop();
            var correctAnswer = "<button class='btn btn-primary d-block choice' answer='" + currentCorrect + "'>" + currentCorrect + "</button>"
            var options = currentWrong.split(",")
            var allOptions = [correctAnswer]
            options.forEach(function (element) {
                allOptions.push("<button class='btn btn-primary d-block choice' answer='" + element + "'>" + element + "</button>")
            })
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
    }

    function tandQControl() {
        userChoice = $(this).attr("answer")
        clearInterval(intervalVal)
        if ((questions.length) === 0) {
            //No more questions
            clearInterval(intervalVal)
            setTimeout(function () { showRightorWrong(userChoice) }, 100)
        }
        else {
            timer = 5
        }
        if (questions.length != 0)
            setTimeout(function () { showRightorWrong(userChoice) }, 100)
    }

    function showResults(wrong, right, unanswered) {
        $("#questions").empty()
        $("#questions").text("Wrong: " + wrong + " " + "Right: " + right + " " + "Unasnwered " + unanswered)
        $("#newGame").show()
    }
})//ends jquery ready function

