import { useEffect, useState } from "react";
import WordOption from "./WordOption";
import Timer from "./Timer";

const QuestionCard = ({ data, onNext }) => {
  const { sentence, options, answers } = data;
  const blanksCount = sentence.split("___").length - 1;
  const [filled, setFilled] = useState(Array(blanksCount).fill(null));
  const [usedWords, setUsedWords] = useState([]);
  
  const handleWordSelect = (word) => {
    const index = filled.findIndex((val) => val === null);
    if (index !== -1) {
      const updated = [...filled];
      updated[index] = word;
      setFilled(updated);
      setUsedWords([...usedWords, word]);
    }
  };

  const handleBlankClick = (index) => {
    const wordToRemove = filled[index];
    if (!wordToRemove) return;

    const updated = [...filled];
    updated[index] = null;
    setFilled(updated);
    setUsedWords(usedWords.filter((w) => w !== wordToRemove));
  };

  const renderSentence = () => {
    const parts = sentence.split("___");
    return parts.map((part, idx) => (
      <span key={idx}>
        {part}
        {idx < blanksCount && (
          <button
            className="inline-block min-w-[80px] border-b-2 border-black text-center text-blue-600 font-semibold mx-1"
            onClick={() => handleBlankClick(idx)}
          >
            {filled[idx] || "_____"}
          </button>
        )}
      </span>
    ));
  };

  useEffect(() => {
    setFilled(Array(blanksCount).fill(null));
    setUsedWords([]);
  }, [data]);

  const allFilled = filled.every((item) => item !== null);

  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Fill in the blanks</h2>
        <Timer duration={30} onExpire={() => onNext(filled)} />
      </div>

      <p className="text-lg mb-6">{renderSentence()}</p>

      <div className="flex flex-wrap">
        {options.map((word, idx) => (
          <WordOption
            key={idx}
            word={word}
            onSelect={handleWordSelect}
            disabled={usedWords.includes(word)}
          />
        ))}
      </div>

      {allFilled && (
        <button
          onClick={() => onNext(filled)}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default QuestionCard;
