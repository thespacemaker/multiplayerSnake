const BG_COLOUR = '#231f20';
const SNAKE_COLOUR = '#c2c2c2';
const FOOD_COLOUR = '#e66916';

const socket = io('http://localhost:3000');

socket.on('init', handleInit);
socket.on('gameState', handleGameState);
socket.on('gameOver', handleGameOver);
socket.on('gameCode', handleGameCode);
socket.on('unknownCode', handleUnknownCode);
socket.on('tooManyPlayers', handleTooManyPlayers);

window.onscroll = function () { window.scrollTo(0, 0); };

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const gcanvas = document.getElementById('gameCanvas');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const time = document.getElementById('time');
// const gameCodeDisplay = document.getElementById('gameCodeDisplay');
const img = document.getElementById('colorImage');
// const toolbar = document.getElementById('toolbar').clientHeight + 200
// const windowHeight = document.documentElement.clientHeight - toolbar
const windowHeight = window.innerHeight - 200
const windowWidth = window.innerWidth - 200
gcanvas.width = Math.floor(windowWidth/40) * 40
gcanvas.height = Math.floor(windowHeight/40) * 40

// window.onscroll = function () { window.scrollTo(0, 0); };
newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);


function newGame() {
  console.log("newGame")
  socket.emit('newGame');
  // init();
}

function joinGame() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('gameCode')
  const message = {
    roomName: code,
    screenSize: {
      width: gcanvas.width,
      height: gcanvas.height
    }
  }
  console.log(message)
  socket.emit('joinGame', message);
  init();
}
let playerNumber;
let gameActive = false;

function init() {
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";

  // gcanvas = document.getElementById('gcanvas');
  ctx3 = gcanvas.getContext('2d');

  // ctx3.fillStyle = BG_COLOUR;
  // ctx3.fillRect(0, 0, gcanvas.width, gcanvas.height);

  document.addEventListener('keydown', keydown);
  gameActive = true;
}

function keydown(e) {
  socket.emit('keydown', e.keyCode);
}

function paintGame(state) {
  img.src=state.imgURL;
  // console.log(state.sinceLastFood)
  time.innerText = state.currentTime;
  ctx3.clearRect(0, 0, gcanvas.width, gcanvas.height);
  // ctx3.fillStyle = BG_COLOUR;
  // ctx3.fillRect(0, 0, gcanvas.width, gcanvas.height);
  if (state.food){
    let food = state.food
    // const gridsize = state.gridsize;
    const sizeX = gcanvas.width /state.gridX
    const sizeY = gcanvas.height/state.gridY
    ctx3.fillStyle = state.food[0].color.hex;
    ctx3.fillRect(food[0].x * sizeX, food[0].y * sizeY, 40, 40);
    ctx3.fillStyle = state.food[1].color.hex;
    ctx3.fillRect(food[1].x * sizeX, food[1].y * sizeY, 40, 40);

    paintPlayer(state.players[0], sizeX, sizeY, SNAKE_COLOUR);
    paintPlayer(state.players[1], sizeX, sizeY, 'red');
  }
}

function paintPlayer(playerState, sizeX, sizeY, colour) {
  const snake = playerState.snake;

  ctx3.fillStyle = colour;
  for (let cell of snake) {
    ctx3.fillRect(cell.x * sizeX, cell.y * sizeY, 40, 40);
  }
}

function handleInit(number) {
  playerNumber = number;
}

function handleGameState(gameState) {
  if (!gameActive) {
    return;
  }
  gameState = JSON.parse(gameState);
  requestAnimationFrame(() => paintGame(gameState));
}

function handleGameOver(data) {
  if (!gameActive) {
    return;
  }
  data = JSON.parse(data);

  gameActive = false;

  if (data.winner === playerNumber) {
    alert('You Win!');
  } else {
    alert('You Lose :(');
  }
}

function handleGameCode(gameCode) {
  // gameCodeDisplay.innerText = gameCode;
  console.log(gameCode)
}

function handleUnknownCode() {
  reset();
  alert('Unknown Game Code')
}

function handleTooManyPlayers() {
  reset();
  alert('This game is already in progress');
}

function reset() {
  playerNumber = null;
  gameCodeInput.value = '';
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
}
