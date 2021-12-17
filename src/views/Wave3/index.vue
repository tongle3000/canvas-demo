<template>
	<div class="cube">
		<canvas id="cube" v-bind:width="canvasWidth" v-bind:height="canvasHeight"></canvas>
	</div>
</template>
<script>
import Line from './Line';
import { onMounted } from 'vue';

const canvasWidth = 600;
const canvasHeight = 400;
let ctx = null;

export default {
	name: 'Wave2',
	setup(props, { attrs, slots, emit, expose }) {
		const lineList = [new Line(20, 2, 0, 0, -200, 200, 10)];
		let lineOffset = 0;
		const init = () => {
			const canvas = document.getElementById('cube');
			if (!canvas.getContext) return;
            ctx = canvas.getContext('2d');
		};
		// 画出一条点的波浪曲线；
		const draw = () => {
			ctx.clearRect(0, 0, canvasWidth, canvasHeight)
			// console.log('lineList', lineList)
            lineList.forEach(line => {
                line.pointList.forEach(item => {
                    ctx.beginPath()
                    ctx.arc(item.x + canvasWidth / 2, item.y + canvasHeight / 2, 2, 0, 2 * Math.PI)
                    ctx.closePath()
                    ctx.fill()
                })
            })
		};

		// 添加个 Offset ，通过调整它控制line实例的c值也就是对直线进行平移），并不断地调用之前写好的updatePointList方法，更新点的位置
		const animationFrame = () => {
            window.requestAnimationFrame(() => {
                lineList.forEach(line => {
                    line.c = lineOffset
                    line.updatePointList()
                })
                lineOffset = lineOffset + 1
                draw()
                animationFrame()
			})
		};

		onMounted(() => {
			init();
			animationFrame();
		});

		return {
			canvasWidth,
			canvasHeight
		};
	}
};
</script>
