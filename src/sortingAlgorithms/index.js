import { getBubbleSortAnimations } from "./bubbleSort";
import { getSelectionSortAnimations } from "./selectionSort";
import { getInsertionSortAnimations } from "./insertionSort";
import { getMergeSortAnimations } from "./mergeSort";
import { getQuickSortAnimations } from "./quickSort";
import { getHeapSortAnimations } from "./heapSort";

const getSortingAnimations = (sortingAlgorithmName, currentArray) => {
  let sortingAnimations = new Array();
  switch (sortingAlgorithmName) {
    case "Bubble sort":
      sortingAnimations = getBubbleSortAnimations(currentArray);
      break;
    case "Insertion sort":
      sortingAnimations = getInsertionSortAnimations(currentArray);
      break;
    case "Selection sort":
      sortingAnimations = getSelectionSortAnimations(currentArray);
      break;
    case "Merge sort":
      sortingAnimations = getMergeSortAnimations(currentArray);
      break;
    case "Quick sort":
      sortingAnimations = getQuickSortAnimations(currentArray);
      break;
    case "Heap sort":
      sortingAnimations = getHeapSortAnimations(currentArray);
      break;
    default:
      break;
  }
  return sortingAnimations;
};

export { bubbleSort } from "./bubbleSort";
export { insertionSort } from "./insertionSort";
export { selectionSort } from "./selectionSort";
export { mergeSort } from "./mergeSort";
export { quickSort } from "./quickSort";
export { heapSort } from "./heapSort";
export { getSortingAnimations };
