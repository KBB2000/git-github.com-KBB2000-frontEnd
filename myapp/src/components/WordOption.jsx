const WordOption = ({ word, onSelect, disabled }) => (
    <button
      disabled={disabled}
      onClick={() => onSelect(word)}
      className="bg-blue-100 hover:bg-blue-300 disabled:opacity-50 px-4 py-2 m-1 rounded"
    >
      {word}
    </button>
  );
  
  export default WordOption;
  