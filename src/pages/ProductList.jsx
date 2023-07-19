import { Table } from "antd";
import React, { useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import CurrencyVNDFormat from "../utils/CurrencyVNDFormat";
import { Link } from "react-router-dom";
const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.products.products);
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      render: (text) => (
        <a href="#!" className="text-decoration-none text-dark">
          {text}
        </a>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Tùy chỉnh",
      dataIndex: "action",
    },
  ];
  const dataTable = [];
  for (let i = 0; i < productState.length; i++) {
    dataTable.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: <CurrencyVNDFormat value={productState[i].price} />,
      action: (
        <>
          <Link className="fs-3 ">
            <BiEditAlt />
          </Link>
          <Link className="fs-3  text-danger">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Danh sách sản phẩm</h3>
      <div>
        <Table columns={columns} dataSource={dataTable} />
      </div>
    </div>
  );
};

export default ProductList;
