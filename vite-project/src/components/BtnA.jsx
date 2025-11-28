const BtnA = ({ text, color, onAdd }) => {
  return (
    <div>
      <button
        className="BtnA"
        style={{ backgroundColor: color }}
        onClick={onAdd}
      >
        {text}
      </button>
    </div>
  );
};

export default BtnA;
