export function log(...args) {
	args.forEach(arg => console.log(arg));
};

export function load_json(url) {
    return fetch(url).then(response => response.json());
};

export function load_image(url) {
    return fetch(url)
        .then(response => response.blob())
        .then(function(blob) {
			return new Promise((resolve, reject) => {
				const image = new Image();
				image.onload = e => {
					URL.revokeObjectURL(image.src);
					resolve(image);
				}
				image.onerror = e => {
					reject(e);
				}				
				image.src = URL.createObjectURL(blob);
				return image;
			})
		});
};
