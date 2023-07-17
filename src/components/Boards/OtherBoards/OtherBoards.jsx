import { useState } from "react";
import s from "./OtherBoards.module.css";
import { Link } from "react-router-dom";

const OtherBoard = ({ boardData, prevBoardData, addTask, getOpenTask }) => {
  const [btn, setBtn] = useState(false);

  const boardName = boardData.title;

  const handleTask = (item) => {
    setBtn(!btn);
    addTask(item, boardData.id);
  };

  return (
    // Доска, её заголовок, элементы доски
    <div key={boardData.id} className="board">
      <div className="board__title">{boardData.title}</div>
      {boardData.items.map((item) =>
        !boardData.items.complite ? (
          <div key={item.id} className="board__item">
            <Link to={`/${boardName}/${item.id}`} className='board__link' onClick={() => getOpenTask(item)} >{item.title}</Link>
          </div>
        ) : null
      )}

      {/* кнопка Add card */}
      <button
        className={btn ? s.strike : "btn__add"}
        disabled={prevBoardData.items.length ? false : true}
        style={
          !prevBoardData.items.length
            ? { cursor: "not-allowed" }
            : { cursor: "pointer" }
        }
        onClick={() => {
          setBtn(!btn);
        }}
      >
        <div className="plus"></div> Add card
      </button>

      {/* Выпадающий список с элементами предыдущей доски */}
      {btn && (
        <div>
          <div
            className={s.drop_down}
            onClick={() => {
              setBtn(!btn);
            }}
          >
            <div className={s.arrow}></div>
          </div>
          <div className={s.list}>
            {prevBoardData.items.map((item) => (
              <div
                className={s.board_items}
                key={item.id}
                onClick={() => handleTask(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherBoard;
