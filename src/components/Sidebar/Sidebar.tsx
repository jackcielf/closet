import React, { useState } from "react";
import {
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout as LayoutAnt, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";

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
  getItem("Dashboard", "dashboard", <PieChartOutlined />),
  getItem("Looks", "look", <UserOutlined />, [
    getItem("Casuais", "casual"),
    getItem("Sociais", "social"),
  ]),
];

export const Sidebar: React.FC = () => {
  const navegate = useNavigate();
	const [collapsed, setCollapsed] = useState(true);

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
        defaultSelectedKeys={["dashboard"]}
        mode="inline"
        items={items}
        onClick={({key}) => navegate(key)}
      />
    </Sider>
  );
};
