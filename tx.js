let board = [
    null,null, null,
    null,null, null,
    null,null, null
]

// Determine the first player in the game//
function determineFirstPlayer() {
    let player1 = Math.random()
    let player2 = Math.random()
    if (player1 > player2) {
        return 'X'
    } else {
        return 'O'
    }
}

let currentPlayer = determineFirstPlayer()

//displays a message to the user indicating whos turn it is//
function displaymessage(message) {
    let messageElement = document.getElementById('game-message')
    messageElement.innerText = message
}

displaymessage(`player ${currentPlayer}'s turn!`)


//add an event listener to each cell and update it after making a move//
let cells = document.querySelectorAll('td')

function addEventListeners(){
    cells.forEach((cell,index) => {
        cell.addEventListener('click', () => {
            if (board[index] === null) {
                updateBoard(index)
                checkForWinner()
                checkForTie()
            }
        })
       
    })
}

addEventListeners()

//switch the player after each move
function switchplayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O'
    } else {
        currentPlayer = 'X'
    }
    displaymessage(`player ${currentPlayer}'s turn!`)
}

//check for winner

function checkForWinner() {
  let winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]

  let winner = null

  winningCombos.forEach((combination) => {
    let [a,b,c] = combination
    if(board[a] !== null && board[a] === board[b] && board[b] === board[c]){
        winner = board[a]
        highlightWinnerCells(combination)
        removeEventListeners()
    }
  })

  if (winner!== null) {
    displaymessage(`${winner} has won the game!`) // come back to this later
    removeEventListeners()
  }
}

// hightlight the winning cells

function highlightWinnerCells(combination) {
    let [a,b,c] = combination
    cells[a].classList.add('winner')
    cells[b].classList.add('winner')
    cells[c].classList.add('winner')
    removeEventListeners()
}
//check for a tie

function checkForTie() {
  if(!board.includes(null)){
    displaymessage('It\'s a tie!')
    removeEventListeners()
}
}

//update the board after each move
function updateBoard(index) {
    board[index] = currentPlayer
    let cell = cells[index]
    cell.innerText = currentPlayer
    cell.classList.add('active')
    switchplayer()
}

// remove event listeners from the cells

function removeEventListeners() {
    cells.forEach(cell => {
        cell.removeEventListener('click',switchplayer)
    })
}

//restart the game

function restartGame() {
    board = [
        null,null, null,
        null,null, null,
        null,null, null
    ]
    cells.forEach((cell) => {
        cell.innerText = ''
        cell.classList.remove('active', 'winner')
    })
    currentPlayer = determineFirstPlayer()
    displaymessage(`player ${currentPlayer}'s turn!`)
    addEventListeners()
}



                               //Problems
//remove event listener does not work
//if u win on the last cell it says its a tie, it should display a winner message

