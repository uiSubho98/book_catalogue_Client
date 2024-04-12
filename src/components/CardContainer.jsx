import React from "react";
import { Card } from "./Card"; // Assuming you have defined the Card component

export function CardsContainer({ cards }) {
  return (
    <div className="flex flex-wrap justify-center">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}
