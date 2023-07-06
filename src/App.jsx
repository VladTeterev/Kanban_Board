import { useState } from "react";
import "./App.css";
import UserMenu from "./components/UserMenu";
import Backlog from "./components/Boards/Backlog/Backlog";
import OtherBoard from "./components/Boards/OtherBoards/OtherBoards";
import { useEffect } from "react";

function App() {
  const [boardsData, setBoardsData] = useState(
    JSON.parse(localStorage.getItem("todo")) || [
      {
        id: 1,
        title: "Backlog",
        items: [],
      },
      {
        id: 2,
        title: "Ready",
        items: [],
      },
      {
        id: 3,
        title: "In Progress",
        items: [],
      },
      {
        id: 4,
        title: "Finished",
        items: [],
      },
    ]
  );

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(boardsData));
  }, [boardsData]);

  // Добавление задачи в Backlog
  const addTaskBacklog = (userInput) => {
    if (userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        title: userInput,
      };
      const newTodos = [
        { ...boardsData[0], items: [...boardsData[0].items, newItem] },
        { ...boardsData[1] },
        { ...boardsData[2] },
        { ...boardsData[3] },
      ];
      setBoardsData(newTodos);
    }
  };

  // Добавление задачи из дропдауна и удаление из предыдущей
  const changeCardStage = (item, id) => {
    setBoardsData(
      boardsData.map((board) =>
        board.id === id
          ? { ...board, items: [...board.items, item] }
          : { ...board }
      )
    );
    removeTask(item, id - 1);
  };

  // Удаление задачи из предыдущей доски
  const removeTask = (item, id) => {
    setBoardsData((boardsData) =>
      boardsData.map((board) => {
        if (board.id === id) {
          return {
            ...board,
            items: board.items.filter((todo) => todo.id !== item.id),
          };
        }
        return board;
      })
    );
  };

  // Кол-во активных задач
  const numberOfActiveTasks = () => {
    const sumItems =
      boardsData[0].items.length +
      boardsData[1].items.length +
      boardsData[2].items.length;
    if (sumItems) {
      return sumItems;
    } else {
      return null;
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__name">Awesome Kanban Board</h1>
        <UserMenu />
      </header>

      <main className="main">
        <div className="board-container">
          <Backlog
            key={boardsData[0].id}
            boardData={boardsData[0]}
            addTask={addTaskBacklog}
          />
          <OtherBoard
            boardData={boardsData[1]}
            prevBoardData={boardsData[0]}
            addTask={changeCardStage}
          />
          <OtherBoard
            boardData={boardsData[2]}
            prevBoardData={boardsData[1]}
            addTask={changeCardStage}
          />
          <OtherBoard
            boardData={boardsData[3]}
            prevBoardData={boardsData[2]}
            addTask={changeCardStage}
          />
        </div>
      </main>

      <footer className="footer">
        <span>Active tasks: {numberOfActiveTasks()}</span>
        <span>Finished tasks: {boardsData[3].items.length}</span>
        <span>Kanban board by Vlad, 2023</span>
      </footer>
    </div>
  );
}

export default App;
