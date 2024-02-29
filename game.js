document.addEventListener('DOMContentLoaded', function () {
  const player = document.getElementById('player');
  const gameBackground = document.getElementById('game-background');
  const gameForeground = document.getElementById('game-foreground');
  const orbs = document.querySelectorAll('.orb');
  let additionalJumps = 0; // Track additional jumps
  let isJumping = false; // Track player jumping state
  let gameSpeed = 2; // Adjust game speed
  let gameWidth = 2000; // Adjust game width
  let obstacleOffset = 200; // Adjust distance between orbs and obstacles

  // Add event listener for left mouse click to jump
  document.addEventListener('click', function(event) {
    if (additionalJumps > 0 || !isJumping) {
      jump();
      if (additionalJumps > 0) {
        additionalJumps--;
      }
    }
  });

  function jump() {
    isJumping = true; // Set jumping state to true
    player.style.bottom = '200px'; // Adjust jump height as needed
    setTimeout(function () {
      player.style.bottom = '0';
      isJumping = false; // Reset jumping state when the jump is complete
    }, 300);
  }

  // Move game foreground (player and orbs)
  function moveForeground() {
    gameForeground.style.left = parseInt(gameForeground.style.left || 0) - gameSpeed + 'px';
    requestAnimationFrame(moveForeground);
  }

  // Start game
  function startGame() {
    requestAnimationFrame(moveForeground);
    spawnObstacles();
  }

  // Spawn obstacles near orbs
  function spawnObstacles() {
    orbs.forEach(function(orb) {
      const obstacle = document.createElement('div');
      obstacle.classList.add('obstacle');
      obstacle.style.bottom = '100px'; // Adjust obstacle height as needed
      obstacle.style.left = (parseInt(orb.style.left) + obstacleOffset) + 'px';
      gameForeground.appendChild(obstacle);
    });
  }

  // Start the game when everything is loaded
  startGame();
});
