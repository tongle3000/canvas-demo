/* eslint-disable import/no-cycle */
/**
 * 11111111111 方法
 */
// class Dots {
//     // canvas, ctx, x, y, r, sx, sy, isMouseDot,
//     constructor(speed, alpha) {
//         // 画布相关
//         // this.canvas; // canvas 节点
//         // this.ctx = ctx; // canvas绘图上下文

//         // 绘制点相关
//         // this.x = x; // dot x
//         // this.y = y;	// dot y
//         // this.r = r; // dot半径

//         this.a = alpha && alpha > 0 && alpha <= 1 ? alpha : 0.8; // 透明度

//         // 移动相关
//         this.speed = speed && speed > 0 ? speed : 2;
//         // this.sx = sx; // 单位时间水平移动距离
//         // this.sy = sy; // 单位时间纵向移动距离
//         // this.isMouseDot = 0;
//     }

//     init(canvas, x, y, isMouseDot) {
//         // const canvas = document.getElementById('dot-line');
//         // if (!canvas.getContext) return;
//         // ctx = canvas.getContext('2d');
//         this.canvas = canvas;
//         this.ctx = this.canvas.getContext('2d');

//         this.x = x * 2 || Math.random() * this.canvas.width;
//         this.y = y * 2 || Math.random() * this.canvas.height;
//         this.r = Math.random() * 6; // 半径 <6

//         if (isMouseDot) this.isMouseDot = 1;

//         // 随机确定点的移动速度与方向 速度值在[-this.speed, this.speed] 之间
//         this.sx = isMouseDot ? 0 : Math.random() * this.speed * 2 - this.speed;
//         this.sy = isMouseDot ? 0 : Math.random() * this.speed * 2 - this.speed;

//         // 绘制点
//         this.ctx.beginPath(); // 开启绘制路径
//         this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI); // 绘制圆 参数一次为 圆横坐标、纵坐标、半径、绘制圆的起始位置、圆的弧度大小
//         this.ctx.fillStyle = `rgba(255, 255, 255, ${this.a})`;
//         this.ctx.fill(); // 填充颜色
//         this.ctx.closePath(); // 关闭绘制路径
//     }

//     // 更新dot的位置，通过不断调用其的update方法，使其产生运动的效果，并且判断dot所处的位置是否已经超出canvas的边界，若超出则调用其init()方法，使其重生在canvas内
//     update() {
//         if (this.isMouseDot) return;
//         this.x = this.x + this.sx;
//         this.y = this.y + this.sy;

//         // 点超出canvas范围时另其‘重生’
//         if (this.x < 0 || this.x > this.canvas.width) {
//             this.init(this.canvas)
//         }
//         if (this.y < 0 || this.y > this.canvas.height) {
//             this.init(this.canvas)
//         }
//         this.ctx.beginPath();
//         this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2 * Math.PI);
//         this.ctx.fillStyle = `rgba(255, 255, 255, ${this.a})`;
//         this.ctx.fill();
//         this.ctx.closePath();
//     }

//     // 跟踪鼠标的点的位置 更新 x,y 为鼠标位置
//     mouseDot(x, y) {
//         this.x = x * 2;
//         this.y = y * 2; // 这里的2是屏幕的vevicePixelRatio 是一个全局熟悉 在ratain屏幕下 devicePixeRatio = 2 标识浏览器会用2个像素点去回去原先的一个像素 这样会导致绘图不清晰
//         this.ctx.beginPath();
//         this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2 * Math.PI);
//         this.ctx.fillStyle = `rgba(255, 255, 255, ${this.a})`;
//         this.ctx.fill();
//         this.ctx.closePath();
//     }
// }

/**
 * 2222222222222222222222222222222222222222 方法
 * 由于在整个demo中需要使用到大量的点，所以使用一个Dot类来负责产生点的实例以及这个点的所有行为
 * @param { 画布 } canvas
 * @param { canvas绘图上下文 } ctx
 * @param { 横坐标 } x
 * @param { 纵坐标 } y
 * @param { 半径 } r
 * @param { 横速 } sx
 * @param { 纵速 } sy
 * @param { 速度 } speed
 * @param { 透明度 } alpha
 */
const Dots = function (speed, alpha) {
    // 画布相关
    // this.canvas = canvas; // canvas 节点
    // this.ctx = ctx; // canvas绘图上下文
    // 绘制点相关
    // this.x = x; // dot x
    // this.y = y;	// dot y
    // this.r = r; // dot半径
    this.a = alpha && alpha > 0 && alpha <= 1 ? alpha : 0.8; // 透明度
    // 移动相关
    this.speed = speed && speed > 0 ? speed : 2;
    // this.sx = sx; // 单位时间水平移动距离
    // this.sy = sy; // 单位时间纵向移动距离
    // this.isMouseDot = 0;
};

Dots.prototype = {
    // 初始化点的方法 x/y为可选参数 为生成点的位置 不传则随机生成
    init(canvas, x, y, isMouseDot) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');

        this.x = x * 2 || Math.random() * this.canvas.width;
        this.y = y * 2 || Math.random() * this.canvas.height;
        this.r = Math.random() * 6; // 半径 <6

        if (isMouseDot) this.isMouseDot = 1;

        // 随机确定点的移动速度与方向 速度值在[-this.speed, this.speed] 之间
        this.sx = isMouseDot ? 0 : Math.random() * this.speed * 2 - this.speed;
        this.sy = isMouseDot ? 0 : Math.random() * this.speed * 2 - this.speed;

        // 绘制点
        this.ctx.beginPath(); // 开启绘制路径
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI); // 绘制圆 参数一次为 圆横坐标、纵坐标、半径、绘制圆的起始位置、圆的弧度大小
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.a})`;
        this.ctx.fill(); // 填充颜色
        this.ctx.closePath(); // 关闭绘制路径
    },

    // 更新dot的位置，通过不断调用其的update方法，使其产生运动的效果，并且判断dot所处的位置是否已经超出canvas的边界，若超出则调用其init()方法，使其重生在canvas内
    update() {
        if (this.isMouseDot) return;
        this.x = this.x + this.sx;
        this.y = this.y + this.sy;

        // 点超出canvas范围时另其‘重生’
        if (this.x < 0 || this.x > this.canvas.width) {
            this.init(this.canvas)
        }
        if (this.y < 0 || this.y > this.canvas.height) {
            this.init(this.canvas)
        }
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2 * Math.PI);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.a})`;
        this.ctx.fill();
        this.ctx.closePath();
    },

    // 跟踪鼠标的点的位置 更新 x,y 为鼠标位置
    mouseDot(x, y) {
        this.x = x * 2;
        this.y = y * 2; // 这里的2是屏幕的vevicePixelRatio 是一个全局熟悉 在ratain屏幕下 devicePixeRatio = 2 标识浏览器会用2个像素点去回去原先的一个像素 这样会导致绘图不清晰
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2 * Math.PI);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.a})`;
        this.ctx.fill();
        this.ctx.closePath();
    }
}

const Wonder = (opts) => {
    const part = document.querySelector(opts.el);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const partStyle = window.getComputedStyle(part, null);
    const width = parseInt(partStyle.width);
    const height = parseInt(partStyle.height);
    const area = width * height; // canvas 区域
    const cssText = `width: ${width}px; height:${height}px;`;
    // const dot = new Dots(canvas, ctx, opts.speed, opts.alpha);
    canvas.setAttribute('style', cssText);
    canvas.width = (width * 2).toString();
    canvas.height = (height * 2).toString();

    part.appendChild(canvas);

    const dotsArr = [];
    let dotsNum = opts.dotsNumber || parseInt(area / 5000);
    console.log('opts.dotsNumber', opts.dotsNumber, dotsNum)
    const maxDotsNum = dotsNum * 2;
    let overNum = 0; // 超出最大数量的点的数量
    const dotsDistance = opts.lineMaxLength || 250; // 点之间产生连线的最大距离

    // 生成点
    for (let i = 0; i < dotsNum; i++) {
        var dot = new Dots(opts.speed, opts.dotsAlpha);
        if (i < dotsNum - 1) {
            dot.init(canvas);
        } else {
            dot.init(canvas, 0, 0, 1);
        }
        dotsArr.push(dot);
        // init(canvas, x, y, isMouseDot)
    }

    // 鼠标事件
    const clickWithNew = opts.clickWithDotsNumer || 5;
    const createDot = (e) => {
        const tx = e.pageX;
        const ty = e.pageY;
        // 判断是不是在canvas内， width height 为canvas 宽高
        if ((tx > 0 && tx < width) && (ty > 0) && (ty < height)) {
            for (let i = 0; i < clickWithNew; i++) {
                var dot = new Dots(opts.speed, opts.dotsAlpha);
                dotsArr.push(dot);
                dotsNum += 1;
                dot.init(canvas, tx, ty);
            } // 循环创建5个点，并添加到数组中
        }
    }
    const mouseDotEnter = (e) => {
        const tx = e.pageX;
        const ty = e.pageY;
        dot.init(canvas, tx, ty, 1);
    }
    const mouseDotMove = (e) => {
        const tx = e.pageX;
        const ty = e.pageY;
        if ((tx > 0 && tx < width) && (ty > 0) && (ty < height)) {
            dot.mouseDot(tx, ty)
        }
    }
    const mouseDotLeave = (e) => {
        dot.init(canvas);
    }
    document.addEventListener('click', createDot);
    canvas.addEventListener('mouseenter', mouseDotEnter);
    canvas.addEventListener('mousemove', mouseDotMove);
    canvas.addEventListener('mouseleave', mouseDotLeave);

    // 动画与连线
    // const requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame;
    // requestAnimationFrame(animateUpdate); // 兼容不同浏览器的 requestAnimationFrame
    // dot移动效果
    const animateUpdate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空canvas中原有的内容
        // 更新点的位置 数量超出最大值时 舍弃旧的点
        if (dotsNum > maxDotsNum) {
            overNum = dotsNum - maxDotsNum;
        }
        for (let i = overNum; i < dotsNum; i++) {
            // if (dotsArr[i].isMouseDot) console.log('aaaa', dotsArr[i].isMouseDot);
            if (dotsArr[i]) dotsArr[i].update();
        }

        // 绘制连线
        for (let i = overNum; i < dotsNum; i++) {
            for (let j = i + 1; j < dotsNum; j++) {
                const tx = dotsArr[i].x - dotsArr[j].x;
                const ty = dotsArr[i].y - dotsArr[j].y;
                const newDistance = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
                if (newDistance < dotsDistance) { // 点于点达到设置的临界值，可以回绘制连线
                    ctx.beginPath();
                    ctx.moveTo(dotsArr[i].x, dotsArr[i].y); // 线起始位置
                    ctx.lineTo(dotsArr[j].x, dotsArr[j].y); // 线结束位置
                    // 透明度 的计算方式为 （临界值距离 - 实际距离）/ 临界值距离
                    ctx.strokeStyle = `rgba(255,255,255,${(dotsDistance - newDistance) / dotsDistance})`; // 设置线条的绘制颜色
                    ctx.strokeWidth = 1;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
        // console.log('111111111', dotsArr);

        requestAnimationFrame(animateUpdate);
    }
    requestAnimationFrame(animateUpdate);
}

export { Wonder };
