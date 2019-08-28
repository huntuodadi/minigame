import bottleConf from '../../confs/bottle-conf';
import blockConf from '../../confs/block-conf';
import animation from '../../libs/animation';
const {customAnimation} = animation;
const g = 700;
class Bottle {
    constructor (x, y, z) {
        this.direction = 0;
        this.axis = null; // 当前位置和下一个台子中心的连线
    }

    init () {
        // this.obj 控制bottle的位置等
        this.obj = new THREE.Object3D();
        this.obj.name = 'bottle';
        this.obj.position.set(bottleConf.initPosition.x, bottleConf.initPosition.y + 30, bottleConf.initPosition.z);
        this.status = 'stop';
        this.scale = 1;
        this.flyingTime = 0;
        this.velocity = {};
        // this.bottle 仅进行各个分部的组合
        this.bottle = new THREE.Object3D();

        this.human = new THREE.Object3D();
        

        const headRadius = bottleConf.headRadius;

        const {specularMaterial, middleMaterial, bottomMaterial} = this.loadTexture();


        // 头部
        this.head = new THREE.Mesh(
            new THREE.OctahedronGeometry(headRadius),
            bottomMaterial
        );

        this.head.castShadow = true;
        // 底部
        
        this.bottom = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.62857 * headRadius, 0.907143 * headRadius, 1.91423 * headRadius, 20
            ),
            bottomMaterial
        );
        this.bottom.castShadow = true;
        // 中部
        this.middle = new THREE.Mesh(
            new THREE.CylinderGeometry(
                headRadius / 1.4, headRadius / 1.44 * 0.88, headRadius * 1.2, 20
            ),
            middleMaterial
        );
        this.middle.castShadow = true;
        this.middle.position.y = 1.3857 * headRadius;

        const topGeometry = new THREE.SphereGeometry(headRadius / 1.4, 20, 20);
        topGeometry.scale(1, 0.54, 1);
        this.top = new THREE.Mesh(
            topGeometry,
            specularMaterial
        );
        this.top.castShadow = true;
        this.top.position.y = 1.8143 * headRadius;



        this.body = new THREE.Object3D();
        this.body.add(this.bottom);
        this.body.add(this.middle);
        this.body.add(this.top);
        this.head.position.y = 3.57143 * bottleConf.headRadius;
        this.human.add(this.head);
        this.human.add(this.body);
        this.bottle.add(this.human);
        this.bottle.position.y = 2.1;
        this.bottle.position.x = 0;
        this.bottle.position.z = 0;
        this.obj.add(this.bottle);
        this.instance = this.obj;
    }

    loadTexture() {
        const loader = new THREE.TextureLoader();
        const specularTexture = loader.load('/game/res/images/head.png');
        const specularMaterial = new THREE.MeshBasicMaterial({
            map: specularTexture
        });

        const middleTexture = loader.load('/game/res/images/top.png');
        const middleMaterial = new THREE.MeshBasicMaterial({
            map: middleTexture
        });

        const bottomTexture = loader.load('/game/res/images/top.png');
        const bottomMaterial = new THREE.MeshBasicMaterial({
            map: bottomTexture
        });

        return {specularMaterial, middleMaterial, bottomMaterial};
    }

    _shrink = () => {
        const MIN_SCALE = 0.55;
        const HORIZEN_DELTA_SCALE = 0.007;
        const DELTA_SCALE = 0.005;
        const HEAD_DELTA = 0.03;
        this.scale -= DELTA_SCALE;
        this.scale = Math.max(MIN_SCALE, this.scale);
        if(this.scale <= MIN_SCALE) {
            return;
        }
        this.body.scale.y = this.scale;
        this.body.scale.x += HORIZEN_DELTA_SCALE;
        this.body.scale.z += HORIZEN_DELTA_SCALE;
        this.head.position.y -= HEAD_DELTA;

        const bottleDeltaY = HEAD_DELTA / 2;
        this.obj.position.y -= bottleDeltaY;
    }

    update() {
        if(this.status == 'shrink') {
            this._shrink();
        }else if(this.status == 'jump') {
            const tickTime = Date.now() - this.lastFrameTime;
            this._jump(tickTime);
        }
        this.head.rotation.y += 0.06;
        this.lastFrameTime = Date.now();
    }

    showUp() {
        customAnimation.to(this.obj.position, 0.5, {
            x: bottleConf.initPosition.x, 
            y: bottleConf.initPosition.y + blockConf.height / 2,
            z: bottleConf.initPosition.z
        }, 'BounceEaseOut');
    }

    setDirection(direction, axis) {
        this.direction = direction;
        this.axis = axis;
    }

    shrink = () => {
        this.status = 'shrink';
    }

    stop = () => {
        this.scale = 1;
        this.status = 'stop';
        this.flyingTime = 0;
    }

    jump = () => {
        this.status = 'jump';
    }

    _jump = (tickTime) => {
        const t = tickTime / 1000;
        this.flyingTime = this.flyingTime + t;
        // 水平方向
        const translateH = this.velocity.vx * t;
        const translateY = this.velocity.vy * t - 0.5 * g * t * t - g * this.flyingTime * t;
        this.obj.translateY(translateY);
        this.obj.translateOnAxis(this.axis, translateH);
    }

    rotate = () => {
        const scale = 1.4;
        this.human.rotation.z = this.human.rotation.x = 0;
        if (this.direction == 0) { // x
        customAnimation.to(this.human.rotation, 0.14, { z: this.human.rotation.z - Math.PI })
        customAnimation.to(this.human.rotation, 0.18, { z: this.human.rotation.z - 2 * Math.PI, delay: 0.14 })
        customAnimation.to(this.head.position, 0.1, { y: this.head.position.y + 0.9 * scale, x: this.head.position.x + 0.45 * scale })
        customAnimation.to(this.head.position, 0.1, { y: this.head.position.y - 0.9 * scale, x: this.head.position.x - 0.45 * scale, delay: 0.1 })
        customAnimation.to(this.head.position, 0.15, { y: 7.56, x: 0, delay: 0.25 })
        customAnimation.to(this.body.scale, 0.1, { y: Math.max(scale, 1), x: Math.max(Math.min(1 / scale, 1), 0.7), z: Math.max(Math.min(1 / scale, 1), 0.7) })
        customAnimation.to(this.body.scale, 0.1, { y: Math.min(0.9 / scale, 0.7), x: Math.max(scale, 1.2), z: Math.max(scale, 1.2), delay: 0.1 })
        customAnimation.to(this.body.scale, 0.3, { y: 1, x: 1, z: 1, delay: 0.2 })
        } else if (this.direction == 1) { // z
        customAnimation.to(this.human.rotation, 0.14, { x: this.human.rotation.x - Math.PI })
        customAnimation.to(this.human.rotation, 0.18, { x: this.human.rotation.x - 2 * Math.PI, delay: 0.14 })
        customAnimation.to(this.head.position, 0.1, { y: this.head.position.y + 0.9 * scale, z: this.head.position.z - 0.45 * scale })
        customAnimation.to(this.head.position, 0.1, { z: this.head.position.z + 0.45 * scale, y: this.head.position.y - 0.9 * scale, delay: 0.1 })
        customAnimation.to(this.head.position, 0.15, { y: 7.56, z: 0, delay: 0.25 })
        customAnimation.to(this.body.scale, 0.05, { y: Math.max(scale, 1), x: Math.max(Math.min(1 / scale, 1), 0.7), z: Math.max(Math.min(1 / scale, 1), 0.7) })
        customAnimation.to(this.body.scale, 0.05, { y: Math.min(0.9 / scale, 0.7), x: Math.max(scale, 1.2), z: Math.max(scale, 1.2), delay: 0.1 })
        customAnimation.to(this.body.scale, 0.2, { y: 1, x: 1, z: 1, delay: 0.2 })
        }
    }
}

export default new Bottle();