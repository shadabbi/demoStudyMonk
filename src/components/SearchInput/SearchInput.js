import React, { useState } from "react";

import classes from "./SearchInput.module.scss";

function SearchInput(props) {
  const [inputData, setInputData] = useState("");
  const debounce = (func, timeout = 1000) => {
    let timerId;
    return (...args) => {
      console.log(args);
      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
        func.apply(null, args);
      }, timeout);
    };
  };

  const inputHandler = (e) => {
    setInputData(e.target.value);
    debounce(props.filterHandler(inputData));
  };

  return (
    <div className={classes.searchInput}>
      <input
        onChange={inputHandler}
        value={inputData}
        name="search"
        type="text"
        placeholder="Search"
      />
      {/* <button onClick={() => props.filterHandler(inputData)}>click</button> */}
    </div>
  );
}

export default SearchInput;
