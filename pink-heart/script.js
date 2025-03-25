// script.js
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-btn');

let score = 0;
let timeLeft = 30;
let gameActive = false;
let heartInterval;

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '💖';
    
    // Random position
    const x = Math.random() * (gameArea.offsetWidth - 40);
    const y = Math.random() * (gameArea.offsetHeight - 40);
    
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    
    // Click to score
    heart.addEventListener('click', () => {
        if (gameActive) {
            score += 1;
            scoreDisplay.textContent = score;
            heart.style.transform = 'scale(1.5)';
            setTimeout(() => {
                heart.remove();
            }, 100);
        }
    });
    
    gameArea.appendChild(heart);
    
    // Remove heart after 2 seconds if not clicked
    setTimeout(() => {
        if (heart.parentElement) {
            heart.remove();
        }
    }, 2000);
}

function startGame() {
    if (!gameActive) {
        gameActive = true;
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = score;
        timeDisplay.textContent = timeLeft;
        startBtn.textContent = 'Playing...';
        startBtn.disabled = true;

        // Clear existing hearts
        gameArea.innerHTML = '';

        // Spawn hearts every 0.8 seconds
        heartInterval = setInterval(createHeart, 800);

        // Game timer
        const timer = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                clearInterval(heartInterval);
                gameActive = false;
                startBtn.textContent = 'Start Game';
                startBtn.disabled = false;
                alert(`Game Over! Your score: ${score}`);
            }
        }, 1000);
    }
}

startBtn.addEventListener('click', startGame);