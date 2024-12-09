import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{
        border: "1px solid gold",
        borderRadius: 5,
        padding: "10px 20px",
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "transparent",
        color: selected ? "black" : "inherit",
        fontWeight: selected ? 700 : 500,
        ":hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: "22%",
        // margin: 5, // Uncomment if margin is required
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
