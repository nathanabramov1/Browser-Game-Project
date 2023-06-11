let board = [
    null,null, null,
    null,null, null,
    null,null, null
]

// Determine the first player in the game//
function determineFirstPlayer() {
    let player1 = math.random()
    let player2 = math.random()
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
                board[index] = currentPlayer
                cell.innerText = currentPlayer
                cell.classList.add('active')
                checkForWinner()
                checkForTie()
                switchplayer()
            }
        })
       
    })
}

addEventListeners()