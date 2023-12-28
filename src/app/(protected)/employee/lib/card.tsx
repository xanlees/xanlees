/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";

const Card = () => {
  const cardData = [
    { id: 1, title: "Card 1", content: "Content for Card 1" },
    { id: 2, title: "Card 2", content: "Content for Card 2" },
    { id: 3, title: "Card 3", content: "Content for Card 3" },
    { id: 3, title: "Card 3", content: "Content for Card 3" },
  ];

  return (
    <>
      {cardData.map((card) => (
        <div className="w-full p-1 md:w-1/3 lg:w-1/4 xl:w-1/4" key={card.id}>
          <div className="p-6 border rounded-md shadow-md border-border">
            <h2 className="mb-4 text-lg font-bold">{card.title}</h2>
            <p className="text-gray-600">{card.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
