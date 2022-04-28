import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ACESFilmicToneMapping, ToneMapping } from 'three';

class Base3d {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.scene;
        this.camera;
        this.renderer;
        this.controls;
        this.init();
        this.animation();
    }
    init() {
        // 初始化场景
        this.initScene();
        // 初始化相机
        this.initCamera();
        // 加载环境
        this.initRender();
        // 鼠标控制
        this.initControls();
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }
    initScene() {
        this.scene = new THREE.Scene();
        this.setEnvtMap('000');
    }
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.25,
            200
        );
        this.camera.position.set(-1.8, 0.6, 2.7);
    }
    // 初始化Renderer
    initRender() {
        this.renderer = new THREE.WebGL1Renderer({ antialias: true }); // 去锯齿 // alpha:true 透明
        // 设置屏幕像素比 调用window的
        this.renderer.setPixelRatio(Window.devicePixelRatio);
        // 渲染尺寸
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // 色调映射
        this.renderer.ToneMapping = THREE.ACESFilmicToneMapping;
        // 曝光度
        this.renderer.toneMappingExposure = 3;

        // renderer的dom加入到上面的DOM里
        this.container.appendChild(this.renderer.domElement);
        
    }
    initControls() {
        // 鼠标控制 相机 和渲染的renderer dom
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 50;
        this.controls.maxDistance = 300;
    }
    // HDRCubeTextureLoader load 第一个参数是个数组['xxx.png/hdr',,,,,] 
    // setEnvtMap(hdr) {
    //     this.hdrCubeMap = new HDRCubeTextureLoader()
    //         .setDataType( THREE.UnsignedByteType )
    //         .setPath('./files/hdr/')
    //         .load(hdr + '.hdr', texture => {
    //             // texture.mapping = THREE.EquirectangularReflectionMapping;
    //             // this.scene.environment = texture;
    //             // this.scene.background = texture;
    //             this.hdrCubeMap.magFilter = THREE.LinearFilter;
	// 			this.hdrCubeMap.needsUpdate = true;
    //         })
    // }
    setEnvtMap(hdr) {
        new RGBELoader().setPath('./files/hdr/').load(hdr + '.hdr', texture => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            this.scene.environment = texture;
            this.scene.background = texture;
        })
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    animation() {
        this.renderer.setAnimationLoop(this.render.bind(this));
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

export default Base3d;