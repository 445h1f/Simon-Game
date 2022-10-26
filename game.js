var buttonColors = ['red', 'blue', 'green', 'yellow'];

var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text('Level ' +  level);

    var randomNumber = Math.floor(Math.random() * 4);

    // getting randomColor
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // animating button with randomChoseColor id using jquery
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);


}

function playSound(name){
    //plays sound of given file name
    var audio = new Audio('sounds/'+name+".mp3");
    audio.play();
    console.log(gamePattern, userClickedPattern);

}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){
            console.log('success');
            setTimeout(nextSequence(), 1000);
        }
    } else{
        console.log('wrong');
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function (){
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gameStarted = false;
    gamePattern = [];
}

$('.btn').click(function () {
    if (gameStarted) {
        var userChosenColor = $(this).attr('id');
        userClickedPattern.push     (userChosenColor);
        // console.log(userClickedPattern);
        playSound(userChosenColor);

        $(this).addClass('pressed');

        checkAnswer(userClickedPattern.length-1);

        setTimeout(function(){
            $('#'+userChosenColor).removeClass('pressed');
        }, 100);
    }

})

$(document).keypress(function(e){
    if (!gameStarted){
        gameStarted = true;
        nextSequence();
    }
})
