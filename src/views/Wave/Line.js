class Line {
    // z 是3d 动画添加的
    constructor(a, b, c, d, z, start, end, gap) {
        this.a = a
        this.b = b
        this.c = c
        this.d = d
        this.z = z
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
            this.pointList.push({
                x,
                y,
                z: this.z,
                originX: x,
                offset
            });
        }
    }

    // 添加个 Offset ，通过调整它控制line实例的c值也就是对直线进行平移），并不断地调用之前写好的updatePointList方法，更新点的位置
    updatePointList (rotationAngleSpeed, visual) {
        this.pointList.forEach(item => {
            const x = item.x;
            // const y = item.y;
            const z = item.z;
            item.x = x * Math.cos(rotationAngleSpeed / 180 * Math.PI) - z * Math.sin(rotationAngleSpeed / 180 * Math.PI)
            item.z = z * Math.cos(rotationAngleSpeed / 180 * Math.PI) + x * Math.sin(rotationAngleSpeed / 180 * Math.PI)
            item.y = this.a * Math.sin((this.b * item.originX + this.c + item.offset) / 180 * Math.PI) + this.d
            item.canvasX = (item.x - visual.x) * visual.z / (visual.z - z)
            item.canvasY = (item.y - visual.y) * visual.z / (visual.z - z)
        })
    }
}
export default Line

// class Line {
//     constructor (a, b, c, d, z, start, end, gap) {
//         this.a = a
//         this.b = b
//         this.c = c
//         this.d = d
//         this.z = z
//         this.start = start
//         this.end = end
//         this.gap = gap
//         this.pointList = []
//         this.computePointList()
//     }

//     computePointList () {
//         this.pointList = []
//         for (let i = this.start; i <= this.end; i = i + this.gap) {
//             const x = i
//             const y = this.a * Math.sin((this.b * x + this.c) / 180 * Math.PI) + this.d
//             const offset = i
//             this.pointList.push({
//                 x,
//                 y,
//                 z: this.z,
//                 originX: x,
//                 offset
//             })
//         }
//     }

//     updatePointList (rotationAngleSpeed, visual) {
//         this.pointList.forEach(item => {
//             const x = item.x
//             // let y = item.y
//             const z = item.z
//             item.x = x * Math.cos(rotationAngleSpeed / 180 * Math.PI) - z * Math.sin(rotationAngleSpeed / 180 * Math.PI)
//             item.z = z * Math.cos(rotationAngleSpeed / 180 * Math.PI) + x * Math.sin(rotationAngleSpeed / 180 * Math.PI)
//             item.y = this.a * Math.sin((this.b * item.originX + this.c + item.offset) / 180 * Math.PI) + this.d
//             item.canvasX = (item.x - visual.x) * visual.z / (visual.z - z)
//             item.canvasY = (item.y - visual.y) * visual.z / (visual.z - z)
//         })
//     }
// }
// export default Line
