import { swapTwoValues } from "../utilities/global";

import { PURPLE_COLOR, BLUE_COLOR } from "../utilities/constants";

import { getHeightOfBarContainers } from "../utilities/global";

import {
  paintYellow,
  completeSortingAnimation,
  pickTwoBars,
  beforeSwappingTwoBars,
  swapContentAndHeightOfTwoBars,
  afterSwappingTwoBars,
  swapHeightOfTwoBars,
  paintPurple,
} from "../utilities/animation";

export function bubbleSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        swapTwoValues(array, j, j + 1);
      }
    }
  }
}

export function getBubbleSortAnimations(array, sortingSpeed = 5) {
  const barContainerHeight = getHeightOfBarContainers();

  const mainSwapTwoBars =
    Math.floor(barContainerHeight / array.length) > 30
      ? swapContentAndHeightOfTwoBars
      : swapHeightOfTwoBars;

  const completeOneComparisonBubbleSort = (array, j, i) => {
    return () => {
      const arrayBars = document.getElementsByClassName("array-bar");
      if (j + 1 === array.length - i - 1) {
        // purple + blue
        arrayBars[j + 1].style.backgroundColor = PURPLE_COLOR;
        arrayBars[j].style.backgroundColor = BLUE_COLOR;

        if (j === 0) {
          setTimeout(() => {
            arrayBars[j].style.backgroundColor = PURPLE_COLOR;
          }, sortingSpeed);
        }
      } else {
        arrayBars[j].style.backgroundColor = BLUE_COLOR;
      }
    };
  };

  const animations = new Array();

  const auxiliaryArray = [...array];

  for (let i = 0; i < auxiliaryArray.length - 1; i++) {
    for (let j = 0; j < auxiliaryArray.length - i - 1; j++) {
      animations.push(pickTwoBars(j, j + 1));

      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        animations.push(beforeSwappingTwoBars(j, j + 1));
        animations.push(mainSwapTwoBars(array, j, j + 1));
        swapTwoValues(auxiliaryArray, j, j + 1);
        animations.push(afterSwappingTwoBars(j, j + 1));
      }

      animations.push(completeOneComparisonBubbleSort(array, j, i));
    }
  }

  animations.push(paintPurple(0));

  return animations;
}
