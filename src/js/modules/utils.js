export const mapNumberToRange = (val, min1, max1, min2, max2) => {
  const n = ((val - min1) * (max2 - min2)) / (max1 - min1) + min2;
  return n;
};
