import React from "react";

function Button({ value, onClick }) {
  return (
    <input
      type="button"
      value={value}
      className={`button ${value === '=' ? 'equal' : ''}`}
      onClick={onClick}
    />
  );
}

export default Button;
