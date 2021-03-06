<template>
    <div id='third'></div>
</template>
<script>
import * as THREE from 'three';
import { onMounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default {
    name: '03',
    setup() {
        let width = window.innerWidth
        let height = window.innerHeight;
        let ratio = width / height; // 宽高比
        // 声明全局变量
        let camera, scene, renderer, labelRenderer, controls;
        let moon, earth;
        const clock = new THREE.Clock();
        // 实例化纹理加载器
        const textureLoader = new THREE.TextureLoader();
        const gltfLoader = new GLTFLoader();

        // init
        const init = () => {
            // 地球月球半径
            const EARTH_RADIUS = 2.5;
            const MOON_RADIUS = 0.27;
            // 相机
            camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 200);
            camera.position.set(10, 5, 20);

            // 实例化场景
            scene = new THREE.Scene();

            // 显示三维坐标系
            // const axis = new THREE.AxesHelper(20);
            // scene.add(axis);

            // 光源
            const dirLight = new THREE.SpotLight(0xffffff);
            dirLight.position.set(0, 0, 10);
            dirLight.intensity = 2;
            dirLight.castShadow = true;
            scene.add(dirLight);

            // 添加环境光
            const aLight = new THREE.AmbientLight(0xffffff);
            aLight.intensity = 0.3;
            scene.add(aLight);

            // 月球
            const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 32, 32);
            const moonMaterial = new THREE.MeshPhongMaterial({
                map: textureLoader.load('./models/03/yueqiu.jpg')
            })
            moon = new THREE.Mesh(moonGeometry, moonMaterial);
            moon.receiveShadow = true;
            moon.castShadow = true;
            scene.add(moon);

            // 地球
            const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 32, 32);
            const earthMaterial = new THREE.MeshPhongMaterial({
                // shiniess: 5 // 镜面反光强度
                map: textureLoader.load('./models/03/earth.png')
                // specularMap: textureLoader.load('../../assets/img/start.png')
                // normalMap: textureLoader.load('../../assets/img/earth.jpg')
            });
            earth = new THREE.Mesh(earthGeometry, earthMaterial);
            earth.receiveShadow = true;
            earth.castShadow = true;
            scene.add(earth);

            // 文字-地球
            const earthDiv = document.createElement('div');
            earthDiv.className = 'label';
            earthDiv.textContent = 'Earth';
            const earthLabel = new CSS2DObject(earthDiv);
            earthLabel.position.set(0, EARTH_RADIUS, 0); // 放在地球的上方；
            earth.add(earthLabel);

            // 文字-月球
            const moonDiv = document.createElement('div');
            moonDiv.className = 'label';
            moonDiv.textContent = 'Moon';
            const moonLabel = new CSS2DObject(moonDiv);
            moonLabel.position.set(0, -1.9, 0); // 放在地球的上方；
            moon.add(moonLabel);

            // 渲染器
            renderer = new THREE.WebGLRenderer({
                alpha: true // 设置这个透明可以看到背景图；
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);

            // 文字-渲染器
            labelRenderer = new CSS2DRenderer();
            labelRenderer.setSize(width, height);
            labelRenderer.domElement.style.position = 'absolute';
            labelRenderer.domElement.style.pointerEvents = 'none'; // 不加这句 controls鼠标控制会受到干扰；
            labelRenderer.domElement.style.top = '0px';
            document.getElementById('third').appendChild(labelRenderer.domElement);

            // 阴影
            renderer.shadowMap.enabled = true;
            document.getElementById('third').appendChild(renderer.domElement);

            // 绑定控制和摄像机头 控制没用，可能是用了 2D
            controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener('change', () => {
                renderer.render(scene, camera)
                // labelRenderer.render(scene, camera)
            });
            console.log(renderer.domElement, EARTH_RADIUS, controls)
            helperFn();
        }

        // 动画
        let oldTime = 0;
        const animate = () => {
            const elapsed = clock.getElapsedTime()
            moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);
            // 地球自转 绕Y轴
            const axis = new THREE.Vector3(0, 1, 0);
            // earth.rotateOnAixs(axis, elapsed * Math.PI / 1000); // 速度会越来越快；
            earth.rotateOnAxis(axis, (elapsed - oldTime) * Math.PI / 10); // 匀速旋转
            renderer.render(scene, camera); // 场景这些
            // 文字渲染
            labelRenderer.render(scene, camera)
            oldTime = elapsed;
            requestAnimationFrame(animate); // 循环动画
        }
        console.log(earth, CSS2DRenderer, CSS2DObject, labelRenderer, textureLoader)

        // 加载苹果
        gltfLoader.load('./models/apples/scene.gltf', (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.scale.set(8, 8, 8); // (0.2, 0.2, 0.2) -> (1, 1, 1)放大
            gltf.scene.position.set(0, 4, 0); // (x坐标, z坐标, y坐标) 3.2 站在地面上 人高度是6.4
            // gltf.scene.children.forEach((element: { type: string; }) => {
            //   let mesh: any = element;
            // });
        });

        // 窗口变化 canvas 跟着变
        window.addEventListener('resize', () => {
            width = window.innerWidth
            height = window.innerHeight;
            ratio = width / height;
            camera.aspect = ratio;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            labelRenderer.setSize(width, height);
        }, false)

        // 网格
        const helperFn = () => {
            const helper = new THREE.GridHelper(1000, 100);
            helper.position.y = -10;
            helper.material.opacity = 0.1;
            helper.material.transparent = true;
            scene.add(helper);
        }

        onMounted(() => {
            init();
            animate();
        })

        return {}
    }
}
</script>
<style lang="scss">
    #third canvas { background-image: url('../../assets/img/start.png');}
    #third .label { color:#fff}
</style>
