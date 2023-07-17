import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LinkPage.css";

const LinkPage = ({
  boardsData,
  openTask,
  actualBoardId,
  addDiscriptionOfTask,
}) => {
  // Сохранение текста описания
  const [userTextArea, setUserTextArea] = useState(
    localStorage.getItem("userTextArea") || ""
  );

  // Актуальная задача
  const [actualTask, setActualTask] = useState(
    JSON.parse(localStorage.getItem("actualTask")) || []
  );

  const [btn, setBtn] = useState(false);

  useEffect(() => {
    if (openTask) {
      setActualTask(openTask);
      localStorage.setItem("actualTask", JSON.stringify(openTask));
    }
  }, [openTask]);

  useEffect(() => {
    if (actualTask.description !== "") {
      setUserTextArea(actualTask.description);
      localStorage.setItem(
        "actualTask",
        JSON.stringify(actualTask.description)
      );
    }
  }, [actualTask.description]);

  useEffect(() => {
    localStorage.setItem("actualTask", JSON.stringify(actualTask));
  }, [actualTask]);

  // Изменения инпута
  const handleChange = (e) => {
    setUserTextArea(e.currentTarget.value);
  };

  // Записать значение инпута
  const handleSubmit = (e) => {
    e.preventDefault();
    addDescription(userTextArea);
  };

  // Добавить значения инпута при нажатии Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
      setBtn(!btn);
    }
  };

  // Добавить описание задачи
  const addDescription = (userTextArea) => {
    setActualTask({
      ...actualTask,
      description: userTextArea,
    });
    addDiscriptionOfTask(userTextArea, actualBoardId, actualTask.id);
    localStorage.setItem("userTextArea", userTextArea);
    localStorage.setItem("actualTask", JSON.stringify(actualTask));
  };

  // Изменить состояние кнопки
  const changeConditionBtn = () => {
    if (userTextArea === "" && btn === true) {
      return null;
    } else {
      setBtn(!btn);
    }
  };

  return (
    <div>
      <Header />
      <div key={actualTask.id} className="page">
        <div className="page__container">
          <div className="flex__container">
            <h1 className="page__title">{actualTask.title}</h1>
            <Link to={"/"}>
              <div className="exit__button"></div>
            </Link>
          </div>
          <div className="page__text">
            <div className="text">{actualTask.description}</div>
            <form
              onSubmit={handleSubmit}
              className={btn ? "page__textarea" : "hide"}
            >
              <textarea
                className="textarea"
                value={userTextArea}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Please enter description..."
                cols="20"
                rows="5"
              ></textarea>
              <button className="btn__submit" onClick={changeConditionBtn}>
                Submit
              </button>
            </form>

            <button
              className={!btn ? "btn__addDescription" : "hide"}
              onClick={changeConditionBtn}
            >
              Edit description
            </button>
          </div>
        </div>
      </div>
      <Footer boardsData={boardsData} />
    </div>
  );
};

export default LinkPage;
