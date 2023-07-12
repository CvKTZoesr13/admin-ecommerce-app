import React from "react";
const CustomInput = (props) => {
  const { type, placeholder, id, className, name } = props;
  return (
    <div className="form-floating mb-3">
      <input
        id={`${id ? id : ""}`}
        type={type}
        className={`form-control ${className ? className : ""}`}
        placeholder={placeholder}
        name={name}
      />
      <label htmlFor={id}>{placeholder}</label>
    </div>
  );
};

export default CustomInput;
