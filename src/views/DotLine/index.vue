<template>
	<div id="wonder"></div>
</template>
<script>
import { Wonder } from './dotline';
// import Wonder2 from './Wonder';
import { onMounted } from 'vue';

// const canvasWidth = 600;
// const canvasHeight = 400;
// let ctx = null;

export default {
	name: 'DotLine',
	setup(props, { attrs, slots, emit, expose }) {
		const imgArr = ['darksky', 'starsky', 'whiteland']
		const img = './img/darksky.jpg';
		// 画出一条点的波浪曲线；
		onMounted(() => {
			// init();
			// animationFrame();
			Wonder({
				el: '#wonder',
				dotsNumber: 100, // 100
				lineMaxLength: 300, // 300
				dotsAlpha: 0.5,
				speed: 1.5,
				clickWithDotsNumer: 3 // 5
			});
			// window.requestAnimationFrame(animateUpdate);
		});

		return {
			// canvasWidth,
			// canvasHeight
			imgArr,
			img
		};
	}
};
</script>
<style lang='scss' scoped>
$img: '2';
// @for $i from 1 through 3 {
// 	#wonder {
// 		background: url('./img/#{$i}.jpg');
// 	}
// }
// $img: Math.random()*10 % 3;
#wonder {
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: -1;
	background: url('./img/#{$img}.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
	border: 5px solid #999;
}
</style>
