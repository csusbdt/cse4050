import { load_image, load_json } from './utils.js';
import './c_frame.js';
import './c_seq.js';

window.c_spritesheet = function(ss_name) {
	this.name   = ss_name;
	this.image = null;
	this.frames = null;
};

c_spritesheet.prototype.load = function() {
	return Promise.all([
		load_image(`../spritesheets/${this.name}.png`),
		load_json(`../spritesheets/${this.name}.json`)
	]).then(([image, frames]) => {
		this.image  = image;
		this.frames = frames;
	});
};

c_spritesheet.prototype.draw = function(ctx, frame_name, offset_x = 0, offset_y = 0) {
	ctx.drawImage(
		this.image, 
		this.frames[frame_name].sx, 
		this.frames[frame_name].sy, 
		this.frames[frame_name].w, 
		this.frames[frame_name].h, 
		this.frames[frame_name].dx + offset_x,
		this.frames[frame_name].dy + offset_y,
		this.frames[frame_name].w, 
		this.frames[frame_name].h
	);
};

c_spritesheet.prototype.frame = function(frame_name, duration = default_duration) {
	return new c_frame(this, frame_name, duration);
};


c_spritesheet.prototype.seq = function(seq_name) {
	const frames = [];
	if (seq_name in this.frames) {
		frames.push(this.frame(seq_name));
	}
	let i = 1;
	let frame_name = seq_name + i;
	while (frame_name in this.frames) {
		frames.push(this.frame(frame_name));
		++i;
		frame_name = seq_name + i;
	}
	i = 1;
	frame_name = seq_name + '0' + i;
	while (frame_name in this.frames) {
		frames.push(this.frame(frame_name));
		++i;
		if (i < 10) {
			frame_name = seq_name + '0' + i;
		} else {
			frame_name = seq_name + i;
		}
	}
	if (frames.length === 0) {
		throw new Error(seq_name + "  not found in " + this.name);
	}
	return new c_seq(frames);
};
