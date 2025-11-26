const rows = 7, cols = 7;

const mapa = [
  [0,0,1,0,0,0,0],
  [0,1,1,0,1,1,0],
  [0,0,0,0,0,1,0],
  [1,1,0,1,0,0,0],
  [0,0,0,1,0,1,0],
  [0,1,0,0,0,0,0],
  [0,0,0,1,0,0,2]
];

let player = {x:0, y:0};

const grid = document.getElementById("grid");
const info = document.getElementById("info");

function desenho(){
  grid.innerHTML = "";
  for(let y=0; y<rows; y++){
    for(let x=0; x<cols; x++){
      const div = document.createElement("div");
      div.className = "cell";
      if(map[y][x]===1) div.classList.add("wall");
      if(map[y][x]===2) div.classList.add("goal");
      if(x===player.x && y===player.y) div.classList.add("player");
      grid.appendChild(div);
    }
  }
  info.textContent = `z = ${player.x} + ${player.y}i`;
}

function move(dx, dy){
  const nx = player.x + dx;
  const ny = player.y + dy;

  if(nx<0 || nx>=cols || ny<0 || ny>=rows) return;
  if(map[ny][nx]===1) return;

  player.x = nx;
  player.y = ny;

  if(map[ny][nx]===2){
    alert("Parabéns! Você alcançou o objetivo!");
  }

  desenho();
}

desenho();