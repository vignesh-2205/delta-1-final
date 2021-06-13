const goalBoardSize = 3
const playBoardSize = goalBoardSize + 2
var colours = ["#A9A9A9", "#FFFFFF", "#0000FF", "#FF0000", "#00FF00", "#FF8C00", "#FFFF00"]
var goal = [];
var board = []
var goal_num = [];
var randnum;
var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;
var seconds;
var minute;


function countTimer() {
    ++totalSeconds;

    minute = Math.floor(totalSeconds / 60);
    seconds = totalSeconds - minute * 60;

    if (minute < 10)
        minute = "0" + minute;
    if (seconds < 10)
        seconds = "0" + seconds;
    document.getElementById("timer").innerHTML = "Timer: " + minute + ":" + seconds;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

var blank = {
    x: getRandomInt(0, 5),
    y: getRandomInt(0, 5)
}

function initializegoal() {
    goal_num = [0, 0, 0, 0, 0, 0];
    for (var c = 0; c < 3; c++) {
        goal[c] = [];
        for (var r = 0; r < 3; r++) {
            randnum = getRandomInt(1, 7);
            goal[c][r] = randnum;
            goal_num[randnum - 1]++;
        }
    }
}

function initializeboard() {
    goal_check = [0, 0, 0, 0, 0, 0];
    for (var c = 0; c < playBoardSize; c++) {
        board[c] = [];
        for (var r = 0; r < playBoardSize; r++) {
            randnum = getRandomInt(1, 7);
            board[c][r] = randnum;
            goal_check[randnum - 1]++;
        }
    }
    checking();
    board[blank.x][blank.y] = 0;

}

function checking() {
    for (var i = 0; i < 6; i++) {
        if (goal_check[i] <= goal_num[i]) {
            initializeboard();

        }
    }
}
let playtileElement
let gsquareElement
let movesElement
let moves = 0

document.addEventListener("DOMContentLoaded", function(event) {
    start()
    document.addEventListener("keyup", keyUpHandler, false);
})

function start() {
    gsquareElement = document.getElementsByClassName("gsquare")
    playtileElement = document.getElementsByClassName("playtile")
    movesElement = document.getElementById("movesValue")
    initializegoal()
    initializeboard()
    updateGoal()
    moves = 0
    totalSeconds = 0;
    updateBoard()

}

function updateGoal() {
    i = 0
    for (var c = 0; c < goalBoardSize; c++) {
        for (var r = 0; r < goalBoardSize; r++) {
            gsquareElement[i].style.backgroundColor = colours[goal[r][c]]
            i = i + 1
        }
    }
}

function checkBoard() {
    var colours_check = [
        [board[1][1], board[1][2], board[1][3]],
        [board[2][1], board[2][2], board[2][3]],
        [board[3][1], board[3][2], board[3][3]]
    ]
    if (JSON.stringify(colours_check) == JSON.stringify(goal)) {
        alert("Congrats!!! You win in " + moves + " Moves and in " + minute + ":" + seconds);
        movesElement.innerText = "Congrats!!! You win in " + moves + " Moves and in " + minute + ":" + seconds
    }
}

function updateBoard() {
    i = 0
    for (var c = 0; c < playBoardSize; c++) {
        for (var r = 0; r < playBoardSize; r++) {
            backColor = colours[board[r][c]]
            if (board[r][c] === 0) {
                if (r > 0 && r < playBoardSize - 1 && c > 0 && c < playBoardSize - 1) {
                    backColor = "#000000"
                }
            }
            playtileElement[i].style.backgroundColor = backColor
            i = i + 1
        }
    }
    movesElement.innerText = 'Moves : ' + moves
    checkBoard()
}

function keyUpHandler(e) {
    if (e.code == "ArrowLeft") {
        if (blank.x < 4) {
            board[blank.x][blank.y] = board[blank.x + 1][blank.y];
            blank.x = blank.x + 1;
            board[blank.x][blank.y] = 0;
            moves++
            updateBoard();
        }

    } else if (e.code == "ArrowDown") {
        if (blank.y > 0) {
            board[blank.x][blank.y] = board[blank.x][blank.y - 1];
            blank.y = blank.y - 1;
            board[blank.x][blank.y] = 0;
            moves++
            updateBoard();
        }
    } else if (e.code == "ArrowUp") {
        if (blank.y < 4) {

            board[blank.x][blank.y] = board[blank.x][blank.y + 1];
            blank.y = blank.y + 1;
            board[blank.x][blank.y] = 0;
            moves++
            updateBoard();
        }

    } else if (e.code == 'ArrowRight') {
        if (blank.x > 0) {
            board[blank.x][blank.y] = board[blank.x - 1][blank.y];
            blank.x = blank.x - 1;
            board[blank.x][blank.y] = 0;
            moves++
            updateBoard();
        }

    }
}