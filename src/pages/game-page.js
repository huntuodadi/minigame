import {scene} from '../scene/index';
import Cuboid from '../block/cuboid';
import Cylinder from '../block/cylinder';
import ground from '../objects/ground';
import bottle from '../objects/bottle';
import blockConf from '../../confs/block-conf';
import gameConf from '../../confs/game-conf';
import utils from '../utils/index';

const HIT_NEXT_BLOCK_CENTER = 1; 
const HIT_CURRENT_BLOCK = 2;
const GAME_OVER_NEXT_BLOCK_BACK = 3;
const GAME_OVER_CURRENT_BLOCK_BACK = 4;
const GAME_OVER_NEXT_BLOCK_FRONT = 5;
const GAME_OVER_BOTH = 6;
const HIT_NEXT_BLOCK_NORMAL = 7;
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
        this.touchEndTime = Date.now();
        const duration = this.touchEndTime - this.touchStartTime;
        this.bottle.velocity.vx = Math.min(duration / 6, 400);
        this.bottle.velocity.vx = +this.bottle.velocity.vx.toFixed(2);
        this.bottle.velocity.vy = Math.min(150 + duration / 20, 400);
        this.bottle.velocity.vy = +this.bottle.velocity.vy.toFixed(2);
        console.log('vx:', this.bottle.velocity.vx, 'vy:', this.bottle.velocity.vy);
        this.bottle.stop();
        const initY = blockConf.height - (1 - this.bottle.scale.y) * blockConf.height;
        this.hit = this.getHitStatus(this.bottle, this.currentBlock, this.nextBlock, initY);
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
        this.currentBlock = new Cuboid(-15, 0, 0) 
        this.scene.instance.add(this.currentBlock.instance)
        this.nextBlock = new Cylinder(23, 0, 0)
        this.scene.instance.add(this.nextBlock.instance)
        const initDirection = 0
        this.targetPosition = {
        x: 23,
        y: 0,
        z: 0
        }
        this.setDirection(initDirection)
    }

    addGround() {
        this.scene.instance.add(this.ground.instance);
        this.bottle.showUp();
    }

    addBottle() {
        this.scene.instance.add(this.bottle.instance);
    }

    getHitStatus(bottle, currentBlock, nextBlock) {

        let flyingTime = 2 * bottle.velocity.vy / gameConf.gravity;
        flyingTime = flyingTime.toFixed(2);
        const destination = [];
        const bottlePosition = new THREE.Vector2(bottle.position.x, bottle.position.z);
        const translate = new THREE.Vector2(this.axis.x, this.axis.z).setLength(flyingTime * this.bottle.velocity.vx);
        bottlePosition.add(translate);
        bottle.destination = [+bottlePosition.x.toFixed(2), +bottlePosition.z.toFixed(2)];
        destination.push(+bottlePosition.x.toFixed(2), +bottlePosition.z.toFixed(2));

        if (nextBlock) {
            var nextDiff = Math.pow(destination[0] - nextBlock.instance.position.x, 2) + Math.pow(destination[1] - nextBlock.instance.position.z, 2)
            var nextPolygon = nextBlock.getVertices()
            var result1
            if (utils.pointInPolygon(destination, nextPolygon)) {
              if (Math.abs(nextDiff) < 5) {
                return 1
              } else {
                return 7
              }
            } else if (utils.pointInPolygon([destination[0] - bottleConf.bodyWidth / 2, destination[1]], nextPolygon) || utils.pointInPolygon([destination[0], destination[1] + bottleConf.bodyDepth / 2], nextPolygon)) {
              result1 = 5
            } else if (utils.pointInPolygon([destination[0], destination[1] - bottleConf.bodyDepth / 2], nextPolygon) || utils.pointInPolygon([destination[0] + bottleConf.bodyDepth / 2, destination[1]], nextPolygon)) {
              result1 = 3
            }
          }
      
          var currentPolygon = currentBlock.getVertices()
          var result2
          if (utils.pointInPolygon(destination, currentPolygon)) {
            return 2
          } else if (utils.pointInPolygon([destination[0], destination[1] + bottleConf.bodyDepth / 2], currentPolygon) || utils.pointInPolygon([destination[0] - bottleConf.bodyWidth / 2, destination[1]], currentPolygon)) {
            if (result1) return 6
            return 4
          }
          return result1 || result2 || 0
    }
}