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
        questions = [
        "6. What does N. A. S. A. stand for?", 
        "5. Who invented computer microprocessors/ software?", 
        "4. Which of these things did N. A. S. A. invent?", 
        "3. Which of these items were needed to make a cell phone derived from N. A. S. A. technologies?", 
        "2. Which two car items were created by N. A. S. A. ?", 
        "1. Which household item was developed because of N. A. S. A. technologies?"];
        
        wrongAnswers = [
        "National Association for Space Acrobates,National Administration of Space Aeronautics,National Amazing Space Adventures",
        "Steve Jobs,Bill Gates,Some guy who's name has been forgotten.",
        "Oxygen tanks,Velcro,The telephone",
        "Speakers,Memory cards,Screens",
        "Engines and air conditioning,Stereos and motor powered windows,Nothing",
        "Blender,Microwave,Toilets",
        ]
        rightAnswers = [
        "National Aeronautics and Space Administration", 
        "N. a. s. a.",
        "Flashdrives", 
        "LED (the back light)",
        "Goodyear long tread life tires and Thermacool (anti-freeze)",
        "Hand-held cordless vacuum"]
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
            var currentWrong = wrongAnswers.pop();

            var correctAnswer = $("<button>")
            var allOptions = [];
            correctAnswer.attr({
                class: "btn btn-primary d-block choice",
                answer: rightAnswers[questions.length]
            })
            allOptions.push(correctAnswer.append(rightAnswers[questions.length]))

            var options = currentWrong.split(",")
            options.forEach(function (element) {
                var but = $("<button>")
                but.attr({
                    class: "btn btn-primary d-block choice",
                    answer: element
                })
                but.append(element)
                allOptions.push(but)

            })
            //Randomize order of answers
            for (var i = allOptions.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = allOptions[i];
                allOptions[i] = allOptions[j];
                allOptions[j] = temp;
            }

            //Clear answers and fil in new set for new quetion
            $("#answers").empty()
            allOptions.forEach(function (element)
            {
                $("#answers").append(element)
            })
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

