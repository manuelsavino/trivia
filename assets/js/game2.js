var questions = ["4. What color is the sky?", "3. What planet do we live in?", "2. How many fingers do I have?", "1. What do you write with?"];
var wrongAnswers = ["Green,Red,Purple", "Jupiter,Mars,Saturn", "17,12,6", "Paper,Mouse,Screen"]
var rightAnswers = ["Blue", "Earth", "10", "Pen"]
var timer = 5;
var intervalVal;
var currentCorrect;


$(function () {
    $("#newGame").on("click", function () {
        start();
        $(this).hide();
    })

    function start() {
        if(questions.length > 0 ){
        intervalVal = setInterval(decreaseTime, 1000)
        showQuestion()
        }
        $(".choice").on("click", checkAnswer)
    }

    function decreaseTime() {
        console.log(timer)
        // console.log("Questions array index: " + (questions.length - 1))
        if (timer >= 1) {
            timer--
        }
        else {
            if ((questions.length - 1) === 0) {
                clearInterval(intervalVal)
                console.log("here")

            }
            else {
                clearInterval(intervalVal)
                timer = 5
                console.log("question was unanerewd")
                start()
            }
        }

    }

    function earlyTerm() {
        clearInterval(intervalVal)
    }

    function showQuestion()
    {
        if (questions.length > 0 && rightAnswers.length > 0 && wrongAnswers.length > 0) {
        $("#questions").text(questions.pop())
        //Questions.lenght works here because we are popping on line above reducing its value
        //currentCorrect = rightAnswers.pop() in case we dont want to tell them what was right and wronh at the end, but just a count
        currentCorrect = rightAnswers[questions.length];
        var currentWrong = wrongAnswers.pop();
        var correctAnswer = "<button class='btn btn-primary d-block choice' answer='"+ currentCorrect + "'>" + currentCorrect + "</button>"
        var options = currentWrong.split(",")

       
        var allOptions = [correctAnswer]
        options.forEach(function (element){
            allOptions.push("<button class='btn btn-primary d-block choice' answer='"+ element + "'>" + element + "</button>")
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

    function checkAnswer() {
        var userChoice = $(this).attr("answer")
        clearInterval(intervalVal)

        if(userChoice === currentCorrect){
            console.log("You answered right")
            if((questions.length) === 0)
            {
                console.log("Clearning Interval")
                clearInterval(intervalVal)
            }
            else{
                timer = 5
                console.log("here, ressting timer from right asnwer")
            }
            
        }
        else{
            console.log("You answered wrong")
            if ((questions.length) === 0) {
                console.log("Clearning Interval")
                clearInterval(intervalVal)
            }
            else {
                timer = 5
                console.log("here, ressting timer from wrong asnwer")
            }
        }

        
        setTimeout(start,2000)

    }

})//ends jquery ready function

