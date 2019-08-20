const Tween = {
  Linear: (currentFrame, from, range, totalFrameCount) => {
    return currentFrame * range /  totalFrameCount + from;
  }
};

export default Tween;