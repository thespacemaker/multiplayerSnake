(()=>{const e="#231f20",t=io("http://3.139.87.87:3000");t.on("init",(function(e){f=e})),t.on("gameState",(function(t){g&&(t=JSON.parse(t),requestAnimationFrame((()=>function(t){if(m.src=t.imgURL,a.innerText=t.currentTime,ctx.fillStyle=e,ctx.fillRect(0,0,i.width,i.height),t.food){let e=t.food;const n=i.width/t.gridX,o=i.height/t.gridY;ctx.fillStyle=t.food[0].color.hex,ctx.fillRect(e[0].x*n,e[0].y*o,40,40),ctx.fillStyle=t.food[1].color.hex,ctx.fillRect(e[1].x*n,e[1].y*o,40,40),h(t.players[0],n,o,"#c2c2c2"),h(t.players[1],n,o,"red")}}(t))))})),t.on("gameOver",(function(e){g&&(e=JSON.parse(e),g=!1,e.winner===f?alert("You Win!"):alert("You Lose :("))})),t.on("gameCode",(function(e){console.log(e)})),t.on("unknownCode",(function(){w(),alert("Unknown Game Code")})),t.on("tooManyPlayers",(function(){w(),alert("This game is already in progress")})),window.onscroll=function(){window.scrollTo(0,0)};const n=document.getElementById("gameScreen"),o=document.getElementById("initialScreen"),l=document.getElementById("newGameButton"),i=document.getElementById("canvas"),c=document.getElementById("joinGameButton"),d=document.getElementById("gameCodeInput"),a=document.getElementById("time"),m=document.getElementById("colorImage"),r=document.getElementById("toolbar").clientHeight+200,s=document.documentElement.clientHeight-r,u=document.documentElement.clientWidth-200;let f;i.width=40*Math.floor(u/40),i.height=40*Math.floor(s/40),l.addEventListener("click",(function(){t.emit("newGame")})),c.addEventListener("click",(function(){const l={roomName:new URLSearchParams(window.location.search).get("gameCode"),screenSize:{width:i.width,height:i.height}};console.log(l),t.emit("joinGame",l),o.style.display="none",n.style.display="block",ctx=i.getContext("2d"),ctx.fillStyle=e,ctx.fillRect(0,0,i.width,i.height),document.addEventListener("keydown",y),g=!0}));let g=!1;function y(e){t.emit("keydown",e.keyCode)}function h(e,t,n,o){const l=e.snake;ctx.fillStyle=o;for(let e of l)ctx.fillRect(e.x*t,e.y*n,40,40)}function w(){f=null,d.value="",o.style.display="block",n.style.display="none"}})();