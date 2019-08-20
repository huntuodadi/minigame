/** 
 * @description animation library
 * @detail requestAnimationFrame
 * 1. duration
 * 2. start
 * 3. to
 * 4. type
*/
import Tween from './tween';

const customAnimation = {};
customAnimation.to = function (from ,to, duration, type, callback) {
  for(let prop in from) {
    if(from[prop] && to[prop]) {
      console.log('from', prop, from[prop]);
      console.log('to', prop, to[prop]);
      TweenAnimation(from[prop], to[prop], duration, type, (value, complete) => {
        from[prop] = value;
        if(complete) {
          console.log('complete');
        }
      });
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
    console.log('start step');
    const currentTime = Date.now();
    const interval = currentTime - lastTime;
    if(interval <= 17) {
      start++;
    }else{
      // start是指用户卡了多少帧数,
      const _start = Math.floor(interval / 17);
      start = start + _start;
    }
    const value = tweenFn(start, from, to - from, frameCount);
    console.log('value:', value);
    if(start <= frameCount) {
      console.log('动画未完成');
      // 动画未完成
      options.callback(value);
      requestAnimationFrame(step);
    }else {
      // 动画结束
      console.log('动画结束');
      options.callback(to, true);
    }
  }
  step();
}

export default {
  customAnimation,
  TweenAnimation
};