$(document).ready(function() {
    var currentQuestion = 0;
    var theClock;
    var correctResponse = 0;
    var incorrectResponse = 0;
    var unansweredResponse = 0;
    var triviaCounter = 30;

    var questionArray = ["Which mode of transport do first-year students use when arriving at Hogwarts for the first time?", "How many broomsticks are flown in a full game of Quidditch?", "In which year was Lord Voldemort born?", "Where in the Hogwarts grounds is Hagrid’s hut located?", "How many staircases are there at Hogwarts?", "Where did Quidditch originate?", "What number is Harry's vault at the Gringotts Wizarding Bank?", "Which Polyjuice Potion ingredients must be acquired at the full moon?", "Where is the secret entrance to the Hogwarts kitchens located?", "Who was the first student in Harry’s year to be sorted into Gryffindor?"];
    var answerArrayA = ["Magical boats across the lake","Twelve", "1924", "On the shore of the lake","96", "Castelobruxo","Six hundred and twenty-seven", "Flux weed","At the back of the potions supply cupboard","Hannah Abbott"];
    var answerArrayB = ["Broomsticks","Fourteen", "1925","Next door to the greenhouses", "142", "Hogsmeade","Six hundred and eighty-seven", "A bit of whomever you wish to turn into","Under the floor of the staff room","Lavender Brown"];
    var answerArrayC = ["Hippogriffs","Fifteen", "1926", "Next to Hogsmeade Station", "218", "Quebac","Seven hundred and eleven", "Newt spleen","Behind a portrait of a bowl of fruit","Susan Bones"];
    var answerArrayD = ["Side-Along-Apparition","Sixteen", "1929","On the edge of the Forbidden Forest", "312","Queerditch Marsh", "Seven hundred and thirteen","Knotgrass","Under a statue of a house-elf","Mandy Brocklehurst"];
    var imageArray = ["assets/images/first_year.jpg", "assets/images/quidditch_game.jpg", "assets/images/voldemort.jpg", "assets/images/hagris_hut.jpg", "assets/images/staircases.jpg", "assets/images/quidditch.jpg", "assets/images/harrys_vault.jpg", "assets/images/full_moon_potion.jpg", "assets/images/secret_entrance.jpg", "assets/images/sorted.jpg"];
    var correctAnswers = ["A. Magical boats across the lake", "C. Fifteen", "C. 1926", "D. On the edge of the Forbidden Forest", "B. 142", "D. Queerditch Marsh", "B. Six hundred and eighty-seven", "A. Flux weed","C. Behind a portrait of a bowl of fruit","B. Lavender Brown"];
    
    function resetTrivia() {
        currentQuestion = 0;
        correctResponse = 0;
        incorrectResponse = 0;
        unansweredResponse = 0;
        triviaCounter = 30;
        triviaQnA();
        timerWrapper();
    }

    function allDone() {
        $(".mainArea").html("<p> " + "<img class='center-block body-image' src='assets/images/owl-all-done.jpg'>" + "</p>" + 
        "<p class='text-center'>All done, here's how you did! </p><hr>" + 
        "<p class='text-center'>Correct Answers: " + correctResponse + "</p>" + 
        "<p class='text-center'>Wrong Answers: " + incorrectResponse + "</p>" + 
        "<p class='text-center'>Unanswered: " + unansweredResponse + "</p>" + 
        "<p class='text-center reset-button-container'> " + 
        "<a class='btn  btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset Trivia</a></p>");
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (triviaCounter === 0) {
                clearInterval(theClock);
                ranOutOfTime();
            }
            if (triviaCounter > 0) {
                triviaCounter--;
            }
            $(".timer").html(triviaCounter + " Seconds");   
        }
    }

    function wait() {   
        if (currentQuestion < (questionArray.length - 1)) {
            currentQuestion++;
            triviaQnA();
            triviaCounter = 30;
            timerWrapper();
        }
        else {
            allDone();
        }
    }

    function triviaQnA() {
        $(".mainArea").html("<p class='text-center timerFormat'>Time Remaining: <span class='timer'>30 Seconds</span></p><p class='text-left'>" + 
        questionArray[currentQuestion] + 
        "</p><hr><p class='first-answer answer'>A. " + answerArrayA[currentQuestion] + "<hr></p>" +
        "<p class='answer'>B. "+answerArrayB[currentQuestion] + "<hr></p>" +
        "<p class='answer'>C. "+ answerArrayC[currentQuestion]  + "<hr></p>" +
        "<p class='answer'>D. "+answerArrayD[currentQuestion] +"<hr></p>");
    }

    function correctChoice() {
        correctResponse++;
        $(".mainArea").html(
        "<p class='text-center'>Correct!</p><p class='text-center'>The answer is: " + correctAnswers[currentQuestion] + 
        "</p>" + "<img class='center-block body-image' src='"+ imageArray[currentQuestion] + "'>");
        setTimeout(wait, 5000);  
    }
    
    function incorrectChoice() {
        incorrectResponse++;
        $(".mainArea").html(
        "<p class='text-center'>Nope!</p><p class='text-center'>The correct answer was: "+ correctAnswers[currentQuestion] + 
        "</p>" + "<img class='center-block body-image' src='assets/images/sorry.jpg'>");
        setTimeout(wait, 5000);   
    }

    function ranOutOfTime() { 
        unansweredResponse++;
        $(".mainArea").html(
        "<p class='text-center timerFormat'>Time Remaining: <span class='timer'>" + triviaCounter + "  sec.</span></p>" + 
        "<p class='text-center'>You ran out of time!</p><p class='text-center'>The correct answer was: " + correctAnswers[currentQuestion] + "</p>" + 
        "<img class='center-block body-image' src='assets/images/timeOut.jpg'>");
        setTimeout(wait, 5000);   
    }

    $("body").on("click", ".reset-button", function(event){
        resetTrivia();
    }); 
    
    $("body").on("click tap", ".answer", function(event){
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[currentQuestion]) {
            clearInterval(theClock);
            correctChoice();
        }
        else {
            clearInterval(theClock);
            incorrectChoice();
        }
    }); 

    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  
        triviaQnA();
        timerWrapper();
    }); 

    function startTrivia() {     
        $(".mainArea").html("<p class='text-center'>" + 
        "<p class='text-center'>This Harry Potter quiz should only be attempted if you’re brave. </p>" +  
        "</p><img class='center-block body-' src='assets/images/start_trivia.jpg'></p>" + 
        "<a class='btn btn-primary btn-lg btn-block start-button main-button-container' href='#' role='button'>Start Trivia</a></p>");
    }

    startTrivia();

});