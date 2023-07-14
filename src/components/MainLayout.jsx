import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { BiSolidDashboard } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Layout, Menu, Button, theme, Switch } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { BsListCheck, BsViewList } from "react-icons/bs";
import { BiCategoryAlt, BiSolidPlusCircle } from "react-icons/bi";
import { MdOutlineLabel } from "react-icons/md";
import { IoIosColorPalette, IoIosFolderOpen } from "react-icons/io";
import { FiPackage } from "react-icons/fi";
import { RiQuillPenLine } from "react-icons/ri";
import { TbMessage2Exclamation } from "react-icons/tb";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [themeSwitch, setThemeSwitch] = useState("dark");
  const [current, setCurrent] = useState("");
  const changeTheme = (value) => {
    setThemeSwitch(value ? "dark" : "light");
  };

  const [collapsed, setCollapsed] = useState(false);
  const [logo, setLogo] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={280}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={280}
          style={
            themeSwitch === "light"
              ? {
                  overflow: "auto",
                  height: "100vh",
                  position: "fixed",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  background: "white",
                }
              : {
                  overflow: "auto",
                  height: "100vh",
                  position: "fixed",
                  left: 0,
                  top: 0,
                  bottom: 0,
                }
          }
        >
          <div className="logo">
            <h2
              className={`text-center fs-5 text-${
                themeSwitch === "light" ? "dark" : "white"
              } py-2`}
            >
              {logo ? "CvKTZoeSr" : ""}
            </h2>
          </div>
          <Menu
            style={{ borderInlineEnd: "none" }}
            theme={themeSwitch}
            mode="inline"
            defaultSelectedKeys={[current]}
            onClick={({ key }) => {
              document.querySelector("main").scrollTo(0, 0);
              setCurrent(key);
              if (key === "signout") {
              } else {
                navigate(key);
              }
            }}
            selectedKeys={[current]}
            items={[
              {
                key: "",
                icon: <BiSolidDashboard />,
                label: "Dashboard",
              },
              {
                key: "customers",
                icon: <AiOutlineUser className="fs-4" />,
                label: "Khách hàng",
              },
              {
                key: "catalog",
                icon: <BiSolidDashboard className="fs-4" />,
                label: "Catalog",
                children: [
                  {
                    key: "product",
                    icon: <AiOutlineShoppingCart className="fs-4" />,
                    label: "Thêm sản phẩm",
                    // children: [
                    //   {
                    //     key: "product-list",
                    //     icon: <BsListCheck className="fs-4" />,
                    //     label: "Danh sách sản phẩm",
                    //   },
                    // ],
                  },
                  {
                    key: "product-list",
                    icon: <BsListCheck className="fs-4" />,
                    label: "Danh sách sản phẩm",
                  },
                  {
                    key: "brand",
                    icon: <MdOutlineLabel className="fs-4" />,
                    label: "Thương hiệu",
                  },
                  {
                    key: "list-brand",
                    icon: <BsViewList className="fs-4" />,
                    label: "Danh sách thương hiệu",
                  },
                  {
                    key: "category",
                    icon: <BiCategoryAlt className="fs-4" />,
                    label: "Danh mục",
                  },
                  {
                    key: "list-category",
                    icon: <BiCategoryAlt className="fs-4" />,
                    label: "Danh sách danh mục",
                  },
                  {
                    key: "color",
                    icon: <IoIosColorPalette className="fs-4" />,
                    label: "Màu sắc",
                  },
                  {
                    key: "list-color",
                    icon: <IoIosColorPalette className="fs-4" />,
                    label: "Bảng màu",
                  },
                ],
              },
              {
                key: "orders",
                icon: <FiPackage className="fs-4" />,
                label: "Đơn hàng",
              },
              {
                key: "1",
                icon: <RiQuillPenLine className="fs-4" />,
                label: "Bài viết",
                children: [
                  {
                    key: "blog",
                    icon: <RiQuillPenLine className="fs-4" />,
                    label: "Tạo bài viết",
                  },
                  {
                    key: "blog-list",
                    icon: <RiQuillPenLine className="fs-4" />,
                    label: "Danh sách bài viết",
                  },
                  {
                    key: "blog-category",
                    icon: <BiSolidPlusCircle className="fs-4" />,
                    label: "Thêm danh mục",
                  },
                  {
                    key: "blog-category-list",
                    icon: <IoIosFolderOpen className="fs-4" />,
                    label: "Danh mục bài viết",
                  },
                ],
              },
              {
                key: "enquiries",
                icon: <TbMessage2Exclamation className="fs-4" />,
                label: "Khiếu nại từ khách hàng",
              },
            ]}
          />
        </Sider>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="d-flex justify-content-between ps-1 pe-5"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              setCollapsed(!collapsed);
              setLogo(!logo);
            }}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Switch
            checked={themeSwitch === "dark"}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
            className="position-absolute"
            style={{
              top: "90px",
              right: "84px",
              zIndex: 999,
            }}
          />
          <br />
          <br />
          <div className="d-flex gap-3 align-items-center justify-content-between">
            <div
              className="position-relative d-flex"
              style={{ fontSize: "26px" }}
            >
              <MdOutlineMarkEmailUnread className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex align-items-center">
              <img
                src="https://avatars.githubusercontent.com/u/7843281?v=4"
                alt="avatar"
                className="img-fluid"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div
              className="d-flex flex-column no-select"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ cursor: "pointer" }}
            >
              <h5 className="text-dark mb-0">CvKTZoeSr</h5>
              <p className="mb-0 lh-normal">vanducdo4@gmail.com</p>
            </div>
            <ul
              style={{ zIndex: 9999 }}
              className="dropdown-menu"
              aria-labelledby="dropdownMenuLink"
            >
              <li>
                <Link
                  style={{ height: "auto", lineHeight: "20px" }}
                  className="dropdown-item py-1 mb-1   sub-title"
                  to={"/account/details"}
                >
                  Thông tin tài khoản
                </Link>
              </li>
              <li>
                <Link
                  style={{ height: "auto", lineHeight: "20px" }}
                  className="dropdown-item py-1 mb-1 sub-title"
                  to={"/logout"}
                >
                  Đăng xuất
                </Link>
              </li>
            </ul>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
