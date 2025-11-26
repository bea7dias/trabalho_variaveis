const niveis = [
    [
        [0, 0, 1, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [1, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 2]
    ],
    [
        [0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0, 1, 0],
        [1, 1, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 2]
    ],
    [
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0, 1, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
        [1, 1, 0, 1, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
    ]
];

let nivelAtual = 0;
let mapa = niveis[nivelAtual];
let linhas = mapa.length;
let colunas = mapa[0].length;

let jogador = { x: 0, y: 0 };

const labirinto = document.getElementById("labirinto");
const info = document.getElementById("info");

function atNivel(n) {
    if (n < 0 || n >= niveis.length) return;
    nivelAtual = n;
    mapa = niveis[nivelAtual];
    linhas = mapa.length;
    colunas = mapa[0].length;
    jogador = { x: 0, y: 0 };
    labirinto.style.gridTemplateColumns = `repeat(${colunas}, 40px)`;
    desenho();
}

function desenho() {
    labirinto.innerHTML = "";
    labirinto.style.gridTemplateColumns = `repeat(${colunas}, 40px)`;
    for (let y = 0; y < linhas; y++) {
        for (let x = 0; x < colunas; x++) {
            const div = document.createElement("div");
            div.className = "cell";
            if (mapa[y][x] === 1) div.classList.add("parede");
            if (mapa[y][x] === 2) div.classList.add("objetivo");
            if (x === jogador.x && y === jogador.y) div.classList.add("jogador");
            labirinto.appendChild(div);
        }
    }
    info.textContent = `Nível [${nivelAtual + 1}] | z = ${jogador.x} + ${jogador.y}i`;
}

function movimento(dx, dy) {
    const nx = jogador.x + dx;
    const ny = jogador.y + dy;

    if (nx < 0 || nx >= colunas || ny < 0 || ny >= linhas) return;
    if (mapa[ny][nx] === 1) return;

    jogador.x = nx;
    jogador.y = ny;

    if (mapa[ny][nx] === 2) {
        if (nivelAtual < niveis.length - 1) {
            alert(`Parabéns! Passou do Nível ${nivelAtual + 1}. Avançando para o Nível ${nivelAtual + 2}.`);
            atNivel(nivelAtual + 1);
            return;
        } else {
            alert("Parabéns! Você completou todos os níveis!");
            atNivel(0);
            return;
        }
    }

    desenho();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") movimento(1, 0);
    if (e.key === "ArrowLeft") movimento(-1, 0);
    if (e.key === "ArrowUp") movimento(0, -1);
    if (e.key === "ArrowDown") movimento(0, 1);
});


atNivel(0);
