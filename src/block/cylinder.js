import BaseBlock from './base.js';
export default class Cylinder extends BaseBlock{
    constructor(x, y, z, width) {
        super('cylinder');
        const size = width || this.width;
        const geometry = new THREE.CylinderGeometry(size / 2, size / 2, this.height, 120);
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff
        });
        this.instance = new THREE.Mesh(geometry, material);
        // 接受阴影
        this.instance.receiveShadow = true;
        // 投射阴影
        this.instance.castShadow = true;
        this.instance.name = 'block';
        this.x = x;
        this.y = y;
        this.z = z;
        this.instance.position.x = x;
        this.instance.position.y = y;
        this.instance.position.z = z;
    }
}