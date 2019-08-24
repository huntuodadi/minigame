/** 
 * @description animation library
 * @detail requestAnimationFrame
 * 1. duration
 * 2. start
 * 3. to
 * 4. type
*/
import Tween from './tween';
let testStartTime, testEndTime;

const customAnimation = {};
customAnimation.to = function (from ,duration, to, type = 'Linear', delay) {
  testStartTime = Date.now();
  for(let prop in to) {
    setTimeout((function(prop) {
      return function() {
        TweenAnimation(from[prop], to[prop], duration, type, (value, complete) => {
          from[prop] = value;
          if(complete) {
            
          }
        });
      }
    })(prop), delay * 1000);
    if(from[prop] && to[prop]) {
      
    }
    
  }
}

/** 
 * @duration ms
*/
function TweenAnimation(from, to, duration, type, callback) {
  const frameCount = duration * 1000 / 17;
  let start = -1;
  const startTime = Date.now();
  let lastTime = Date.now();

  const tweenFn = Tween[type];

  const options = {
    callback: function () {
      
    },
    type: 'Linear',
    duration: 300
  };
  if(callback) {
    options.callback = callback;
  }
  if(type) {
    options.type = type;
  }
  if(duration) {
    options.duration = duration;
  }

  const step = function step() {
    const currentTime = Date.now();
    const interval = currentTime - lastTime;
    lastTime = currentTime;
    let fps;
    if(interval) {
      fps = Math.ceil(1000 / interval); 
    }else {
      requestAnimationFrame(step);
      return;
    }
    // 如果fps高 那么直接计算下一帧
    if(fps >= 30) {
      start++;
    }else{
      // start是指用户卡了多少帧数,
      const _start = Math.floor(interval / 17);
      start = start + _start;
    }
    // console.log(interval, start, frameCount);
    const value = tweenFn(start, from, to - from, frameCount);
    if(start <= frameCount) {
      // 动画未完成
      options.callback(value);
      requestAnimationFrame(step);
    }else {
      // 动画结束
      testEndTime = Date.now();
      // console.log('real duration:', (testEndTime - testStartTime) / 1000);
      options.callback(to, true);
    }
  }
  step();
}

export default {
  customAnimation,
  TweenAnimation
};