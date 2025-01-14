import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Card } from "../../components/Card/Card";

interface Clothe {
  image: string;
  inventary: string;
  look: string;
}

export const Home: React.FC = () => {
  const [clothes, setClothes] = useState<Clothe[]>([]);

  useEffect(() => {
    const storedClothes = JSON.parse(localStorage.getItem("clothes") || "[]");
    setClothes(storedClothes);
  }, []);

  return (
    <>
      <h1>Inicio</h1>

      <Card clothes={clothes} />
    </>
  );
};
