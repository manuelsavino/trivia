$(function () {
    var game = {
        questions: ["What color is the sky?", "What planet do we live in?", "How many fingers do I have?","What do you write with?"],
        wrongAnswers: ["Green,Red,Purple", "Jupiter,Mars,Saturn", "17,12,6","Paper,Mouse,Screen"],
        rightAnswers: ["Blue", "Earth", "10","Pen"]
    }

    var time = 5
    var running = false
    var intervalVal;
    var currentQuestion = game.questions.length - 1;

    $("#newGame").on("click", start)
    function start() {
        if (!running) {
            $("#newGame").hide()
            intervalVal = setInterval(decereaseTime, 1000)
            $("#timer").text("10")
            showQuestion(currentQuestion)
            running = true;
        }
    }

    function decereaseTime() {
        time--
        console.log(game.rightAnswers[currentQuestion])
        if (time === 0) {
            clearInterval(intervalVal);
            running = false;
            //change to show correct or wrong
            if (currentQuestion >= 1) {
                clearQuestion()
                $("#questions").text(game.rightAnswers[currentQuestion])
                setTimeout(start, 2000)
                time = 5
                console.log("Decreasing current question one " +currentQuestion--)
            }
            else {
                //game over
                console.log("gameOver")
                gameOver()
                clearQuestion()
            }
        } 
        else if(time >= 1) {
            //checking for click goes here
            
            $(".choice").on("click", function(){
                var ans = ""
                ans = $(this).attr("answer")
                console.log("Chosen Answer: " + ans)
                console.log("Right Answer: " + game.rightAnswers[currentQuestion])
                if (ans === game.rightAnswers[currentQuestion] || ans != "")
                {
                    $("#answers").text("yes you're right")
                    clearInterval(intervalVal);
                    running = false
                    time = 5

                    if (currentQuestion >= 1) 
                    console.log("Decreasing current question: two "+currentQuestion--)
                    else{
                        gameOver()
                    }
                    setTimeout(start, 2000)
                }
                else if (ans != game.rightAnswers[currentQuestion] || ans != ""){
                    $("#answers").text("Sorry you're wrong")
                    clearInterval(intervalVal);
                    running = false
                    time = 5

                    if(currentQuestion >= 1)
                       console.log("Decreasing current question: three " + currentQuestion--)
                    else{
                        gameOver()
                    }
                    setTimeout(start, 2000)
                }
                
            })
            
            

        }
        // console.log(time)
        $("#timer").text(time)
    }


    function showQuestion(val) {
        //fill in question 
        var currentQuestion = game.questions[val]
        $("#questions").text(currentQuestion)

        //ansers
        var correctAnswer = "<button class='btn btn-primary d-block choice' answer='" + game.rightAnswers[val] + "'>" + game.rightAnswers[val] + "</button>"
        var options = game.wrongAnswers[val].split(",")
        var allOptions = [correctAnswer];
        options.forEach(function (element) {
            allOptions.push("<button class='btn btn-primary d-block choice' answer='" + element + "'>" + element + "</button>")
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
    function clearQuestion() {
        $("#answers").empty();
        $("#questions").empty();
        $("#timer").text("")
    }

    function gameOver()
    {   
        // running = false;
        clearInterval(intervalVal)
        // console.log("game over was called")
    }
})