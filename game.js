document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const diceDisplay = document.getElementById('dice');
    const rollDiceBtn = document.getElementById('rollDice');
    const resetGameBtn = document.getElementById('resetGame');
    const players = [
        { id: 'player1', color: 'red', position: 0 },
        { id: 'player2', color: 'blue', position: 0 },
        { id: 'player3', color: 'green', position: 0 },
        { id: 'player4', color: 'yellow', position: 0 }
    ];
    
    let currentPlayer = 0;
    let diceValue = 0;
    
    // Initialize the board
    function initBoard() {
        board.innerHTML = '';
        
        // Create 11x11 grid (simplified for demo)
        for (let row = 0; row < 11; row++) {
            for (let col = 0; col < 11; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                
                // Mark special cells (start, home, etc.)
                if (row === 0 && col === 0) cell.classList.add('home');
                if (row === 5 && col === 5) cell.classList.add('start');
                
                board.appendChild(cell);
            }
        }
        
        // Reset player positions
        players.forEach(player => {
            player.position = 0;
            updatePlayerPosition(player);
        });
        
        currentPlayer = 0;
        diceValue = 0;
        diceDisplay.textContent = '🎲';
    }
    
    // Update player position on the board
    function updatePlayerPosition(player) {
        const playerElement = document.getElementById(player.id);
        const cellSize = 500 / 11; // Board is 500px, 11 cells
        
        // Simple path logic (circular for demo)
        let x, y;
        if (player.position < 10) {
            x = player.position + 1;
            y = 0;
        } else if (player.position < 20) {
            x = 10;
            y = player.position - 9;
        } else if (player.position < 30) {
            x = 30 - player.position;
            y = 10;
        } else if (player.position < 40) {
            x = 0;
            y = 40 - player.position;
        } else {
            x = 5;
            y = 5; // Back to start (simplified)
        }
        
        playerElement.style.left = `${x * cellSize + cellSize / 2 - 10}px`;
        playerElement.style.top = `${y * cellSize + cellSize / 2 - 10}px`;
    }
    
    // Roll the dice
    function rollDice() {
        if (diceValue !== 0) return; // Prevent rolling twice
        
        diceValue = Math.floor(Math.random() * 6) + 1;
        diceDisplay.textContent = `🎲 ${diceValue}`;
        
        // Move the current player
        setTimeout(() => {
            players[currentPlayer].position += diceValue;
            updatePlayerPosition(players[currentPlayer]);
            
            // Check for win condition (simplified)
            if (players[currentPlayer].position >= 40) {
                alert(`Player ${currentPlayer + 1} wins!`);
                initBoard();
                return;
            }
            
            // Reset dice and switch player
            diceValue = 0;
            currentPlayer = (currentPlayer + 1) % players.length;
        }, 500);
    }
    
    // Event listeners
    rollDiceBtn.addEventListener('click', rollDice);
    resetGameBtn.addEventListener('click', initBoard);
    
    // Start the game
    initBoard();
});