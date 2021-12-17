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
	name: 'Wave',
	setup(props, { attrs, slots, emit, expose }) {
		// 222
		const rotationAngleSpeed = 1;
		const visual = {
			x: 0,
			y: -100,
			z: 600
		}
		const lineList = [
			new Line(20, 2, 0, 0, -150, -200, 200, 10),
			new Line(20, 2, 0, 0, -120, -200, 200, 10),
			new Line(20, 2, 0, 0, -90, -200, 200, 10),
			new Line(20, 2, 0, 0, -60, -200, 200, 10),
			new Line(20, 2, 0, 0, -30, -200, 200, 10),
			new Line(20, 2, 0, 0, 0, -200, 200, 10),
			new Line(20, 2, 0, 0, 30, -200, 200, 10),
			new Line(20, 2, 0, 0, 60, -200, 200, 10),
			new Line(20, 2, 0, 0, 90, -200, 200, 10),
			new Line(20, 2, 0, 0, 120, -200, 200, 10),
			new Line(20, 2, 0, 0, 150, -200, 200, 10)
		];
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
					// 暂且假定小圆点的原始半径是2,则投影半径可表示为
                    const pointSize = 2 * visual.z / (visual.z - item.z);
                    ctx.arc(item.canvasX + canvasWidth / 2, item.canvasY + canvasHeight / 2, pointSize, 0, 2 * Math.PI)
                    ctx.closePath()
                    ctx.fill()
                })
            })
		};

		// 添加个 Offset ，通过调整它控制line实例的c值也就是对直线进行平移），并不断地调用之前写好的updatePointList方法，更新点的位置
		const animationFrame = () => {
            window.requestAnimationFrame(() => {
                lineList.forEach((line, index) => {
                    line.c = lineOffset + index * 30;
                    line.updatePointList(rotationAngleSpeed, visual);
                })
				// 222
                lineOffset = lineOffset + 2
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
