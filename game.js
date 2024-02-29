document.addEventListener('DOMContentLoaded', function () {
  const player = document.getElementById('player');
  const obstacles = document.querySelectorAll('.obstacle');
  const orbs = document.querySelectorAll('.orb');
  let additionalJumps = 0; // Track additional jumps
  let isJumping = false; // Track player jumping state

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

  // Check for collisions with obstacles
  setInterval(function() {
    obstacles.forEach(function(obstacle) {
      if (isColliding(player, obstacle)) {
        gameOver();
      }
    });
  }, 100);

  // Check for collisions with orbs
  setInterval(function() {
    orbs.forEach(function(orb) {
      if (isColliding(player, orb)) {
        collectOrb(orb);
      }
    });
  }, 100);

  function collectOrb(orb) {
    orb.style.display = 'none'; // Hide collected orb
    additionalJumps++; // Grant additional jump
  }

  function isColliding(player, object) {
    const playerRect = player.getBoundingClientRect();
    const objectRect = object.getBoundingClientRect();
    return !(
      playerRect.bottom < objectRect.top ||
      playerRect.top > objectRect.bottom ||
      playerRect.right < objectRect.left ||
      playerRect.left > objectRect.right
    );
  }

  function gameOver() {
    alert('Game Over!'); // You can implement more advanced game over logic here
  }
});
