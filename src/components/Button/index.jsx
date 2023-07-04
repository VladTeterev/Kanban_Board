import { useState } from "react";
import "./index.css";

// Кнопка для списка задач
const Button = () => {
  const [btn, setBtn] = useState(false);
  const valueBtn = ["+ Add card", "Submit"];
  return (
    <button
      className={btn ? "btn-add strike-btn" : "btn-add"}
      onClick={() => setBtn(!btn)}
    >
      {btn ? valueBtn[1] : valueBtn[0]}
    </button>
  );
};

export default Button;
