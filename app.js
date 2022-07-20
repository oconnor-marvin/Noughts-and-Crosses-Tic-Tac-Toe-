const gameBoard = (() => {
    //for testing purposes
    const testBtn = document.getElementById("test")
    testBtn.addEventListener("click", () => {
    console.log(player.gameOver);
})

    const gameSquareEls = document.querySelectorAll(".game-square")
    let board = ["","","","","","","","",""]
    let occupied = "false"
    let playCount = 0;
    const reset = () => {
        location.reload();
    };
    let chosenSquare = 10
    const editArray = () => {
        for (let index = 0; index < gameSquareEls.length; index++) {
            gameSquareEls[index].addEventListener("click", () => {
                if((gameBoard.board[index] === "") && player.gameOver === false){
                board.splice([index],1,player.activePlayer)
                gameBoard.occupied = "false"
                gameBoard.chosenSquare = index;
                gameBoard.playCount++;
                displayController.updateBoard();
                }else{
                    gameBoard.occupied = "true"
                }
            })
        }
    }

    
    return{
        board,
        reset,
        editArray,
        occupied,
        chosenSquare,
        playCount,
    };
})();

const displayController = (() => {
    const gameSquareEls = document.querySelectorAll(".game-square")
    const resetButton = document.querySelector(".reset-btn")
    const activePlayerDisplay = document.querySelector(".active-player")

    function switchDisplay () {
        if(player.activePlayer === "X"){
            activePlayerDisplay.innerHTML = "O"
        }else if(player.activePlayer === "O"){
            activePlayerDisplay.innerHTML = "X"
        }
    }
    resetButton.addEventListener("click", (e) => {
        gameBoard.reset();
        updateBoard();
    })
    const updateBoard = () => {
        for (let i = 0; i < gameSquareEls.length; i++) {
            gameSquareEls[i].textContent = gameBoard.board[i];
        }
    };
    return{
        updateBoard,
        switchDisplay,
    }
})();


const player = (() => {

    let gameOver = false

    const gameSquareEls = document.querySelectorAll(".game-square")

    let activePlayer = "X"

    function switchPlayer () {
        if(player.activePlayer === "X"){
            player.activePlayer = "O" 
        }else if(player.activePlayer === "O"){
            player.activePlayer = "X"
        }
    } 

    const changePlayer = () => {
    gameSquareEls.forEach(gameSquareEl => {
        gameSquareEl.addEventListener("click", () => {
                if((gameBoard.occupied === "false") && (player.gameOver === false)){
                    conditions.pushIntoDecicionArrays();
                    displayController.switchDisplay();
                    conditions.checkWinningConditions();
                switchPlayer();
                }else if(gameBoard.occupied === "true"){
                    console.log("occupied")
                }
            
})
    });}
    return{
        activePlayer,
        changePlayer,
        gameOver,
    }
})();


const conditions = (() => {

const announceWinner = document.getElementById("announcement")
//winning conditions
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const decisionXArray = []
const decisionOArray = []

let checker = (arr, target) => target.every(v => arr.includes(v));

const checkWinningConditions = () => {
for (let i = 0; i < winningConditions.length; i++) {
    if(checker(decisionXArray,winningConditions[i]) === true){
        announceWinner.innerText = "X Wins"
        console.log("X Wins")
        player.gameOver = true;
    }else if(checker(decisionOArray,winningConditions[i]) === true){
        console.log("O Wins")
        announceWinner.innerText = "O Wins"
        player.gameOver = true;
    }else if(gameBoard.playCount === 9){
        announceWinner.innerText = "Draw"
        player.gameOver = true;
    }
    }
}

function pushIntoDecicionArrays(){
    if(player.activePlayer === "X"){
        decisionXArray.push(gameBoard.chosenSquare)
    }else if(player.activePlayer === "O"){
        decisionOArray.push(gameBoard.chosenSquare)
    }
}

    gameBoard.editArray();
    player.changePlayer();
    pushIntoDecicionArrays();


return{
    winningConditions,
    checkWinningConditions,
    pushIntoDecicionArrays,
    decisionXArray,
}


})();

