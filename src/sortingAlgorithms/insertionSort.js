import { swapTwoValues } from "../utilities/global";

import { GREEN_COLOR, PURPLE_COLOR } from "../utilities/constants";

import {
  paintYellow,
  pickTwoBars,
  beforeSwappingTwoBars,
  swapHeightOfTwoBars,
  swapContentAndHeightOfTwoBars,
  completeSortingAnimation,
} from "../utilities/animation";

import { getHeightOfBarContainers } from "../utilities/global";

export function insertionSort(array) {
  const n = array.length;
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = array[i];
    j = i - 1;

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;
  }
}

export function getInsertionSortAnimations(array) {
  const barContainerHeight = getHeightOfBarContainers();

  const mainSwapTwoBars =
    Math.floor(barContainerHeight / array.length) > 30
      ? swapContentAndHeightOfTwoBars
      : swapHeightOfTwoBars;

  const arrayBars = document.getElementsByClassName("array-bar");

  const afterSwappingTwoBars = (xp, yp) => {
    return () => {
      arrayBars[xp].style.backgroundColor = GREEN_COLOR;
      arrayBars[yp].style.backgroundColor = PURPLE_COLOR;
    };
  };

  const completeRoundInsertionSort = (xp, yp) => {
    return () => {
      arrayBars[xp].style.backgroundColor = PURPLE_COLOR;
      arrayBars[yp].style.backgroundColor = PURPLE_COLOR;
    };
  };

  const animations = new Array();
  const auxiliaryArray = [...array];

  // Get sorting animations
  for (let i = 1; i < auxiliaryArray.length; i++) {
    let j = i;
    while (j >= 1) {
      animations.push(pickTwoBars(j - 1, j));

      if (auxiliaryArray[j - 1] <= auxiliaryArray[j]) {
        animations.push(completeRoundInsertionSort(j - 1, j));
        break;
      } else {
        animations.push(beforeSwappingTwoBars(j - 1, j));
        animations.push(mainSwapTwoBars(array, j - 1, j));
        swapTwoValues(auxiliaryArray, j - 1, j);
        animations.push(afterSwappingTwoBars(j - 1, j));

        if (j - 1 === 0) {
          animations.push(completeRoundInsertionSort(j - 1, j));
        }
        j = j - 1;
      }
    }
  }

  return animations;
}
