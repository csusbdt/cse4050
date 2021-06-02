import './utils.js';
import './c_spritesheet.js';

let scale = 1;
let left = 0;
let top = 0;
let dirty = true;
const ctx = g_canvas.getContext('2d', { alpha: true });

function adjust_canvas() {
	scale = Math.min(1, window.innerWidth / 1920, window.innerHeight / 1080);
	g_canvas.width = Math.min(window.innerWidth , 1920 * scale);
	g_canvas.height = Math.min(window.innerHeight, 1080 * scale);

	// Center canvas in browser window.
	left = (window.innerWidth  - g_canvas.width ) / 2;
	top  = (window.innerHeight - g_canvas.height) / 2;
	g_canvas.style['left'] = left;
	g_canvas.style['top' ] = top;

	ctx.setTransform(scale, 0, 0, scale, 0, 0);

	dirty = true;
}

adjust_canvas();

window.addEventListener('resize', function() {
	adjust_canvas();
});
