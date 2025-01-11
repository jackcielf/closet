import React from "react";
import { Layout as LayoutAnt } from "antd";
import "./Footer.scss";

const { Footer: FooterAnt } = LayoutAnt;

export const Footer: React.FC = () => {
  return (
    <FooterAnt style={{ textAlign: "center" }}>
      Created by @dev_jakki using Ant Design © {new Date().getFullYear()}
    </FooterAnt>
  );
};
