<template>
	<div id="container-tianti" style="width:100%; height:100%"></div>
</template>
<script>
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { onMounted } from 'vue';
// window.THREE = THREE;
// const canvasWidth = 600;
// const canvasHeight = 400;
// let ctx = null;

export default {
	name: 'TiantiYundong',
	setup(props, { attrs, slots, emit, expose }) {
		// 添加个 Offset ，通过调整它控制line实例的c值也就是对直线进行平移），并不断地调用之前写好的updatePointList方法，更新点的位置
		let camera, scene, renderer;
		let geometry, material, mesh;
		// const container = document.getElementById('container-tianti');

		function init() {
			camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
			camera.position.z = 1;

			scene = new THREE.Scene();

			geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
			material = new THREE.MeshNormalMaterial();

			mesh = new THREE.Mesh(geometry, material);
			scene.add(mesh);

			renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.getElementById('container-tianti').appendChild(renderer.domElement);
			// document.body.appendChild(renderer.domElement);
		}

		function animate() {
			requestAnimationFrame(animate);

			mesh.rotation.x += 0.01;
			mesh.rotation.y += 0.1; // y值的变化，越大越快。

			renderer.render(scene, camera);
		}

		onMounted(() => {
			init();
			animate();
		});

		return {};
	}
};
</script>
