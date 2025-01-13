import React from "react";
import { Card as CardAnt } from "antd";
import './Card.scss';

interface Clothe {
  clothes: Array<{
    image: string;
    inventary: string;
    look: string;
  }>;
}

export const Card: React.FC<Clothe> = ({ clothes }) => (
  <section className="card__list">
    {clothes.map((item) => (
      <CardAnt
        className="card"
        hoverable
        cover={<img alt="Roupas" src={item.image} />}
      ></CardAnt>
    ))}
  </section>
);
