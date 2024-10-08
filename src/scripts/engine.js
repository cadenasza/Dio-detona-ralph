const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        play: document.querySelector(".button"),
        reset: document.querySelector('.resetar')
    },
    values: {
        timerId: null,
        gameVelocity: 750,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
    },
    actions: {
        countDownTimerID: 0
    }
}


function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);

    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}


function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    });
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerID)
    }
}

function resetGame() {
    clearInterval(state.values.countDownTimerID);  
    state.values.timerId = null;          
    state.values.currentTime = 30;       
    state.values.result = 0;              
    state.view.score.textContent = 0;     
    state.view.timeLeft.textContent = 30; 
    state.values.hitPosition = null;     
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy"); 
    });
    state.view.play.disabled = false;     
}

function startGame() {
    state.values.countDownTimerID = setInterval(countDown, 1000);
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerID)
    }
    moveEnemy();  
    addListenerHitBox();  
}

function init() {
    state.view.play.addEventListener('click', () => {
        if (!state.values.timerId) { 
            startGame();
            state.view.play.disabled = true; 
        }
    });
}
init();