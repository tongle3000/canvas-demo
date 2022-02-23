<!-- 历史 -->
<template>
    <div id='first-05'></div>
</template>
<script>
import * as THREE from 'three';
import { onMounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
    name: '05',
    setup() {
        const width = window.innerWidth
        const height = window.innerHeight;
        const ratio = width / height; // 宽高比
        let scene, camera, helper, renderer, bopp, NDCThickness;
        // let i = 1;

        const init = () => {
            scene = new THREE.Scene();

            const axes = new THREE.AxesHelper(20);
            scene.add(axes);

            // 地面
            const planeGeometry = new THREE.PlaneGeometry(30000, 9000); // 几何体 30000 ,9000
            const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xD7F4F5 }); // shadow
            planeMaterial.transparent = true; // 是否透明
            planeMaterial.opacity = 0.2;
            bopp = new THREE.Mesh(planeGeometry, planeMaterial);
            bopp.rotation.x = -0.5 * Math.PI; // 地面围绕x轴旋转 Math.PI = 180
            bopp.position.set(0, 0, 0);
            // plane.receiveShadow = true; // shadow
            scene.add(bopp);

            // NDC厚度数据
            const ndcGeometry = new THREE.PlaneGeometry(30000, 9000);
            const ndcMaterial = new THREE.MeshBasicMaterial({ color: 0xD7F4F5, side: THREE.DoubleSide }); // shadow
            ndcMaterial.transparent = true; // 是否透明
            ndcMaterial.opacity = 0.8;
            NDCThickness = new THREE.Mesh(ndcGeometry, ndcMaterial);
            NDCThickness.rotation.x = -0.5 * Math.PI;
            NDCThickness.position.set(0, 5000, 0);
            scene.add(NDCThickness);

            // 相机
            camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 60000);
            camera.position.set(0, 25000, -10000); // 40 30
            camera.lookAt(scene.position);

            // 渲染
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(width, height);
            // renderer.shadowMap.enabled = true; // shadow
            // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // shadow default THREE.PCFShadowMap
            renderer.setClearColor(new THREE.Color(0x0B1D51)); // 0B1D51
            // document.getElementById('first1').appendChild(renderer.domElement);
            document.getElementById('first-05').appendChild(renderer.domElement);

            // 鼠标控制
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener('change', () => renderer.render(scene, camera));
            // let i = 1;

            animate();
            // helperFn();

            setEventsMouse(); // 鼠标事件
        }

        // 网格
        const helperFn = () => {
            helper = new THREE.GridHelper(300, 90);
            helper.position.y = -10;
            helper.material.opacity = 0.1;
            helper.material.transparent = true;
            scene.add(helper);
        }
        console.log('helperFn', helperFn, ratio)

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
                    // camera.position.x = camera.position.x - (startX - endX) * 0.03;
                    // camera.position.y = camera.position.y - (startY - endY) * 0.03;
                    console.log('点击了右键！', (startX - endX) * 0.03, (startY - endY) * 0.03)
                }
            })
        }

        // 动画控制
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            // bopp.scale.set(1 + i / 100, 1, 1);
            // console.log(i)
            // i++;
            // if ((1 + i / 100) === 450) { i = 1 }
        }

        onMounted(() => {
            init();
        })

        return {}
    }
}
</script>
