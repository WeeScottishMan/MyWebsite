        const cursor = document.getElementById('cursor');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        let resizeTimeout;
        window.addEventListener('resize', () => {
            resizeCanvas(); // Resize the canvas on window resize
            clearTimeout(resizeTimeout); // Clear the timeout if resize is still happening
            resizeTimeout = setTimeout(() => {
                // Update particle positions based on new canvas size
                particles.forEach(particle => {
                    particle.x = Math.random() * canvas.width;
                    particle.y = Math.random() * canvas.height;
                });
            }, 100); // Adjust the timeout duration as needed
        });

        init();
        animate();
