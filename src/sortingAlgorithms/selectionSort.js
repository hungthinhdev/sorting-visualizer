import { swapTwoValues } from "../utilities/global";

import {
  paintBlue,
  paintGreen,
  paintPurple,
  pickTwoBars,
  beforeSwappingTwoBars,
  swapContentAndHeightOfTwoBars,
  swapHeightOfTwoBars,
  afterSwappingTwoBars,
  paintYellow,
  completeRoundSelectionSort,
  completeSortingAnimation,
} from "../utilities/animation";

import { getHeightOfBarContainers } from "../utilities/global";

export function selectionSort(array) {
  const n = array.length;
  var i, j, min_idx;

  // One by one move boundary of unsorted subarray
  for (i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array
    min_idx = i;
    for (j = i + 1; j < n; j++) if (array[j] < array[min_idx]) min_idx = j;

    // Swap the found minimum element with the first element
    swapTwoValues(array, min_idx, i);
  }
}

export function getSelectionSortAnimations(array) {
  const barContainerHeight = getHeightOfBarContainers();

  const mainSwapTwoBars =
    Math.floor(barContainerHeight / array.length) > 30
      ? swapContentAndHeightOfTwoBars
      : swapHeightOfTwoBars;

  const animations = [];
  const auxiliaryArray = [...array];

  for (let i = 0; i < array.length - 1; i++) {
    let min_idx = i;
    animations.push(paintPurple(min_idx));

    for (let j = i + 1; j < array.length; j++) {
      animations.push(paintGreen(j));
      if (auxiliaryArray[j] < auxiliaryArray[min_idx]) {
        min_idx = j;
        animations.push(paintPurple(min_idx));
        animations.push(paintBlue(j));
      } else {
        animations.push(paintBlue(j));
      }
    }

    if (min_idx === i) {
      animations.push(paintPurple(min_idx));
    } else {
      // swapping two bars animation
      animations.push(pickTwoBars(i, min_idx));
      animations.push(beforeSwappingTwoBars(i, min_idx));
      animations.push(mainSwapTwoBars(array, i, min_idx));
      swapTwoValues(auxiliaryArray, i, min_idx);
      animations.push(afterSwappingTwoBars(i, min_idx));
      animations.push(completeRoundSelectionSort(i, min_idx));
    }

    if (i === array.length - 2) {
      animations.push(paintPurple(i));
      animations.push(paintPurple(i + 1));
    }
  }

  return animations;
}
