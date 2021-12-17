<template>
	<div class="cube">
		<canvas id="cube" v-bind:width="canvasWidth" v-bind:height="canvasHeight"></canvas>
	</div>
</template>
<script>
import { onMounted } from 'vue';
const canvasWidth = 600;
const canvasHeight = 400;
let ctx = null;

export default {
	name: 'About',
	setup(props, { attrs, slots, emit, expose }) {
		const visual = {
			x: 0,
			y: 0,
			z: 300
		};
		const pointMap = {
			A: [-50, 50, 50],
			B: [-50, 50, -50],
			C: [50, 50, -50],
			D: [50, 50, 50],
			E: [-50, -50, 50],
			F: [-50, -50, -50],
			G: [50, -50, -50],
			H: [50, -50, 50]
		};

		const init = () => {
			const canvas = document.getElementById('cube');
			// canvas.width = canvasWidth;
            // canvas.height = canvasHeight;
			if (!canvas.getContext) return;
            ctx = canvas.getContext('2d');
		};

		const transformCoordinatePoint = (
			x,
			y,
			z,
			offsetX = canvasWidth / 2, // 300
			offsetY = canvasHeight / 2 // 200
		) => {
			return {
				x: ((x - visual.x) * visual.z) / (visual.z - z) + offsetX,
				y: ((y - visual.y) * visual.z) / (visual.z - z) + offsetY
			};
		};
		const draw = () => {
			let point;
			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			// 绘制矩形ABCD
			ctx.beginPath();
			point = transformCoordinatePoint(...pointMap.A);
			ctx.moveTo(point.x, point.y);
			point = transformCoordinatePoint(...pointMap.B);
			ctx.lineTo(point.x, point.y);
			point = transformCoordinatePoint(...pointMap.C);
			ctx.lineTo(point.x, point.y);
			point = transformCoordinatePoint(...pointMap.D);
			ctx.lineTo(point.x, point.y);
			ctx.strokeStyle = '#333'
			ctx.closePath();
			ctx.stroke();
			// 绘制矩形EFGH
			ctx.beginPath();
			point = transformCoordinatePoint(...pointMap.E);
			ctx.moveTo(point.x, point.y);
			point = transformCoordinatePoint(...pointMap.F);
			ctx.lineTo(point.x, point.y);
			point = transformCoordinatePoint(...pointMap.G);
			ctx.lineTo(point.x, point.y);
			point = transformCoordinatePoint(...pointMap.H);
			ctx.lineTo(point.x, point.y);
			ctx.strokeStyle = '#333'
			ctx.closePath();
			ctx.stroke();
			// 绘制直线AE
			ctx.beginPath();
			point = transformCoordinatePoint(...pointMap.A);
			ctx.moveTo(point.x, point.y);
			point = transformCoordinatePoint(...pointMap.E);
			ctx.lineTo(point.x, point.y);
			ctx.strokeStyle = '#333'
			ctx.stroke();
			ctx.closePath();
			// 绘制直线BF
			ctx.beginPath();
			point = transformCoordinatePoint(...pointMap.B);
			ctx.moveTo(point.x, point.y);
			point = transformCoordinatePoint(...pointMap.F);
			ctx.lineTo(point.x, point.y);
			ctx.strokeStyle = '#333'
			ctx.stroke();
			ctx.closePath();
			// 绘制直线CD
			ctx.beginPath();
			point = transformCoordinatePoint(...pointMap.C);
			ctx.moveTo(point.x, point.y);
			point = transformCoordinatePoint(...pointMap.G);
			ctx.lineTo(point.x, point.y);
			ctx.stroke();
			ctx.closePath();
			// 绘制直线DH
			ctx.beginPath();
			point = transformCoordinatePoint(...pointMap.D);
			ctx.moveTo(point.x, point.y);
			point = transformCoordinatePoint(...pointMap.H);
			ctx.lineTo(point.x, point.y);
			ctx.strokeStyle = '#333'
			ctx.stroke();
			ctx.closePath();
			// 自己绘制条直线玩
			ctx.beginPath();
			ctx.moveTo(canvasWidth / 2, -50 + canvasHeight / 2)
			ctx.lineTo(canvasWidth / 2, 50 + canvasHeight / 2)
			ctx.strokeStyle = 'red'
			ctx.stroke();
			ctx.closePath();
		};
		const animationFrame = () => {
			const rotationAngle = 1;
			// 改变坐标的值
            window.requestAnimationFrame(() => {
                for (const key in pointMap) {
                    const point = pointMap[key]
                    // 保存x,y,z坐标
                    const x = point[0]
                    const y = point[1]
                    const z = point[2]
                    // 变换后的x坐标
                    point[0] = x * Math.cos(rotationAngle / 180 * Math.PI) - z * Math.sin(rotationAngle / 180 * Math.PI)
                    // 绕y轴旋转，y左边不会发生变化
                    point[1] = y
                    // 变换后的z坐标
                    point[2] = z * Math.cos(rotationAngle / 180 * Math.PI) + x * Math.sin(rotationAngle / 180 * Math.PI)
                }
                draw();
                animationFrame();
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
