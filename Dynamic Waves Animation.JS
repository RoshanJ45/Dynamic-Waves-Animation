const canvas = document.getElementById('waveCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        let waveAmplitude = 100;
        let waveFrequency = 0.02;
        let waveOffset = 0;
        const waveSpeed = 0.05;
        let mouseX = 0;
        let mouseY = 0;


        function drawWave() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);


            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);


                const lineWidth = (i + 1) * 2 + (mouseX / canvas.width) * 5;
                ctx.lineWidth = lineWidth;


                const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                gradient.addColorStop(0, `hsl(${(waveOffset + i * 100) % 360}, 100%, 50%)`);
                gradient.addColorStop(1, `hsl(${(waveOffset + i * 100 + 180) % 360}, 100%, 50%)`);


                for (let x = 0; x < canvas.width; x++) {
                    const y = waveAmplitude * Math.sin(x * waveFrequency + waveOffset + i * 0.5) + canvas.height / 2 + Math.sin(mouseY / 100) * 50;
                    ctx.lineTo(x, y);
                }


                ctx.strokeStyle = gradient;
                ctx.stroke();
            }


            waveOffset += waveSpeed;
            requestAnimationFrame(drawWave);
        }


        drawWave();


        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });


        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });