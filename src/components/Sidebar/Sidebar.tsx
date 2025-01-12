import React, { useEffect, useState } from "react";
import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout as LayoutAnt, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import "./Sidebar.scss";
import { RegisterClothes } from "../RegisterClothes/RegisterClothes";

const { Sider } = LayoutAnt;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/home", <PieChartOutlined />),
  getItem("Looks", "looks", <UserOutlined />, [
    getItem("Casuais", "/looks/casual"),
    getItem("Sociais", "/looks/social"),
  ]),
  getItem("Inventário", "inventario", <UserOutlined />, [
    getItem("Vestidos", "/inventario/vestidos"),
    getItem("Blusas", "/inventario/blusas"),
    getItem("Calças", "/inventario/calcas"),
    getItem("Saias", "/inventario/saias"),
  ]),
];

export const Sidebar: React.FC = () => {
  const [menuSelected, setMenuSelected] = useState<string>("/home");
  const [collapsed, setCollapsed] = useState(false);
  const [openCadUserDrawer, setOpenCadUserDrawer] = useState(false);

  const location = useLocation();
  const navegate = useNavigate();

  useEffect(() => {
    setMenuSelected(location.pathname);
  }, [location]);

  const showCadUserDrawer = () => {
    setOpenCadUserDrawer(true);
  };

  const hideCadUserDrawer = () => {
    setOpenCadUserDrawer(false);
  };

  return (
    <Sider
      theme="dark"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <h3>LOGO</h3>

      <Menu
        theme="dark"
        selectedKeys={[menuSelected]}
        mode="inline"
        items={items}
        onClick={({ key }) => navegate(key)}
      />

      <div className="sidebar__add-clothes">
        <Button
          className="button"
          type="primary"
          onClick={showCadUserDrawer}
          icon={<PlusOutlined />}
        ></Button>
      </div>

      <RegisterClothes open={openCadUserDrawer} hide={hideCadUserDrawer} />
    </Sider>
  );
};
