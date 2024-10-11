import React from "react";

function Display({ value }) {
  return (
    <input
      type="text"
      className="display"
      value={value}
      readOnly
    />
  );
}

export default Display;
