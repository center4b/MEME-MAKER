const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //** getContext( 2d or 3d, ??) */
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(200, 200, 50, 200);
ctx.fillRect(400, 200, 50, 200);
ctx.fillRect(300, 250, 50, 150);
ctx.fillRect(200, 200, 200, 10);
ctx.moveTo(200, 200);
ctx.lineTo(325, 100);
ctx.lineTo(450, 200);
ctx.fill();
