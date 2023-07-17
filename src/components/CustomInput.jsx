import React from "react";
const CustomInput = (props) => {
  const { type, placeholder, id, className, name, value, onChange } = props;
  return (
    <div className="form-floating mb-3">
      <input
        id={`${id ? id : ""}`}
        type={type}
        className={`form-control ${className ? className : ""}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onChange}
      />
      <label htmlFor={id}>{placeholder}</label>
    </div>
  );
};

export default CustomInput;
