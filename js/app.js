/*-------------------------------- Constants --------------------------------*/
let squareEls = []
squareEls = document.querySelectorAll('.square')

/*---------------------------- Variables (state) ----------------------------*/

let board = [null, null, null, null, null, null, null, null, null]
let boardValues
let player1
let player2
let turn  = 1
let winner
let winningCombos = []   
let boardIsFilled = false 
let gameIsStopped 

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
playerOneInput = document.querySelector('#player1-input')
playerTwoInput = document.querySelector('#player2-input')
playerOneSubmit = document.querySelector('#submit-one') 
playerTwoSubmit = document.querySelector('#submit-two')
player1Display = document.querySelector('#player1-display')
player2Display = document.querySelector('#player2-display')
/*----------------------------- Event Listeners -----------------------------*/


resetBtn.addEventListener('click', reset)
playerOneSubmit.addEventListener('click', setPlayerOne)
playerTwoSubmit.addEventListener('click', setPlayerTwo)

/*-------------------------------- Functions --------------------------------*/

function init() {
  player1Display.textContent = ''
  player2Display.textContent = ''
  player1 = ''
  player2 = ''
  playerOneInput.value = ''
  playerTwoInput.value = ''
  playerOneInput.removeAttribute('hidden')
  playerOneSubmit.style.display = 'flex'
  playerTwoInput.removeAttribute('hidden')
  playerTwoSubmit.style.display = 'flex'
  turn = 1
  messageEl.textContent = "Please enter players names!"
  boardValues = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  board = [null, null, null, null, null, null, null, null, null]
  winner = null
  squareEls.forEach(function(squares) {
    squares.textContent = ''
  })
  resetBtn.setAttribute('hidden', true)
  boardIsFilled = false
  gameIsStopped = false
}
function beginPlay() {
  if (player1 !== '' && player2 !== '') {
  squareEls.forEach(function(squares) {
    squares.addEventListener('click', handleClick)
  })
  messageEl.textContent = `It is ${player1}'s turn to play!`
  }
}
function setPlayerOne(evt) {
  if (playerOneInput.value !== '') {
  player1 = playerOneInput.value
  playerOneInput.setAttribute('hidden', true)
  playerOneSubmit.style.display = 'none'
  player1Display.textContent = `${player1}`
  beginPlay()
  }
}
function setPlayerTwo(evt) {
  if (playerTwoInput.value !== '') {
  player2 = playerTwoInput.value
  playerTwoInput.setAttribute('hidden', true)
  playerTwoSubmit.style.display = 'none'
  player2Display.textContent = `${player2}`
  beginPlay()
  }
}
function turnRender(evt) {
  if (turn === 1) {
    messageEl.textContent = `It is ${player2}'s turn to play!`
    evt.target.textContent = 'X'
  }
  if (turn === -1) {
    messageEl.textContent = `It is ${player1}'s turn to play!`
    evt.target.textContent = 'O'
  }
}
function winRender() {
  if (winner === 'X') {
    messageEl.textContent = `${player1} has won the game!` 
  }
  if (winner === 'O') {
    messageEl.textContent = `${player2} has won the game!`
  }
  if (winner === 'T') {
    messageEl.textContent = "Game is a draw!"
  }
  endGame()
}
function getWinner(winValue) {
  if (winValue === -3) {
    winner = 'O'
    winRender()
  } 
  else if (winValue === 3) {
    winner = 'X'
    winRender()
  } else {
    winner = 'T' 
    winRender()
  }
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
    if (winValue === 3 || winValue === -3 || boardIsFilled) {
      getWinner(winValue)
    }
  })
}
function boardFilled() {
  if (boardValues.every(function(square) {
    return square !== 0
  })) {
    boardIsFilled = true
    checkWin()
  }
}
function successfulClick() {
  trackTurn()
  trackSquareValue()
  updateWinCombos()
  checkWin()
  if (!gameIsStopped) {
  boardFilled()}
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
  gameIsStopped = true
  squareEls.forEach(function(squares) {
    squares.removeEventListener('click', handleClick)
  })
  resetBtn.removeAttribute('hidden')
}
init()