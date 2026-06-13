import * as THREE from 'three';

export const morphVariants = ['crystal', 'diamond', 'fold', 'axis', 'ripple'];

export const morphPalettes = {
	dark: [0xffe29f, 0xf8f4ea, 0xd8fff4, 0xffc8d4, 0xcfd7ff],
	ivory: [0x19150f, 0x2d2417, 0x1f3732, 0x3a2026, 0x242a43],
};

export const getBaseShapeColor = (theme) =>
	theme === 'ivory' ? 0x15120d : 0xfffbf0;

export const createMorphTarget = (geometry, variant) => {
	const {
		attributes: { position },
	} = geometry;
	const target = new Float32Array(position.count * 3);
	const vertex = new THREE.Vector3();

	for (let index = 0; index < position.count; index += 1) {
		vertex.fromBufferAttribute(position, index).normalize();
		let radius = 1;

		if (variant === 'crystal') {
			radius =
				1.38 /
				(Math.abs(vertex.x) * 1.08 +
					Math.abs(vertex.y) * 0.92 +
					Math.abs(vertex.z) * 1.12);
		}

		if (variant === 'diamond') {
			radius =
				1.2 /
				(Math.abs(vertex.y) * 1.45 +
					Math.max(Math.abs(vertex.x), Math.abs(vertex.z)) * 0.82);
		}

		if (variant === 'fold') {
			radius =
				0.92 +
				Math.sin(vertex.x * 7.4) * 0.12 +
				Math.cos(vertex.y * 6.2) * 0.14 +
				Math.sin(vertex.z * 8.6) * 0.1;
		}

		if (variant === 'axis') {
			radius =
				0.86 +
				Math.abs(vertex.y) * 0.36 +
				Math.sin(Math.atan2(vertex.z, vertex.x) * 5) * 0.08;
		}

		if (variant === 'ripple') {
			radius =
				0.96 +
				Math.sin(vertex.x * 9.2 + vertex.y * 3.1) * 0.1 +
				Math.cos(vertex.z * 7.5) * 0.12;
		}

		target[index * 3] = vertex.x * radius;
		target[index * 3 + 1] = vertex.y * radius;
		target[index * 3 + 2] = vertex.z * radius;
	}

	return target;
};
