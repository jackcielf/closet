import React, { useEffect, useState } from "react";
import {
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout as LayoutAnt, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.scss";

const { Sider } = LayoutAnt;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
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
];

export const Sidebar: React.FC = () => {
  const [menuSelected, setMenuSelected] = useState<string>('/home');
	const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navegate = useNavigate();

  useEffect(() => {
    setMenuSelected(location.pathname);
  }, [location]);
  
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
        onClick={({key}) => navegate(key)}
      />
    </Sider>
  );
};
