<!-- Base3d -->
<template>
    <div id='scene'></div>
</template>
<script>
import Base3d from '../utils/Base3d.js';
import { reactive, onMounted } from 'vue';
export default {
    setup(props) {
        const data = reactive({
            base3d: {}
        });
        onMounted(() => {
            data.base3d = new Base3d('#scene');
        });
    }
}
</script>
