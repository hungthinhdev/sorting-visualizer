import { swapTwoValues, getHeightOfBarContainers } from "../utilities/global";

import {
  afterSwappingTwoBars,
  beforeSwappingTwoBars,
  paintBlue,
  paintGreen,
  paintPurple,
  paintYellow,
  pickTwoBars,
  swapContentAndHeightOfTwoBars,
  swapHeightOfTwoBars,
  completeSortingAnimation,
} from "../utilities/animation";

function heapify(array, N, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < N && array[largest] < array[left]) largest = left;

  if (right < N && array[largest] < array[right]) largest = right;

  if (largest !== i) {
    swapTwoValues(array, largest, i);
    heapify(array, N, largest);
  }
}

export function heapSort(array) {
  const N = array.length;

  for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
    heapify(array, N, i);
  }

  for (let i = N - 1; i > 0; i--) {
    swapTwoValues(array, 0, i);
    heapify(array, i, 0);
  }
}

export function getHeapSortAnimations(array) {
  const barContainerHeight = getHeightOfBarContainers();

  const mainSwapTwoBars =
    Math.floor(barContainerHeight / array.length) > 30
      ? swapContentAndHeightOfTwoBars
      : swapHeightOfTwoBars;

  function heapify(auxiliaryArray, mainArray, N, i, animations) {
    let largest = i;
    animations.push(paintYellow(largest));

    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < N) {
      animations.push(paintGreen(largest, left));
      if (auxiliaryArray[largest] < auxiliaryArray[left]) {
        animations.push(paintBlue(largest));
        animations.push(paintYellow(left));
        largest = left;
      } else {
        animations.push(paintYellow(largest));
        animations.push(paintBlue(left));
      }
    }

    if (right < N) {
      animations.push(paintGreen(largest, right));
      if (auxiliaryArray[largest] < auxiliaryArray[right]) {
        animations.push(paintBlue(largest));
        animations.push(paintYellow(right));
        largest = right;
      } else {
        animations.push(paintYellow(largest));
        animations.push(paintBlue(right));
      }
    }

    if (largest !== i) {
      animations.push(beforeSwappingTwoBars(largest, i));
      animations.push(mainSwapTwoBars(mainArray, largest, i));
      swapTwoValues(auxiliaryArray, largest, i);
      animations.push(afterSwappingTwoBars(largest, i));
      animations.push(paintBlue(largest, i));
      heapify(auxiliaryArray, mainArray, N, largest, animations);
    } else {
      animations.push(paintBlue(largest));
    }
  }

  function heapSort(auxiliaryArray, mainArray, animations) {
    const N = auxiliaryArray.length;

    for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
      heapify(auxiliaryArray, mainArray, N, i, animations);
    }

    for (let i = N - 1; i > 0; i--) {
      animations.push(beforeSwappingTwoBars(0, i));
      animations.push(mainSwapTwoBars(mainArray, 0, i));
      animations.push(afterSwappingTwoBars(0, i));
      swapTwoValues(auxiliaryArray, 0, i);
      animations.push(paintBlue(0));
      animations.push(paintPurple(i));
      heapify(auxiliaryArray, mainArray, i, 0, animations);
    }

    animations.push(paintPurple(0));
  }

  const animations = new Array();

  const auxiliaryArray = [...array];

  heapSort(auxiliaryArray, array, animations);

  return animations;
}
