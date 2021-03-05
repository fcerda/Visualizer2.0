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
    console.log(window.innerWidth);
    const barWidth = window.innerWidth / numBars; //  max 1030 - leave it in 555
    const radius = 0; // innercircle
    ctx = canvas.getContext("2d");
    const rads = (Math.PI) / numBars;
    for (var i = 0; i < numBars+1; i++) {
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
    i = (new Date().getSeconds())
    let red,green,blue
    if (i < 20) {
        red = 255 - i*20
        green = 0 + i*40
        blue = 100
    } else if (i < 40) {
        red = 0 + i*10
        green = 102
        blue = 101
    } else {
        red = 37
        green = 102 - i * 10
        blue = 101
    }
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, "rgb(0,0,0)");
    gradient.addColorStop(1, `rgb(${red},${green},${blue})`);
    ctx.fillStyle = gradient;
    let lineColor = gradient;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = window.innerWidth / numBars;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export default animationLooper;
