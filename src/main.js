console.log('my game');
/**
 * 小游戏入口
 * 
 */
// import * as fdfd from './libs/aa';
import * as THREE from '../libs/three';
import game from './game/game';
window.THREE = THREE;
// import {WrapAroundEnding} from './libs/three.js';
// const THREE = require('./libs/three');

class Main {
    constructor() {

    }
    static init() {
        console.log('init main');
        game.init();
    }
}
export default Main;


