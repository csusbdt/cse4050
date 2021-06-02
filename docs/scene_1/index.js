import '../scripts/main.js';

document.title = "canvas example";

const ss = new c_spritesheet('scene_1');

ss.load().then(() => {
	const ctx = g_canvas.getContext('2d', { alpha: true });
	ss.draw(ctx, 'bg');	
});
