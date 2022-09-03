import {
  afterSwappingTwoBars,
  beforeSwappingTwoBars,
  paintBlue,
  paintGreen,
  paintYellow,
  swapHeightOfTwoBars,
  swapContentAndHeightOfTwoBars,
  paintPurple,
} from "../utilities/animation";
import { swapTwoValues, getHeightOfBarContainers } from "../utilities/global";

import { BLUE_COLOR, PURPLE_COLOR } from "../utilities/constants";

const arrayBars = document.getElementsByClassName("array-bar");

const completeRoundQuickSort = (xp, yp) => {
  return () => {
    if (xp === yp) {
      arrayBars[xp - 1].style.backgroundColor = PURPLE_COLOR;
      arrayBars[xp].style.backgroundColor = PURPLE_COLOR;
      return;
    }

    arrayBars[xp].style.backgroundColor = PURPLE_COLOR;
    arrayBars[yp].style.backgroundColor = BLUE_COLOR;
  };
};

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swapTwoValues(arr, i, j);
    }
  }
  swapTwoValues(arr, i + 1, high);
  return i + 1;
}

export function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

export function getQuickSortAnimations(array) {
  function partition(array, low, high, animations, actualArr) {
    const barContainerHeight = getHeightOfBarContainers();

    const mainSwapTwoBars =
      Math.floor(barContainerHeight / array.length) > 30
        ? swapContentAndHeightOfTwoBars
        : swapHeightOfTwoBars;

    const pivot = array[high];
    animations.push(paintYellow(high));

    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      animations.push(paintGreen(j));
      if (array[j] < pivot) {
        i++;
        animations.push(beforeSwappingTwoBars(i, j));
        swapTwoValues(array, i, j);
        animations.push(mainSwapTwoBars(actualArr, i, j));
        animations.push(afterSwappingTwoBars(i, j));
        animations.push(paintBlue(i, j));
      } else {
        animations.push(paintBlue(j));
      }
    }

    if (i + 1 !== high) {
      animations.push(beforeSwappingTwoBars(i + 1, high));
      swapTwoValues(array, i + 1, high);
      animations.push(mainSwapTwoBars(actualArr, i + 1, high));
      animations.push(afterSwappingTwoBars(i + 1, high));
    }

    animations.push(completeRoundQuickSort(i + 1, high));

    return i + 1;
  }

  function quickSort(array, low, high, animations, actualArr) {
    if (low === high) {
      animations.push(paintPurple(low));
    }
    if (low < high) {
      const pivot = partition(array, low, high, animations, actualArr);
      quickSort(array, low, pivot - 1, animations, actualArr);
      quickSort(array, pivot + 1, high, animations, actualArr);
    }
  }
  const animations = new Array();

  const auxiliaryArray = [...array];

  quickSort(auxiliaryArray, 0, auxiliaryArray.length - 1, animations, array);

  return animations;
}
