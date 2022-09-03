import React from "react";

import styles from "./RangeInput.module.css";

const RangeInput = ({
  minValue,
  maxValue,
  labelContent,
  value,
  onInputChange,
}) => {
  return (
    <div className={styles.rangeInputGroup}>
      <label for="input-range" className={styles.rangeInputLabel}>
        {labelContent}
      </label>
      <input
        id="input-range"
        type="range"
        className={styles.rangeInput}
        min={minValue}
        max={maxValue}
        value={value}
        onChange={onInputChange}
      />
    </div>
  );
};

export default RangeInput;
