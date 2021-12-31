<template>
    <div id='first-02'></div>
</template>
<script>
import * as THREE from 'three';
import { onMounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
    name: '02',
    setup() {
        const width = window.innerWidth
        const height = window.innerHeight;
        const ratio = width / height; // 宽高比
        let scene, camera, helper, renderer, plane;
        let i = 1;

        const init = () => {
            scene = new THREE.Scene();

            const axes = new THREE.AxesHelper(20);
            scene.add(axes);

            // 地面
            const planeGeometry = new THREE.PlaneGeometry(1, 90); // 几何体 30000 ,9000
            const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xD7F4F5 }); // shadow
            planeMaterial.transparent = true; // 是否透明
            planeMaterial.opacity = 0.2;
            plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = -0.5 * Math.PI; // 地面围绕x轴旋转 Math.PI = 180
            plane.position.set(0, 0, 0);
            // plane.receiveShadow = true; // shadow
            scene.add(plane);

            // 相机
            camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 2000);
            camera.position.set(0, 300, 0); // 40 30
            camera.lookAt(scene.position);

            // 渲染
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(width, height);
            // renderer.shadowMap.enabled = true; // shadow
            // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // shadow default THREE.PCFShadowMap
            renderer.setClearColor(new THREE.Color(0x0B1D51));
            // document.getElementById('first1').appendChild(renderer.domElement);
            document.getElementById('first-02').appendChild(renderer.domElement);

            // 鼠标控制
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener('change', () => renderer.render(scene, camera));
            // let i = 1;

            animate();
            helperFn();

            setEventsMouse(); // 鼠标事件
        }

        // 网格
        const helperFn = () => {
            helper = new THREE.GridHelper(480, 450);
            helper.position.y = -10;
            helper.material.opacity = 0.1;
            helper.material.transparent = true;
            scene.add(helper);
        }

        // 鼠标
        const setEventsMouse = () => {
            const startX = renderer.domElement.width / 2;
            let endX;
            const startY = renderer.domElement.height / 2;
            let endY;

            window.addEventListener('contextmenu', function (e) {
                endX = e.clientX;
                endY = e.clientY;
                if (e.button === 2) {
                    // camera.position.x = camera.position.x + (startX - endX) * 0.03;
                    // camera.position.y = camera.position.y + (startY - endY) * 0.03;
                    console.log('点击了右键！', (startX - endX) * 0.03, (startY - endY) * 0.03)
                }
            })
        }

        // 动画控制
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            // plane.position.set(-i / 10, 0, 0);
            plane.scale.set(1 + i / 100, 1, 1);
            // camera.position.set(0, 200, 150)
            // plane.position.set((1 + i / 100) / 2, 0, 0);
            // console.log(i)
            i++;
            if ((1 + i / 100) === 450) { i = 1 }
        }

        onMounted(() => {
            init();
        })

        return {}
    }
}
</script>
