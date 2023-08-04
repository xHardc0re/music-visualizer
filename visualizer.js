window.addEventListener('DOMContentLoaded', init);

function init() {
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');

    // Set canvas size to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileSelect, false);

    function handleFileSelect(evt) {
        const file = evt.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const arrayBuffer = e.target.result;
                loadAudio(arrayBuffer);
                fileInput.style.display = 'none'; // Hide the file chooser after selecting a song
            };
            reader.readAsArrayBuffer(file);
        }
    }
}

function loadAudio(arrayBuffer) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContext.decodeAudioData(arrayBuffer)
        .then(audioBuffer => {
            const analyser = audioContext.createAnalyser();

            // Connect the audio context to the analyser
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(analyser);
            analyser.connect(audioContext.destination);

            // Start playing the audio
            source.start();

            // Set up the analyser and visualization
            analyser.fftSize = 256; // Adjust the size for frequency resolution
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            // Initialize max frequency variable
            let maxFrequency = 0;

            // Draw the visualization
            const canvas = document.getElementById('visualizer');
            const ctx = canvas.getContext('2d');

            ctx.font = 'bold 16px Arial'; // Set font style and size for the frequencies
            ctx.textAlign = 'center'; // Align text to the center of the bar

            function draw() {
                // Update canvas size to full screen on each draw call
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                analyser.getByteFrequencyData(dataArray);

                const barWidth = canvas.width / bufferLength;
                const barHeightMultiplier = 2.5; // Adjust this value to make bars taller
                let x = 0;

                // Set background color for the window
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Calculate max frequency in real-time
                maxFrequency = 0;

                for (let i = 0; i < bufferLength; i++) {
                    const frequency = i * (audioContext.sampleRate / analyser.fftSize);
                    if (dataArray[i] > maxFrequency) {
                        maxFrequency = dataArray[i];
                    }

                    const barHeight = dataArray[i] * barHeightMultiplier;
                    ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
                    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                    // Draw the frequency text above the bar without overflowing
                    ctx.fillStyle = '#fff';
                    const frequencyLabel = getFrequencyLabel(frequency);
                    const textWidth = ctx.measureText(frequencyLabel).width;
                    const textX = x + barWidth / 2;
                    const textY = Math.max(canvas.height - barHeight - 10, 20); // Ensure text doesn't overlap the bar
                    ctx.fillText(frequencyLabel, textX, textY);

                    x += barWidth + 1;
                }

                // Display max frequency in real-time
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 40px Arial';
                ctx.fillText('Max: ' + getFrequencyLabel(maxFrequency * (audioContext.sampleRate / analyser.fftSize)), canvas.width / 2, canvas.height / 2);

                requestAnimationFrame(draw);
            }

            draw(); // Start the visualization
        })
        .catch(error => console.error(error));
}

function getFrequencyLabel(frequency) {
    // Choose a unit (Hz, kHz, MHz) based on the magnitude of the frequency
    if (frequency < 1000) {
        return frequency.toFixed(1) + ' Hz';
    } else if (frequency < 1000000) {
        return (frequency / 1000).toFixed(1) + ' kHz';
    } else {
        return (frequency / 1000000).toFixed(1) + ' MHz';
    }
}
