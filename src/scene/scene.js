import camera from './camera';
import light from '.light';
class Scene {
    constructor() {
        this.instance = null;
    }
    init() {
        this.instance = new THREE.Scene;
        const renderer = this.renderer = new THREE.WebGLRenderer({
            canvas,
            antilias: true,
            preserveDrawingBuffer: true
        });
        this.camera = camera;
        this.light = light;
        this.camera.init();
        this.light.init();
        this.axesHelper =  new THREE.AxesHelper(100);
        this.instance.add(this.axesHelper);
        this.instance.add(this.camera.instance);
    }

    render() {
        this.renderer.render(this.instance, this.camera.instance);
    }
}

export default new Scene();