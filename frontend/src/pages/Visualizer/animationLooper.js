const animationLooper = (
    canvas,
    type,
    width,
    height,
    numBars,
    heightVar,
    center_x,
    center_y,
    frequency_array
) => {
    canvas.width = width;
    canvas.height = height;
    let ctx, bar_height;
    const barWidth = window.innerWidth / numBars; //  max 1030 - leave it in 555
    const radius = 0; // innercircle
    ctx = canvas.getContext("2d");
    const rads = Math.PI / numBars;
    for (var i = 0; i < numBars + 1; i++) {
        //divide a circle into equal part

        // Math is magical - you can make lots of visualizer
        // this 4.5 decides the canves size
        bar_height = frequency_array[i] * 0.5 * heightVar + 200;
        let x, y, x_end, y_end;
        if (type === "circle") {
            x = center_x + Math.cos(rads * i) * radius;
            y = center_y + Math.sin(rads * i) * radius;
            x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
            y_end = center_y + Math.sin(rads * i) * (radius + bar_height);
            let dx = center_x + Math.cos(-rads * i) * radius;
            let dy = center_y + Math.sin(-rads * i) * radius;
            let dx_end = center_x + Math.cos(-rads * i) * (radius + bar_height);
            let dy_end = center_y + Math.sin(-rads * i) * (radius + bar_height);
            drawBar(x, y, x_end, y_end, i, ctx, numBars);
            drawBar(dx, dy, dx_end, dy_end, i, ctx, numBars);
        } else {
            x = barWidth / 2 + (i * window.innerWidth) / numBars;
            y = 800;
            y_end = 800 - bar_height;
            x_end = x;
            drawBar(x, y, x_end, y_end, i, ctx, numBars);
        }
        //draw a bar
    }
};
function drawBar(x1 = 0, y1 = 0, x2 = 0, y2 = 0, i, ctx, numBars) {
    // i = (new Date().getSeconds())
    let j = new Date().getMilliseconds();
    let normalizedTime = (1000- j) / 1000
    let normalizedI = ((numBars - i) / numBars + j);
    let colorInput = ((1000 * normalizedI) + (1000 * normalizedTime)) % 1000
    let red, green, blue;
    switch (true) {
        case colorInput < 142:
            // red
            red = 255;
            green = 0;
            blue = 0;
            break;
        case colorInput < 284:
            // yellow
            red = 255;
            green = 255;
            blue = 0;
            break;
        case colorInput < 426:
            // orange
            red = 255;
            green = 175;
            blue = 0;
            break;
        case colorInput < 568:
            // magenta
            red = 255;
            green = 0;
            blue = 255;
            break;
        case colorInput < 710:
            // purple
            red = 138
            green = 130
            blue = 238;
            break;
        case colorInput < 852:
            // green
            red = 0
            green = 255
            blue = 0
            break
        default:
            // white
            red = 0;
            blue = 255;
            green = 255;
    }

    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, "rgb(0,0,0)");
    gradient.addColorStop(1, `rgb(${red},${green},${blue})`);
    ctx.fillStyle = gradient;
    let lineColor = `rgb(${red},${green},${blue})`;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = window.innerWidth / numBars;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export default animationLooper;
