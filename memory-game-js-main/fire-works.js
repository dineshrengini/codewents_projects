const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createFirework() {
  const firework = {
    x: Math.random() * canvas.width,
    y: canvas.height,
    particles: []
  };

  for (let i = 0; i < 100; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    const radius = Math.random() * 2 + 1;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

    firework.particles.push({
      x: firework.x,
      y: firework.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: radius,
      color: color,
      opacity: 1
    });
  }

  fireworks.push(firework);
}

function updateFireworks() {
  for (let i = fireworks.length - 1; i >= 0; i--) {
    const firework = fireworks[i];

    for (let j = firework.particles.length - 1; j >= 0; j--) {
      const particle = firework.particles[j];
      particle.x += particle.vx;
      particle.y -= particle.vy;
      particle.radius -= 0.02;
      particle.opacity -= 0.02;

      if (particle.radius <= 0 || particle.opacity <= 0) {
        firework.particles.splice(j, 1);
      }
    }

    if (firework.particles.length === 0) {
      fireworks.splice(i, 1);
    }
  }
}

function drawFireworks() {
  for (const firework of fireworks) {
    for (const particle of firework.particles) {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
    }
  }
}

const fireworks = [];

function launchFireworks() {
  fireworksActive = true;
  createFirework();
  setTimeout(launchFireworks, Math.random() * 500 + 250);
}

function stopFireworks() {
  fireworksActive = false;
}

function animate() {
  updateFireworks();
  drawFireworks();
  requestAnimationFrame(animate);
}

animate();
