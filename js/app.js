/*-------------------------------- Constants --------------------------------*/
let squareEls = []
squareEls = document.querySelectorAll('.square')

/*---------------------------- Variables (state) ----------------------------*/

let board = [null, null, null, null, null, null, null, null, null]
let boardValues
let playerO = -1
let playerX = 1
let turn  = 1
let winner
let winningCombos = []      

/*------------------------ Cached Element References ------------------------*/

resetBtn = document.querySelector('#reset-button')
messageEl = document.querySelector('#message')
board[0] = document.querySelector('#sq0')
board[1] = document.querySelector('#sq1')
board[2] = document.querySelector('#sq2') 
board[3] = document.querySelector('#sq3')
board[4] = document.querySelector('#sq4') 
board[5] = document.querySelector('#sq5')
board[6] = document.querySelector('#sq6')
board[7] = document.querySelector('#sq7')
board[8] = document.querySelector('#sq8')

/*----------------------------- Event Listeners -----------------------------*/

// squareEls.forEach(function(squares) {
//   squares.addEventListener('click', handleClick)
// })

resetBtn.addEventListener('click', reset)

/*-------------------------------- Functions --------------------------------*/

function init() {
  squareEls.forEach(function(squares) {
    squares.addEventListener('click', handleClick)
  })
  turn = 1
  messageEl.textContent = "It is X's turn to play!"
  boardValues = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  board = [null, null, null, null, null, null, null, null, null]
  winner = null
  squareEls.forEach(function(squares) {
    squares.textContent = ''
  })
  resetBtn.setAttribute('hidden', true)
}
function turnRender(evt) {
  if (turn === 1) {
    messageEl.textContent = "It is O's turn to play!"
    evt.target.textContent = 'X'
  }
  if (turn === -1) {
    messageEl.textContent = "It is X's turn to play!"
    evt.target.textContent = 'O'
  }
}
function winRender() {
  if (winner === 'T') {
    messageEl.textContent = "Game is a draw!"
  }
  if (winner === 'X') {
    messageEl.textContent = "X has won the game!"
  }
  if (winner === 'O') {
    messageEl.textContent = "O has won the game!"
  }
  endGame()
}
function getWinner(winValue) {
  if(winValue === -3) {
    winner = 'O'
  } else if (winValue === 3) {
    winner = 'X'
  } else winner = 'T'
  winRender()
}
function trackTurn() {
  turn *= -1
}
function handleClick(evt) {
  if (evt.target.textContent === '') 
    turnRender(evt)
    successfulClick()
}
function reset() {
  init()
}
function trackSquareValue() {
  squareEls.forEach(function(square, idx) {
    if (square.textContent === 'X') {
      boardValues[idx] = 1
    } else if (square.textContent === 'O') {
      boardValues[idx] = -1
    }
  })
}
function checkWin() {
  winningCombos.forEach(function(combo){
  let winValue = combo.reduce(function(prev, value) {
      return prev + value
    }, 0)
    if (winValue === 3 || winValue === -3) {
      getWinner(winValue)
    }
  })
}
function boardFilled() {
  if (boardValues.every(function(square) {
    return square !== 0
  })) {
    checkWin()
    getWinner()
  }
}
function successfulClick() {
  trackTurn()
  trackSquareValue()
  updateWinCombos()
  checkWin()
  boardFilled()
}
function updateWinCombos() {
  winningCombos = [
    [boardValues[0], boardValues[1], boardValues[2]], 
    [boardValues[3], boardValues[4], boardValues[5]], 
    [boardValues[6], boardValues[7], boardValues[8]], 
    [boardValues[0], boardValues[3], boardValues[6]], 
    [boardValues[1], boardValues[4], boardValues[7]], 
    [boardValues[2], boardValues[5], boardValues[8]], 
    [boardValues[0], boardValues[4], boardValues[8]], 
    [boardValues[2], boardValues[4], boardValues[6]]
  ]
}
function endGame() {
  squareEls.forEach(function(squares) {
    squares.removeEventListener('click', handleClick)
  })
  resetBtn.removeAttribute('hidden')
}
init()