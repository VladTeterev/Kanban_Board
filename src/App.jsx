import { useState } from "react";
import "./App.css";
import MainHomePage from "./components/MainHomePage/MainHomePage";
import LinkPage from "./components/LinkPage/LinkPage";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

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
        title: "InProgress",
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
        description: "",
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

  const [openTask, setOpenTask] = useState();
  const getOpenTask = (openTask) => {
    setOpenTask(openTask);
  };

  // Добавление описания в задачу
  const addDiscriptionOfTask = (text, id, taskId) => {
    setBoardsData(
      boardsData.map((board) => {
        if (board.id === id) {
          return {
            ...board,
            items: board.items.map((item) => {
              if (item.id === taskId) {
                return {
                  ...item,
                  description: text,
                };
              }
              return item;
            }),
          };
        }
        return board;
      })
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MainHomePage
              boardsData={boardsData}
              addTaskBacklog={addTaskBacklog}
              changeCardStage={changeCardStage}
              getOpenTask={getOpenTask}
            />
          }
        />
        <Route
          path="/Backlog/:id"
          element={
            <LinkPage
              key={boardsData[0]}
              actualBoardId={boardsData[0].id}
              openTask={openTask}
              boardsData={boardsData}
              addDiscriptionOfTask={addDiscriptionOfTask}
            />
          }
        />
        <Route
          path="/Ready/:id"
          element={
            <LinkPage
              key={boardsData[1]}
              actualBoardId={boardsData[1].id}
              openTask={openTask}
              boardsData={boardsData}
              addDiscriptionOfTask={addDiscriptionOfTask}
            />
          }
        />
        <Route
          path="/InProgress/:id"
          element={
            <LinkPage
              key={boardsData[2]}
              actualBoardId={boardsData[2].id}
              openTask={openTask}
              boardsData={boardsData}
              addDiscriptionOfTask={addDiscriptionOfTask}
            />
          }
        />
        <Route
          path="/Finished/:id"
          element={
            <LinkPage
              key={boardsData[3]}
              actualBoardId={boardsData[3].id}
              openTask={openTask}
              boardsData={boardsData}
              addDiscriptionOfTask={addDiscriptionOfTask}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
