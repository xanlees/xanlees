/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";

const Card = () => {
  const cardData = [
    { id: 1, title: "Total Post", content: "Content for Card 1" },
    { id: 2, title: "Total Active Post", content: "Content for Card 2" },
  ];

  return (
    <>
      {cardData.map((card) => (
        <div className="w-full p-4 md:w-1/2 " key={card.id}>
          <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="mb-4 text-lg font-bold">{card.title}</h2>
            <p className="text-gray-600">{card.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
