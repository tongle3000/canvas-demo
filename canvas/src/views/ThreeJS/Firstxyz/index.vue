<template>
    <div id='first'></div>
    <div id='second'></div>
</template>
<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onMounted } from 'vue';

export default {
    name: 'firstxyz',
    setup() {
        const width = window.innerWidth
        const height = window.innerHeight / 2;
        const ratio = width / height; // 宽高比
        const init = () => {
            let scene = null; let mesh = null; let geometry = null; let material = null; let point = null; // 场景, 网格模型(几何体, 材质), 光源
            let camera = null; // 相机
            let renderer = null; // 渲染器
            /**
             * 1、场景 Scene
             */
            scene = new THREE.Scene();
            // 场景scene - a网格模型mesh - 几何体geometry(形状，尺寸)
            geometry = new THREE.BoxGeometry(100, 100, 100); // 球体SphereGeometry(60, 40, 40); 正方体BoxGeometry(100, 100, 100)
            // 场景scene - a网格模型mesh - 材质material(颜色，贴图，透明度)
            material = new THREE.MeshLambertMaterial({ color: 0x0000ff }); // 蓝色0x0000ff 绿色0x00ff00
            // 场景scene - a网格模型mesh(几何体geometry, 材质material)
            mesh = new THREE.Mesh(geometry, material);
            // 场景scene -a网格模型添加到场景中scene.add(mesh)
            scene.add(mesh);

            // -----再加个球体
            const sphereGeometry = new THREE.BoxGeometry(100, 100, 100);
            const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.set(280, 160, 0)
            scene.add(sphere)

            // 场景scene - b光照（颜色，分类(环境光，点光源，平行光)）
            point = new THREE.PointLight(0xffffff); // 0x444444 0xffffff PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
            point.position.set(400, 200, 300); // 位置 400, 200, 300 50, 50, 50
            scene.add(point);

            /**
             * 2、相机 Camera(位置, 视线方向, 投影方式(透射投影PerspectiveCamera, 正射投影OrthographicCamera)
             */
            // camera = new THREE.PerspectiveCamera(45, ratio, 1, 1000); // 透射投影 PerspectiveCamera(正方体对比：顶面 > 底面)
            const s = 300; // 三维场景显示范围控制系数，系数越大，显示的范围越大(物体变小)；300 200
            camera = new THREE.OrthographicCamera(-s * ratio, s * ratio, s, -s, 1, 1000); // 正射投影 OrthographicCamera(正方体对比：顶和底的面一样大。) OrthographicCamera(  left: -s * ratio,  right:s * ratio,  top:s,  bottom: -s,  near: 1,  far: 1000 )
            camera.position.set(200, 300, 200); // 位置 (x, y, z) x200 -> 250 会顺时针旋转一点
            camera.lookAt(scene.position); // 设置相机方向（指向的场景对象）

            /**
             * 3、渲染器 Renderer
             */
            // 渲染器Renderer - 渲染器创建
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(width, height);
            renderer.setClearColor(0xb9d3ff, 1); // 设置背景色
            // 渲染器Renderer - domElement属性canvas
            document.getElementById('first').appendChild(renderer.domElement); // 插入canvas对象
            // 渲染器Renderer - 执行渲染操作 (制定场景、相机作为参数)
            // renderer.render(scene, camera);
            const T0 = new Date();
            const render = () => {
                const T1 = new Date();
                const t = T1 - T0;
                requestAnimationFrame(render)
                renderer.render(scene, camera);
                mesh.rotateY(0.001 * t); // 旋转角速度0.001弧度每毫秒
                sphere.rotateY(0.02) // 每次绕Y轴旋转0.01弧度
            }
            render();
        }
        const secondThreeJS = () => {
            let scene = null; let planeGeometry = null; let material = null; let plan = null; // let point = null;
            let camera = null;
            let renderer = null;
            /**
             * 场景
             */
            scene = new THREE.Scene();
            // 显示三维坐标系
            const axis = new THREE.AxisHelper(20);
            scene.add(axis);

            planeGeometry = new THREE.PlaneGeometry(60, 20); // 地面
            material = new THREE.MeshBasicMaterial({ color: 0xcccccc }); // MeshLambertMaterial
            plan = new THREE.Mesh(planeGeometry, material);
            plan.rotation.x = -0.5 * Math.PI; // 旋转
            plan.position.set(15, 0, 0); // x, y, z
            // plan.position.x = 15;
            // plan.position.y = 0;
            // plan.position.z = 0;
            scene.add(plan);

            /**
             * 相机
             */
            camera = new THREE.PerspectiveCamera(45, ratio, 0.1, 2000); // 透射投影(45度，长宽比，最近1，最远1000)
            camera.position.set(-30, 40, 30);
            // camera.position.x = -30;
            // camera.position.y = 40;
            // camera.position.z = 30;
            camera.lookAt(scene.position); // 设置相机方向（指向的场景对象）
            /**
             * 渲染
             */
            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(new THREE.Color(0xeeeeee))
            renderer.setSize(width, height);
            // 渲染器Renderer - domElement属性canvas
            document.getElementById('second').appendChild(renderer.domElement); // 插入canvas对象
            // 渲染器Renderer - 执行渲染操作 (制定场景、相机作为参数)
            // renderer.render(scene, camera);
            // controls.update();

            const render = () => {
                renderer.render(scene, camera); // 执行渲染操作
                // requestAnimationFrame(render);
                // controls.update();
            }
            render();
            const controls = new OrbitControls(camera, renderer.domElement); // 创建控件对象

            controls.addEventListener('change', render); // 监听鼠标、键盘事件
        }
        onMounted(() => {
            init();
            secondThreeJS();
        })

        return {}
    }
}
</script>
