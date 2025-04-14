const ReportCard = ({ responses }) => {
  const score = responses.filter((r) => r.isCorrect).length;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Your Score: {score}/{responses.length}
        </h2>

        <div className="mt-6 space-y-6">
          {responses.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-lg shadow-md border-l-4 ${
                item.isCorrect
                  ? "bg-green-100 border-green-500"
                  : "bg-red-100 border-red-500"
              }`}
            >
              <p className="text-lg font-semibold">{item.sentence}</p>
              <div className="mt-2">
                <p className="text-sm text-gray-700">
                  <strong>Your Answer:</strong> {item.filled.join(" ")}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Correct Answer:</strong> {item.correct.join(" ")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Center the score text */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold">
            <span
              className={`${
                score === responses.length
                  ? "text-green-500"
                  : score > responses.length / 2
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {score === responses.length
                ? "Perfect Score! 🎉"
                : score > responses.length / 2
                ? "Great Job! 👏"
                : "Better Luck Next Time! 😕"}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
