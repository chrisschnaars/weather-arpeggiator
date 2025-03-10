export const mapNumberToRange = (val, min1, max1, min2, max2) => {
  const n = ((val - min1) * (max2 - min2)) / (max1 - min1) + min2;
  return n;
};

export const formatUnixTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return date
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toLowerCase();
};
