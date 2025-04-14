import { useEffect, useState } from "react";
import sampleData from "./data/sample.json";

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [timer, setTimer] = useState(30);
  const [showReport, setShowReport] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    setQuestions(sampleData.data.questions);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleNext();
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOptionClick = (word) => {
    const newSelectedWords = [...selectedWords];
    const currentBlanks = questions[current].correctAnswer.length;

    for (let i = 0; i < currentBlanks; i++) {
      if (!newSelectedWords[i]) {
        newSelectedWords[i] = word;
        break;
      }
    }
    setSelectedWords(newSelectedWords);
  };

  const handleBlankClick = (index) => {
    const newSelectedWords = [...selectedWords];
    newSelectedWords.splice(index, 1); // remove the word from this index
    setSelectedWords(newSelectedWords); // update the state
  };

  const handleNext = () => {
    const correctAnswer = questions[current].correctAnswer;
    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(correctAnswer);

    const answerRecord = {
      sentence: questions[current].question,
      filled: selectedWords,
      correct: correctAnswer,
      isCorrect,
    };

    setAnswers([...answers, answerRecord]);
    setSelectedWords([]);
    setTimer(30);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowReport(true);
    }
  };

  const handleSkip = () => {
    setSelectedWords([]);
    setTimer(30);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowReport(true);
    }
  };

  const handleQuit = () => {
    setShowQuitConfirm(true);
  };

  const confirmQuit = () => {
    setShowReport(true);
    setShowQuitConfirm(false);
  };

  const handleStart = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">
          Sentence Construction
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Select the correct words to complete the sentence by arranging <br /> the provided options in the right order.
        </p>
        <div className="flex flex-row items-center mb-6 gap-5">
          <div>
            <p className="text-sm text-gray-500">Time Per Question</p>
            <p className="text-lg font-semibold text-gray-700">30 sec</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Questions</p>
            <p className="text-lg font-semibold text-gray-700">10</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Coin</p>
            <p className="text-lg font-semibold text-gray-700">10🪙</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="bg-transparent hover:text-blue-700 text-blue font-medium px-6 py-2 rounded border border-blue-600">
            Back
          </button>
          <button onClick={handleStart} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded">
            Start
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0 || !questions[current]) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading Questions...
      </div>
    );
  }

  if (showReport) {
    const score = answers.filter((a) => a.isCorrect).length;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-6">
            Your Score: {score}/{answers.length}
          </h2>
          <div className="space-y-4 text-left">
            {answers.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl ${
                  item.isCorrect
                    ? "bg-green-100 border-l-4 border-green-500"
                    : "bg-red-100 border-l-4 border-red-500"
                }`}
              >
                <p className="font-semibold mb-1">Q{idx + 1}: {item.sentence}</p>
                <p>✅ Your Answer: <span className="font-medium">{item.filled.join(" ")}</span></p>
                <p>📌 Correct Answer: <span className="font-medium">{item.correct.join(" ")}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[current];
  const usedWords = selectedWords;

  let blankIndex = 0;
  const sentenceParts = currentQ.question.split(" ").map((word, idx) => {
    if (word === "___________") {
      const filledWord = selectedWords[blankIndex] || "";
      const indexForClick = blankIndex;
      blankIndex++;
      return (
        <button
          key={idx}
          onClick={() => handleBlankClick(indexForClick)}
          className="mx-1 my-1 px-3 py-1 bg-gray-100 border border-gray-300 rounded min-w-[80px] text-center"
        >
          {filledWord || "___________"}
        </button>
      );
    } else {
      return (
        <span key={idx} className="mx-1 my-1">
          {word}
        </span>
      );
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 font-medium">⏰ {timer}s</span>
          <div className="flex gap-2">
            <button onClick={handleSkip} className="px-3 py-1 bg-yellow-100 border border-yellow-400 rounded hover:bg-yellow-200">
              Skip
            </button>
            <button onClick={handleQuit} className="px-3 py-1 bg-red-100 border border-red-400 rounded hover:bg-red-200">
              Quit
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
          <div
            className="bg-orange-400 h-full"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <h2 className="text-center text-lg font-semibold mb-4 text-gray-700">
          Select the missing words in the correct order
        </h2>

        {/* Sentence with blanks */}
        <div className="text-lg flex flex-wrap justify-center mb-6 text-center gap-1">
          {sentenceParts}
        </div>

        {/* Options */}
        <div className="flex flex-wrap justify-center gap-3">
          {currentQ.options.map((option, idx) => {
            const isUsed = usedWords.includes(option);
            return !isUsed ? (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200 transition-all"
              >
                {option}
              </button>
            ) : null;
          })}
        </div>

        {/* Next button */}
        {selectedWords.length === currentQ.correctAnswer.length && (
          <div className="text-center mt-6">
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Quit Confirmation */}
      {showQuitConfirm && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-medium mb-4">Are you sure you want to quit?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmQuit}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
