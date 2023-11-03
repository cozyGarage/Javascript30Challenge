
document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".game_board");
    const size = 4; // Size of the board
    let cells = []; // Array to hold the board cells
  
    // Initialize the board
    function initializeBoard() {
      for (let i = 0; i < size; i++) {
        cells[i] = [];
        for (let j = 0; j < size; j++) {
          cells[i][j] = 0;
        }
      }
    }
  
    // Render the board
    function renderBoard() {
      board.innerHTML = ""; // Clear the board
  
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const tile = document.createElement("div");
          tile.className = "tile";
          tile.innerText = cells[i][j] !== 0 ? cells[i][j] : "";
          tile.style.backgroundColor = getTileColor(cells[i][j]);
          board.appendChild(tile);
        }
      }
    }
  
    // Get the color for a tile based on its value
    function getTileColor(value) {
      const colors = {
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e"
      };
      return colors[value] || "#cdc1b4";
    }

    let score = 0; // Variable to keep track of the score
    // Check if the game is over
    function isGameOver() {
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            if (cells[i][j] === 0) {
              return false;
            }
            if (
              (i < size - 1 && cells[i][j] === cells[i + 1][j]) ||
              (j < size - 1 && cells[i][j] === cells[i][j + 1])
            ) {
              return false;
            }
          }
        }
        return true;
      }

    // Update the score
    function updateScore() {
        let currentScore = 0;
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    currentScore += cells[i][j];
                }
                }
                score = currentScore;
        }     
    
      // Render the score
      function renderScore() {
        const scoreContainer = document.querySelector(".score");
        scoreContainer.innerText = `Score: ${score}`;
      }
  
    // Add a new random tile to the board
    function addRandomTile() {
      const availableCells = [];
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (cells[i][j] === 0) {
            availableCells.push({ x: i, y: j });
          }
        }
      }
  
      if (availableCells.length > 0) {
        const { x, y } = availableCells[Math.floor(Math.random() * availableCells.length)];
        cells[x][y] = Math.random() < 0.9 ? 2 : 4;
      }
    }
  
    // Move tiles to the left
    function moveLeft() {
      let moved = false;
  
      for (let i = 0; i < size; i++) {
        for (let j = 1; j < size; j++) {
          if (cells[i][j] !== 0) {
            let k = j;
            while (k > 0 && cells[i][k - 1] === 0) {
              cells[i][k - 1] = cells[i][k];
              cells[i][k] = 0;
              k--;
              moved = true;
            }
  
            if (k > 0 && cells[i][k - 1] === cells[i][k]) {
              cells[i][k - 1] *= 2;
              cells[i][k] = 0;
              moved = true;
            }
          }
        }
      }
  
      return moved;
    }

    // Move tiles to the right
function moveRight() {
    let moved = false;
  
    for (let i = 0; i < size; i++) {
      for (let j = size - 2; j >= 0; j--) {
        if (cells[i][j] !== 0) {
          let k = j;
          while (k < size - 1 && cells[i][k + 1] === 0) {
            cells[i][k + 1] = cells[i][k];
            cells[i][k] = 0;
            k++;
            moved = true;
          }
  
          if (k < size - 1 && cells[i][k + 1] === cells[i][k]) {
            cells[i][k + 1] *= 2;
            cells[i][k] = 0;
            moved = true;
          }
        }
      }
    }
  
    return moved;
  }
  
  // Move tiles up
  function moveUp() {
    let moved = false;
  
    for (let j = 0; j < size; j++) {
      for (let i = 1; i < size; i++) {
        if (cells[i][j] !== 0) {
          let k = i;
          while (k > 0 && cells[k - 1][j] === 0) {
            cells[k - 1][j] = cells[k][j];
            cells[k][j] = 0;
            k--;
            moved = true;
          }
  
          if (k > 0 && cells[k - 1][j] === cells[k][j]) {
            cells[k - 1][j] *= 2;
            cells[k][j] = 0;
            moved = true;
          }
        }
      }
    }
  
    return moved;
  }
  
  // Move tiles down
  function moveDown() {
    let moved = false;
  
    for (let j = 0; j < size; j++) {
      for (let i = size - 2; i >= 0; i--) {
        if (cells[i][j] !== 0) {
          let k = i;
          while (k < size - 1 && cells[k + 1][j] === 0) {
            cells[k + 1][j] = cells[k][j];
            cells[k][j] = 0;
            k++;
            moved = true;
          }
  
          if (k < size - 1 && cells[k + 1][j] === cells[k][j]) {
            cells[k + 1][j] *= 2;
            cells[k][j] = 0;
            moved = true;
          }
        }
      }
    }
  
    return moved;
  }
  
  
    // Handle keydown events
    document.addEventListener("keydown", event => {
        let moved = false;
  
        switch (event.key) {
            case "ArrowLeft":
                moved = moveLeft();
                break;
        
            case "ArrowRight":
                moved = moveRight();
                break;
        
            case "ArrowUp":
                moved = moveUp();
                break;
        
            case "ArrowDown":
               moved = moveDown();
                break;
  
            default:
                return;
            }
  
        if (moved) {
            addRandomTile();
            renderBoard();
            updateScore();
            renderScore();
        }
    });

    const newGameButton = document.getElementById("new_game_btn");

  // Reset the game
  function resetGame() {
    initializeBoard();
    addRandomTile();
    addRandomTile();
    renderBoard();
    score = 0;
    renderScore();
  }

  // Event listener for the New Game button
  newGameButton.addEventListener("click", resetGame);

    // Start the game
    initializeBoard();
    addRandomTile();
    addRandomTile();
    renderBoard();
    renderScore();
    });
  