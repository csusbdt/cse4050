const default_duration = .125;

export function c_frame(ss, frame_name, duration = default_duration) {
	this.ss         = ss;
	this.frame_name = frame_name;
	this.d          = duration;
}

c_frame.prototype.draw = function(ctx, offset_x = 0, offset_y = 0) {
	this.ss.draw(ctx, this.frame_name, offset_x, offset_y);
};
