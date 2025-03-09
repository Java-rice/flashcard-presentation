import React, { useState } from "react";
import Flashcard from "@src/components/Flashcard";
import questions from "@src/data/questions.json";

const Game = () => {
  const [cards, setCards] = useState(questions);

  const removeCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5E1C0] dark:bg-[#3E2723] text-[#4E342E] dark:text-[#D7CCC8] p-4">
      <h1 className="text-3xl font-bold mb-6">Ethics Flashcards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.length > 0 ? (
          cards.map((card) => <Flashcard key={card.id} card={card} onRemove={removeCard} />)
        ) : (
          <p className="text-xl font-semibold">You've completed all questions!</p>
        )}
      </div>
    </div>
  );
};

export default Game;
