console.log('my game');
/**
 * 小游戏入口
 * 
 */
// import * as fdfd from './libs/aa';
import * as THREE from '../libs/three';
window.THREE = THREE;
// import {WrapAroundEnding} from './libs/three.js';
// const THREE = require('./libs/three');

class Main {
    constructor() {

    }
    init() {
        const width = 400
        const height = 400
        // 创建WebGL渲染器
        const renderer = new THREE.WebGLRenderer({
         // 由于weapp-adapter会自动创建一个全屏的canvas所以这里直接用
         canvas: canvas
        })
        // 创建场景
        const scene = new THREE.Scene()
        /** 
         * OrthographicCamera是正交相机，
         * 在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。 
        */
        const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0, 1000)
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
         side: THREE.DoubleSide   // 用于确定渲染哪一面，因为是旋转的，所以需要正反面都渲染，也就是两面
        })
        // 组成物体并添加到场景中
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 0, -200) // 设置物体在场景中的位置
        scene.add(mesh)
        camera.position.set(0, 0, 0) // 相机位置
        camera.lookAt(new THREE.Vector3(0, 0, -200)) // 让相机从0, 0, 0 看向 0, 0, -200
        renderer.setClearColor(new THREE.Color('#f84462')) // 设置背景色
        renderer.setSize(width, height) // 设置最终渲染的尺寸
        const render = () => {
         mesh.rotateY(0.05) // three.js 中旋转角度是通过弧度计算的，公式：度＝弧度×180°/π
         renderer.render(scene, camera)
         requestAnimationFrame(render)
        }
        render()
    }
}
export default new Main();


