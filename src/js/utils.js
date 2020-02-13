let mapNumberToRange = (val, min1, max1, min2, max2) => {
  let n = ((val - min1) * (max2 - min2)) / (max1 - min1) + min2;
  return n;
};

let maxBeatYPosition = () => {
  let beatHeight = document.querySelector(".beats__beat").offsetHeight;
  let beatContainerHeight = document.querySelector(".beats").offsetHeight;

  let p = 100 * (1 - (beatHeight + 16) / beatContainerHeight);
  return p;
};
