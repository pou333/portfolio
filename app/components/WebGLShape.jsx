'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';

import {
	createMorphTarget,
	getBaseShapeColor,
	morphPalettes,
	morphVariants,
} from '../lib/morphTargets';

export default function WebGLShape({ activeSection, opened, theme }) {
	const canvasRef = useRef(null);
	const runtimeRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const sizes = { width: window.innerWidth, height: window.innerHeight };
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			45,
			sizes.width / sizes.height,
			0.1,
			100,
		);
		camera.position.z = 4.6;

		const renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true,
			antialias: true,
		});
		renderer.setClearColor(0x000000, 0);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(sizes.width, sizes.height);

		const group = new THREE.Group();
		scene.add(group);

		const geometry = new THREE.SphereGeometry(1, 24, 14);
		geometry.morphAttributes.position = morphVariants.map(
			(variant) =>
				new THREE.Float32BufferAttribute(
					createMorphTarget(geometry, variant),
					3,
				),
		);

		const material = new THREE.MeshBasicMaterial({
			color: getBaseShapeColor(theme),
			wireframe: true,
			transparent: true,
			opacity: 0,
		});
		const mesh = new THREE.Mesh(geometry, material);
		mesh.scale.setScalar(0.08);
		group.add(mesh);
		group.scale.setScalar(0.74);

		const state = {
			pointerX: 0,
			pointerY: 0,
			targetPointerX: 0,
			targetPointerY: 0,
			scroll: 0,
			morphing: false,
			currentMorph: -1,
			timer: null,
			theme,
		};

		const morphToNext = () => {
			if (!runtimeRef.current?.opened || state.morphing) return;

			state.morphing = true;
			state.currentMorph =
				(state.currentMorph + 1) % morphVariants.length;
			const targetInfluences = morphVariants.reduce(
				(result, variant, index) => ({
					...result,
					[index]: index === state.currentMorph ? 1 : 0,
				}),
				{},
			);
			const color = new THREE.Color(
				morphPalettes[state.theme][state.currentMorph],
			);

			gsap.timeline({
				defaults: { ease: 'power3.inOut' },
				onComplete: () => {
					state.morphing = false;
				},
			})
				.to(
					mesh.morphTargetInfluences,
					{ ...targetInfluences, duration: 1.65 },
					0,
				)
				.to(
					material.color,
					{ r: color.r, g: color.g, b: color.b, duration: 1.35 },
					0,
				)
				.to(
					mesh.scale,
					{ x: 1.05, y: 1.05, z: 1.05, duration: 0.62 },
					0,
				)
				.to(
					mesh.scale,
					{ x: 0.96, y: 0.96, z: 0.96, duration: 0.82 },
					0.62,
				);
		};

		runtimeRef.current = { material, morphToNext, opened: false, state };

		gsap.timeline({ defaults: { ease: 'power3.out' } })
			.to(material, { opacity: 0.68, duration: 2 }, 0.32)
			.to(
				mesh.scale,
				{ x: 1, y: 1, z: 1, duration: 2.45, ease: 'expo.out' },
				0,
			);

		const onPointerMove = (event) => {
			const radius = Math.min(
				window.innerWidth * 0.35,
				window.innerHeight * 0.35,
				320,
			);
			state.targetPointerX = THREE.MathUtils.clamp(
				(event.clientX - window.innerWidth / 2) / radius,
				-1,
				1,
			);
			state.targetPointerY = THREE.MathUtils.clamp(
				(event.clientY - window.innerHeight / 2) / radius,
				-1,
				1,
			);
		};

		const onScroll = () => {
			const max =
				document.documentElement.scrollHeight - window.innerHeight;
			state.scroll = max > 0 ? window.scrollY / max : 0;
		};

		const onResize = () => {
			sizes.width = window.innerWidth;
			sizes.height = window.innerHeight;
			camera.aspect = sizes.width / sizes.height;
			camera.updateProjectionMatrix();
			renderer.setSize(sizes.width, sizes.height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			onScroll();
		};

		window.addEventListener('pointermove', onPointerMove);
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize);
		onScroll();

		const clock = new THREE.Clock();
		let frameId = 0;
		const tick = () => {
			const elapsed = clock.getElapsedTime();
			const openedNow = runtimeRef.current?.opened;
			const scrollTurn = state.scroll * Math.PI * 3.2;

			state.pointerX += (state.targetPointerX - state.pointerX) * 0.045;
			state.pointerY += (state.targetPointerY - state.pointerY) * 0.045;

			mesh.rotation.y =
				elapsed * (openedNow ? 0.24 : 0.18) +
				scrollTurn +
				state.pointerX * 0.16;
			mesh.rotation.x =
				Math.sin(elapsed * 0.28) * 0.06 -
				state.pointerY * 0.12 +
				state.scroll * 0.72;
			mesh.rotation.z =
				(openedNow ? elapsed * 0.055 : state.pointerX * 0.035) -
				state.scroll * 0.22;

			camera.position.x = Math.sin(scrollTurn * 0.45) * 0.28;
			camera.position.y = Math.cos(scrollTurn * 0.35) * 0.12;
			camera.lookAt(0, 0, 0);

			renderer.render(scene, camera);
			frameId = window.requestAnimationFrame(tick);
		};
		tick();

		return () => {
			window.cancelAnimationFrame(frameId);
			window.clearInterval(state.timer);
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			geometry.dispose();
			material.dispose();
			renderer.dispose();
		};
	}, []);

	useEffect(() => {
		if (!runtimeRef.current) return;

		runtimeRef.current.state.theme = theme;
		runtimeRef.current.material.color.copy(
			new THREE.Color(getBaseShapeColor(theme)),
		);
	}, [theme]);

	useEffect(() => {
		if (!runtimeRef.current) return;

		runtimeRef.current.opened = opened;
		if (opened) {
			runtimeRef.current.morphToNext();
			window.clearInterval(runtimeRef.current.timer);
			runtimeRef.current.timer = window.setInterval(
				runtimeRef.current.morphToNext,
				6000,
			);
		}
	}, [opened]);

	useEffect(() => {
		if (opened && runtimeRef.current && activeSection > 0) {
			runtimeRef.current.morphToNext();
		}
	}, [activeSection, opened]);

	return <canvas className="canvas" ref={canvasRef} />;
}
