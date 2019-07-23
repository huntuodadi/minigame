import {scene} from '../scene/index';

export default class GamePage {
    constructor(callbacks) {
        this.callbacks = callbacks;
    }
    init() {
        console.log('game page scene:', scene);
        this.scene = scene;
        this.scene.init();
        console.log('scene:', this.scene);
        this.render();
    }

    render() {
        this.scene.render();
        requestAnimationFrame(this.render.bind(this));
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