/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (() => {

eval("const BG_COLOUR = '#231f20';\nconst SNAKE_COLOUR = '#c2c2c2';\nconst FOOD_COLOUR = '#e66916';\nconst socket = io(http://localhost:3000);\nsocket.on('init', handleInit);\nsocket.on('gameState', handleGameState);\nsocket.on('gameOver', handleGameOver);\nsocket.on('gameCode', handleGameCode);\nsocket.on('unknownCode', handleUnknownCode);\nsocket.on('tooManyPlayers', handleTooManyPlayers);\n\nwindow.onscroll = function () {\n  window.scrollTo(0, 0);\n};\n\nconst gameScreen = document.getElementById('gameScreen');\nconst initialScreen = document.getElementById('initialScreen');\nconst newGameBtn = document.getElementById('newGameButton');\nconst canvas = document.getElementById('canvas');\nconst joinGameBtn = document.getElementById('joinGameButton');\nconst gameCodeInput = document.getElementById('gameCodeInput');\nconst time = document.getElementById('time'); // const gameCodeDisplay = document.getElementById('gameCodeDisplay');\n\nconst img = document.getElementById('colorImage');\nconst toolbar = document.getElementById('toolbar').clientHeight + 200;\nconst windowHeight = document.documentElement.clientHeight - toolbar;\nconst windowWidth = document.documentElement.clientWidth - 200;\ncanvas.width = Math.floor(windowWidth / 40) * 40;\ncanvas.height = Math.floor(windowHeight / 40) * 40; // window.onscroll = function () { window.scrollTo(0, 0); };\n\nnewGameBtn.addEventListener('click', newGame);\njoinGameBtn.addEventListener('click', joinGame);\n\nfunction newGame() {\n  socket.emit('newGame'); // init();\n}\n\nfunction joinGame() {\n  const urlParams = new URLSearchParams(window.location.search);\n  const code = urlParams.get('gameCode');\n  const message = {\n    roomName: code,\n    screenSize: {\n      width: canvas.width,\n      height: canvas.height\n    }\n  };\n  console.log(message);\n  socket.emit('joinGame', message);\n  init();\n}\n\nlet playerNumber;\nlet gameActive = false;\n\nfunction init() {\n  initialScreen.style.display = \"none\";\n  gameScreen.style.display = \"block\"; // canvas = document.getElementById('canvas');\n\n  ctx = canvas.getContext('2d');\n  ctx.fillStyle = BG_COLOUR;\n  ctx.fillRect(0, 0, canvas.width, canvas.height);\n  document.addEventListener('keydown', keydown);\n  gameActive = true;\n}\n\nfunction keydown(e) {\n  socket.emit('keydown', e.keyCode);\n}\n\nfunction paintGame(state) {\n  img.src = state.imgURL; // console.log(state.sinceLastFood)\n\n  time.innerText = state.currentTime;\n  ctx.fillStyle = BG_COLOUR;\n  ctx.fillRect(0, 0, canvas.width, canvas.height);\n\n  if (state.food) {\n    let food = state.food; // const gridsize = state.gridsize;\n\n    const sizeX = canvas.width / state.gridX;\n    const sizeY = canvas.height / state.gridY;\n    ctx.fillStyle = state.food[0].color.hex;\n    ctx.fillRect(food[0].x * sizeX, food[0].y * sizeY, 40, 40);\n    ctx.fillStyle = state.food[1].color.hex;\n    ctx.fillRect(food[1].x * sizeX, food[1].y * sizeY, 40, 40);\n    paintPlayer(state.players[0], sizeX, sizeY, SNAKE_COLOUR);\n    paintPlayer(state.players[1], sizeX, sizeY, 'red');\n  }\n}\n\nfunction paintPlayer(playerState, sizeX, sizeY, colour) {\n  const snake = playerState.snake;\n  ctx.fillStyle = colour;\n\n  for (let cell of snake) {\n    ctx.fillRect(cell.x * sizeX, cell.y * sizeY, 40, 40);\n  }\n}\n\nfunction handleInit(number) {\n  playerNumber = number;\n}\n\nfunction handleGameState(gameState) {\n  if (!gameActive) {\n    return;\n  }\n\n  gameState = JSON.parse(gameState);\n  requestAnimationFrame(() => paintGame(gameState));\n}\n\nfunction handleGameOver(data) {\n  if (!gameActive) {\n    return;\n  }\n\n  data = JSON.parse(data);\n  gameActive = false;\n\n  if (data.winner === playerNumber) {\n    alert('You Win!');\n  } else {\n    alert('You Lose :(');\n  }\n}\n\nfunction handleGameCode(gameCode) {\n  // gameCodeDisplay.innerText = gameCode;\n  console.log(gameCode);\n}\n\nfunction handleUnknownCode() {\n  reset();\n  alert('Unknown Game Code');\n}\n\nfunction handleTooManyPlayers() {\n  reset();\n  alert('This game is already in progress');\n}\n\nfunction reset() {\n  playerNumber = null;\n  gameCodeInput.value = '';\n  initialScreen.style.display = \"block\";\n  gameScreen.style.display = \"none\";\n}\n\n//# sourceURL=webpack://frontend/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.js"]();
/******/ 	
/******/ })()
;