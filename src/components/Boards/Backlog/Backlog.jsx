import { useState } from "react";
import s from "./Backlog.module.css";
const Backlog = ({ boardData, addTask, removeTask }) => {
  const [btn, setBtn] = useState(false);
  const [userInput, setUserInput] = useState("");

  // Изменение состояния кнопки
  const changeConditionBtn = () => {
    if (userInput === "" && btn === true) {
      return null;
    } else {
      setBtn(!btn);
    }
  };

  // Изменения инпута
  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  // Записать значение инпута
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
  };

  // Добавить значения инпута при нажатии Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
      setBtn(!btn)
    }
  };

  return (
    // Доска, её заголовок, элементы доски
    <div key={boardData.id} className="board">
      <div className="board__title">{boardData.title}</div>
      {boardData.items.map((item) => (
        <div key={item.id} className="board__item">
          {item.title}
        </div>
      ))}

      {/* Форма отправки значения инпута */}
      <form onSubmit={handleSubmit} className={!btn ? s.hide : ""}>
        <div className={s.input__container}>
          <input
            className={s.input}
            type="text"
            value={userInput}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button className={s.btn__submit} onClick={changeConditionBtn}>
          Submit
        </button>
      </form>

      {/* Кнопка  Add card*/}
      <button
        className={!btn ? "btn__add" : s.hide}
        onClick={changeConditionBtn}
      >
        <div className="plus"></div> Add card
      </button>
    </div>
  );
};

export default Backlog;
