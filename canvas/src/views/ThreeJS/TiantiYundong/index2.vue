<template>
	<div id="container-tianti" style="width:100%; height:100%"></div>
</template>
<script>
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { onMounted } from 'vue';
window.THREE = THREE;
// const canvasWidth = 600;
// const canvasHeight = 400;
// let ctx = null;

export default {
	name: 'TiantiYundong',
	setup(props, { attrs, slots, emit, expose }) {
		let camera, scene, renderer;
		let material, planet, light;
		// const container = document.getElementById('container-tianti');
		// console.log('container', container)
		const width = window.innerWidth; // container.width;
		const height = window.innerHeight; // container.height;
		const aspect = width / height;
		function init() {
			renderer = new THREE.WebGLRenderer();
			renderer.setSize(width, height);
			document.body.appendChild(renderer.domElement);
			// container.appendChild(renderer.domElement);

			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000); // (70, aspect, 0.01, 10);
			camera.position.z = 500;

			const syst = new THREE.Group();

			scene.add(new THREE.AmbientLight(0xFFFFFF, 0.2));

			light = new THREE.DirectionalLight(0xFFFFFF, 2.5);
			light.position.set(1500, 2500, 0);
			scene.add(light);

var MAX_POINTS = 100;
// geometry
var geometry = new THREE.BufferGeometry();
var vertices = new Float32Array([
	-1.0, -1.0, 1.0,
	1.0, -1.0, 1.0,
	1.0, 1.0, 1.0,
	1.0, 1.0, 1.0,
	-1.0, 1.0, 1.0,
	-1.0, -1.0, 1.0
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3)); // 3 vertices per point
// material = new THREE.MeshNormalMaterial({ color: 0x0C2D4D });
// planet = new THREE.Mesh(geometry, material);
for (var i = 0, l = MAX_POINTS; i < l; i++) {
    // positions[index++] = x;
    // positions[index++] = y;
    // positions[index++] = z;
    // x = Math.random() * 0.05 + 0.95;
    // y = Math.random() * 0.05 + 0.95;
    // z = Math.random() * 0.05 + 0.95;
	vertices[i] = Math.random() * 0.05 + 0.95;
}
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
planet = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(8, 0), material);

// planet.geometry.attributes.vertices.needsUpdate = true // 需要加在第一次渲染之后
// for (var i = 0; i < planet.geometry.attributes.position.array; i++) {
// 	planet.geometry.vertices[i].multiplyScalar(
// 		Math.random() * 0.05 + 0.95
// 	);
// }
			// planet.geometry.computeFlatVertexNormals();
			// scene.add(mesh);
			syst.add(planet);
			console.log('planet', syst, planet)
		}
		// 添加个 Offset ，通过调整它控制line实例的c值也就是对直线进行平移），并不断地调用之前写好的updatePointList方法，更新点的位置
		// const animationFrame = () => {
        //  var container = document.getElementById('container-tianti');
		// 	var width = container.clientWidth;
		// 	var height = container.clientHeight;
		// 	var aspect = width / height;
		// 	var renderer = new THREE.WebGLRenderer();
		// 	renderer.setSize(width, height);
		// 	container.appendChild(renderer.domElement);

		// 	console.log(width, height, aspect)

		// 	var scene = new THREE.Scene();

		// 	var camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
		// 	camera.position.z = 500

		// 	var system = new THREE.Group(); // planetary system

		// 	scene.add(
		// 		new THREE.AmbientLight(0xFFFFFF, 0.2)
		// 	);
		// 	var light = new THREE.DirectionalLight(0xFFFFFF, 2.5);
		// 	light.position.set(1500, 2500, 0);
		// 	scene.add(light);
		// 	var material = new THREE.MeshLambertMaterial({
		// 		color: 0x0C2D4D
		// 	});

		// 	var planet = new THREE.Mesh(
		// 		new THREE.IcosahedronGeometry(100, 3),
		// 		material
		// 	);

        //     // --------------------------------------------------------------
        //     console.log('planet', planet)
        //     // const geometry = new THREE.BufferGeometry();

		// 	for (var i = 0; i < planet.geometry.vertices.length; i++) {
        //         planet.geometry.vertices[i].multiplyScalar(
        //             Math.random() * 0.05 + 0.95
        //         );
        //     }

		// 	planet.geometry.computeFlatVertexNormals();
		// 	system.add(planet);

		// 	var asteroids = new THREE.Group();

		// 	for (var p = 0; p < Math.PI * 2; p = p + Math.random() * 0.15) {
        //         var asteroid = new THREE.Mesh(
        //             new THREE.IcosahedronGeometry(8, 0),
        //             material
        //         );

        //         var size = Math.random() * 0.5;
        //         for (let i = 0; i < asteroid.geometry.vertices.length; i++) {
        //             asteroid.geometry.vertices[i].multiplyScalar(
        //                 Math.random() * 0.5 + size
        //             );
        //         }

        //         const rand = Math.random() * 60 - 30;
        //         asteroid.position.set(200 * Math.sin(p) + rand, rand, 200 * Math.cos(p) + rand);

        //         asteroid.geometry.computeFlatVertexNormals();
        //         asteroids.add(asteroid);
		// 	}

		// 	system.add(asteroids);

		// 	system.rotation.x = 0.1;
		// 	system.rotation.y = -0.3;
		// 	system.rotation.z = -0.4;

		// 	scene.add(system);

		// 	for (let i = 0; i < 10; i++) {
		// 		const particles = new THREE.Points(
		// 			new THREE.Geometry(),
		// 			new THREE.PointsMaterial({
		// 				size: Math.random() * 5
		// 			})
		// 		);
		// 		for (let j = 0; j < 20; j++) {
		// 			var vertex = new THREE.Vector3();
		// 			vertex.x = Math.random() * width * 1.1 - width * 1.1 / 2;
		// 			vertex.y = Math.random() * height * 1.1 - height * 1.1 / 2;
		// 			vertex.z = -500;
		// 			particles.geometry.vertices.push(vertex);
		// 			particles.material.color.setScalar(Math.random() * 0.4 + 0.2);
		// 		}
		// 		scene.add(particles);
		// 	}

			function render() {
				requestAnimationFrame(render);

				planet.rotation.y += 0.001;
				planet.rotation.z -= 0.0005;

				// asteroids.rotation.y += 0.003;

				renderer.render(scene, camera);
			}

		// 	render();
		// };

		onMounted(() => {
			init();
			render();
		});

		return {};
	}
};
</script>
