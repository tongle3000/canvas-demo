class Line {
    constructor(a, b, c, d, start, end, gap) {
        this.a = a
        this.b = b
        this.c = c
        this.d = d
        this.start = start
        this.end = end
        this.gap = gap
        this.pointList = []
        this.computePointList()
    }

    // 添加个 Offset
    computePointList() {
        this.pointList = []
        for (let i = this.start; i < this.end; i = i + this.gap) {
            const x = i;
            const offset = i;
            const y = this.a * Math.sin((this.b * x + this.c) / 180 * Math.PI) + this.d;
            this.pointList.push({ x, y, offset });
        }
    }

    // 添加个 Offset ，通过调整它控制line实例的c值也就是对直线进行平移），并不断地调用之前写好的updatePointList方法，更新点的位置
    updatePointList () {
        this.pointList.forEach(item => {
            item.y = this.a * Math.sin((this.b * item.x + this.c + item.offset) / 180 * Math.PI) + this.d
        })
    }
}
export default Line
