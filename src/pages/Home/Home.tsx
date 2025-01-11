import React from "react";
import { Layout as LayoutAnt } from "antd";
import { Sidebar, Footer } from "../../components";
import { Outlet } from "react-router-dom";
import "./Home.scss";

const { Content: ContentAnt } = LayoutAnt;

export const Home: React.FC = () => {
  return (
    <LayoutAnt style={{ minHeight: "100vh" }}>
      <Sidebar />

      <LayoutAnt>
        <ContentAnt style={{ margin: "0 16px" }}>
          <Outlet />
        </ContentAnt>
        
        <Footer />
      </LayoutAnt>
    </LayoutAnt>
  );
};
