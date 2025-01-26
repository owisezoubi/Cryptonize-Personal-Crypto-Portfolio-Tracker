import React from "react";
import { LoadingSpinnerStyle } from "../styles/LoadingSpinnerStyle";

/**
 * LoadingSpinner component provides a simple loading spinner
 * with all styles moved to LoadingSpinnerStyle.js
 */
const LoadingSpinner = () => {
  return (
    <div className={LoadingSpinnerStyle.container}>
      <div className={LoadingSpinnerStyle.spinner} />
    </div>
  );
};

export default LoadingSpinner;
