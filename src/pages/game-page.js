export default class GamePage {
    constructor(callbacks) {
        this.callbacks = callbacks;
    }
    init () {
        console.log('game page init');
        const width = window.innerWidth
        const height = window.innerHeight
        // 创建WebGL渲染器
        const renderer = new THREE.WebGLRenderer({
         // 由于weapp-adapter会自动创建一个全屏的canvas所以这里直接用
         canvas
        })
        // 创建场景
        const scene = new THREE.Scene()
        this.scene = scene;
        /** 
         * OrthographicCamera是正交相机，
         * 在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。 
        */
        const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, -1000, 1000)
        // 画一个三角形
        const triangleShape = new THREE.Shape()
        triangleShape.moveTo(0, 100) // 三角形起始位置
        triangleShape.lineTo(-100, -100)
        triangleShape.lineTo(100, -100)
        triangleShape.lineTo(0, 100)
        // 将三角形变成组成物体的几何体
        const geometry = new THREE.ShapeGeometry(triangleShape)
        // 物体的材料
        const material = new THREE.MeshBasicMaterial({
         color: new THREE.Color('#7fffd4'), // 颜色信息
         side: THREE.DoubleSide   // 用于确定渲染哪一面，因为是旋转的，所以需要正反面都渲染，也就是两面
        })
        // 组成物体并添加到场景中
        const mesh = new THREE.Mesh(geometry, material)
        this.mesh = mesh;
        mesh.position.set(0, 0, 1) // 设置物体在场景中的位置

        // helper
        const axesHelper = new THREE.AxesHelper(100);
        // scene.add(axesHelper);

        scene.add(mesh)
        camera.position.set(0, 0, 0) // 相机位置
        camera.lookAt(new THREE.Vector3(0, 0, 1)) // 让相机从0, 0, 0 看向 0, 0, -200
        renderer.setClearColor(new THREE.Color('#fff')) // 设置背景色
        renderer.setSize(375, 667) // 设置最终渲染的尺寸
        const render = () => {
         mesh.rotateY(0.05) // three.js 中旋转角度是通过弧度计算的，公式：度＝弧度×180°/π
         renderer.render(scene, camera)
         requestAnimationFrame(render)
        }
        setTimeout(() => {
            this.callbacks['showGameOverPage']();
        }, 2000);
        render();
    }

    show() {
        this.mesh.visible = true;
    }
    hide() {
        this.mesh.visible = false;
    }
    restart() {
        console.log('restart game page');
    }
}