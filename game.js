document.addEventListener('DOMContentLoaded', function () {
  const player = document.getElementById('player');
  const obstacles = document.querySelectorAll('.obstacle');

  // Add event listener for space key to jump
  document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
      jump();
    }
  });

  function jump() {
    player.style.bottom = '200px'; // Adjust jump height as needed
    setTimeout(function () {
      player.style.bottom = '0';
    }, 300);
  }

  // Check for collisions with obstacles
  setInterval(function() {
    obstacles.forEach(function(obstacle) {
      if (isColliding(player, obstacle)) {
        gameOver();
      }
    });
  }, 100);

  function isColliding(player, obstacle) {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    return !(
      playerRect.bottom < obstacleRect.top ||
      playerRect.top > obstacleRect.bottom ||
      playerRect.right < obstacleRect.left ||
      playerRect.left > obstacleRect.right
    );
  }

  function gameOver() {
    alert('Game Over!'); // You can implement more advanced game over logic here
  }
});
