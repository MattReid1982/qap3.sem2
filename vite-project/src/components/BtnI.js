const BtnA = ({ text, color, onAdd }) => {
  return (
    <div>
      <button
        className="BtnI"
        style={{ backgroundColor: color }}
        onClick={onAdd}
      >
        {text}
      </button>
    </div>
  );
};
