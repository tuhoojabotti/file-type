'use strict';
module.exports = function (buf) {
	if (!(buf && buf.length > 1)) {
		return null;
	}

	if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
		return {
			ext: 'jpg',
			mime: 'image/jpg'
		};
	}

	if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
		return {
			ext: 'png',
			mime: 'image/png'
		};
	}

	if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) {
		return {
			ext: 'gif',
			mime: 'image/gif'
		};
	}

	if (buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) {
		return {
			ext: 'webp',
			mime: 'image/webp'
		};
	}

	if ((buf[0] === 0x49 && buf[1] === 0x49 && buf[2] === 0x2a && buf[3] === 0x0) || (buf[0] === 0x4d && buf[1] === 0x4d && buf[2] === 0x0 && buf[3] === 0x2a)) {
		return {
			ext: 'tif',
			mime: 'image/tiff'
		};
	}

	if (buf[0] === 0x42 && buf[1] === 0x4d) {
		return {
			ext: 'bmp',
			mime: 'image/bmp'
		};
	}

	if (buf[0] === 0x49 && buf[1] === 0x49 && buf[2] === 0xbc) {
		return {
			ext: 'jxr',
			mime: 'image/vnd.ms-photo'
		}
	}

	if (buf[0] === 0x38 && buf[1] === 0x42 && buf[2] === 0x50 && buf[3] === 0x53) {
		return {
			ext: 'psd',
			mime: 'image/vnd.adobe.photoshop'
		};
	}

	// needs to be before `zip` check
	if (buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x3 && buf[3] === 0x4 &&
		buf.slice(30, 58).toString() === 'mimetypeapplication/epub+zip') {
		return {
			ext: 'epub',
			mime: 'application/epub+zip'
		};
	}

	if (buf[0] === 0x50 && buf[1] === 0x4b && (buf[2] === 0x3 || buf[2] === 0x5 || buf[2] === 0x7) && (buf[3] === 0x4 || buf[3] === 0x6 || buf[3] === 0x8)) {
		return {
			ext: 'zip',
			mime: 'application/zip'
		};
	}

	if (buf[257] === 0x75 && buf[258] === 0x73 && buf[259] === 0x74 && buf[260] === 0x61 && buf[261] === 0x72) {
		return {
			ext: 'tar',
			mime: 'application/x-tar'
		};
	}

	if (buf[0] === 0x52 && buf[1] === 0x61 && buf[2] === 0x72 && buf[3] === 0x21 && buf[4] === 0x1a && buf[5] === 0x7 && (buf[6] === 0x0 || buf[6] === 0x1)) {
		return {
			ext: 'rar',
			mime: 'application/x-rar-compressed'
		};
	}

	if (buf[0] === 0x1f && buf[1] === 0x8b && buf[2] === 0x8) {
		return {
			ext: 'gz',
			mime: 'application/gzip'
		};
	}

	if (buf[0] === 0x42 && buf[1] === 0x5a && buf[2] === 0x68) {
		return {
			ext: 'bz2',
			mime: 'application/x-bzip2'
		};
	}

	if (buf[0] === 0x37 && buf[1] === 0x7a && buf[2] === 0xbc && buf[3] === 0xaf && buf[4] === 0x27 && buf[5] === 0x1c) {
		return {
			ext: '7z',
			mime: 'application/x-7z-compressed'
		};
	}

	if ((buf[0] === 0x0 && buf[1] === 0x0 && buf[2] === 0x0 && (buf[3] === 0x18 || buf[3] === 0x20) && buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70) || (buf[0] === 0x33 && buf[1] === 0x67 && buf[2] === 0x70 && buf[3] === 0x35)) {
		return {
			ext: 'mp4',
			mime: 'video/mp4'
		};
	}

	// needs to be before the `webm` check
	if (buf.slice(31, 39).toString() === 'matroska') {
		return {
			ext: 'mkv',
			mime: 'video/x-matroska'
		};
	}

	if (buf[0] === 0x1a && buf[1] === 0x45 && buf[2] === 0xdf && buf[3] === 0xa3) {
		return {
			ext: 'webm',
			mime: 'video/webm'
		};
	}

	if (buf[0] === 0x0 && buf[1] === 0x0 && buf[2] === 0x0 && buf[3] === 0x14 && buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70) {
		return {
			ext: 'mov',
			mime: 'video/quicktime'
		};
	}

	if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf[8] === 0x41 && buf[9] === 0x56 && buf[10] === 0x49) {
		return {
			ext: 'avi',
			mime: 'video/x-msvideo'
		};
	}

	if (buf[0] === 0x30 && buf[1] === 0x26 && buf[2] === 0xb2 && buf[3] === 0x75 && buf[4] === 0x8e && buf[5] === 0x66 && buf[6] === 0xcf && buf[7] === 0x11 && buf[8] === 0xa6 && buf[9] === 0xd9) {
		return {
			ext: 'wmv',
			mime: 'video/x-ms-wmv'
		};
	}

	if (buf[0] === 0x0 && buf[1] === 0x0 && buf[2] === 0x1 && buf[3].toString(16)[0] === 'b') {
		return {
			ext: 'mpg',
			mime: 'video/mpeg'
		};
	}

	if ((buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) || (buf[0] === 0xff && buf[1] === 0xfb)) {
		return {
			ext: 'mp3',
			mime: 'audio/mpeg'
		};
	}

	if ((buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70) || (buf[0] === 0x4d && buf[1] === 0x34 && buf[2] === 0x41 && buf[3] === 0x20)) {
		return {
			ext: 'm4a',
			mime: 'audio/m4a'
		}
	}

	if (buf[0] === 0x4f && buf[1] === 0x67 && buf[2] === 0x67 && buf[3] === 0x53) {
		return {
			ext: 'ogg',
			mime: 'audio/ogg'
		};
	}

	if (buf[0] === 0x66 && buf[1] === 0x4c && buf[2] === 0x61 && buf[3] === 0x43) {
		return {
			ext: 'flac',
			mime: 'audio/x-flac'
		};
	}

	if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 && buf[8] === 0x57 && buf[9] === 0x41 && buf[10] === 0x56 && buf[11] === 0x45) {
		return {
			ext: 'wav',
			mime: 'audio/x-wav'
		};
	}

	if (buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46) {
		return {
			ext: 'pdf',
			mime: 'application/pdf'
		};
	}

	if (buf[0] === 0x4d && buf[1] === 0x5a) {
		return {
			ext: 'exe',
			mime: 'application/x-msdownload'
		};
	}

	if ((buf[0] === 0x43 || buf[0] === 0x46) && buf[1] === 0x57 && buf[2] === 0x53) {
		return {
			ext: 'swf',
			mime: 'application/x-shockwave-flash'
		};
	}

	if (buf[0] === 0x7b && buf[1] === 0x5c && buf[2] === 0x72 && buf[3] === 0x74 && buf[4] === 0x66) {
		return {
			ext: 'rtf',
			mime: 'application/rtf'
		};
	}

	return null;
};
