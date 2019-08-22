import bottleConf from '../../confs/bottle-conf';
import blockConf from '../../confs/block-conf';
import animation from '../../libs/animation';
const {customAnimation} = animation;
class Bottle {
    constructor (x, y, z) {

    }

    init () {
        // this.obj 控制bottle的位置等
        this.obj = new THREE.Object3D();
        this.obj.name = 'bottle';
        this.obj.position.set(bottleConf.initPosition.x, bottleConf.initPosition.y + 30, bottleConf.initPosition.z);

        // this.bottle 仅进行各个分部的组合
        this.bottle = new THREE.Object3D();
        

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
        this.bottle.add(this.head);
        this.bottle.add(this.body);
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

    update() {
        this.head.rotation.y += 0.06;
    }

    showUp() {
        console.log('customAnimation:', customAnimation);
        customAnimation.to(this.obj.position, {
            x: bottleConf.initPosition.x, 
            y: bottleConf.initPosition.y + blockConf.height / 2,
            z: bottleConf.initPosition.z
        }, 0.5, 'BounceEaseOut');
    }
}

export default new Bottle();