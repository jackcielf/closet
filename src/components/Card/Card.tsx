import React from "react";
import { Card as CardAnt } from "antd";
import "./Card.scss";

interface Clothe {
  clothes: Array<{
    image: string;
    inventary: string;
    look: string;
  }>;
}

export const Card: React.FC<Clothe> = ({ clothes }) => (
  <section className="card__list d-flex row m-0">
    {clothes.map((item, index) => (
      <CardAnt
        key={index}
        className="card col p-0"
        hoverable
        cover={<img alt="Roupas" src={item.image} />}
      ></CardAnt>
    ))}
  </section>
);
