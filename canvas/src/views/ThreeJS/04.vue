<template>
    <div id='fourth'></div>
</template>
<script>
import * as THREE from 'three';
import { onMounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default {
    name: '04',
    setup() {
        
        onMounted(() => {
        })
        return {}
    }
}
</script>
<style lang="scss">
    #third canvas { background-image: url('../../assets/img/start.png');}
    #third .label { color:#fff}
</style>
