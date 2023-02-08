import React, { useState, useEffect } from "react";
import "./DropDown.css";

const Dropdown = ({ modelList, setSelectedOption, selectedOption }) => {
  return (
    <select
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
    >
      {modelList.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
