const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


function resizeCanvas() {
  canvas.width = window.innerWidth * 0.2;
  canvas.height = canvas.width * 2;
}

function drawGrid() {
  ctx.strokeStyle = `rgb(0, 0, 0)`;
  ctx.lineWidth = 0.5;
  let spc = canvas.width * 0.1;

  for (let i = 1; i <= 9; i++) {
    ctx.beginPath();
    ctx.moveTo(i * spc, 0);
    ctx.lineTo(i * spc, spc * 20)
    ctx.stroke();
  }

  for (let i = 1; i <= 19; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * spc);
    ctx.lineTo(spc * 10, i * spc);
    ctx.stroke();
  }
}

const pieces = [
  // I
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0]
  ],
  // O
  [
    [0, 1, 1, 0],
    [0, 1, 1, 0]
  ],
  // L
  [
    [0, 0, 1, 0],
    [1, 1, 1, 0]
  ],
  // J
  [
    [1, 0, 0, 0],
    [1, 1, 1, 0]
  ],
  // Z
  [
    [1, 1, 0, 0],
    [0, 1, 1, 0]
  ],
  // S
  [
    [0, 1, 1, 0],
    [1, 1, 0, 0]
  ],
  // T
  [
    [0, 1, 0, 0],
    [1, 1, 1, 0]
  ]
]

const pieceCols = ["#00F0F0", "#F0F002", "#F0A000", "#0000F0", "#F00000", "#00F000", "#A000F0"]

function renderPiece(piece) {
  let spc = canvas.width * 0.1;
  ctx.fillStyle = pieceCols[piece];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 4; j++) {
      if (pieces[piece][i][j] === 1) {
        ctx.fillRect(spc * 3 + j * spc, i * spc, spc, spc);
      }
    }
  }
}

resizeCanvas(); // Initial call to set canvas size
drawGrid();
renderPiece(0);
