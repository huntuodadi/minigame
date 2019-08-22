import {scene} from '../scene/index';
import Cuboid from '../block/cuboid';
import Cylinder from '../block/cylinder';
import ground from '../objects/ground';
import bottle from '../objects/bottle';
export default class GamePage {
    constructor(callbacks) {
        this.callbacks = callbacks;
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

    bindTouchEvent() {
        canvas.addEventListener('touchstart', this.touchStartCallBack);
        canvas.addEventListener('touchend', this.touchEndCallBack);
    }

    removeTouchEvent() {
        canvas.removeEventListener('touchstart', this.touchStartCallBack);
        canvas.removeEventListener('touchend', this.touchEndCallBack);
    }

    touchStartCallBack() {
        console.log('touch start call back');
    }

    touchEndCallBack() {
        console.log('touch end call back');
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
        this.scene.instance.add(cuboidBlock.instance);
        this.scene.instance.add(cylinderBlock.instance);
    }

    addGround() {
        this.scene.instance.add(this.ground.instance);
        this.bottle.showUp();
    }

    addBottle() {
        this.scene.instance.add(this.bottle.instance);
    }
}