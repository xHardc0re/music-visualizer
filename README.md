# Music Visualizer with Frequency Bars

The Music Visualizer with Frequency Bars is a JavaScript application that reads an MP3 file and visualizes the audio track's frequencies using bars. The visualization is displayed on a canvas, and the bars represent different frequency bins, each showing the intensity of the corresponding frequency range.

## Features

- Real-time audio frequency visualization with bars.
- Full-screen visualization with no overflow.
- Allows selecting an MP3 file from the browser.
- Displays the frequency value on top of each bar.
- Calculates and displays the maximum frequency in real-time.
- Dark background and white frequency text for better visibility.

## How to Use

1. Clone or download this repository to your local machine.

2. Open the `index.html` file in a web browser (Chrome, Firefox, or any modern browser that supports the Web Audio API).

3. Once the web page loads, you will see a "Choose File" button. Click on it to select an MP3 audio file from your local system.

4. The audio track will start playing, and the visualization will be displayed on the canvas.

5. The bars represent different frequency ranges, and the height of each bar corresponds to the intensity of that frequency range in real-time.

6. The frequency value is displayed on top of each bar, showing the frequency range being represented.

7. The maximum frequency value observed during the audio playback will be displayed at the center of the canvas.

## Customize

You can customize the visualizer by adjusting various parameters in the `draw()` function within the `index.html` file. Some possible customizations include:

- Changing the `analyser.fftSize` to adjust the number of frequency bins and thus the number of bars displayed. Larger `fftSize` will increase the number of bars and provide higher frequency resolution.

- Modifying the `barHeightMultiplier` to control the height of the bars and the overall visualization.

- Changing the font, size, and color properties in the `ctx.font` and `ctx.fillStyle` settings to adjust the appearance of the frequency labels.

## Compatibility

This application uses the Web Audio API, which is supported in modern web browsers such as Chrome, Firefox, Safari, and Edge.

## Credits

The Music Visualizer with Frequency Bars is created using JavaScript and HTML5 canvas. The audio processing and visualization are based on the Web Audio API.

The code was implemented based on the requirements provided by the user.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

