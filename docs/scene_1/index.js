window.log = function(...args) {
	args.forEach(arg => console.log(arg));
}

document.title = "canvas example";

function adjust_canvas() {
	g_canvas.style.width = window.innerWidth;
	g_canvas.style.height = window.innerHeight;	
}

adjust_canvas();

window.addEventListener('resize', function() {
	adjust_canvas();
})