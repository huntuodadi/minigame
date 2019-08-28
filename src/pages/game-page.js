import {scene} from '../scene/index';
import Cuboid from '../block/cuboid';
import Cylinder from '../block/cylinder';
import ground from '../objects/ground';
import bottle from '../objects/bottle';
export default class GamePage {
    constructor(callbacks) {
        this.callbacks = callbacks;
        this.touchStartCallBack = this.touchStartCallBack.bind(this);
        this.targetPosition = {};
    }
    init() {
        this.scene = scene;
        this.ground = ground;
        this.bottle = bottle;
        this.ground.init();
        this.scene.init();
        this.bottle.init();
        this.addInitBlock();
        this.addGround();
        this.addBottle();
        this.bindTouchEvent();
        this.render();
        
    }

    bindTouchEvent = () => {
        canvas.addEventListener('touchstart', this.touchStartCallBack);
        canvas.addEventListener('touchend', this.touchEndCallBack);
    }

    removeTouchEvent() {
        canvas.removeEventListener('touchstart', this.touchStartCallBack);
        canvas.removeEventListener('touchend', this.touchEndCallBack);
    }

    touchStartCallBack = () => {
        console.log('touch start call back:', this.bottle);
        this.touchStartTime = Date.now();;
        this.bottle.shrink();
        
    }

    touchEndCallBack = () => {
        console.log('touch end call back:', this.bottle);
        this.touchEndTime = Date.now();
        const duration = this.touchEndTime - this.touchStartTime;
        this.bottle.velocity.vx = Math.min(duration / 6, 400);
        this.bottle.velocity.vx = +this.bottle.velocity.vx.toFixed(2);
        this.bottle.velocity.vy = Math.min(150 + duration / 20, 400);
        this.bottle.velocity.vy = +this.bottle.velocity.vy.toFixed(2);
        console.log('vx:', this.bottle.velocity.vx, 'vy:', this.bottle.velocity.vy);
        this.bottle.stop();
        this.bottle.rotate();
        this.bottle.jump();
    }

    setDirection = (direction) => {
        console.log('bottle:', this.bottle.instance.position);
        const currentPosition = {
            x: this.bottle.instance.position.x,
            z: this.bottle.instance.position.z
        };

        this.axis = new THREE.Vector3(this.targetPosition.x - currentPosition.x, 0, this.targetPosition.z - currentPosition.z);
        this.axis.normalize();
        this.bottle.setDirection(direction, this.axis);
    }

    render() {
        this.scene.render();
        if(this.bottle) {
            this.bottle.update();
        }
        requestAnimationFrame(this.render.bind(this));
    } 

    addInitBlock() {
        const cuboidBlock = new Cuboid(-15, 0, 0);
        const cylinderBlock = new Cylinder(23, 0, 0);
        this.targetPosition = {
            x: 23,
            y: 0,
            z: 0
        };
        const initPosition = 0;
        this.scene.instance.add(cuboidBlock.instance);
        this.scene.instance.add(cylinderBlock.instance);
        this.setDirection(initPosition);
    }

    addGround() {
        this.scene.instance.add(this.ground.instance);
        this.bottle.showUp();
    }

    addBottle() {
        this.scene.instance.add(this.bottle.instance);
    }
}