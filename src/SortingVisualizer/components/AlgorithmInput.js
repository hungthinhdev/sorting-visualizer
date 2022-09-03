import React, { useState } from "react";

import styles from "./AlgorithmInput.module.css";

const AlgorithmInput = ({ onSelectAlgorithm }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div
      className={styles.algorithmInputContainer}
      onClick={() => setShowOptions(!showOptions)}
    >
      <label for="sorting-algorithms" className={styles.algorithmInputLabel}>
        algorithms
      </label>
      {showOptions && (
        <div id="sorting-algorithms" className={styles.algorithmInputSelect}>
          <option value="Bubble sort" onClick={(e) => onSelectAlgorithm(e)}>
            Bubble Sort
          </option>
          <option value="Selection sort" onClick={(e) => onSelectAlgorithm(e)}>
            Selection Sort
          </option>
          <option value="Insertion sort" onClick={(e) => onSelectAlgorithm(e)}>
            Insertion Sort
          </option>
          <option value="Merge sort" onClick={(e) => onSelectAlgorithm(e)}>
            Merge Sort
          </option>
          <option value="Quick sort" onClick={(e) => onSelectAlgorithm(e)}>
            Quick Sort
          </option>
          <option value="Heap sort" onClick={(e) => onSelectAlgorithm(e)}>
            Heap Sort
          </option>
        </div>
      )}
    </div>
  );
};

export default AlgorithmInput;
