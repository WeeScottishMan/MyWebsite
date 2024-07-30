const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas(); // Set initial size
window.addEventListener('resize', resizeCanvas); // Add resize event listener

let particles = [];
const particleCount = 100;
const connectionDistance = 100;
const speedFactor = 0.1; // Adjust this value to change the speed of the particles

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2;
        this.speedX = (Math.random() * 3 - 1.5) * speedFactor;
        this.speedY = (Math.random() * 3 - 1.5) * speedFactor;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Keep particles within the canvas boundaries
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles = []; // Reset particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let a = 0; a < particles.length; a++) {
        particles[a].update();
        particles[a].draw();
        
        for (let b = a; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
                ctx.strokeStyle = `rgba(255,255,255,${1 - distance/connectionDistance})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animate);
}

// Initialize and start animation
init();
animate();
