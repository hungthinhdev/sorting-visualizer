import {
  paintBlue,
  paintGreen,
  paintPurple,
  paintRed,
  paintYellow,
  paintPurpleBlue,
  completeSortingAnimation,
  setBarWithContent,
  setBarWithoutContent,
} from "../utilities/animation";

import { getHeightOfBarContainers } from "../utilities/global";

const arrayBars = document.getElementsByClassName("array-bar");

let mainSetBar = null;

function merge(arr, l, m, r) {
  var n1 = m - l + 1;
  var n2 = r - m;

  var L = new Array(n1);
  var R = new Array(n2);

  for (var i = 0; i < n1; i++) L[i] = arr[l + i];
  for (var j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  var i = 0;

  var j = 0;

  var k = l;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

export function mergeSort(arr, l, r) {
  if (l >= r) {
    return; //returns recursively
  }
  var m = l + parseInt((r - l) / 2);
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r);
}

export function getMergeSortAnimations(array) {
  function merge(auxiliaryArray, left, mid, right, animations, array) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
      L[i] = auxiliaryArray[left + i];
    }

    for (let j = 0; j < n2; j++) {
      R[j] = auxiliaryArray[mid + 1 + j];
    }

    let i = 0,
      j = 0,
      k = left;

    let m = left,
      n = mid + 1;

    while (i < n1 && j < n2) {
      animations.push(paintGreen(m, n));
      if (L[i] <= R[j]) {
        animations.push(paintRed(m, n));
        animations.push(mainSetBar(k, L[i]));
        if (right + left === auxiliaryArray.length - 1) {
          animations.push(paintPurpleBlue(m, n));
        } else {
          animations.push(paintBlue(m, n));
        }
        auxiliaryArray[k] = L[i];
        i++;
        m++;
      } else {
        animations.push(paintRed(m, n));
        animations.push(mainSetBar(k, R[j]));
        if (right + left === auxiliaryArray.length - 1) {
          animations.push(paintPurpleBlue(n, m));
        } else {
          animations.push(paintBlue(m, n));
        }
        auxiliaryArray[k] = R[j];
        j++;
        n++;
      }
      k++;
    }

    while (i < n1) {
      animations.push(paintYellow(m));
      animations.push(mainSetBar(k, L[i]));
      if (right + left === auxiliaryArray.length - 1) {
        animations.push(paintPurple(m));
      } else {
        animations.push(paintBlue(m));
      }
      auxiliaryArray[k] = L[i];
      k++;
      i++;
      m++;
    }

    while (j < n2) {
      animations.push(paintYellow(n));
      animations.push(mainSetBar(k, R[j]));
      if (right + left === auxiliaryArray.length - 1) {
        animations.push(paintPurple(n));
      } else {
        animations.push(paintBlue(n));
      }
      auxiliaryArray[k] = R[j];
      k++;
      j++;
      n++;
    }
  }

  function mergeSort(auxiliaryArray, left, right, animations, array) {
    if (left >= right) return;
    const mid = left + parseInt((right - left) / 2);
    mergeSort(auxiliaryArray, left, mid, animations, array);
    mergeSort(auxiliaryArray, mid + 1, right, animations, array);
    merge(auxiliaryArray, left, mid, right, animations, array);
  }

  const barContainerHeight = getHeightOfBarContainers();

  mainSetBar =
    Math.floor(barContainerHeight / array.length) > 30
      ? setBarWithContent
      : setBarWithoutContent;

  const animations = new Array();

  const left = 0;
  const right = array.length - 1;

  const auxiliaryArray = [...array];

  mergeSort(auxiliaryArray, left, right, animations, array);

  return animations;
}
