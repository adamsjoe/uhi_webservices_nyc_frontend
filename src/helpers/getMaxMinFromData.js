export function getLargest(data) {
  console.log(data);
  let maxElement = -Infinity;

  for (const item of data) {
    const temp = item.TEMP;

    if (temp > maxElement) {
      maxElement = temp;
    }
  }
  return maxElement;
}

export function getLowest(data, element) {
  let minElement = -Infinity;

  for (const item of data) {
    const temp = item.element;

    if (temp < minElement) {
      minElement = temp;
    }
  }
  return minElement;
}
