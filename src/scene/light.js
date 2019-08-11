class Light {
    constructor() {
        this.instances = {};
    }
    init() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        // const shadowLight = new THREE.DirectionLight(0xffffff, 0.3);
        this.instances.ambientLight = ambientLight;
    }
}
export default new Light();