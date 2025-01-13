import React, { useEffect, useState } from "react";
import {
  PieChartOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Layout as LayoutAnt, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import "./Sidebar.scss";
import { RegisterClothes } from "../RegisterClothes/RegisterClothes";
import { RegisterUser } from "../RegisterUser/RegisterUser";

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

interface User {
  name: string;
}

export const Sidebar: React.FC = () => {
  const [menuSelected, setMenuSelected] = useState<string>("/home");
  const [collapsed, setCollapsed] = useState(false);
  const [openCadClotheDrawer, setOpenCadClotheDrawer] = useState(false);
  const [openCadUserModal, setOpenCadUserModal] = useState(false);
  const [hasUserRegistered, setHasUserRegistered] = useState(false);
  const [user, setUser] = useState<User>();

  const location = useLocation();
  const navegate = useNavigate();

  useEffect(() => {
    setMenuSelected(location.pathname);
  }, [location]);

  const showHideCadClotheDrawer = (show: boolean) => {
    if (show) {
      setOpenCadClotheDrawer(true);
    } else {
      setOpenCadClotheDrawer(false);
    }
  };

  const showHideCadUserModal = (show: boolean) => {
    if (show) {
      setOpenCadUserModal(true);
    } else {
      setOpenCadUserModal(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user);
      setUser(userData);
      setHasUserRegistered(true);
    }
  }, []);

  return (
    <Sider
      theme="dark"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="sidebar__add-user">
        {hasUserRegistered ? (
          <div className="avatar" onClick={() => showHideCadUserModal(true)}>
            <Avatar
              style={{ backgroundColor: "#eb2f96" }}
              icon={<UserOutlined />}
              size="large"
            />
            {!collapsed ? <span>{user?.name}</span> : ""}
          </div>
        ) : (
          <Button
            className="button"
            onClick={() => showHideCadUserModal(true)}
            icon={<UserAddOutlined />}
          ></Button>
        )}
      </div>

      <hr />

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
          color="pink"
          variant="solid"
          onClick={() => showHideCadClotheDrawer(true)}
          icon={<PlusOutlined />}
        ></Button>
      </div>

      <RegisterClothes
        open={openCadClotheDrawer}
        hide={() => showHideCadClotheDrawer(false)}
      />
      <RegisterUser
        open={openCadUserModal}
        hide={() => showHideCadUserModal(false)}
      />
    </Sider>
  );
};
