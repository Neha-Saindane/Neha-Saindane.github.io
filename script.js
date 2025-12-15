document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('dataCanvas');
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    // Adjust canvas size on window resize
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial size setup

    // Data-related symbols/terms for particles
    const symbols = ['{ }', '< />', '101', '∑', 'λ', '𝛑', 'Δ', '📊', '📈', '🚀', '🔒', '💡', '🤖'];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 1; // Smaller particles
            this.speedX = Math.random() * 0.5 - 0.25; // Slower movement
            this.speedY = Math.random() * 0.5 - 0.25; // Slower movement
            this.color = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.3})`; // Indigo-like, semi-transparent
            this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
            this.fontPx = Math.random() * 12 + 8; // Font size for symbols
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Loop particles when they go off-screen
            if (this.x > canvas.width + 10) this.x = -10;
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.y > canvas.height + 10) this.y = -10;
            if (this.y < -10) this.y = canvas.height + 10;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.font = `${this.fontPx}px 'Space Mono', monospace`; // Use monospace for data feel
            ctx.fillText(this.symbol, this.x, this.y);
        }
    }

    function init() {
        particles = [];
        const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100); // Max 100 particles
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear only the canvas
        // ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'; // subtle fade trail
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    // Initialize and start animation
    init();
    animate();

    // Clean up on component unmount (if this were a SPA, good practice)
    // window.addEventListener('beforeunload', () => {
    //     cancelAnimationFrame(animationFrameId);
    // });
});