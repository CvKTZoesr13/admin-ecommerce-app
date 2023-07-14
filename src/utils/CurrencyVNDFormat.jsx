// console.log(new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(number));

import React from "react";

const CurrencyVNDFormat = (props) => {
  const { value, className } = props;
  return (
    <div className={className}>
      {new Intl.NumberFormat("vn-VN", {
        style: "currency",
        currency: "VND",
      }).format(value)}
    </div>
  );
};

export default CurrencyVNDFormat;
