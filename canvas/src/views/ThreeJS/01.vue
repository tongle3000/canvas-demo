<template>
    <div id='first1'></div>
</template>
<script>
import * as THREE from 'three';
import { onMounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
    name: '01',
    setup() {
        const width = window.innerWidth
        const height = window.innerHeight;
        const ratio = width / height; // 宽高比
        const init = () => {
            const scene = new THREE.Scene();

            const axes = new THREE.AxesHelper(20);
            scene.add(axes);

            // 地面
            const planeGeometry = new THREE.PlaneGeometry(200, 100); // 几何体
            const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa }); // shadow
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = -0.5 * Math.PI; // 地面围绕x轴旋转 Math.PI = 180
            plane.position.set(10, 0, 0);
            plane.receiveShadow = true; // shadow
            scene.add(plane);

            // 正方体
            const cubeGeometry = new THREE.BoxBufferGeometry(4, 4, 4);
            const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.position.set(12, 2, 2);
            cube.castShadow = true; // shadow
            // plane.receiveShadow = false; // shadow default false
            scene.add(cube);

            // 球体
            const sphereGeometry = new THREE.SphereBufferGeometry(2, 32, 32); // 因为是网格，所以32越大越好，就成圆了
            const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.set(2, 6, 2)
            sphere.castShadow = true;
            scene.add(sphere);

            // 圆柱体
            const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 6, 32);
            const cylinderMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
            const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
            cylinderMesh.position.set(-10, 2, 0);
            cylinderMesh.castShadow = true;
            scene.add(cylinderMesh);

            // 边缘几何体
            const geometry4 = new THREE.BoxBufferGeometry(4, 4, 4);
            const edges4 = new THREE.EdgesGeometry(geometry4);
            const line4 = new THREE.LineSegments(edges4, new THREE.LineBasicMaterial({ color: 0xffffff }));
            line4.position.set(-30, 2, 0);
            line4.castShadow = true;
            scene.add(line4);
            // 光源
            const spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(30, 40, -10);
            // spotLight.shadow.mapSize.width = 512; // default
            // spotLight.shadow.mapSize.height = 512; // default
            // spotLight.shadow.camera.near = 0.5; // default
            // spotLight.shadow.camera.far = 500 // default
            spotLight.castShadow = true; // shadow
            scene.add(spotLight);

            const spotLightHelper = new THREE.SpotLightHelper(spotLight);
            scene.add(spotLightHelper);

            // 相机
            const camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 2000);
            camera.position.set(30, 40, 30);
            camera.lookAt(scene.position);

            // 渲染
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(width, height);
            renderer.shadowMap.enabled = true; // shadow
            // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // shadow default THREE.PCFShadowMap
            renderer.setClearColor(new THREE.Color(0x333333));
            document.getElementById('first1').appendChild(renderer.domElement);
            renderer.render(scene, camera);

            // 鼠标控制
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener('change', () => renderer.render(scene, camera));
        }
        onMounted(() => {
            init();
        })

        return {}
    }
}
</script>
