// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("reset-btn").addEventListener("click", resetGame);

const time = document.getElementById("time");
const score = document.getElementById("score");
const message = document.getElementById("message");

const winMessages = [
  "Congratulations, you won!",
  "You did it, you saved the water!",
  "Thank you for protecting our water!"
];
const loseMessages = [
  "Oh no, better luck next time.",
  "Try again until you get it right.",
  "Sorry, you weren't able to save the water."
];

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);
}

function resetGame() {
  if (!gameRunning) return;

  gameRunning = false;

  clearInterval(dropMaker);
  time.textContent = "30"
  score.textContent = "0"  
  document.getElementById("game-container").replaceChildren();

}

function createDrop() {
  if (parseInt(time.textContent) > 0) {
    time.textContent = parseInt(time.textContent) - 1;
  } else {
    clearInterval(dropMaker);

    message.style.display = "block";
    if (parseInt(score.textContent) > 20) {
      message.textContent = winMessages[Math.floor(Math.random() * winMessages.length)];
    } else {
      message.textContent = loseMessages[Math.floor(Math.random() * loseMessages.length)];
    }
  }

  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  drop.className = "water-drop";
  if (Math.random() < 0.15) {
    drop.classList.add("bad-drop")
  }

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });

  drop.addEventListener("click", () => {
    if (drop.classList.contains("bad-drop")) {
      if (score.textContent > 0) {
        score.textContent = parseInt(score.textContent) - 1;
      }
    } else {
      score.textContent = parseInt(score.textContent) + 1;
    }
    drop.remove();
  });
}
