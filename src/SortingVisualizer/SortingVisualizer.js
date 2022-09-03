import { useState, useEffect, useRef } from "react";

// CONSTAINTS
import {
  MINIMUM_SORTING_SPEED,
  MAXIMUM_SORTING_SPEED,
  DEFAULT_SORTING_SPEED,
  MIN_LENGTH,
  MAX_LENGTH,
  MIN_VALUE,
  MAX_VALUE,
  BAR_CONTAINER_WIDTH,
  BLUE_COLOR,
  DEFAULT_LENGTH,
  YELLOW_COLOR,
  GREEN_COLOR,
} from "../utilities/constants";

// utility functions
import { generateRandomArray } from "../utilities/global";

import {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
  heapSort,
  getSortingAnimations,
} from "../sortingAlgorithms";

import styles from "./SortingVisualizer.module.css";

import AlgorithmInput from "./components/AlgorithmInput";
import RangeInput from "./components/RangeInput";

const SortingVisualizer = () => {
  // actually array state
  const [array, setArray] = useState(() => {
    return generateRandomArray(MIN_LENGTH, MIN_VALUE, MAX_VALUE);
  });

  const arrayRef = useRef(array);

  // length of the array state
  const [arraySize, setArraySize] = useState(DEFAULT_LENGTH);
  const handleArraySizeChange = (e) => {
    setArraySize(e.target.value);
  };

  const [sortingAlgorithmName, setSortingAlgorithmName] =
    useState("Bubble sort");

  useEffect(() => {
    const newArray = generateRandomArray(arraySize, MIN_VALUE, MAX_VALUE);
    arrayRef.current = [...newArray];
    setArray([...newArray]);

    let sortingAnimations = getSortingAnimations(
      sortingAlgorithmName,
      newArray
    );

    setAnimations([...sortingAnimations]);
  }, [arraySize]);

  // state to perform animations
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    const arrayBars = document.getElementsByClassName("array-bar");
    array.map((num, idx) => {
      arrayBars[idx].style.backgroundColor = BLUE_COLOR;
    });
  }, [array]);

  const handleSelectAlgorithm = (e) => {
    let sortingAnimations = getSortingAnimations(e.target.value, array);
    setSortingAlgorithmName(e.target.value);
    setAnimations([...sortingAnimations]);
  };

  const handleGenerateNewArray = () => {
    const newArray = generateRandomArray(arraySize, MIN_VALUE, MAX_VALUE);
    arrayRef.current = [...newArray];
    setArray([...newArray]);

    let sortingAnimations = getSortingAnimations(
      sortingAlgorithmName,
      newArray
    );

    setAnimations([...sortingAnimations]);
  };

  // animation speed state
  const [sortingSpeed, setSortingSpeed] = useState(DEFAULT_SORTING_SPEED);
  const handleSortingSpeedChange = (e) => {
    const newSortingSpeed = e.target.value;
    setSortingSpeed(newSortingSpeed);
  };

  const [showControl, setShowControl] = useState(true);
  const handleShowControl = () => {
    setShowControl(!showControl);
  };

  const handleSortAnimation = () => {
    if (animations.length === 0) {
      console.log("Empty animations, Please choose sorting algorithm!!!");
      return;
    }

    const currentArray = [...arrayRef.current];
    const left = 0,
      right = currentArray.length - 1;
    switch (sortingAlgorithmName) {
      case "Bubble sort":
        bubbleSort(currentArray);
        break;
      case "Insertion sort":
        insertionSort(currentArray);
        break;
      case "Selection sort":
        selectionSort(currentArray);
        break;
      case "Merge sort":
        mergeSort(currentArray, left, right);
        break;
      case "Quick sort":
        quickSort(currentArray, left, right);
        break;
      case "Heap sort":
        heapSort(currentArray);
        break;
      default:
        break;
    }

    const sortingInterval = (animations.length + 2) * sortingSpeed;

    animations.map((animation, idx) => {
      setTimeout(animation, idx * sortingSpeed);
    });

    setTimeout(() => {
      const completeSortingInterval = (array.length + 1) * 10;
      for (let i = 0; i < array.length; i++) {
        const arrayBars = document.getElementsByClassName("array-bar");
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = YELLOW_COLOR;
        }, 10 * (i + 1));
      }

      setTimeout(() => {
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < array.length; i++) {
          arrayBars[i].style.backgroundColor = GREEN_COLOR;
        }
      }, completeSortingInterval);

      // setArray([...currentArray]);
      arrayRef.current = [...currentArray];
      setAnimations([]);
    }, sortingInterval);
  };

  return (
    <div className={styles.visualizerContainer}>
      <div className={styles.visualizerControlContainer}>
        <div className={styles.visualizerContainerLogo}>
          <a href="./" className={styles.visualizerContainerLogoLink}>
            sorting visualizer
          </a>
        </div>
        <button className={styles.hamburgerMenu} onClick={handleShowControl}>
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
        </button>
        <div
          id="control-group"
          className={styles.controlGroup}
          style={{ display: showControl ? "flex" : "none" }}
        >
          <div>
            <button
              className={styles.generateArrayBtn}
              onClick={handleGenerateNewArray}
            >
              Generate new array
            </button>
          </div>
          <AlgorithmInput onSelectAlgorithm={handleSelectAlgorithm} />
          <RangeInput
            minValue={MIN_LENGTH}
            maxValue={MAX_LENGTH}
            labelContent="Length of array"
            value={arraySize}
            onInputChange={handleArraySizeChange}
          />
          <RangeInput
            minValue={MINIMUM_SORTING_SPEED}
            maxValue={MAXIMUM_SORTING_SPEED}
            labelContent="Sorting speed"
            value={sortingSpeed}
            onInputChange={handleSortingSpeedChange}
          />
          <div className={styles.sortingAlgorithmName}>
            Visualize {sortingAlgorithmName}
          </div>
          <div className={styles.sortButtonContainer}>
            <button
              type="button"
              className={styles.sortButton}
              onClick={handleSortAnimation}
            >
              Sort
            </button>
          </div>
        </div>
      </div>
      <div id="bar-container" className={styles.barContainer}>
        {array.length &&
          array.map((number, idx) => {
            return (
              <div
                key={idx}
                class="array-bar"
                style={{
                  height: `${number}px`,
                  width: `${Math.ceil(BAR_CONTAINER_WIDTH / arraySize)}px`,
                  backgroundColor: "rgba(66, 134, 244, 0.8)",
                  display: "grid",
                  justifyContent: "center",
                  paddingTop: "1rem",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "var(--bar-content-clr)",
                }}
              >
                {Math.ceil(BAR_CONTAINER_WIDTH / arraySize) > 30 && number}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SortingVisualizer;
