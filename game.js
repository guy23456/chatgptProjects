document.addEventListener('DOMContentLoaded', function () {
  const player = document.getElementById('player');
  const obstacles = document.querySelectorAll('.obstacle');
  const orbs = document.querySelectorAll('.orb');
  let additionalJumps = 0; // Track additional jumps

  // Add event listener for left mouse click to jump
  document.addEventListener('click', function(event) {
    // Check for collision with orbs only when clicking the mouse
    orbs.forEach(function(orb) {
      if (isColliding(player, orb)) {
        collectOrb(orb);
      }
    });

    if (additionalJumps > 0) {
      jump();
      additionalJumps--;
    }
    else {
      jump();
    }
  });

  function jump() {
    player.style.bottom = '100px'; // Adjust jump height as needed
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

  function collectOrb(orb) {
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
