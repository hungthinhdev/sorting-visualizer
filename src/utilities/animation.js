import { PureComponent } from "react";
import {
  RED_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
  PURPLE_COLOR,
  YELLOW_COLOR,
} from "./constants";

import { swapTwoValues } from "./global";

const arrayBars = document.getElementsByClassName("array-bar");

export const resetBackground = () => {
  arrayBars.forEach((idx) => {
    arrayBars[idx].style.backgroundColor = BLUE_COLOR;
  });
};

export const paintGreen = (...args) => {
  return () => {
    args.forEach((idx) => {
      arrayBars[idx].style.backgroundColor = GREEN_COLOR;
    });
  };
};

export const paintRed = (...args) => {
  return () => {
    args.forEach((idx) => {
      arrayBars[idx].style.backgroundColor = RED_COLOR;
    });
  };
};

export const paintBlue = (...args) => {
  return () => {
    args.forEach((idx) => {
      arrayBars[idx].style.backgroundColor = BLUE_COLOR;
    });
  };
};

export const paintYellow = (...args) => {
  return () => {
    args.forEach((idx) => {
      arrayBars[idx].style.backgroundColor = YELLOW_COLOR;
    });
  };
};

export const paintPurple = (...args) => {
  return () => {
    args.forEach((idx) => {
      arrayBars[idx].style.backgroundColor = PURPLE_COLOR;
    });
  };
};

export const paintPurpleBlue = (...args) => {
  return () => {
    arrayBars[args[0]].style.backgroundColor = PURPLE_COLOR;
    arrayBars[args[1]].style.backgroundColor = BLUE_COLOR;
  };
};

export const pickTwoBars = (xp, yp) => {
  return () => {
    arrayBars[xp].style.backgroundColor = GREEN_COLOR;
    arrayBars[yp].style.backgroundColor = GREEN_COLOR;
  };
};

export const beforeSwappingTwoBars = (xp, yp) => {
  return () => {
    arrayBars[xp].style.backgroundColor = RED_COLOR;
    arrayBars[yp].style.backgroundColor = RED_COLOR;
  };
};

export const swapHeightOfTwoBars = (array, xp, yp) => {
  return () => {
    swapTwoValues(array, xp, yp);
    arrayBars[xp].style.height = `${array[xp]}px`;
    arrayBars[yp].style.height = `${array[yp]}px`;
  };
};

export const swapContentAndHeightOfTwoBars = (array, xp, yp) => {
  return () => {
    swapTwoValues(array, xp, yp);
    arrayBars[xp].innerText = array[xp];
    arrayBars[yp].innerText = array[yp];
    arrayBars[xp].style.height = `${array[xp]}px`;
    arrayBars[yp].style.height = `${array[yp]}px`;
  };
};

export const afterSwappingTwoBars = (xp, yp) => {
  return () => {
    arrayBars[xp].style.backgroundColor = GREEN_COLOR;
    arrayBars[yp].style.backgroundColor = GREEN_COLOR;
  };
};

export const completeRoundSelectionSort = (xp, yp) => {
  return () => {
    arrayBars[xp].style.backgroundColor = PURPLE_COLOR;
    arrayBars[yp].style.backgroundColor = BLUE_COLOR;
  };
};

export const completeRoundInsertionSort = (xp, yp) => {
  return () => {
    arrayBars[xp].style.backgroundColor = PURPLE_COLOR;
    arrayBars[yp].style.backgroundColor = PURPLE_COLOR;
  };
};

export const completeSortingAnimation = () => {
  return () => {
    const length = arrayBars.length;
    for (let i = 0; i < length; i++) {
      arrayBars[i].style.backgroundColor = GREEN_COLOR;
    }
  };
};

export function setBarWithContent(idx, newHeight) {
  return () => {
    arrayBars[idx].style.height = `${newHeight}px`;
    arrayBars[idx].innerText = newHeight;
  };
}

export function setBarWithoutContent(idx, newHeight) {
  return () => {
    arrayBars[idx].style.height = `${newHeight}px`;
  };
}

export function swapNodes(n1, n2) {
  return () => {
    var p1 = n1.parentNode;
    var p2 = n2.parentNode;
    var i1, i2;

    if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;

    for (var i = 0; i < p1.children.length; i++) {
      if (p1.children[i].isEqualNode(n1)) {
        i1 = i;
      }
    }
    for (var i = 0; i < p2.children.length; i++) {
      if (p2.children[i].isEqualNode(n2)) {
        i2 = i;
      }
    }

    if (p1.isEqualNode(p2) && i1 < i2) {
      i2++;
    }
    p1.insertBefore(n2, p1.children[i1]);
    p2.insertBefore(n1, p2.children[i2]);
  };
}
