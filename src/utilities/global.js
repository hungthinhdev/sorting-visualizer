export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function swapTwoValues(array, xp, yp) {
  const temp = array[xp];
  array[xp] = array[yp];
  array[yp] = temp;
}

export function generateRandomArray(length, min, max) {
  const newArray = new Array();
  for (let i = 0; i < length; i++) {
    newArray.push(randomIntFromInterval(min, max));
  }
  return newArray;
}

export function logger(unsortedArray, sortedArray) {
  console.log("BEFORE SORTING: ", JSON.stringify(unsortedArray));
  console.log("AFTER SORTING: ", JSON.stringify(sortedArray));
}

export function getHeightOfBarContainers() {
  const barContainer = document.querySelector("#bar-container");
  return barContainer.offsetHeight;
}
